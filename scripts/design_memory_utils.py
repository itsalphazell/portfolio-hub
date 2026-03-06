#!/usr/bin/env python3
from __future__ import annotations

import hashlib
import json
import re
from copy import deepcopy
from dataclasses import dataclass
from datetime import datetime, timezone
from difflib import SequenceMatcher
from pathlib import Path
from typing import Any

DEFAULT_GLOBAL_HISTORY_ROOT = Path(r"C:\Users\Thomas\.codex\memory")
LOCAL_HISTORY_RELATIVE_PATH = Path(".codex") / "design-memory" / "21st" / "history.json"
LOCAL_VARIANTS_RELATIVE_DIR = Path(".codex") / "design-memory" / "21st" / "variants"
GLOBAL_HISTORY_RELATIVE_PATH = Path("21st") / "global-history.json"
GLOBAL_VARIANTS_RELATIVE_DIR = Path("21st") / "variants"

DEFAULT_THRESHOLDS = {
    "reuse_required": 0.78,
    "reuse_preferred": 0.62,
}

PROFILE_CHOICES = {"general", "app-saas", "marketing-landing"}
MODE_CHOICES = {"standard", "premium-web"}
COMPONENT_CHOICES = {"hero", "navbar", "card", "pricing", "faq", "section", "page", "other"}

STOP_WORDS = {
    "the",
    "and",
    "for",
    "with",
    "from",
    "that",
    "this",
    "your",
    "our",
    "you",
    "all",
    "new",
    "best",
    "premium",
    "page",
    "section",
    "component",
    "landing",
    "design",
    "web",
    "studio",
    "mode",
    "reuse",
    "variant",
}


@dataclass
class MatchRequest:
    query: str
    tags: list[str]
    profile: str
    mode: str
    component_type: str
    namespace: str
    brand_tokens: list[str]


def now_iso() -> str:
    return datetime.now(timezone.utc).isoformat().replace("+00:00", "Z")


def clamp(value: float, lower: float = 0.0, upper: float = 1.0) -> float:
    return max(lower, min(upper, value))


def slugify(value: str) -> str:
    normalized = re.sub(r"[^a-zA-Z0-9]+", "-", value.strip().lower())
    normalized = re.sub(r"-{2,}", "-", normalized).strip("-")
    return normalized or "item"


def normalize_query(text: str) -> str:
    text = text.strip().lower()
    text = re.sub(r"\s+", " ", text)
    text = re.sub(r"[^a-z0-9\s\-_/.:]", " ", text)
    text = re.sub(r"\s+", " ", text).strip()
    return text


def tokenize(text: str) -> set[str]:
    if not text:
        return set()
    return {
        token
        for token in re.findall(r"[a-z0-9]+", normalize_query(text))
        if len(token) >= 2
    }


def parse_csv(value: str) -> list[str]:
    if not value:
        return []
    seen: set[str] = set()
    parsed: list[str] = []
    for token in value.split(","):
        item = normalize_query(token).strip()
        if not item or item in seen:
            continue
        seen.add(item)
        parsed.append(item)
    return parsed


def parse_bool(value: str, default: bool = True) -> bool:
    lowered = (value or "").strip().lower()
    if lowered in {"1", "true", "yes", "y", "on"}:
        return True
    if lowered in {"0", "false", "no", "n", "off"}:
        return False
    return default


def read_json(path: Path, default: dict[str, Any] | None = None) -> dict[str, Any]:
    if default is None:
        default = {}
    try:
        return json.loads(path.read_text(encoding="utf-8"))
    except Exception:
        return deepcopy(default)


def write_json_atomic(path: Path, payload: dict[str, Any]) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    temp_path = path.with_name(path.name + ".tmp")
    temp_path.write_text(json.dumps(payload, indent=2, ensure_ascii=True), encoding="utf-8")
    temp_path.replace(path)


def ensure_history_file(path: Path) -> dict[str, Any]:
    if path.exists():
        payload = read_json(path, default={})
        if not isinstance(payload, dict):
            payload = {}
        if not isinstance(payload.get("entries"), list):
            payload["entries"] = []
        payload.setdefault("version", 1)
        payload.setdefault("provider", "21st")
        return payload
    payload = {
        "version": 1,
        "provider": "21st",
        "updated_at": now_iso(),
        "entries": [],
    }
    write_json_atomic(path, payload)
    return payload


def ensure_history_store(path: Path) -> dict[str, Any]:
    payload = ensure_history_file(path)
    if not payload.get("updated_at"):
        payload["updated_at"] = now_iso()
    if "entries" not in payload or not isinstance(payload["entries"], list):
        payload["entries"] = []
    return payload


def local_history_path(root: Path) -> Path:
    return root / LOCAL_HISTORY_RELATIVE_PATH


def global_history_path(global_root: Path) -> Path:
    return global_root / GLOBAL_HISTORY_RELATIVE_PATH


def local_variants_dir(root: Path) -> Path:
    return root / LOCAL_VARIANTS_RELATIVE_DIR


