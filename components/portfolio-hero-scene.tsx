"use client";

import type { CSSProperties } from "react";
import Link from "next/link";
import clsx from "clsx";
import { ArrowUpRight } from "lucide-react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import PremiumImmersiveStage from "@/codex-premium-immersive/components/PremiumImmersiveStage";
import PremiumSceneFallback from "@/codex-premium-immersive/components/PremiumSceneFallback";
import { useImmersiveCapability } from "@/codex-premium-immersive/lib/premiumMotion";
import { useLocale } from "@/components/locale-provider";
import { PortfolioHeroSceneCanvas } from "@/components/portfolio-hero-scene-canvas";
import { homeCopy } from "@/lib/locale-data";
import type { HomeMode, HomeStageChapter } from "@/lib/types";

interface PortfolioHeroSceneProps {
  activeSlug: string;
  activeChapter: HomeStageChapter;
  modes: HomeMode[];
  onActivate: (slug: string) => void;
}

export function PortfolioHeroScene({ activeSlug, activeChapter, modes, onActivate }: PortfolioHeroSceneProps) {
  const { locale } = useLocale();
  const copy = homeCopy[locale];
  const { reducedMotion, compactViewport } = useImmersiveCapability();
  const activeMode = modes.find((mode) => mode.slug === activeSlug) ?? modes[0];

  useGSAP(() => {
    if (reducedMotion) {
      return undefined;
    }

    const context = gsap.context(() => {
      gsap.from("[data-stage-meta]", {
        opacity: 0,
        y: 18,
        duration: 0.7,
        stagger: 0.06,
        ease: "power3.out",
      });
    });

    return () => context.revert();
  }, { dependencies: [activeSlug, reducedMotion] });

  return (
    <aside className="canvas-stage-panel lg:sticky lg:top-24">
      <div className="canvas-stage-shell" style={{ "--mode-accent": activeMode.accent } as CSSProperties}>
        <div className="canvas-stage-header" data-stage-meta>
          <div>
            <p className="font-signal text-[10px] uppercase tracking-[0.2em] text-[var(--mode-accent)]">
              {copy.commandStageLabel}
            </p>
            <p className="mt-2 max-w-[24rem] text-sm leading-6 text-white/78">{activeMode.valueLine}</p>
          </div>
          <div className="canvas-stage-header-pills">
            <span className="hero-stage-pill hero-stage-pill-strong">{activeChapter.chapter}</span>
            <span className="hero-stage-pill">{activeMode.label}</span>
          </div>
        </div>

        <div className="canvas-stage-frame" data-audit-bg="rgba(7,16,43,1)" data-audit-overlay-root data-stage-meta>
          <PremiumImmersiveStage
            backdrop={
              <>
                <div className="canvas-stage-backdrop canvas-stage-backdrop-a" />
                <div className="canvas-stage-backdrop canvas-stage-backdrop-b" />
                <div className="canvas-stage-backdrop canvas-stage-backdrop-c" />
              </>
            }
            fallback={
              <PremiumSceneFallback
                body={activeMode.pulse}
                eyebrow={copy.commandStageLabel}
                title={activeMode.stageTitle}
              />
            }
            scene={
              <div className="absolute inset-0">
                <PortfolioHeroSceneCanvas
                  activeSlug={activeMode.slug}
                  accent={activeMode.accent}
                  compact={compactViewport}
                  glow={activeMode.accent}
                  reduceMotion={reducedMotion}
                />
              </div>
            }
          />
          <div className="canvas-stage-overlay pointer-events-none absolute inset-x-5 top-5 z-20 hidden md:flex md:items-start md:justify-between">
            <div className="max-w-[16rem] rounded-[1.25rem] border border-white/10 bg-[rgba(8,18,48,0.52)] px-4 py-3 backdrop-blur-xl">
              <p className="font-signal text-[10px] uppercase tracking-[0.18em] text-white/62">
                {copy.currentSignalLabel}
              </p>
              <p className="mt-2 text-sm leading-6 text-white/82">{activeChapter.valueCue}</p>
            </div>
            <div className="rounded-[1.25rem] border border-white/10 bg-[rgba(8,18,48,0.52)] px-4 py-3 backdrop-blur-xl">
              <p className="font-signal text-[10px] uppercase tracking-[0.18em] text-white/62">
                {copy.linkedCaseLabel}
              </p>
              <p className="mt-2 text-sm leading-6 text-white">{activeMode.eyebrow}</p>
            </div>
          </div>
        </div>

        <div className="canvas-stage-details" data-stage-meta>
          <div className="canvas-stage-copy-card">
            <p className="font-signal text-[10px] uppercase tracking-[0.18em] text-[var(--mode-accent)]">
              {activeMode.label}
            </p>
            <h3 className="mt-3 max-w-[14ch] text-balance font-display text-[clamp(1.55rem,2vw,2.2rem)] leading-[0.96] tracking-[-0.04em] text-white">
              {activeChapter.headline}
            </h3>
            <p className="mt-4 max-w-[34rem] text-sm leading-7 text-white/78">{activeChapter.body}</p>
          </div>

          <div className="canvas-stage-side-card">
            <div className="space-y-3">
              <p className="font-signal text-[10px] uppercase tracking-[0.18em] text-white/62">
                {copy.currentRegisterLabel}
              </p>
              <p className="text-sm leading-7 text-white/82">{activeMode.pulse}</p>
            </div>
            <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
              {activeMode.metrics.slice(0, 3).map((metric) => (
                <div className="canvas-stage-metric" key={metric.label}>
                  <p className="font-signal text-[10px] uppercase tracking-[0.16em] text-white/56">{metric.label}</p>
                  <p className="mt-2 text-sm font-semibold text-white">{metric.value}</p>
                </div>
              ))}
            </div>
            <div className="flex flex-wrap gap-2">
              <Link
                className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-semibold text-ink transition-transform duration-200 hover:-translate-y-0.5"
                href={`/work/${activeSlug}`}
              >
                {copy.linkedCaseCta}
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>

        <div className="canvas-stage-nav" data-stage-meta>
          {modes.map((mode, index) => {
            const active = mode.slug === activeSlug;

            return (
              <button
                aria-pressed={active}
                className={clsx("canvas-stage-tab", active ? "canvas-stage-tab-active" : "")}
                key={mode.slug}
                onClick={() => onActivate(mode.slug)}
                onFocus={() => onActivate(mode.slug)}
                type="button"
              >
                <span className="font-signal text-[10px] uppercase tracking-[0.18em]">{String(index + 1).padStart(2, "0")}</span>
                <span className="mt-2 block text-sm font-semibold text-white">{mode.label}</span>
                <span className="mt-1 block text-xs leading-5 text-white/62">{mode.eyebrow}</span>
              </button>
            );
          })}
        </div>
      </div>
    </aside>
  );
}
