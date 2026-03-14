# Premium Portfolio Avatar Hero

Use this preset when the page is a personal portfolio or founder-led landing page and one avatar or signature model should carry the hero atmosphere.

## Why this preset exists

This pattern is extracted from achievable premium React portfolios such as `Saurav-Portfolio`:

- strong portfolio copy on the left
- one avatar/model scene on the right
- atmospheric gradients instead of heavy postprocessing
- one clear primary CTA and one secondary CTA
- mobile and reduced-motion safe fallback

## Best fit

- developer or founder portfolio
- consultant or agency landing page with a personal identity angle
- service-led sites where the avatar/model supports trust but should not become the whole experience

## What it is not

- not a cinematic multi-section 3D narrative
- not a character rig pipeline by itself
- not a replacement for the generic immersive hero

## Integration order

1. Start from `presets/PortfolioAvatarHero.tsx`
2. Replace the copy, CTAs, and proof pills
3. Swap the default scene for your own GLB/FBX-backed scene component
4. Keep the fallback readable before adding extra atmosphere
5. Add shader backdrop only if it improves the still frame

## Rules

1. Treat the avatar as a trust/support layer, not the headline.
2. Keep the copy column dominant.
3. Preserve CTA clarity on first paint.
4. On compact viewports, degrade to the fallback stage without losing the hero idea.
5. Avoid physics and postfx unless the page is explicitly `premium-immersive` and the brand payoff is real.
