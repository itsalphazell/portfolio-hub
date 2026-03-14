# Premium Immersive Static Starter

This variant is for static or template-driven sites that do not use React as the rendering layer.

## What it gives you

- an immersive hero HTML snippet
- a standalone CSS file
- a standalone JS file
- optional hooks for GSAP and Three if they are loaded globally
- guidance for using the optional shader pack as an atmosphere layer
- safe fallback behavior when those libraries are not present

## Expected integration pattern

1. Copy the HTML snippet into the relevant template or partial.
2. Include the CSS file in the host stylesheet pipeline.
3. Load `premium-immersive.js` after the page markup.
4. Optionally expose `window.gsap` and `window.THREE` through CDN or local vendoring if the project wants the full effect.
5. If the project uses the shader pack, expose its atmosphere helper as `window.mountPremiumShaderBackdrop` before adding any heavier 3D.

## Why no automatic npm install

On static/no-bundler architectures, adding npm packages alone does not make them browser-usable.

This starter is therefore architecture-aware:

- it installs source material automatically
- it does not force npm dependencies that the current pipeline may not consume

## Removal

Delete `codex-premium-immersive/` and remove the related template/script/style references.
