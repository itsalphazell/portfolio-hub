#!/usr/bin/env python3
from __future__ import annotations

import argparse
import json
import os
import re
import subprocess
import sys
import time
import urllib.error
import urllib.parse
import urllib.request
from datetime import datetime, timezone
from pathlib import Path
from typing import Any

DEFAULT_CONFIG = {
    "version": 1,
    "page_scope": "key",
    "key_pages": ["/", "/pricing", "/features", "/contact", "/login"],
    "viewports": ["desktop", "mobile"],
    "smoke_command": "auto",
    "full_command": "auto",
    "autofix_command": "auto",
    "max_gate_autofix_iterations": 2,
    "max_autopilot_iterations": 3,
    "stop_on_no_diff": True,
    "llm_visual_judge": "auto",
    "llm_visual_min_score": 7.5,
    "branch_strategy": "branch-pr",
    "target_branch": "main",
    "artifacts_dir": ".playwright-gate",
}

VIEWPORTS = {
    "desktop": {"width": 1440, "height": 900},
    "mobile": {"width": 390, "height": 844},
    "tablet": {"width": 768, "height": 1024},
}

COMMON_PAGES = ["/", "/pricing", "/features", "/about", "/contact", "/login", "/signup"]

JS_AUDIT_SNIPPET = r"""
() => {
  const isVisible = (el) => {
    if (!el) return false;
    const style = window.getComputedStyle(el);
    if (style.display === 'none' || style.visibility === 'hidden' || parseFloat(style.opacity || '1') === 0) return false;
    const rect = el.getBoundingClientRect();
    return rect.width > 0 && rect.height > 0;
  };

  const parseColor = (value) => {
    if (!value) return null;
    const m = value.replace(/\s+/g, '').match(/rgba?\((\d+),(\d+),(\d+)(?:,(\d*\.?\d+))?\)/i);
    if (!m) return null;
    return {
      r: Math.max(0, Math.min(255, parseInt(m[1], 10))),
      g: Math.max(0, Math.min(255, parseInt(m[2], 10))),
      b: Math.max(0, Math.min(255, parseInt(m[3], 10))),
      a: m[4] !== undefined ? Math.max(0, Math.min(1, parseFloat(m[4]))) : 1,
    };
  };

  const luminance = (c) => {
    const normalize = (v) => {
      const n = v / 255;
      return n <= 0.03928 ? n / 12.92 : Math.pow((n + 0.055) / 1.055, 2.4);
    };
    return 0.2126 * normalize(c.r) + 0.7152 * normalize(c.g) + 0.0722 * normalize(c.b);
  };

  const contrastRatio = (fg, bg) => {
    if (!fg || !bg) return null;
    const l1 = luminance(fg);
    const l2 = luminance(bg);
    const lighter = Math.max(l1, l2);
    const darker = Math.min(l1, l2);
    return (lighter + 0.05) / (darker + 0.05);
  };

  const findBackground = (el) => {
    let node = el;
    while (node) {
      const color = parseColor(window.getComputedStyle(node).backgroundColor);
      if (color && color.a > 0) return color;
      node = node.parentElement;
    }
    return { r: 255, g: 255, b: 255, a: 1 };
  };

  const overflowHorizontal = document.documentElement.scrollWidth > (window.innerWidth + 2);

  const headings = Array.from(document.querySelectorAll('h1,h2,h3,h4,h5,h6')).filter(isVisible).slice(0, 60);
  const headingData = headings.map((el) => {
    const style = window.getComputedStyle(el);
    const size = parseFloat(style.fontSize || '0');
    return {
      tag: el.tagName.toLowerCase(),
      size,
      truncated: el.scrollWidth > el.clientWidth + 1,
      text: (el.textContent || '').trim().slice(0, 120),
    };
  });
  const truncatedHeadings = headingData.filter((h) => h.truncated).length;

  const levelMap = { h1: 1, h2: 2, h3: 3, h4: 4, h5: 5, h6: 6 };
  const largestByLevel = {};
  for (const h of headingData) {
    const level = levelMap[h.tag];
    if (!largestByLevel[level] || h.size > largestByLevel[level]) {
      largestByLevel[level] = h.size;
    }
  }
  let headingHierarchyIssue = false;
  for (let level = 2; level <= 6; level += 1) {
    const prev = largestByLevel[level - 1];
    const cur = largestByLevel[level];
    if (prev && cur && cur > prev + 0.5) {
      headingHierarchyIssue = true;
      break;
    }
  }

  const candidates = Array.from(document.querySelectorAll('h1,h2,h3,p,button,a,img,input,textarea,select,[role="button"]'))
    .filter(isVisible)
    .slice(0, 120);
  let overlapCount = 0;
  for (let i = 0; i < candidates.length; i += 1) {
    const a = candidates[i];
    const ra = a.getBoundingClientRect();
    for (let j = i + 1; j < candidates.length; j += 1) {
      const b = candidates[j];
      if (a.contains(b) || b.contains(a)) continue;
      const rb = b.getBoundingClientRect();
      const overlapX = Math.max(0, Math.min(ra.right, rb.right) - Math.max(ra.left, rb.left));
      const overlapY = Math.max(0, Math.min(ra.bottom, rb.bottom) - Math.max(ra.top, rb.top));
      const area = overlapX * overlapY;
      if (area > 24) {
        overlapCount += 1;
        if (overlapCount >= 8) break;
      }
    }
    if (overlapCount >= 8) break;
  }

  const textCandidates = Array.from(document.querySelectorAll('p,li,a,button,h1,h2,h3,h4,span,strong,label')).filter(isVisible).slice(0, 160);
  let lowContrastCount = 0;
  for (const el of textCandidates) {
    const style = window.getComputedStyle(el);
    const fg = parseColor(style.color);
    const bg = findBackground(el);
    const ratio = contrastRatio(fg, bg);
    if (ratio === null) continue;
    const size = parseFloat(style.fontSize || '16');
    const weight = parseInt(style.fontWeight || '400', 10);
    const isLarge = size >= 24 || (size >= 18.66 && weight >= 700);
    const threshold = isLarge ? 3.0 : 4.5;
    if (ratio < threshold) {
      lowContrastCount += 1;
      if (lowContrastCount >= 12) break;
    }
  }

  const interactive = Array.from(document.querySelectorAll('a[href],button,input,textarea,select,[tabindex]:not([tabindex="-1"])'))
    .filter(isVisible)
    .slice(0, 24);
  let focusInvisibleCount = 0;
  for (const el of interactive) {
    const before = window.getComputedStyle(el);
    const beforeOutline = `${before.outlineStyle}|${before.outlineWidth}|${before.outlineColor}|${before.boxShadow}|${before.borderColor}`;
    if (typeof el.focus === 'function') el.focus();
    const after = window.getComputedStyle(el);
    const afterOutline = `${after.outlineStyle}|${after.outlineWidth}|${after.outlineColor}|${after.boxShadow}|${after.borderColor}`;
    const hasOutline = after.outlineStyle !== 'none' && parseFloat(after.outlineWidth || '0') > 0;
    const hasShadow = after.boxShadow && after.boxShadow !== 'none';
    const changed = beforeOutline !== afterOutline;
    if (!hasOutline && !hasShadow && !changed) {
      focusInvisibleCount += 1;
    }
  }

  const ctaRegex = /(start|get|book|contact|demo|buy|pricing|quote|trial|reserve|subscribe)/i;
  const ctaCandidates = Array.from(document.querySelectorAll('a,button')).filter(isVisible);
  let ctaVisible = false;
  for (const el of ctaCandidates) {
    const text = (el.textContent || '').trim();
    if (!ctaRegex.test(text)) continue;
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight * 0.95 && rect.bottom > 0) {
      ctaVisible = true;
      break;
    }
  }

  const motionCandidates = Array.from(document.querySelectorAll('*')).filter(isVisible).slice(0, 200);
  let aggressiveMotionCount = 0;
  for (const el of motionCandidates) {
    const style = window.getComputedStyle(el);
    const transitionRaw = (style.transitionDuration || '0s').split(',').map((v) => v.trim());
    const animationRaw = (style.animationDuration || '0s').split(',').map((v) => v.trim());
    const toSeconds = (value) => {
      if (!value) return 0;
      if (value.endsWith('ms')) return parseFloat(value) / 1000;
      if (value.endsWith('s')) return parseFloat(value);
      const parsed = parseFloat(value);
      return Number.isFinite(parsed) ? parsed : 0;
    };
    const maxTransition = Math.max(0, ...transitionRaw.map(toSeconds));
    const maxAnimation = Math.max(0, ...animationRaw.map(toSeconds));
    if (maxTransition > 0.8 || maxAnimation > 0.8) {
      aggressiveMotionCount += 1;
      if (aggressiveMotionCount >= 20) break;
    }
  }

  const reducedMotionRulePresent = (() => {
    for (const styleTag of Array.from(document.querySelectorAll('style'))) {
      const txt = styleTag.textContent || '';
      if (txt.includes('prefers-reduced-motion')) return true;
    }
    try {
      for (const sheet of Array.from(document.styleSheets)) {
        if (!sheet || !sheet.cssRules) continue;
        for (const rule of Array.from(sheet.cssRules)) {
          if (rule && rule.media && String(rule.media.mediaText || '').includes('prefers-reduced-motion')) {
            return true;
          }
        }
      }
    } catch (_err) {
      // Ignore cross-origin stylesheet access issues.
    }
    return false;
  })();

  return {
    overflow_horizontal: overflowHorizontal,
    overlap_count: overlapCount,
    truncated_headings: truncatedHeadings,
    heading_hierarchy_issue: headingHierarchyIssue,
    low_contrast_count: lowContrastCount,
    focus_invisible_count: focusInvisibleCount,
    cta_visible: ctaVisible,
    aggressive_motion_count: aggressiveMotionCount,
    reduced_motion_rule_present: reducedMotionRulePresent,
    heading_samples: headingData.slice(0, 12),
  };
}
"""


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description="Run deterministic Playwright visual audits.")
    parser.add_argument("--root", default=".", help="Project root.")
    parser.add_argument("--base-url", default=None, help="URL to audit. Defaults to http://127.0.0.1:4173.")
    parser.add_argument("--page-scope", choices=["home", "key", "wide"], default=None)
    parser.add_argument("--pages", default=None, help="Comma-separated list of routes to audit.")
    parser.add_argument("--viewports", default=None, help="Comma-separated viewports: desktop,mobile,tablet")
    parser.add_argument("--start-server", choices=["auto", "always", "never"], default="auto")
    parser.add_argument("--server-command", default=None, help="Override server start command.")
    parser.add_argument("--server-timeout", type=int, default=120)
    parser.add_argument("--timeout", type=int, default=30, help="Per-page timeout in seconds.")
    parser.add_argument("--output", default=None, help="Output JSON file path.")
    parser.add_argument("--screenshots-dir", default=None, help="Screenshot output directory.")
    parser.add_argument("--json", action="store_true", help="Print JSON payload to stdout.")
    return parser.parse_args()


