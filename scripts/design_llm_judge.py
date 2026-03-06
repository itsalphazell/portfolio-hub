#!/usr/bin/env python3
from __future__ import annotations

import argparse
import json
import os
import urllib.error
import urllib.request
from datetime import datetime, timezone
from pathlib import Path
from typing import Any


DEFAULT_MODEL = os.environ.get("DESIGN_AUTOPILOT_JUDGE_MODEL", "gpt-5")


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description="Optional LLM visual judge for design audit findings.")
    parser.add_argument("--root", default=".", help="Project root.")
    parser.add_argument("--audit-file", default=None, help="Path to design audit JSON.")
    parser.add_argument("--model", default=DEFAULT_MODEL, help="Model name for the judge.")
    parser.add_argument("--min-score", type=float, default=7.5, help="Minimum score required to pass.")
    parser.add_argument("--output", default=None, help="Output JSON file path.")
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


def extract_response_text(payload: dict[str, Any]) -> str:
    if isinstance(payload.get("output_text"), str) and payload.get("output_text"):
        return str(payload["output_text"])
    output = payload.get("output", [])
    if isinstance(output, list):
        chunks: list[str] = []
        for item in output:
            if not isinstance(item, dict):
                continue
            content = item.get("content", [])
            if not isinstance(content, list):
                continue
            for piece in content:
                if not isinstance(piece, dict):
                    continue
                if piece.get("type") in {"output_text", "text"} and isinstance(piece.get("text"), str):
                    chunks.append(piece["text"])
        if chunks:
            return "\n".join(chunks)
    return ""


def call_openai(api_key: str, model: str, prompt: str) -> tuple[bool, str]:
    endpoint = os.environ.get("OPENAI_BASE_URL", "https://api.openai.com/v1")
    url = endpoint.rstrip("/") + "/responses"
    schema = {
        "type": "object",
        "additionalProperties": False,
        "properties": {
            "score": {"type": "number"},
            "verdict": {"type": "string", "enum": ["publish", "hold"]},
            "strengths": {"type": "array", "items": {"type": "string"}},
            "weaknesses": {"type": "array", "items": {"type": "string"}},
            "risk_flags": {"type": "array", "items": {"type": "string"}},
            "reason": {"type": "string"},
        },
        "required": ["score", "verdict", "strengths", "weaknesses", "risk_flags", "reason"],
    }
    request_payload = {
        "model": model,
        "input": [
            {
                "role": "system",
                "content": [
                    {
                        "type": "text",
                        "text": (
                            "You are a strict web design quality judge. Evaluate only based on provided audit data. "
                            "Return concise JSON and avoid speculation."
                        ),
                    }
                ],
            },
            {
                "role": "user",
                "content": [{"type": "text", "text": prompt}],
            },
        ],
        "text": {
            "format": {
                "type": "json_schema",
                "name": "design_visual_judge",
                "schema": schema,
                "strict": True,
            }
        },
    }
    body = json.dumps(request_payload).encode("utf-8")
    request = urllib.request.Request(
        url,
        data=body,
        method="POST",
        headers={
            "Authorization": f"Bearer {api_key}",
            "Content-Type": "application/json",
        },
    )

    try:
        with urllib.request.urlopen(request, timeout=60) as response:
            parsed = json.loads(response.read().decode("utf-8"))
    except urllib.error.HTTPError as exc:
        return False, f"HTTP {exc.code}: {exc.reason}"
    except Exception as exc:
        return False, str(exc)

    text = extract_response_text(parsed).strip()
    if not text:
        return False, "Model returned empty output."
    return True, text


def main() -> int:
    args = parse_args()
    root = Path(args.root).resolve()
    audit_file = (
        Path(args.audit_file).resolve()
        if args.audit_file
        else root / ".playwright-gate" / "design-audit.json"
    )
    output_path = (
        Path(args.output).resolve()
        if args.output
        else root / ".playwright-gate" / "design-llm-judge.json"
    )

    audit_payload = load_json(audit_file) if audit_file.exists() else {}

    api_key = os.environ.get("OPENAI_API_KEY", "").strip()
    if not api_key:
        payload = {
            "status": "not_configured",
            "timestamp": now_iso(),
            "score": 0.0,
            "verdict": "hold",
            "strengths": [],
            "weaknesses": [],
            "risk_flags": ["OPENAI_API_KEY missing"],
            "reason": "OPENAI_API_KEY is not configured.",
        }
        write_json(output_path, payload)
        if args.json:
            print(json.dumps(payload, ensure_ascii=True))
        else:
            print("status=not_configured")
            print("reason=OPENAI_API_KEY is not configured")
        return 0

    prompt = json.dumps(
        {
            "instruction": (
                "Evaluate the visual quality and release safety for this design audit. "
                "Use a strict standard for readability, hierarchy, CTA clarity, motion discipline, and consistency."
            ),
            "audit_summary": {
                "status": audit_payload.get("status"),
                "summary_counts": audit_payload.get("summary_counts"),
                "findings": audit_payload.get("findings", [])[:50],
                "sampled_pages": [
                    {
                        "page": item.get("page"),
                        "viewport": item.get("viewport"),
                        "status_code": item.get("status_code"),
                        "metrics": item.get("metrics"),
                    }
                    for item in (audit_payload.get("sampled_pages") or [])[:20]
                ],
            },
            "required_output": {
                "score_range": "0..10",
                "verdict": ["publish", "hold"],
                "must_be_grounded": True,
            },
        },
        ensure_ascii=True,
    )

    ok, response_text = call_openai(api_key=api_key, model=args.model, prompt=prompt)
    if not ok:
        payload = {
            "status": "error",
            "timestamp": now_iso(),
            "score": 0.0,
            "verdict": "hold",
            "strengths": [],
            "weaknesses": [],
            "risk_flags": [response_text],
            "reason": "LLM judge call failed.",
            "model": args.model,
        }
        write_json(output_path, payload)
        if args.json:
            print(json.dumps(payload, ensure_ascii=True))
        else:
            print("status=error")
            print(f"reason={response_text}")
        return 0

    try:
        model_json = json.loads(response_text)
    except Exception:
        payload = {
            "status": "invalid_output",
            "timestamp": now_iso(),
            "score": 0.0,
            "verdict": "hold",
            "strengths": [],
            "weaknesses": [],
            "risk_flags": ["Model response was not valid JSON."],
            "reason": response_text[:600],
            "model": args.model,
        }
        write_json(output_path, payload)
        if args.json:
            print(json.dumps(payload, ensure_ascii=True))
        else:
            print("status=invalid_output")
            print("reason=Model response was not valid JSON")
        return 0

    score = float(model_json.get("score", 0.0) or 0.0)
    verdict = str(model_json.get("verdict", "hold"))
    pass_judge = verdict == "publish" and score >= args.min_score

    payload = {
        "status": "pass" if pass_judge else "fail",
        "timestamp": now_iso(),
        "score": score,
        "verdict": verdict,
        "strengths": list(model_json.get("strengths", []) or []),
        "weaknesses": list(model_json.get("weaknesses", []) or []),
        "risk_flags": list(model_json.get("risk_flags", []) or []),
        "reason": str(model_json.get("reason", "")),
        "min_score": args.min_score,
        "model": args.model,
    }

    write_json(output_path, payload)
    if args.json:
        print(json.dumps(payload, ensure_ascii=True))
    else:
        print(f"status={payload['status']}")
        print(f"score={score}")
        print(f"verdict={verdict}")

    return 0


if __name__ == "__main__":
    raise SystemExit(main())
