#!/usr/bin/env python3
from __future__ import annotations

import argparse
import json
import shutil
import sys
from copy import deepcopy
from pathlib import Path
from typing import Any

from design_memory_utils import (
    COMPONENT_CHOICES,
    MODE_CHOICES,
    PROFILE_CHOICES,
    build_entry,
    derive_brand_tokens,
    ensure_history_store,
    find_duplicate,
    global_history_path,
    global_variants_dir,
    local_history_path,
    local_variants_dir,
    make_entry_id,
    normalize_query,
    parse_bool,
    parse_csv,
    resolve_global_root,
    save_history,
)


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description="Add an existing 21st generation entry to local/global design memory.")
    parser.add_argument("--root", required=True, help="Project root.")
    parser.add_argument("--provider", default="21st", choices=["21st"], help="Provider name.")
    parser.add_argument("--id", default="", help="Optional explicit entry id.")
    parser.add_argument("--query", required=True, help="Prompt or intent text.")
    parser.add_argument("--component-type", default="other", choices=sorted(COMPONENT_CHOICES))
    parser.add_argument("--tags", default="", help="Comma-separated tags.")
    parser.add_argument("--variant-ref-url", default="", help="Reference URL for the variant.")
    parser.add_argument("--component-file", default="", help="Optional local component/snippet file to copy.")
    parser.add_argument("--preview-file", default="", help="Optional preview image file to copy.")
    parser.add_argument("--scope", default="both", choices=["local", "global", "both"])
    parser.add_argument("--shareable", default="true", choices=["true", "false"])
    parser.add_argument("--profile", default="general", choices=sorted(PROFILE_CHOICES))
    parser.add_argument("--mode", default="premium-web", choices=sorted(MODE_CHOICES))
    parser.add_argument("--source", default="manual-import", choices=["manual-import", "magic-console", "builder"])
    parser.add_argument("--namespace", default="default")
    parser.add_argument("--brand-tokens", default="", help="Comma-separated brand tokens.")
    parser.add_argument("--notes", default="")
    parser.add_argument(
        "--global-history-root",
        default=r"C:\Users\Thomas\.codex\memory",
        help="Global history root directory.",
    )
    parser.add_argument("--json", action="store_true")
    return parser.parse_args()


def copy_optional_asset(source_path: Path, destination_dir: Path, target_filename: str) -> str:
    destination_dir.mkdir(parents=True, exist_ok=True)
    destination = destination_dir / target_filename
    shutil.copyfile(source_path, destination)
    return destination.name


def build_asset_paths(
    *,
    entry_id: str,
    component_file: str,
    preview_file: str,
    destination_root: Path,
) -> tuple[str, str]:
    component_output = ""
    preview_output = ""
    variant_dir = destination_root / entry_id

    if component_file:
        source = Path(component_file).expanduser().resolve()
        if not source.exists() or not source.is_file():
            raise FileNotFoundError(f"Component file not found: {source}")
        filename = "component" + source.suffix.lower()
        component_output = copy_optional_asset(source, variant_dir, filename)

    if preview_file:
        source = Path(preview_file).expanduser().resolve()
        if not source.exists() or not source.is_file():
            raise FileNotFoundError(f"Preview file not found: {source}")
        filename = "preview" + source.suffix.lower()
        preview_output = copy_optional_asset(source, variant_dir, filename)

    return component_output, preview_output


def attach_asset_paths(entry: dict[str, Any], variants_root: Path, entry_id: str, component_name: str, preview_name: str) -> dict[str, Any]:
    enriched = deepcopy(entry)
    if component_name:
        relative_component = (variants_root / entry_id / component_name).as_posix()
        enriched["local_component_path"] = relative_component
    if preview_name:
        relative_preview = (variants_root / entry_id / preview_name).as_posix()
        enriched["local_preview_path"] = relative_preview
    return enriched


