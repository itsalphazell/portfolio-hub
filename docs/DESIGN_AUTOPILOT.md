# Design Autopilot

This repository was bootstrapped with the Playwright design autopilot kit.

## What it does

1. Runs deterministic visual checks with Playwright.
2. Applies bounded CSS fixes (max 2 in pre-push, max 3 in full autopilot loop).
3. Stops on pass, max-iterations, or no-diff.
4. Publishes successful autopilot changes through branch + PR only.

## Local commands

```bash
python scripts/design_visual_audit.py --root . --page-scope key
```

```bash
python scripts/run_design_autopilot.py --root . --page-scope key --publish-branch-pr no
```

## Artifacts

All audit artifacts are written under `.playwright-gate/`:

- `design-audit.json`
- `autofix-report.json`
- `autopilot-report.json`
- `design-llm-judge.json` (optional)
- `screenshots/`

## Configuration

Edit `.codex/design-autopilot/config.json` to tune:

- `page_scope`
- `key_pages`
- `max_gate_autofix_iterations`
- `max_autopilot_iterations`
- `llm_visual_judge`
- `target_branch`

## Notes

- LLM judge is optional. If `OPENAI_API_KEY` is missing, deterministic checks still run.
- Branch/PR publishing requires git remote push access and a GitHub token.
- Direct push to `main` is intentionally avoided by the autopilot.