def global_variants_dir(global_root: Path) -> Path:
    return global_root / GLOBAL_VARIANTS_RELATIVE_DIR


def dedupe_key(normalized_query: str, component_type: str, variant_ref_url: str) -> str:
    raw = f"{normalized_query}|{normalize_query(component_type)}|{normalize_query(variant_ref_url)}"
    return hashlib.sha256(raw.encode("utf-8")).hexdigest()


def derive_brand_tokens(query: str, tags: list[str]) -> list[str]:
    tokens: list[str] = []
    seen: set[str] = set()
    for source in [query, " ".join(tags)]:
        for token in tokenize(source):
            if token in STOP_WORDS or len(token) < 4:
                continue
            if token in seen:
                continue
            seen.add(token)
            tokens.append(token)
            if len(tokens) >= 4:
                return tokens
    return tokens


def make_entry_id(query: str, component_type: str) -> str:
    stamp = datetime.now(timezone.utc).strftime("%Y%m%d-%H%M%S")
    query_slug = slugify(query)[:48]
    return f"{stamp}-{component_type}-{query_slug}"


def build_entry(
    *,
    entry_id: str,
    query: str,
    component_type: str,
    tags: list[str],
    profile: str,
    mode: str,
    source: str,
    variant_ref_url: str,
    shareable: bool,
    namespace: str,
    brand_tokens: list[str],
    notes: str,
    component_path: str = "",
    preview_path: str = "",
    repo_root: Path | None = None,
) -> dict[str, Any]:
    normalized = normalize_query(query)
    entry = {
        "id": entry_id,
        "provider": "21st",
        "created_at": now_iso(),
        "source": source,
        "project_profile": profile if profile in PROFILE_CHOICES else "general",
        "design_mode": mode if mode in MODE_CHOICES else "standard",
        "query": query.strip(),
        "normalized_query": normalized,
        "component_type": component_type if component_type in COMPONENT_CHOICES else "other",
        "tags": tags,
        "variant_ref_url": variant_ref_url.strip(),
        "local_component_path": component_path,
        "local_preview_path": preview_path,
        "shareable": bool(shareable),
        "namespace": normalize_query(namespace) or "default",
        "brand_tokens": brand_tokens,
        "notes": notes.strip(),
        "dedupe_key": dedupe_key(normalized, component_type, variant_ref_url),
    }
    if repo_root is not None:
        entry["source_repo_root"] = str(repo_root)
    return entry


def find_duplicate(entries: list[dict[str, Any]], dedupe_value: str) -> dict[str, Any] | None:
    for entry in entries:
        if str(entry.get("dedupe_key", "")) == dedupe_value:
            return entry
    return None


def save_history(path: Path, payload: dict[str, Any]) -> None:
    payload["updated_at"] = now_iso()
    write_json_atomic(path, payload)


def text_similarity(left: str, right: str) -> float:
    left_norm = normalize_query(left)
    right_norm = normalize_query(right)
    if not left_norm or not right_norm:
        return 0.0
    sequence = SequenceMatcher(a=left_norm, b=right_norm).ratio()
    left_tokens = tokenize(left_norm)
    right_tokens = tokenize(right_norm)
    union = left_tokens | right_tokens
    jaccard = (len(left_tokens & right_tokens) / len(union)) if union else 0.0
    return clamp((0.65 * sequence) + (0.35 * jaccard))


def overlap_score(left: set[str], right: set[str]) -> float:
    union = left | right
    if not union:
        return 0.0
    return clamp(len(left & right) / len(union))


def profile_mode_match_score(req_profile: str, req_mode: str, entry_profile: str, entry_mode: str) -> float:
    profile_score = 0.0
    mode_score = 0.0
    if req_profile == entry_profile:
        profile_score = 1.0
    elif "general" in {req_profile, entry_profile}:
        profile_score = 0.55
    if req_mode == entry_mode:
        mode_score = 1.0
    elif "standard" in {req_mode, entry_mode}:
        mode_score = 0.45
    return clamp((0.6 * profile_score) + (0.4 * mode_score))


def component_type_match_score(request_component: str, entry_component: str) -> float:
    if request_component == entry_component:
        return 1.0
    if "other" in {request_component, entry_component}:
        return 0.45
    if {request_component, entry_component} <= {"hero", "section"}:
        return 0.7
    return 0.0


def has_brand_conflict(request_brand_tokens: set[str], entry_brand_tokens: set[str], source_scope: str) -> bool:
    if source_scope != "global":
        return False
    if not request_brand_tokens or not entry_brand_tokens:
        return False
    return len(request_brand_tokens & entry_brand_tokens) == 0


def parse_timestamp(value: str) -> float:
    try:
        return datetime.fromisoformat(value.replace("Z", "+00:00")).timestamp()
    except Exception:
        return 0.0


