"use client";

import { useGSAP } from "@gsap/react";
import type { ComponentType, ReactNode } from "react";
import { useRef } from "react";
import gsap from "gsap";
import PremiumImmersiveStage from "../components/PremiumImmersiveStage";
import PremiumSceneFallback from "../components/PremiumSceneFallback";
import { ensurePremiumPlugins, useImmersiveCapability } from "../lib/premiumMotion";

type PortfolioAvatarHeroProps = {
  availabilityLabel?: string;
  eyebrow?: string;
  title?: string;
  description?: string;
  primaryLabel?: string;
  primaryHref?: string;
  secondaryLabel?: string;
  secondaryHref?: string;
  proofPills?: string[];
  SceneComponent?: ComponentType;
  stageBackdrop?: ReactNode;
};

function DefaultPortfolioBackdrop() {
  return (
    <>
      <div className="absolute -left-12 top-10 h-52 w-52 rounded-full bg-fuchsia-500/20 blur-3xl" />
      <div className="absolute right-0 top-16 h-64 w-64 rounded-full bg-blue-500/20 blur-3xl" />
      <div className="absolute bottom-0 left-1/4 h-32 w-40 rounded-full bg-cyan-400/10 blur-2xl" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.12),transparent_0,transparent_42%),linear-gradient(180deg,rgba(255,255,255,0.04),rgba(255,255,255,0.01))]" />
    </>
  );
}

export default function PortfolioAvatarHero({
  availabilityLabel = "Open to selective projects",
  eyebrow = "Portfolio hero preset",
  title = "Build a personal portfolio that feels premium before it feels noisy.",
  description = "Use one avatar or signature model to support trust, while keeping the copy, CTA hierarchy, and reading flow firmly in control.",
  primaryLabel = "Start a project",
  primaryHref = "#contact",
  secondaryLabel = "View selected work",
  secondaryHref = "#projects",
  proofPills = ["Avatar-led trust", "One hero spectacle", "Reduced-motion safe"],
  SceneComponent,
  stageBackdrop,
}: PortfolioAvatarHeroProps) {
  const shellRef = useRef<HTMLElement | null>(null);
  const { reducedMotion, compactViewport } = useImmersiveCapability();

  useGSAP(() => {
    if (reducedMotion || !shellRef.current) {
      return undefined;
    }
    ensurePremiumPlugins();
    const ctx = gsap.context(() => {
      gsap.fromTo(
        "[data-portfolio-copy]",
        { opacity: 0, y: 22 },
        {
          opacity: 1,
          y: 0,
          duration: 0.85,
          ease: "power3.out",
          stagger: 0.1,
        }
      );
    }, shellRef);

    return () => ctx.revert();
  }, { scope: shellRef, dependencies: [reducedMotion] });

  const stageScene = SceneComponent ? <SceneComponent /> : undefined;

  return (
    <section
      ref={shellRef}
      className="relative overflow-hidden bg-[linear-gradient(180deg,#090416_0%,#0d0820_100%)] text-white"
    >
      <div className="mx-auto grid max-w-6xl items-center gap-8 px-6 py-14 sm:px-8 lg:grid-cols-[minmax(0,1fr)_minmax(360px,0.95fr)] lg:px-12 lg:py-20">
        <div className="relative z-10 max-w-2xl">
          <div
            className="inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-4 py-2 text-xs font-medium tracking-[0.08em] text-emerald-300 sm:text-sm"
            data-portfolio-copy
          >
            <span className="h-2 w-2 rounded-full bg-emerald-300" />
            {availabilityLabel}
          </div>
          <p className="mt-5 text-sm uppercase tracking-[0.16em] text-slate-400" data-portfolio-copy>
            {eyebrow}
          </p>
          <h1
            className="mt-3 max-w-[12ch] text-balance text-5xl font-semibold leading-[0.94] tracking-[-0.05em] text-white sm:text-6xl lg:text-7xl"
            data-portfolio-copy
          >
            {title}
          </h1>
          <p className="mt-6 max-w-xl text-base leading-7 text-slate-300 sm:text-lg" data-portfolio-copy>
            {description}
          </p>
          <div className="mt-8 flex flex-wrap gap-3" data-portfolio-copy>
            <a
              className="rounded-full bg-[linear-gradient(135deg,#2563eb_0%,#9333ea_100%)] px-5 py-3 text-sm font-medium text-white shadow-[0_18px_48px_rgba(37,99,235,0.32)] transition-transform hover:-translate-y-0.5 sm:px-6 sm:text-base"
              href={primaryHref}
            >
              {primaryLabel}
            </a>
            <a
              className="rounded-full border border-white/15 bg-white/6 px-5 py-3 text-sm font-medium text-slate-100 backdrop-blur-xl transition-colors hover:bg-white/10 sm:px-6 sm:text-base"
              href={secondaryHref}
            >
              {secondaryLabel}
            </a>
          </div>
          <div className="mt-6 flex flex-wrap gap-2 text-xs text-slate-300 sm:text-sm" data-portfolio-copy>
            {proofPills.map((pill) => (
              <span
                key={pill}
                className="rounded-full border border-white/10 bg-white/[0.05] px-3 py-2"
              >
                {pill}
              </span>
            ))}
            <span className="rounded-full border border-white/10 bg-white/[0.05] px-3 py-2">
              {compactViewport ? "Compact fallback active" : "Desktop scene active"}
            </span>
          </div>
        </div>

        <PremiumImmersiveStage
          backdrop={stageBackdrop ?? <DefaultPortfolioBackdrop />}
          scene={stageScene}
          fallback={<PremiumSceneFallback />}
        />
      </div>
    </section>
  );
}
