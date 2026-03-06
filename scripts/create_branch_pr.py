#!/usr/bin/env python3
from __future__ import annotations

import argparse
import json
import os
import re
import subprocess
import urllib.error
import urllib.request
from datetime import datetime, timezone
from pathlib import Path
from typing import Any


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description="Create a design-autopilot branch, push changes, and open a PR.")
    parser.add_argument("--root", default=".", help="Git repository root.")
    parser.add_argument("--target-branch", default="main", help="PR base branch.")
    parser.add_argument("--branch-prefix", default="design-autopilot", help="Branch prefix.")
    parser.add_argument("--remote", default="origin", help="Git remote name.")
    parser.add_argument("--create-pr", choices=["yes", "no"], default="yes")
    parser.add_argument("--commit-message", default=None, help="Commit message override.")
    parser.add_argument("--title", default=None, help="PR title override.")
    parser.add_argument("--body", default=None, help="PR body override.")
    parser.add_argument("--json", action="store_true")
    return parser.parse_args()


def now_iso() -> str:
    return datetime.now(timezone.utc).isoformat().replace("+00:00", "Z")


def timestamp_slug() -> str:
    return datetime.now(timezone.utc).strftime("%Y%m%d-%H%M%S")


def run_git(root: Path, args: list[str], check: bool = True) -> subprocess.CompletedProcess[str]:
    completed = subprocess.run(
        ["git", *args],
        cwd=str(root),
        text=True,
        capture_output=True,
    )
    if check and completed.returncode != 0:
        raise RuntimeError(f"git {' '.join(args)} failed: {completed.stderr.strip()}")
    return completed


def detect_github_repo(remote_url: str) -> tuple[str, str] | None:
    patterns = [
        r"github\.com[:/](?P<owner>[^/]+)/(?P<repo>[^/.]+)(?:\.git)?$",
        r"https://[^@]+@github\.com/(?P<owner>[^/]+)/(?P<repo>[^/.]+)(?:\.git)?$",
    ]
    for pattern in patterns:
        match = re.search(pattern, remote_url)
        if match:
            return match.group("owner"), match.group("repo")
    return None


def create_pull_request(
    owner: str,
    repo: str,
    token: str,
    title: str,
    body: str,
    head: str,
    base: str,
) -> tuple[bool, dict[str, Any]]:
    url = f"https://api.github.com/repos/{owner}/{repo}/pulls"
    payload = {
        "title": title,
        "body": body,
        "head": head,
        "base": base,
    }
    request = urllib.request.Request(
        url,
        data=json.dumps(payload).encode("utf-8"),
        method="POST",
        headers={
            "Authorization": f"Bearer {token}",
            "Accept": "application/vnd.github+json",
            "Content-Type": "application/json",
            "X-GitHub-Api-Version": "2022-11-28",
            "User-Agent": "codex-design-autopilot",
        },
    )
    try:
        with urllib.request.urlopen(request, timeout=30) as response:
            parsed = json.loads(response.read().decode("utf-8"))
            return True, parsed
    except urllib.error.HTTPError as exc:
        detail = exc.read().decode("utf-8", errors="ignore")
        return False, {"http_status": exc.code, "reason": exc.reason, "detail": detail[:1200]}
    except Exception as exc:
        return False, {"error": str(exc)}


def main() -> int:
    args = parse_args()
    root = Path(args.root).resolve()

    result: dict[str, Any] = {
        "timestamp": now_iso(),
        "status": "failed",
        "branch": None,
        "target_branch": args.target_branch,
        "remote": args.remote,
        "commit_created": False,
        "push_attempted": False,
        "pr_status": "skipped",
        "pr_url": None,
        "error": None,
    }

    try:
        inside_repo = run_git(root, ["rev-parse", "--is-inside-work-tree"]).stdout.strip().lower()
        if inside_repo != "true":
            result["status"] = "skipped"
            result["error"] = "Target is not a git repository."
            print_output(result, args.json)
            return 0

        porcelain = run_git(root, ["status", "--porcelain"]).stdout.strip()
        if not porcelain:
            result["status"] = "skipped"
            result["error"] = "No git changes to publish."
            print_output(result, args.json)
            return 0

        branch_name = f"{args.branch_prefix}/{timestamp_slug()}"
        result["branch"] = branch_name

        run_git(root, ["checkout", "-b", branch_name])
        run_git(root, ["add", "-A"])

        commit_message = args.commit_message or f"chore(design): autopilot visual fixes {timestamp_slug()}"
        run_git(root, ["commit", "-m", commit_message])
        result["commit_created"] = True

        run_git(root, ["push", "-u", args.remote, branch_name])
        result["push_attempted"] = True

        if args.create_pr == "yes":
            remote_url = run_git(root, ["remote", "get-url", args.remote]).stdout.strip()
            parsed = detect_github_repo(remote_url)
            if not parsed:
                result["pr_status"] = "not_configured"
                result["error"] = "Remote is not a GitHub repository URL."
            else:
                owner, repo = parsed
                token = (
                    os.environ.get("GITHUB_TOKEN")
                    or os.environ.get("GH_TOKEN")
                    or os.environ.get("GITHUB_ACTIONS_DISPATCH_TOKEN")
                    or ""
                ).strip()
                if not token:
                    result["pr_status"] = "not_configured"
                    result["error"] = "Missing GitHub token (GITHUB_TOKEN/GH_TOKEN)."
                else:
                    title = args.title or "Design Autopilot: visual quality corrections"
                    body = args.body or (
                        "This PR was created automatically by the design autopilot after "
                        "Playwright visual checks and bounded auto-fixes."
                    )
                    ok, response = create_pull_request(
                        owner=owner,
                        repo=repo,
                        token=token,
                        title=title,
                        body=body,
                        head=branch_name,
                        base=args.target_branch,
                    )
                    if ok:
                        result["pr_status"] = "created"
                        result["pr_url"] = response.get("html_url")
                    else:
                        result["pr_status"] = "failed"
                        result["error"] = response
        else:
            result["pr_status"] = "skipped"

        result["status"] = "published"
        print_output(result, args.json)
        return 0
    except Exception as exc:
        result["status"] = "failed"
        result["error"] = str(exc)
        print_output(result, args.json)
        return 1


def print_output(result: dict[str, Any], as_json: bool) -> None:
    if as_json:
        print(json.dumps(result, ensure_ascii=True))
        return
    print(f"status={result.get('status')}")
    print(f"branch={result.get('branch')}")
    print(f"commit_created={str(bool(result.get('commit_created'))).lower()}")
    print(f"push_attempted={str(bool(result.get('push_attempted'))).lower()}")
    print(f"pr_status={result.get('pr_status')}")
    if result.get("pr_url"):
        print(f"pr_url={result['pr_url']}")
    if result.get("error"):
        print(f"error={result['error']}")


if __name__ == "__main__":
    raise SystemExit(main())
