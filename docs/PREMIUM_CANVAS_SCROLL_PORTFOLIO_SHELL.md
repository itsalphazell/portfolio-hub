# Premium Canvas Scroll Portfolio Shell

Use this preset when the page should feel like a staged portfolio experience rather than a standard hero plus disconnected sections.

## Why this preset exists

This pattern is extracted from references such as `mohitvirli.github.io`:

- one canvas or stage-led shell for the page
- a sticky immersive moment near first paint
- scroll-driven narrative sections underneath
- a premium personal portfolio feel without turning the whole site into an unstructured demo

## Best fit

- premium React portfolio
- founder or creative developer site
- showcase page where the stage should feel like part of the story
- immersive landing where one persistent scene should anchor the page

## What it is not

- not a default landing preset for every marketing page
- not a character-rig or cinematic loader system by itself
- not a reason to put every section inside WebGL

## Integration order

1. Start from `presets/CanvasScrollPortfolioShell.tsx`
2. Replace the copy, CTA labels, and proof pills
3. Swap the default stage content for your own object or scene if needed
4. Keep the stage sticky and the sections light
5. Add heavier postfx only if the still frame and motion already work without them

## Rules

1. Treat the stage as the page anchor, not a wallpaper for endless tricks.
2. Use the canvas moment for identity and atmosphere, then let the sections do the selling.
3. Keep the CTA visible and readable before the scroll narrative starts.
4. On compact or reduced-motion paths, the preset still needs to read like a premium portfolio page.
5. If the page is really a pricing, docs, or product surface, use `premium-web` instead.