def now_iso() -> str:
    return datetime.now(timezone.utc).isoformat().replace("+00:00", "Z")


def load_json(path: Path) -> dict[str, Any]:
    try:
        return json.loads(path.read_text(encoding="utf-8"))
    except Exception:
        return {}


def load_config(root: Path) -> dict[str, Any]:
    config_path = root / ".codex" / "design-autopilot" / "config.json"
    config = dict(DEFAULT_CONFIG)
    if config_path.exists():
        config.update(load_json(config_path))
    return config


def ensure_dir(path: Path) -> None:
    path.mkdir(parents=True, exist_ok=True)


def normalize_route(route: str) -> str:
    route = route.strip()
    if not route:
        return "/"
    if route.startswith("http://") or route.startswith("https://"):
        parsed = urllib.parse.urlparse(route)
        route = parsed.path or "/"
    if not route.startswith("/"):
        route = "/" + route
    return route


def resolve_pages(scope: str, config_pages: list[str], override_pages: str | None) -> list[str]:
    if override_pages:
        items = [normalize_route(item) for item in override_pages.split(",") if item.strip()]
        return sorted(set(items), key=items.index)

    if scope == "home":
        return ["/"]
    pages = [normalize_route(p) for p in config_pages if p]
    if scope == "wide":
        pages.extend(COMMON_PAGES)
    unique: list[str] = []
    seen: set[str] = set()
    for page in pages:
        if page not in seen:
            seen.add(page)
            unique.append(page)
    return unique


