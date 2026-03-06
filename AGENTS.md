# AGENTS.md

## Marketing Landing Rules

1. Treat this project as a conversion and brand communication surface first.
2. Never restart from scratch if the site already exists. Improve the current structure unless replacement is clearly justified.
3. Inspect the live page structure before editing:
   - hero
   - value proposition
   - proof blocks
   - offer sections
   - CTA flow
   - footer and trust signals
4. Optimize for message clarity, perceived quality, emotional impact, and conversion.
5. Use `ui-ux-pro-max` as the primary visual direction for:
   - art direction
   - palette
   - typography
   - spacing
   - section rhythm
   - interaction rules
6. React Bits is allowed more often here, but still selectively. Use it for hero sections, animated backgrounds, text emphasis, or standout showcase blocks. Keep usage intentional and limited.
7. Treat React Bits as adaptable source material. Pull in only the parts that improve the page, then align them with the project's typography, spacing, color system, motion language, and accessibility requirements.
8. Prefer one or two strong React Bits moments on a page over stacking several effects in multiple sections.
9. If a React Bits pattern weakens CTA clarity, hurts mobile scanning, or adds unnecessary runtime weight, simplify it or discard it.
10. Avoid generic SaaS styling, filler sections, and decorative effects that dilute the message.
11. Use Context7 for any framework, library, or version-specific implementation decision.
12. Prioritize:
   - strong value proposition above the fold
   - clear CTA hierarchy
   - social proof and trust placement
   - mobile-first readability
   - accessibility and performance
13. Before delivery, verify:
   - the page scans clearly in under 10 seconds
   - the main CTA is visible and repeated logically
   - animations do not block readability
   - visual identity is consistent across sections
   - the result feels premium rather than noisy
14. A `premium-web` overlay may extend these rules with Stitch MCP, 21st Magic MCP, and bolder visual exploration while preserving message clarity.
15. After UI edits, run Playwright smoke checks before push, then CI full checks before merge.
16. Keep auto-correction bounded:
   - max 2 local smoke autofix iterations
   - max 3 autopilot iterations
   - stop immediately on no-diff
17. Prioritize readability, CTA clarity, accessibility, and performance over decorative effects during auto-fixes.
18. If autopilot changes are generated, publish only through branch + PR.

## Premium Web Design Mode

When `premium-web` mode is active:

1. Keep `ui-ux-pro-max` as the primary visual authority.
2. Use Stitch MCP to explore full page structures, screen concepts, section rhythm, and higher-end landing composition.
3. Use 21st Magic MCP as a secondary source for polished components, sections, and faster visual exploration.
4. Use React Bits for selected visual moments:
   - hero sections
   - animated backgrounds
   - standout showcases
   - text emphasis
5. Treat React Bits as adaptable source material. Pull in only the pieces that strengthen the page, then harmonize them with the project's typography, spacing, motion language, and conversion structure.
6. Deliberately push for:
   - stronger identity
   - richer motion
   - more memorable layout structure
   - premium landing composition
   - clearer visual drama without hurting readability
7. Keep one strong visual idea per page rather than stacking many effects.
8. Never merge multiple UI systems without harmonizing:
   - typography
   - spacing
   - color
   - motion
   - surface treatment
9. Avoid:
   - noisy effect stacking
   - generic SaaS landing output
   - decorative gimmicks that dilute message clarity
10. Preserve conversion clarity, CTA hierarchy, and fast mobile scanning.
11. If a React Bits pattern weakens message clarity, slows the page, or muddies CTA hierarchy, simplify it or discard it.
12. Apply a reuse-first policy before generating new paid variants:
   - check existing Stitch screens/variants for a reusable candidate
   - check existing 21st-generated components/snippets already in the repo
   - generate new variants only if no existing option can be adapted cleanly
   - run `python scripts/design_reuse_guard.py ...` before any `21st_magic_component_builder` call
   - if result is `reuse_required` and no explicit `--force-generate`, do not generate
13. If external generated ideas weaken the offer or trust signals, simplify or discard them.
14. `Nano Banana Pro` is allowed as a secondary visual exploration tool for:
   - hero concept imagery
   - campaign atmosphere
   - section mood references
   - visual storytelling support
15. Use it to strengthen emotional impact and brand world, not to replace message clarity, conversion structure, or design-system coherence.
16. Run Playwright visual checks after premium changes to confirm CTA clarity, mobile scanning, contrast, and motion behavior.
17. Keep auto-fix bounded:
   - max 2 local smoke iterations
   - max 3 dedicated autopilot iterations
18. Publish autopilot-generated corrections only through branch + PR.
19. After successful new 21st generation, record the variant with `python scripts/design_memory_add_entry.py ...` to reduce future credit usage.
