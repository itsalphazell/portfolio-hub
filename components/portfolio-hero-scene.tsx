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

export function PortfolioHeroScene({ activeSlug, activeChapter, modes, onActivate }: PortfolioHeroSceneProps) {
  const { locale } = useLocale();
  const copy = homeCopy[locale];
  const { reducedMotion, compactViewport } = useImmersiveCapability();
  const activeMode = modes.find((mode) => mode.slug === activeSlug) ?? modes[0];

  return (
    <aside className="canvas-stage-panel" style={{ "--mode-accent": activeMode.accent } as CSSProperties}>
      <div className="canvas-stage-shell" data-audit-bg="rgb(8,17,39)" data-audit-overlay-root>
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
                  compact={compactViewport}
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
    </aside>
  );
}