def resolve_viewports(raw: str | None, config_viewports: list[str]) -> list[str]:
    source = raw.split(",") if raw else config_viewports
    resolved: list[str] = []
    for item in source:
        name = item.strip().lower()
        if name in VIEWPORTS and name not in resolved:
            resolved.append(name)
    return resolved or ["desktop", "mobile"]


def url_reachable(url: str, timeout: int = 2) -> bool:
    try:
        request = urllib.request.Request(url, method="GET")
        with urllib.request.urlopen(request, timeout=timeout):
            return True
    except Exception:
        return False


def detect_package_manager(root: Path) -> str:
    if (root / "pnpm-lock.yaml").exists():
        return "pnpm"
    if (root / "yarn.lock").exists():
        return "yarn"
    return "npm"


def load_package_scripts(root: Path) -> dict[str, Any]:
    package_json = root / "package.json"
    if not package_json.exists():
        return {}
    data = load_json(package_json)
    scripts = data.get("scripts", {})
    return scripts if isinstance(scripts, dict) else {}


def infer_server_command(root: Path, port: int) -> str | None:
    scripts = load_package_scripts(root)
    if not scripts:
        return None
    package_manager = detect_package_manager(root)

    if package_manager == "yarn":
        if "dev" in scripts:
            return f"yarn dev --port {port}"
        if "start" in scripts:
            return f"yarn start --port {port}"
        return None

    if "dev" in scripts:
        return f"{package_manager} run dev -- --port {port}"
    if "start" in scripts:
        return f"{package_manager} run start -- --port {port}"
    return None


