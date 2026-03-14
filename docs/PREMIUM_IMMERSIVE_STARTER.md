# Premium Immersive Starter

This starter is installed only for `premium-immersive` workflows.

## What it gives you

- GSAP + ScrollTrigger guidance for hero and scrollytelling choreography
- React Three Fiber starter components for one isolated 3D moment
- reduced-motion and lazy-scene mounting helpers
- an explicit mobile/reduced-motion fallback stage
- a stage wrapper that can accept the optional shader backdrop pack
- a deletable, isolated folder: `codex-premium-immersive/`
- components written to drop into Next 15 / App Router / Tailwind 4 without global CSS imports

## Usage model

1. Keep your existing page structure.
2. Import only the starter pieces you need.
3. Use one strong immersive moment, not several.
4. Fall back to a simplified/mobile-safe version if the 3D scene is not worth the cost.

## Expected integration pattern

- Start with `@/codex-premium-immersive/components/PremiumImmersiveHero`
- For more control, compose `PremiumImmersiveStage` plus `PremiumSceneCanvas` directly
- If `shader-pack` is installed, pass `@/codex-premium-modules/shader-pack/react/components/OglShaderBackdrop` as the stage backdrop
- Reuse `PremiumScrollSequence` only for one supporting narrative section
- Use `@/codex-premium-immersive/presets/CanvasScrollPortfolioShell` when the page should feel like one stage-led immersive portfolio shell instead of a standard hero block
- Adapt copy, spacing, and colors to the host design system
- Keep the default Tailwind utility styling or move the component into your real design system when it stabilizes
- Keep the fallback state visually on-brand; do not treat reduced-motion as a blank downgrade

## Removal

Delete `codex-premium-immersive/` and the related imports if the stack is no longer needed.
