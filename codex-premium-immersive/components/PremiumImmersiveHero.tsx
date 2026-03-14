"use client";

import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import gsap from "gsap";
import PremiumImmersiveStage from "./PremiumImmersiveStage";
import { ensurePremiumPlugins, useImmersiveCapability } from "../lib/premiumMotion";

export default function PremiumImmersiveHero() {
  const { reducedMotion, compactViewport } = useImmersiveCapability();
  const shellRef = useRef<HTMLElement | null>(null);

  useGSAP(() => {
    if (reducedMotion || !shellRef.current) {
      return undefined;
    }
    ensurePremiumPlugins();
    const ctx = gsap.context(() => {
      gsap.fromTo(
        "[data-immersive-copy]",
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: "power3.out",
          stagger: 0.12,
        }
      );
    }, shellRef);

    return () => ctx.revert();
  }, { scope: shellRef, dependencies: [reducedMotion] });

  return (
    <section
      ref={shellRef}
      className="relative overflow-hidden bg-[radial-gradient(circle_at_top,_rgba(124,92,255,0.18),transparent_36%),radial-gradient(circle_at_bottom_left,_rgba(22,183,165,0.12),transparent_28%),linear-gradient(180deg,#050816_0%,#070b1d_100%)] text-slate-50"
    >
      <div className="mx-auto max-w-6xl px-6 py-12 sm:px-8 lg:px-12 lg:py-20">
        <div className="grid items-center gap-8 lg:grid-cols-[minmax(0,1.08fr)_minmax(320px,0.92fr)]">
          <div>
            <div
              className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/6 px-3 py-2 text-xs tracking-[0.08em] text-slate-200 backdrop-blur-xl sm:text-sm"
              data-immersive-copy
            >
              Premium immersive mode
            </div>
            <h1
              className="mt-4 max-w-[12ch] text-balance text-5xl font-semibold leading-[0.92] tracking-[-0.05em] sm:text-6xl lg:text-7xl"
              data-immersive-copy
            >
              One cinematic moment that still converts.
            </h1>
            <p
              className="mt-5 max-w-2xl text-base leading-7 text-slate-300 sm:text-lg"
              data-immersive-copy
            >
              Use GSAP, ScrollTrigger, and React Three Fiber for a hero or showcase sequence,
              not as the base architecture of the full page.
            </p>
            <div className="mt-6 flex flex-wrap gap-3" data-immersive-copy>
              <button
                className="rounded-full bg-[linear-gradient(135deg,#7c5cff_0%,#16b7a5_100%)] px-5 py-3 text-sm font-medium text-white shadow-[0_20px_50px_rgba(22,183,165,0.18)] transition-transform hover:-translate-y-0.5 sm:px-6 sm:text-base"
                type="button"
              >
                Start with the hero
              </button>
              <button
                className="rounded-full border border-white/15 bg-white/6 px-5 py-3 text-sm font-medium text-slate-100 backdrop-blur-xl transition-colors hover:bg-white/10 sm:px-6 sm:text-base"
                type="button"
              >
                Keep a mobile fallback
              </button>
            </div>
            <div className="mt-6 flex flex-wrap gap-2 text-xs text-slate-300 sm:text-sm" data-immersive-copy>
              <span className="rounded-full border border-white/10 bg-white/[0.05] px-3 py-2">
                One spectacle moment
              </span>
              <span className="rounded-full border border-white/10 bg-white/[0.05] px-3 py-2">
                Lazy scene mount
              </span>
              <span className="rounded-full border border-white/10 bg-white/[0.05] px-3 py-2">
                {compactViewport ? "Compact viewport fallback" : "Desktop scene enabled"}
              </span>
            </div>
          </div>

          <PremiumImmersiveStage />
        </div>
      </div>
    </section>
  );
}
