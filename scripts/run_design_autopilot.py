#!/usr/bin/env python3
from __future__ import annotations

import argparse
import json
import os
import subprocess
import sys
from datetime import datetime, timezone
from pathlib import Path
from typing import Any

DEFAULT_CONFIG = {
    "page_scope": "key",
    "max_gate_autofix_iterations": 2,
    "max_autopilot_iterations": 3,
    "stop_on_no_diff": True,
    "llm_visual_judge": "auto",
    "llm_visual_min_score": 7.5,
    "target_branch": "main",
    "artifacts_dir": ".playwright-gate",
}


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description="Run bounded Playwright design autopilot loop.")
    parser.add_argument("--root", default=".", help="Project root.")
    parser.add_argument("--base-url", default=None, help="Base URL for browser audit.")
    parser.add_argument("--page-scope", choices=["home", "key", "wide"], default=None)
    parser.add_argument("--max-iterations", type=int, default=None)
    parser.add_argument("--stop-on-no-diff", choices=["yes", "no"], default=None)
    parser.add_argument("--with-llm-judge", choices=["auto", "on", "off"], default="auto")
    parser.add_argument("--llm-min-score", type=float, default=None)
    parser.add_argument("--publish-branch-pr", choices=["yes", "no"], default="yes")
    parser.add_argument("--target-branch", default=None)
    parser.add_argument("--start-server", choices=["auto", "always", "never"], default="auto")
    parser.add_argument("--server-command", default=None)
    parser.add_argument("--server-timeout", type=int, default=120)
    parser.add_argument("--timeout", type=int, default=30)
    parser.add_argument("--output", default=None, help="Autopilot report output path.")
    parser.add_argument("--json", action="store_true")
    return parser.parse_args()


def now_iso() -> str:
    return datetime.now(timezone.utc).isoformat().replace("+00:00", "Z")


def load_json(path: Path) -> dict[str, Any]:
    try:
        return json.loads(path.read_text(encoding="utf-8"))
    except Exception:
        return {}


def write_json(path: Path, payload: dict[str, Any]) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(json.dumps(payload, indent=2, ensure_ascii=True), encoding="utf-8")


def load_config(root: Path) -> dict[str, Any]:
    config_path = root / ".codex" / "design-autopilot" / "config.json"
    config = dict(DEFAULT_CONFIG)
    if config_path.exists():
        config.update(load_json(config_path))
    return config


def script_path(name: str) -> Path:
    return Path(__file__).resolve().parent / name


def run_json_script(command: list[str], cwd: Path) -> tuple[int, dict[str, Any], str]:
    completed = subprocess.run(
        command,
        cwd=str(cwd),
        text=True,
        capture_output=True,
    )
    payload: dict[str, Any] = {}
    text = (completed.stdout or "").strip()
    if text:
        try:
            payload = json.loads(text)
        except Exception:
            payload = {"raw_stdout": text}
    return completed.returncode, payload, completed.stderr.strip()


def should_run_judge(mode: str, config_mode: str) -> bool:
    if mode == "on":
        return True
    if mode == "off":
        return False
    return config_mode != "off"