def start_server(
    root: Path,
    base_url: str,
    mode: str,
    timeout_seconds: int,
    override_command: str | None,
) -> tuple[subprocess.Popen[str] | None, str | None]:
    parsed = urllib.parse.urlparse(base_url)
    port = parsed.port or (443 if parsed.scheme == "https" else 80)

    if mode == "never":
        return None, None

    if mode == "auto" and url_reachable(base_url):
        return None, None

    command = override_command or infer_server_command(root, port)
    if not command:
        return None, "No server command available. Use --server-command or start the app manually."

    process = subprocess.Popen(
        command,
        cwd=str(root),
        shell=True,
        stdout=subprocess.DEVNULL,
        stderr=subprocess.DEVNULL,
        text=True,
    )

    start_time = time.time()
    while time.time() - start_time < timeout_seconds:
        if url_reachable(base_url):
            return process, None
        if process.poll() is not None:
            return None, f"Server command exited early with code {process.returncode}."
        time.sleep(1)

    process.terminate()
    return None, f"Server did not become reachable within {timeout_seconds}s."


def stop_server(process: subprocess.Popen[str] | None) -> None:
    if process is None:
        return
    try:
        process.terminate()
        process.wait(timeout=8)
    except Exception:
        try:
            process.kill()
        except Exception:
            pass


def build_finding(
    finding_id: str,
    status: str,
    message: str,
    page: str | None = None,
    viewport: str | None = None,
    details: dict[str, Any] | None = None,
) -> dict[str, Any]:
    payload = {
        "id": finding_id,
        "status": status,
        "message": message,
    }
    if page is not None:
        payload["page"] = page
    if viewport is not None:
        payload["viewport"] = viewport
    if details:
        payload["details"] = details
    return payload


def summarize(findings: list[dict[str, Any]]) -> dict[str, int]:
    counts = {"pass": 0, "warn": 0, "info": 0, "error": 0}
    for finding in findings:
        status = finding.get("status", "info")
        if status not in counts:
            status = "info"
        counts[status] += 1
    if not findings:
        counts["info"] += 1
    return counts


