#!/usr/bin/env python3
from __future__ import annotations

import argparse
import json
from pathlib import Path

from design_memory_utils import (
    COMPONENT_CHOICES,
    DEFAULT_THRESHOLDS,
    MODE_CHOICES,
    PROFILE_CHOICES,
    parse_csv,
    parse_request,
    resolve_global_root,
    search_candidates,
)


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description="Decide whether to reuse existing 21st variants or generate a new one.")
    parser.add_argument("--root", required=True, help="Project root.")
    parser.add_argument("--query", required=True, help="Prompt or intent for the target component.")
    parser.add_argument("--component-type", default="other", choices=sorted(COMPONENT_CHOICES))
    parser.add_argument("--profile", default="general", choices=sorted(PROFILE_CHOICES))
    parser.add_argument("--mode", default="premium-web", choices=sorted(MODE_CHOICES))
    parser.add_argument("--guardrail", default="semi-strict", choices=["off", "semi-strict", "strict"])
    parser.add_argument("--history-scope", default="hybrid", choices=["local", "hybrid", "global"])
    parser.add_argument("--top-k", type=int, default=5)
    parser.add_argument("--tags", default="", help="Comma-separated tags.")
    parser.add_argument("--brand-tokens", default="", help="Comma-separated brand tokens.")
    parser.add_argument("--namespace", default="default")
    parser.add_argument("--force-generate", action="store_true", help="Override semi-strict reuse recommendations.")
    parser.add_argument(
        "--global-history-root",
        default=r"C:\Users\Thomas\.codex\memory",
        help="Global history root directory.",
    )
    parser.add_argument("--json", action="store_true")
    return parser.parse_args()


def classify_decision(score: float) -> str:
    if score >= DEFAULT_THRESHOLDS["reuse_required"]:
        return "reuse_required"
    if score >= DEFAULT_THRESHOLDS["reuse_preferred"]:
        return "reuse_preferred"
    return "generate_allowed"


def build_next_action(guardrail: str, decision: str, force_generate: bool) -> tuple[str, bool, str]:
    override_used = False
    override_reason = ""
    if guardrail == "off":
        return "generate", False, "guardrail_off"
    if guardrail == "strict":
        if decision == "generate_allowed":
            return "generate", False, ""
        return "reuse", False, "strict_mode_reuse_enforced"

    if decision == "generate_allowed":
        return "generate", False, ""
    if force_generate:
        override_used = True
        override_reason = "force_generate_explicit_flag"
        return "generate", override_used, override_reason
    return "reuse", False, ""


def emit(payload: dict[str, object], as_json: bool) -> None:
    if as_json:
        print(json.dumps(payload, ensure_ascii=True))
        return
    print(f"status={payload.get('status', 'ok')}")
    print(f"decision={payload.get('decision', '')}")
    print(f"next_action={payload.get('next_action', '')}")
    print(f"best_match_score={payload.get('best_match_score', 0.0)}")
    print(f"best_match_id={payload.get('best_match_id', '')}")
    print(f"force_generate_used={payload.get('force_generate_used', False)}")
    if payload.get("override_reason"):
        print(f"override_reason={payload['override_reason']}")
    if payload.get("error"):
        print(f"error={payload['error']}")


def main() -> int:
    args = parse_args()
    root = Path(args.root).expanduser().resolve()
    global_root = resolve_global_root(args.global_history_root)
    if not root.exists() or not root.is_dir():
        payload = {
            "status": "failed",
            "error": f"Project root does not exist: {root}",
            "decision": "generate_allowed",
            "next_action": "generate",
            "matches": [],
        }
        emit(payload, args.json)
        return 1

    request = parse_request(
        query=args.query,
        tags=parse_csv(args.tags),
        profile=args.profile,
        mode=args.mode,
        component_type=args.component_type,
        namespace=args.namespace,
        brand_tokens=parse_csv(args.brand_tokens),
    )

    matches = search_candidates(
        root=root,
        global_root=global_root,
        history_scope=args.history_scope,
        request=request,
        top_k=max(1, args.top_k),
    )
    best = matches[0] if matches else None
    best_score = float(best.get("score", 0.0)) if best else 0.0
    decision = classify_decision(best_score)
    next_action, override_used, override_reason = build_next_action(
        args.guardrail,
        decision,
        args.force_generate,
    )

    if args.guardrail == "strict" and args.force_generate and decision != "generate_allowed":
        override_reason = "strict_mode_override_rejected"

    payload = {
        "status": "ok",
        "guardrail": args.guardrail,
        "history_scope": args.history_scope,
        "decision": decision,
        "best_match_score": round(best_score, 4),
        "best_match_id": best.get("id", "") if best else "",
        "best_match_scope": best.get("source_scope", "") if best else "",
        "reuse_mode": best.get("reuse_mode", "do_not_reuse") if best else "do_not_reuse",
        "next_action": next_action,
        "force_generate_used": override_used,
        "override_reason": override_reason,
        "thresholds": {
            "reuse_required": DEFAULT_THRESHOLDS["reuse_required"],
            "reuse_preferred": DEFAULT_THRESHOLDS["reuse_preferred"],
        },
        "should_call_component_builder": next_action == "generate",
        "matches": [
            {
                "id": match.get("id", ""),
                "score": float(match.get("score", 0.0)),
                "source_scope": match.get("source_scope", ""),
                "reason": match.get("reason", []),
                "reuse_mode": match.get("reuse_mode", "do_not_reuse"),
            }
            for match in matches
        ],
    }
    emit(payload, args.json)
    return 0


if __name__ == "__main__":
    raise SystemExit(main())