def emit(payload: dict[str, Any], as_json: bool) -> None:
    if as_json:
        print(json.dumps(payload, ensure_ascii=True))
        return
    print(f"status={payload.get('status', 'ok')}")
    print(f"entry_id={payload.get('entry_id', '')}")
    print(f"scope={payload.get('scope', '')}")
    print(f"local={payload.get('local', {}).get('status', 'n/a')}")
    print(f"global={payload.get('global', {}).get('status', 'n/a')}")
    if payload.get("error"):
        print(f"error={payload['error']}")


def main() -> int:
    args = parse_args()
    root = Path(args.root).expanduser().resolve()
    global_root = resolve_global_root(args.global_history_root)

    result: dict[str, Any] = {
        "status": "ok",
        "scope": args.scope,
        "entry_id": "",
        "local": {"status": "skipped"},
        "global": {"status": "skipped"},
        "error": None,
    }

    if not root.exists() or not root.is_dir():
        result["status"] = "failed"
        result["error"] = f"Project root does not exist: {root}"
        emit(result, args.json)
        return 1

    tags = parse_csv(args.tags)
    brand_tokens = parse_csv(args.brand_tokens) or derive_brand_tokens(args.query, tags)
    entry_id = args.id.strip() or make_entry_id(args.query, args.component_type)
    shareable = parse_bool(args.shareable, default=True)
    namespace = normalize_query(args.namespace) or "default"

    base_entry = build_entry(
        entry_id=entry_id,
        query=args.query,
        component_type=args.component_type,
        tags=tags,
        profile=args.profile,
        mode=args.mode,
        source=args.source,
        variant_ref_url=args.variant_ref_url,
        shareable=shareable,
        namespace=namespace,
        brand_tokens=brand_tokens,
        notes=args.notes,
        repo_root=root,
    )
    result["entry_id"] = entry_id

    try:
        do_local = args.scope in {"local", "both"}
        do_global = args.scope in {"global", "both"}

        if do_local:
            local_history = local_history_path(root)
            local_payload = ensure_history_store(local_history)
            existing_local = find_duplicate(local_payload["entries"], base_entry["dedupe_key"])
            if existing_local is not None:
                result["local"] = {"status": "duplicate", "existing_id": existing_local.get("id", "")}
            else:
                comp_name, prev_name = build_asset_paths(
                    entry_id=entry_id,
                    component_file=args.component_file,
                    preview_file=args.preview_file,
                    destination_root=local_variants_dir(root),
                )
                local_entry = attach_asset_paths(
                    base_entry,
                    Path(".codex/design-memory/21st/variants"),
                    entry_id,
                    comp_name,
                    prev_name,
                )
                local_payload["entries"].append(local_entry)
                save_history(local_history, local_payload)
                result["local"] = {"status": "imported", "history_path": str(local_history)}

        if do_global:
            global_history = global_history_path(global_root)
            global_payload = ensure_history_store(global_history)
            existing_global = find_duplicate(global_payload["entries"], base_entry["dedupe_key"])
            if existing_global is not None:
                result["global"] = {"status": "duplicate", "existing_id": existing_global.get("id", "")}
            else:
                comp_name, prev_name = build_asset_paths(
                    entry_id=entry_id,
                    component_file=args.component_file,
                    preview_file=args.preview_file,
                    destination_root=global_variants_dir(global_root),
                )
                global_entry = attach_asset_paths(
                    base_entry,
                    Path("21st/variants"),
                    entry_id,
                    comp_name,
                    prev_name,
                )
                global_payload["entries"].append(global_entry)
                save_history(global_history, global_payload)
                result["global"] = {"status": "imported", "history_path": str(global_history)}

        if result["local"]["status"] == "duplicate" and result["global"]["status"] == "duplicate":
            result["status"] = "duplicate"
    except Exception as exc:
        result["status"] = "failed"
        result["error"] = str(exc)
        emit(result, args.json)
        return 1

    emit(result, args.json)
    return 0


if __name__ == "__main__":
    raise SystemExit(main())