def audit_with_playwright(
    base_url: str,
    pages: list[str],
    viewports: list[str],
    timeout_seconds: int,
    screenshots_dir: Path,
) -> tuple[str, list[dict[str, Any]], list[dict[str, Any]], dict[str, Any]]:
    try:
        from playwright.sync_api import TimeoutError as PlaywrightTimeoutError
        from playwright.sync_api import sync_playwright
    except Exception:
        findings = [
            build_finding(
                "browser-rendering-not-available",
                "info",
                "Playwright is not installed or browsers are unavailable.",
            )
        ]
        return "dependency_missing", findings, [], {"playwright": "missing"}

    page_results: list[dict[str, Any]] = []
    findings: list[dict[str, Any]] = []
    dependencies = {"playwright": "ok"}

    with sync_playwright() as playwright:
        browser = playwright.chromium.launch(headless=True)
        for viewport in viewports:
            dimensions = VIEWPORTS[viewport]
            context = browser.new_context(viewport=dimensions)
            page = context.new_page()
            console_errors: list[str] = []
            page_errors: list[str] = []

            page.on(
                "console",
                lambda message: console_errors.append(message.text)
                if message.type == "error"
                else None,
            )
            page.on("pageerror", lambda exc: page_errors.append(str(exc)))

            for route in pages:
                url = urllib.parse.urljoin(base_url.rstrip("/") + "/", route.lstrip("/"))
                status_code = None
                screenshot_name = f"{viewport}-{route.strip('/').replace('/', '_') or 'home'}.png"
                screenshot_path = screenshots_dir / screenshot_name
                metrics: dict[str, Any] = {}
                nav_error = None

                try:
                    response = page.goto(url, wait_until="networkidle", timeout=timeout_seconds * 1000)
                    status_code = response.status if response else None
                    metrics = page.evaluate(JS_AUDIT_SNIPPET)
                    page.screenshot(path=str(screenshot_path), full_page=True)
                except PlaywrightTimeoutError:
                    nav_error = f"Timed out after {timeout_seconds}s while loading page."
                except Exception as exc:
                    nav_error = f"Navigation or audit failed: {exc}"

                page_result = {
                    "page": route,
                    "url": url,
                    "viewport": viewport,
                    "status_code": status_code,
                    "screenshot": str(screenshot_path),
                    "metrics": metrics,
                }
                if nav_error:
                    page_result["navigation_error"] = nav_error
                page_results.append(page_result)

                if nav_error:
                    findings.append(
                        build_finding(
                            "page-load-failed",
                            "warn",
                            nav_error,
                            page=route,
                            viewport=viewport,
                        )
                    )
                    continue

                if status_code and status_code >= 400:
                    findings.append(
                        build_finding(
                            "page-http-error",
                            "warn",
                            f"Page returned HTTP {status_code}.",
                            page=route,
                            viewport=viewport,
                        )
                    )

                if metrics.get("overflow_horizontal"):
                    findings.append(
                        build_finding(
                            "overflow-horizontal",
                            "warn",
                            "Horizontal overflow detected.",
                            page=route,
                            viewport=viewport,
                        )
                    )

                overlap_count = int(metrics.get("overlap_count") or 0)
                if overlap_count > 0:
                    findings.append(
                        build_finding(
                            "overlap-detected",
                            "warn",
                            f"Detected {overlap_count} likely visual overlap issues.",
                            page=route,
                            viewport=viewport,
                            details={"overlap_count": overlap_count},
                        )
                    )

                truncated_headings = int(metrics.get("truncated_headings") or 0)
                if truncated_headings > 0:
                    findings.append(
                        build_finding(
                            "truncated-headings",
                            "warn",
                            f"Detected {truncated_headings} truncated heading elements.",
                            page=route,
                            viewport=viewport,
                            details={"truncated_headings": truncated_headings},
                        )
                    )

                if metrics.get("heading_hierarchy_issue"):
                    findings.append(
                        build_finding(
                            "heading-hierarchy-inconsistent",
                            "warn",
                            "Heading size hierarchy appears inconsistent.",
                            page=route,
                            viewport=viewport,
                        )
                    )

                low_contrast_count = int(metrics.get("low_contrast_count") or 0)
                if low_contrast_count > 0:
                    findings.append(
                        build_finding(
                            "contrast-low",
                            "warn",
                            f"Detected {low_contrast_count} low-contrast text candidates.",
                            page=route,
                            viewport=viewport,
                            details={"low_contrast_count": low_contrast_count},
                        )
                    )

                focus_invisible_count = int(metrics.get("focus_invisible_count") or 0)
                if focus_invisible_count > 0:
                    findings.append(
                        build_finding(
                            "focus-states-invisible",
                            "warn",
                            f"Detected {focus_invisible_count} interactive elements without visible focus feedback.",
                            page=route,
                            viewport=viewport,
                        )
                    )

                if viewport == "mobile" and not metrics.get("cta_visible", True):
                    findings.append(
                        build_finding(
                            "cta-critical-offscreen-mobile",
                            "warn",
                            "No clear CTA is visible in the initial mobile viewport.",
                            page=route,
                            viewport=viewport,
                        )
                    )

                motion_count = int(metrics.get("aggressive_motion_count") or 0)
                if motion_count > 6:
                    findings.append(
                        build_finding(
                            "animations-too-aggressive",
                            "warn",
                            f"Detected {motion_count} elements with aggressive motion durations.",
                            page=route,
                            viewport=viewport,
                        )
                    )

                if motion_count > 0 and not metrics.get("reduced_motion_rule_present", False):
                    findings.append(
                        build_finding(
                            "reduced-motion-not-configured",
                            "warn",
                            "Motion is present but no prefers-reduced-motion rule was detected.",
                            page=route,
                            viewport=viewport,
                        )
                    )

                if console_errors or page_errors:
                    findings.append(
                        build_finding(
                            "console-errors-blocking",
                            "warn",
                            "Console or page errors were detected during rendering.",
                            page=route,
                            viewport=viewport,
                            details={
                                "console_errors": console_errors[-8:],
                                "page_errors": page_errors[-8:],
                            },
                        )
                    )

            context.close()
        browser.close()

    status = "pass" if not any(item.get("status") == "warn" for item in findings) else "fail"
    return status, findings, page_results, dependencies


