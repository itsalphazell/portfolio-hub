#!/usr/bin/env python3
from __future__ import annotations

import argparse
import json
from pathlib import Path

from design_memory_utils import (
    COMPONENT_CHOICES,
    MODE_CHOICES,
    PROFILE_CHOICES,
    parse_csv,
    parse_request,
    resolve_global_root,
    search_candidates,
)


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description="Search local/global 21st design memory for reusable variants.")
    parser.add_argument("--root", required=True, help="Project root.")
    parser.add_argument("--query", required=True, help="Intent or prompt to match against memory.")
    parser.add_argument("--component-type", default="other", choices=sorted(COMPONENT_CHOICES))
    parser.add_argument("--profile", default="general", choices=sorted(PROFILE_CHOICES))
    parser.add_argument("--mode", default="premium-web", choices=sorted(MODE_CHOICES))
    parser.add_argument("--tags", default="", help="Comma-separated tags to improve matching.")
    parser.add_argument("--brand-tokens", default="", help="Comma-separated brand tokens for conflict checks.")
    parser.add_argument("--namespace", default="default")
    parser.add_argument("--history-scope", default="hybrid", choices=["local", "hybrid", "global"])
    parser.add_argument("--top-k", type=int, default=5)
    parser.add_argument("--min-score", type=float, default=0.0)
    parser.add_argument(
        "--global-history-root",
        default=r"C:\Users\Thomas\.codex\memory",
        help="Global history root directory.",
    )
    parser.add_argument("--json", action="store_true")
    return parser.parse_args()


def emit(payload: dict[str, object], as_json: bool) -> None:
    if as_json:
        print(json.dumps(payload, ensure_ascii=True))
        return
    print(f"status={payload.get('status', 'ok')}")
    print(f"matches={len(payload.get('matches', []))}")
    best = payload.get("best_match") or {}
    if isinstance(best, dict) and best:
        print(f"best_match_id={best.get('id', '')}")
        print(f"best_match_score={best.get('score', 0.0)}")
        print(f"best_match_scope={best.get('source_scope', '')}")


def main() -> int:
    args = parse_args()
    root = Path(args.root).expanduser().resolve()
    global_root = resolve_global_root(args.global_history_root)
    if not root.exists() or not root.is_dir():
        payload = {
            "status": "failed",
            "error": f"Project root does not exist: {root}",
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

    min_score = max(0.0, min(float(args.min_score), 1.0))
    filtered = [match for match in matches if float(match.get("score", 0.0)) >= min_score]
    best = filtered[0] if filtered else None

    payload = {
        "status": "ok",
        "history_scope": args.history_scope,
        "query": args.query,
        "component_type": args.component_type,
        "profile": args.profile,
        "mode": args.mode,
        "matches": [
            {
                "id": match.get("id", ""),
                "score": float(match.get("score", 0.0)),
                "source_scope": match.get("source_scope", ""),
                "reason": match.get("reason", []),
                "reuse_mode": match.get("reuse_mode", "do_not_reuse"),
                "project_profile": match.get("project_profile", "general"),
                "design_mode": match.get("design_mode", "standard"),
                "component_type": match.get("component_type", "other"),
                "variant_ref_url": match.get("variant_ref_url", ""),
            }
            for match in filtered
        ],
        "best_match": {
            "id": best.get("id", ""),
            "score": float(best.get("score", 0.0)),
            "source_scope": best.get("source_scope", ""),
            "reason": best.get("reason", []),
            "reuse_mode": best.get("reuse_mode", "do_not_reuse"),
        }
        if best
        else None,
    }

    emit(payload, args.json)
    return 0


if __name__ == "__main__":
    raise SystemExit(main())

