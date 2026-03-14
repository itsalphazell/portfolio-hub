# Codex Premium Immersive Starter

This folder is intentionally isolated from the main app structure.

Use it as source material:

- import the helper utilities
- move pieces into your real component system if they prove valuable
- delete the folder if the immersive direction is dropped

Recommended order:

1. `lib/premiumMotion.ts`
2. `components/PremiumImmersiveStage.tsx`
3. `components/PremiumSceneFallback.tsx`
4. `components/PremiumImmersiveHero.tsx`
5. `components/PremiumScrollSequence.tsx`
6. `components/PremiumSceneCanvas.tsx`
7. `presets/PortfolioAvatarHero.tsx`
8. `presets/CanvasScrollPortfolioShell.tsx`

Integration note:

- in Next/App Router repos, import with `@/codex-premium-immersive/...`
- no extra global CSS import is required
- if `shader-pack` is installed, pass the backdrop component from `@/codex-premium-modules/shader-pack/react/components/OglShaderBackdrop`
- if the project is a personal/founder portfolio, start from `presets/PortfolioAvatarHero.tsx` before inventing a new hero from scratch
- if the page should feel like a full staged portfolio shell rather than a standard hero, start from `presets/CanvasScrollPortfolioShell.tsx`
