"use client";

import { InteractiveIdentityOrb } from "../components/InteractiveIdentityOrb";

export function InteractiveIdentityHero() {
  return (
    <section className="grid items-center gap-8 lg:grid-cols-[minmax(0,1fr)_360px]">
      <div className="max-w-2xl">
        <p className="text-sm uppercase tracking-[0.18em] text-white/60">Identity object</p>
        <h2 className="mt-3 text-4xl font-semibold tracking-[-0.04em] text-white md:text-5xl">
          Use one object to anchor memory, not to steal the page.
        </h2>
        <p className="mt-4 text-base leading-7 text-white/72">
          The object should reinforce the brand world, preserve CTA clarity, and degrade cleanly on reduced-motion or compact layouts.
        </p>
      </div>
      <InteractiveIdentityOrb />
    </section>
  );
}