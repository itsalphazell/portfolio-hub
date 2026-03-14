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
15. A `premium-immersive` overlay may add GSAP, ScrollTrigger, and React Three Fiber for one cinematic hero or showcase moment when the project justifies it.
16. After UI edits, run Playwright smoke checks before push, then CI full checks before merge.
17. Keep auto-correction bounded:
   - max 2 local smoke autofix iterations
   - max 3 autopilot iterations
   - stop immediately on no-diff
18. Prioritize readability, CTA clarity, accessibility, and performance over decorative effects during auto-fixes.
19. If autopilot changes are generated, publish only through branch + PR.

## Premium Immersive Design Mode

When `premium-immersive` mode is active:

1. Keep `ui-ux-pro-max` as the primary visual authority for brand, typography, spacing, and conversion structure.
2. Use `premium-motion-system` for text choreography and section pacing so the page still reads like a premium landing page, not only a demo.
3. Use `immersive-3d-pipeline` for asset prep, lighting, camera, and mobile degradation decisions.
4. Use `premium-immersive-qa` as the acceptance layer for CTA visibility, reduced motion, and mobile fallback quality.
5. Use GSAP for premium motion choreography and timeline control.
6. Use ScrollTrigger through GSAP for scrollytelling, reveal orchestration, and section staging.
7. Use React Three Fiber only for isolated 3D moments:
   - hero stage
   - intro sequence
   - one showcase section
8. Treat 3D as art direction, not as the default page rendering layer.
9. React Bits may still be used for supporting motion or accent moments, but it is not the foundation of immersive work.
10. Stitch MCP and 21st Magic MCP remain valid for layout and component exploration, but not as the authority for premium 3D direction.
11. One spectacle moment per page is the default. Do not stack several competing immersive sections.
12. Protect conversion clarity at all times:
   - primary CTA remains visible and understandable
   - message hierarchy stays readable
   - trust blocks still scan quickly on mobile
13. Shader and smooth-scroll packs are optional extensions. Physics and postfx remain explicit opt-ins only.
14. Require reduced-motion fallbacks for immersive sections.
15. Require lazy loading or code-splitting for 3D scenes and heavy motion bundles.
16. Provide a simplified mobile fallback when the full immersive experience would hurt performance or readability.
17. If an immersive effect hurts performance, clarity, or accessibility, simplify it or remove it.
18. Prefer one memorable world-building idea over a collection of disconnected effects.
19. Use Playwright checks after immersive changes to confirm:
   - CTA visibility
   - mobile scan quality
   - no blocking overflow/overlap
   - motion discipline
   - reduced-motion behavior
20. Keep automatic correction bounded:
   - max 2 local smoke iterations
   - max 3 autopilot iterations
21. Publish autopilot corrections through branch + PR only.
22. If the repo does not support the full immersive stack cleanly, keep the guidance and fallback starter docs but do not force-install the stack.
