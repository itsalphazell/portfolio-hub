# Design Memory Reuse Guard

This repository was bootstrapped with a 21st design-memory kit.

## Purpose

1. Reuse existing generated variants before creating new paid variants.
2. Keep a local memory per repo and an optional global memory.
3. Make reuse vs generate decisions deterministic and auditable.

## Files

1. Local history: `.codex/design-memory/21st/history.json`
2. Local variants: `.codex/design-memory/21st/variants/`
3. Config: `.codex/design-memory/config.json`

## Global history

Default global path:

`C:\Users\Thomas\.codex\memory\21st\global-history.json`

## Commands

Search for existing candidates:

```bash
python scripts/design_memory_search.py --root . --query "premium hero for pricing page" --component-type hero --profile marketing-landing --mode premium-web --history-scope hybrid --json
```

Guard decision before generation:

```bash
python scripts/design_reuse_guard.py --root . --query "premium hero for pricing page" --component-type hero --profile marketing-landing --mode premium-web --guardrail semi-strict --history-scope hybrid --json
```

Import an existing Magic Console generation:

```bash
python scripts/design_memory_add_entry.py --root . --provider 21st --query "Dream Studio AI hero" --component-type hero --tags "hero,landing,premium" --variant-ref-url "https://..." --scope both --shareable true --json
```

## Guardrail behavior

1. `off`: always allow generation.
2. `semi-strict`: prefer/require reuse based on score; allow `--force-generate`.
3. `strict`: block generation when reuse is preferred/required.

## Notes

1. This kit does not sync Magic Console history automatically.
2. Import legacy generations manually with `design_memory_add_entry.py`.
3. Use `--force-generate` only when reuse is clearly not suitable.