def score_entry(entry: dict[str, Any], request: MatchRequest, source_scope: str) -> dict[str, Any]:
    query_text = str(entry.get("query") or entry.get("normalized_query") or "")
    entry_tags = {normalize_query(tag) for tag in entry.get("tags", []) if str(tag).strip()}
    request_tags = set(request.tags) if request.tags else tokenize(request.query)
    text = text_similarity(request.query, query_text)
    tag = overlap_score(request_tags, entry_tags)
    profile_mode = profile_mode_match_score(
        request.profile,
        request.mode,
        str(entry.get("project_profile", "general")),
        str(entry.get("design_mode", "standard")),
    )
    component = component_type_match_score(
        request.component_type,
        str(entry.get("component_type", "other")),
    )

    request_brand = set(request.brand_tokens)
    entry_brand = {
        normalize_query(token)
        for token in entry.get("brand_tokens", [])
        if str(token).strip()
    }
    brand_conflict = has_brand_conflict(request_brand, entry_brand, source_scope)
    penalty = 0.20 if brand_conflict else 0.0

    score = clamp((0.45 * text) + (0.25 * tag) + (0.15 * profile_mode) + (0.15 * component) - penalty)

    reasons: list[str] = []
    if text >= 0.35:
        reasons.append("text_similarity")
    if tag >= 0.25:
        reasons.append("tag_overlap")
    if profile_mode >= 0.5:
        reasons.append("profile_mode_match")
    if component >= 0.6:
        reasons.append("component_type_match")
    if brand_conflict:
        reasons.append("brand_conflict_penalty")

    shareable = parse_bool(str(entry.get("shareable", "true")), default=True)
    if source_scope == "global" and not shareable:
        score = 0.0
        reasons.append("not_shareable")

    reuse_mode = "copy_adapt"
    if brand_conflict:
        reuse_mode = "inspiration_only"
    if score < DEFAULT_THRESHOLDS["reuse_preferred"]:
        reuse_mode = "do_not_reuse"

    enriched = {
        **entry,
        "score": round(score, 4),
        "source_scope": source_scope,
        "reason": reasons,
        "reuse_mode": reuse_mode,
        "score_breakdown": {
            "text_similarity": round(text, 4),
            "tag_overlap": round(tag, 4),
            "profile_mode_match": round(profile_mode, 4),
            "component_type_match": round(component, 4),
            "brand_penalty": penalty,
        },
    }
    return enriched


def parse_request(
    *,
    query: str,
    tags: list[str],
    profile: str,
    mode: str,
    component_type: str,
    namespace: str,
    brand_tokens: list[str],
) -> MatchRequest:
    clean_tags = [normalize_query(tag) for tag in tags if normalize_query(tag)]
    clean_profile = profile if profile in PROFILE_CHOICES else "general"
    clean_mode = mode if mode in MODE_CHOICES else "standard"
    clean_component = component_type if component_type in COMPONENT_CHOICES else "other"
    clean_namespace = normalize_query(namespace) or "default"
    inferred_brand_tokens = (
        [normalize_query(token) for token in brand_tokens if normalize_query(token)]
        if brand_tokens
        else derive_brand_tokens(query, clean_tags)
    )
    return MatchRequest(
        query=query.strip(),
        tags=clean_tags,
        profile=clean_profile,
        mode=clean_mode,
        component_type=clean_component,
        namespace=clean_namespace,
        brand_tokens=inferred_brand_tokens,
    )


def load_entries(path: Path) -> list[dict[str, Any]]:
    payload = ensure_history_store(path)
    entries = payload.get("entries", [])
    if not isinstance(entries, list):
        return []
    clean_entries: list[dict[str, Any]] = []
    for item in entries:
        if isinstance(item, dict):
            clean_entries.append(item)
    return clean_entries


def search_candidates(
    *,
    root: Path,
    global_root: Path,
    history_scope: str,
    request: MatchRequest,
    top_k: int = 5,
) -> list[dict[str, Any]]:
    matches: list[dict[str, Any]] = []
    scope = history_scope
    if scope not in {"local", "hybrid", "global"}:
        scope = "hybrid"

    if scope in {"local", "hybrid"}:
        local_entries = load_entries(local_history_path(root))
        for entry in local_entries:
            matches.append(score_entry(entry, request, "local"))

    if scope in {"global", "hybrid"}:
        global_entries = load_entries(global_history_path(global_root))
        for entry in global_entries:
            entry_namespace = normalize_query(str(entry.get("namespace", "default"))) or "default"
            if request.namespace != "default" and entry_namespace not in {"default", request.namespace}:
                continue
            matches.append(score_entry(entry, request, "global"))

    sorted_matches = sorted(
        matches,
        key=lambda item: (float(item.get("score", 0.0)), parse_timestamp(str(item.get("created_at", "")))),
        reverse=True,
    )
    filtered = [item for item in sorted_matches if float(item.get("score", 0.0)) > 0.0]
    return filtered[: max(1, top_k)]


def resolve_global_root(path_text: str) -> Path:
    if path_text.strip():
        return Path(path_text).expanduser().resolve()
    return DEFAULT_GLOBAL_HISTORY_ROOT.resolve()