def write_json(path: Path, payload: dict[str, Any]) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(json.dumps(payload, indent=2, ensure_ascii=True), encoding="utf-8")


def main() -> int:
    args = parse_args()
    root = Path(args.root).resolve()
    config = load_config(root)

    page_scope = args.page_scope or str(config.get("page_scope", "key"))
    base_url = args.base_url or os.environ.get("DESIGN_AUTOPILOT_BASE_URL", "http://127.0.0.1:4173")
    pages = resolve_pages(page_scope, list(config.get("key_pages", [])), args.pages)
    viewports = resolve_viewports(args.viewports, list(config.get("viewports", [])))

    artifacts_dir = root / str(config.get("artifacts_dir", ".playwright-gate"))
    output_path = Path(args.output).resolve() if args.output else artifacts_dir / "design-audit.json"
    screenshots_dir = Path(args.screenshots_dir).resolve() if args.screenshots_dir else artifacts_dir / "screenshots"
    ensure_dir(screenshots_dir)

    server_process: subprocess.Popen[str] | None = None
    server_error: str | None = None
    try:
        server_process, server_error = start_server(
            root,
            base_url,
            args.start_server,
            args.server_timeout,
            args.server_command,
        )

        if server_error and args.start_server in {"always", "auto"}:
            payload = {
                "target": str(root),
                "mode": "design-visual-audit",
                "timestamp": now_iso(),
                "status": "fail",
                "base_url": base_url,
                "render_mode": "browser",
                "dependencies": {"playwright": "unknown"},
                "configuration_status": {"server": "failed"},
                "summary_counts": {"pass": 0, "warn": 1, "info": 0, "error": 0},
                "findings": [
                    build_finding(
                        "site-not-reachable",
                        "warn",
                        server_error,
                    )
                ],
                "pages": pages,
                "viewports": viewports,
                "sampled_pages": [],
                "artifacts": {
                    "screenshots_dir": str(screenshots_dir),
                    "audit_file": str(output_path),
                },
            }
            write_json(output_path, payload)
            if args.json:
                print(json.dumps(payload, ensure_ascii=True))
            else:
                print(f"audit={output_path}")
                print("status=fail")
            return 1

        status, findings, sampled_pages, dependencies = audit_with_playwright(
            base_url=base_url,
            pages=pages,
            viewports=viewports,
            timeout_seconds=args.timeout,
            screenshots_dir=screenshots_dir,
        )
        summary_counts = summarize(findings)

        payload = {
            "target": str(root),
            "mode": "design-visual-audit",
            "timestamp": now_iso(),
            "status": status,
            "base_url": base_url,
            "render_mode": "browser",
            "dependencies": dependencies,
            "configuration_status": {
                "page_scope": page_scope,
                "server": "started" if server_process else "external_or_not_needed",
            },
            "summary_counts": summary_counts,
            "findings": findings,
            "pages": pages,
            "viewports": viewports,
            "sampled_pages": sampled_pages,
            "crawl_summary": {
                "seed_count": len(pages),
                "visited_count": len(sampled_pages),
                "skipped_count": max(0, len(pages) * len(viewports) - len(sampled_pages)),
                "depth_limit": 0,
                "crawl_limit": len(pages),
            },
            "artifacts": {
                "screenshots_dir": str(screenshots_dir),
                "audit_file": str(output_path),
            },
        }

        write_json(output_path, payload)

        if args.json:
            print(json.dumps(payload, ensure_ascii=True))
        else:
            print(f"audit={output_path}")
            print(f"status={status}")
            print(f"warnings={summary_counts.get('warn', 0)}")

        if status in {"fail", "dependency_missing"}:
            return 1
        return 0
    finally:
        stop_server(server_process)


if __name__ == "__main__":
    raise SystemExit(main())
