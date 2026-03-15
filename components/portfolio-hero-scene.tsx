"use client";

import type { CSSProperties } from "react";
import Link from "next/link";
import clsx from "clsx";
import { ArrowUpRight } from "lucide-react";
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
  onActivate: (slug: string, options?: { scroll?: boolean }) => void;
}

function CompactScenePlate({ accent, glow }: { accent: string; glow: string }) {
  return (
    <div
      className="canvas-stage-mobile-plate"
      style={
        {
          "--fallback-accent": accent,
          "--fallback-glow": glow,
        } as CSSProperties
      }
    >
      <div className="canvas-stage-mobile-plate-glow canvas-stage-mobile-plate-glow-a" />
      <div className="canvas-stage-mobile-plate-glow canvas-stage-mobile-plate-glow-b" />
      <div className="hero-scene-fallback-stack canvas-stage-mobile-stack">
        <div className="hero-scene-fallback-slab hero-scene-fallback-slab-back" />
        <div className="hero-scene-fallback-slab hero-scene-fallback-slab-mid" />
        <div className="hero-scene-fallback-slab hero-scene-fallback-slab-front" />
        <div className="hero-scene-fallback-orb" />
        <div className="hero-scene-fallback-ring" />
      </div>
    </div>
  );
}

export function PortfolioHeroScene({ activeSlug, activeChapter, modes, onActivate }: PortfolioHeroSceneProps) {
  const { locale } = useLocale();
  const copy = homeCopy[locale];
  const { reducedMotion } = useImmersiveCapability();
  const activeMode = modes.find((mode) => mode.slug === activeSlug) ?? modes[0];
  const compactStage = reducedMotion ? (
    <CompactScenePlate accent={activeMode.accent} glow={activeMode.accent} />
  ) : (
    <div
      aria-hidden="true"
      className="canvas-stage-mobile-scene"
      data-audit-bg="rgba(7,16,43,1)"
    >
      <div className="canvas-stage-mobile-plate-glow canvas-stage-mobile-plate-glow-a" />
      <div className="canvas-stage-mobile-plate-glow canvas-stage-mobile-plate-glow-b" />
      <div className="canvas-stage-mobile-canvas">
        <PortfolioHeroSceneCanvas
          activeSlug={activeMode.slug}
          accent={activeMode.accent}
          compact
          glow={activeMode.accent}
          mobileLite
          reduceMotion={false}
        />
      </div>
      <div className="canvas-stage-mobile-scene-vignette" />
    </div>
  );

  return (
    <aside className="canvas-stage-panel" style={{ "--mode-accent": activeMode.accent } as CSSProperties}>
      <div className="canvas-stage-shell" data-audit-bg="rgb(8,17,39)" data-audit-overlay-root>
        <div className="md:hidden">
          <div className="canvas-stage-header">
            <div className="space-y-2">
              <p className="font-signal text-[10px] uppercase tracking-[0.2em] text-[var(--mode-accent)]">
                {copy.commandStageLabel}
              </p>
              <p className="max-w-full text-[0.88rem] leading-5 text-white/76">{activeMode.valueLine}</p>
            </div>

            <div className="canvas-stage-header-pills">
              <span className="hero-stage-pill hero-stage-pill-strong">{activeChapter.chapter}</span>
              <span className="hero-stage-pill">{activeMode.label}</span>
            </div>
          </div>

          <div className="canvas-stage-frame canvas-stage-frame-mobile" data-audit-bg="rgba(7,16,43,1)">
            {compactStage}
          </div>

          <div className="canvas-stage-mobile-meta-grid">
            <div className="canvas-stage-mobile-card">
              <p className="font-signal text-[10px] uppercase tracking-[0.18em] text-white/58">{copy.currentSignalLabel}</p>
              <p className="mt-2 text-sm leading-6 text-white/84">{activeChapter.valueCue}</p>
            </div>
            <div className="canvas-stage-mobile-card">
              <p className="font-signal text-[10px] uppercase tracking-[0.18em] text-white/58">{copy.linkedCaseLabel}</p>
              <p className="mt-2 text-sm leading-6 text-white">{activeMode.eyebrow}</p>
            </div>
          </div>

          <div className="canvas-stage-mobile-copy-card">
            <p className="font-signal text-[10px] uppercase tracking-[0.18em] text-[var(--mode-accent)]">{activeMode.label}</p>
            <h3 className="mt-3 max-w-[13ch] text-balance font-display text-[clamp(1.55rem,8vw,2.2rem)] leading-[0.98] tracking-[-0.04em] text-white">
              {activeMode.stageTitle}
            </h3>
            <p className="mt-3 text-[0.92rem] leading-6 text-white/78">{activeMode.pulse}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {activeMode.metrics.slice(0, 3).map((metric) => (
                <span className="canvas-inline-pill canvas-inline-pill-dark" key={metric.label}>
                  {metric.label}: {metric.value}
                </span>
              ))}
            </div>
            <div className="mt-4 flex flex-wrap gap-3">
              <Link
                className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-semibold text-ink"
                href={`/work/${activeSlug}`}
              >
                {copy.linkedCaseCta}
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </div>
          </div>

          <div className="canvas-stage-rail canvas-stage-rail-mobile">
            {modes.map((mode, index) => {
              const active = mode.slug === activeSlug;

              return (
                <button
                  aria-pressed={active}
                  className={clsx("canvas-stage-tab", active ? "canvas-stage-tab-active" : "")}
                  key={mode.slug}
                  onClick={() => onActivate(mode.slug)}
                  type="button"
                >
                  <span className="font-signal text-[10px] uppercase tracking-[0.18em]">{String(index + 1).padStart(2, "0")}</span>
                  <span className="canvas-stage-tab-title mt-1.5 block text-[0.82rem] font-semibold leading-5 text-white">{mode.label}</span>
                  <span className="canvas-stage-tab-caption mt-1 block text-[10px] leading-4 text-white/62">{mode.eyebrow}</span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="hidden md:block">
          <div className="canvas-stage-header">
            <div className="space-y-2">
              <p className="font-signal text-[10px] uppercase tracking-[0.2em] text-[var(--mode-accent)]">
                {copy.commandStageLabel}
              </p>
              <p className="max-w-[22rem] text-[0.88rem] leading-5 text-white/76">{activeMode.valueLine}</p>
            </div>

            <div className="canvas-stage-header-pills">
              <span className="hero-stage-pill hero-stage-pill-strong">{activeChapter.chapter}</span>
              <span className="hero-stage-pill">{activeMode.label}</span>
            </div>
          </div>

          <div className="canvas-stage-frame" data-audit-bg="rgba(7,16,43,1)" data-audit-overlay-root>
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
                    compact={false}
                    glow={activeMode.accent}
                    reduceMotion={reducedMotion}
                  />
                </div>
              }
            />

            <div className="canvas-stage-overlay-left">
              <p className="font-signal text-[10px] uppercase tracking-[0.18em] text-white/58">{copy.currentSignalLabel}</p>
              <p className="mt-2 text-[0.88rem] leading-5 text-white/84">{activeChapter.valueCue}</p>
            </div>

            <div className="canvas-stage-overlay-right">
              <p className="font-signal text-[10px] uppercase tracking-[0.18em] text-white/58">{copy.linkedCaseLabel}</p>
              <p className="mt-2 text-[0.88rem] leading-5 text-white">{activeMode.eyebrow}</p>
            </div>
          </div>

          <div className="canvas-stage-summary-grid">
            <div className="canvas-stage-copy-card">
              <p className="font-signal text-[10px] uppercase tracking-[0.18em] text-[var(--mode-accent)]">{activeMode.label}</p>
              <h3 className="mt-2.5 max-w-[12ch] text-balance font-display text-[clamp(1.45rem,1.85vw,1.95rem)] leading-[0.98] tracking-[-0.04em] text-white">
                {activeMode.stageTitle}
              </h3>
              <p className="canvas-stage-copy-summary mt-2.5 max-w-[30rem] text-[0.88rem] leading-6 text-white/76">{activeMode.stageSummary}</p>
            </div>

            <div className="canvas-stage-side-card">
              <div className="space-y-3">
                <p className="font-signal text-[10px] uppercase tracking-[0.18em] text-white/58">{copy.currentRegisterLabel}</p>
                <p className="canvas-stage-pulse text-[0.88rem] leading-6 text-white/82">{activeMode.pulse}</p>
              </div>
              <div className="grid gap-2 sm:grid-cols-3 xl:grid-cols-3">
                {activeMode.metrics.slice(0, 3).map((metric) => (
                  <div className="canvas-stage-metric" key={metric.label}>
                    <p className="font-signal text-[9px] uppercase tracking-[0.12em] leading-4 text-white/56">{metric.label}</p>
                    <p className="mt-1.5 text-[0.8rem] font-semibold leading-5 text-white">{metric.value}</p>
                  </div>
                ))}
              </div>
              <div className="flex flex-wrap gap-3">
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

          <div className="canvas-stage-rail">
            {modes.map((mode, index) => {
              const active = mode.slug === activeSlug;

              return (
                <button
                  aria-pressed={active}
                  className={clsx("canvas-stage-tab", active ? "canvas-stage-tab-active" : "")}
                  key={mode.slug}
                  onClick={() => onActivate(mode.slug)}
                  type="button"
                >
                  <span className="font-signal text-[10px] uppercase tracking-[0.18em]">{String(index + 1).padStart(2, "0")}</span>
                  <span className="canvas-stage-tab-title mt-1.5 block text-[0.82rem] font-semibold leading-5 text-white">{mode.label}</span>
                  <span className="canvas-stage-tab-caption mt-1 block text-[10px] leading-4 text-white/62">{mode.eyebrow}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </aside>
  );
}