def main() -> int:
    args = parse_args()
    root = Path(args.root).resolve()
    config = load_config(root)

    artifacts_dir = root / str(config.get("artifacts_dir", ".playwright-gate"))
    audit_file = artifacts_dir / "design-audit.json"
    autofix_file = artifacts_dir / "autofix-report.json"
    judge_file = artifacts_dir / "design-llm-judge.json"
    autopilot_output = Path(args.output).resolve() if args.output else artifacts_dir / "autopilot-report.json"

    max_iterations = int(args.max_iterations or config.get("max_autopilot_iterations", 3) or 3)
    max_iterations = max(1, min(max_iterations, 8))
    stop_on_no_diff = (
        args.stop_on_no_diff == "yes"
        if args.stop_on_no_diff is not None
        else bool(config.get("stop_on_no_diff", True))
    )
    page_scope = args.page_scope or str(config.get("page_scope", "key"))
    llm_min_score = float(args.llm_min_score or config.get("llm_visual_min_score", 7.5) or 7.5)
    target_branch = args.target_branch or str(config.get("target_branch", "main"))

    iterations: list[dict[str, Any]] = []
    deterministic_pass = False
    stop_reason = "max_iterations"

    for iteration in range(1, max_iterations + 1):
        iteration_report: dict[str, Any] = {"iteration": iteration}
        audit_cmd = [
            sys.executable,
            str(script_path("design_visual_audit.py")),
            "--root",
            str(root),
            "--page-scope",
            page_scope,
            "--start-server",
            args.start_server,
            "--server-timeout",
            str(args.server_timeout),
            "--timeout",
            str(args.timeout),
            "--output",
            str(audit_file),
            "--json",
        ]
        if args.base_url:
            audit_cmd.extend(["--base-url", args.base_url])
        if args.server_command:
            audit_cmd.extend(["--server-command", args.server_command])

        audit_code, audit_payload, audit_stderr = run_json_script(audit_cmd, root)
        iteration_report["audit_exit_code"] = audit_code
        iteration_report["audit_status"] = audit_payload.get("status")
        if audit_stderr:
            iteration_report["audit_stderr"] = audit_stderr

        if audit_payload.get("status") == "pass":
            deterministic_pass = True
            stop_reason = "deterministic_pass"
            iterations.append(iteration_report)
            break

        if audit_payload.get("status") == "dependency_missing":
            stop_reason = "playwright_missing"
            iterations.append(iteration_report)
            break

        autofix_cmd = [
            sys.executable,
            str(script_path("design_autofix_orchestrator.py")),
            "--root",
            str(root),
            "--audit-file",
            str(audit_file),
            "--iteration",
            str(iteration),
            "--output",
            str(autofix_file),
            "--json",
        ]
        autofix_code, autofix_payload, autofix_stderr = run_json_script(autofix_cmd, root)
        iteration_report["autofix_exit_code"] = autofix_code
        iteration_report["autofix_status"] = autofix_payload.get("status")
        if autofix_stderr:
            iteration_report["autofix_stderr"] = autofix_stderr

        iterations.append(iteration_report)

        if autofix_payload.get("status") == "failed":
            stop_reason = "autofix_failed"
            break
        if autofix_payload.get("status") == "no_diff" and stop_on_no_diff:
            stop_reason = "no_diff"
            break

    final_audit = load_json(audit_file)

    judge_status = "skipped"
    judge_payload: dict[str, Any] = {}
    if deterministic_pass and should_run_judge(args.with_llm_judge, str(config.get("llm_visual_judge", "auto"))):
        judge_cmd = [
            sys.executable,
            str(script_path("design_llm_judge.py")),
            "--root",
            str(root),
            "--audit-file",
            str(audit_file),
            "--min-score",
            str(llm_min_score),
            "--output",
            str(judge_file),
            "--json",
        ]
        judge_code, judge_payload, judge_stderr = run_json_script(judge_cmd, root)
        judge_status = str(judge_payload.get("status", "error"))
        if judge_stderr:
            judge_payload["stderr"] = judge_stderr
        judge_payload["exit_code"] = judge_code
    elif deterministic_pass:
        judge_status = "not_required"

    judge_pass = judge_status in {"pass", "not_required", "not_configured", "skipped"}

    publish_payload: dict[str, Any] = {"status": "skipped", "reason": "not_attempted"}
    if deterministic_pass and judge_pass and args.publish_branch_pr == "yes":
        publish_cmd = [
            sys.executable,
            str(script_path("create_branch_pr.py")),
            "--root",
            str(root),
            "--target-branch",
            target_branch,
            "--create-pr",
            "yes",
            "--json",
        ]
        publish_code, publish_payload, publish_stderr = run_json_script(publish_cmd, root)
        publish_payload["exit_code"] = publish_code
        if publish_stderr:
            publish_payload["stderr"] = publish_stderr

    status = "pass" if deterministic_pass and judge_pass else "fail"
    report = {
        "target": str(root),
        "mode": "design-autopilot",
        "timestamp": now_iso(),
        "status": status,
        "deterministic_pass": deterministic_pass,
        "judge_status": judge_status,
        "stop_reason": stop_reason,
        "max_iterations": max_iterations,
        "iterations": iterations,
        "final_audit": {
            "status": final_audit.get("status"),
            "summary_counts": final_audit.get("summary_counts", {}),
            "findings_count": len(final_audit.get("findings", []) or []),
            "audit_file": str(audit_file),
        },
        "judge": judge_payload,
        "publish": publish_payload,
        "configuration": {
            "page_scope": page_scope,
            "stop_on_no_diff": stop_on_no_diff,
            "llm_min_score": llm_min_score,
            "target_branch": target_branch,
            "publish_branch_pr": args.publish_branch_pr,
        },
    }

    write_json(autopilot_output, report)
    if args.json:
        print(json.dumps(report, ensure_ascii=True))
    else:
        print(f"autopilot={autopilot_output}")
        print(f"status={status}")
        print(f"stop_reason={stop_reason}")

    return 0 if status == "pass" else 1


if __name__ == "__main__":
    raise SystemExit(main())
