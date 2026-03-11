"use client";

import type { CSSProperties } from "react";
import { useEffect, useMemo, useRef } from "react";
import dynamic from "next/dynamic";
import clsx from "clsx";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useReducedMotion } from "motion/react";
import { useLocale } from "@/components/locale-provider";
import { homeCopy } from "@/lib/locale-data";
import type { HomeMode } from "@/lib/types";

gsap.registerPlugin(useGSAP);

const PortfolioHeroSceneCanvas = dynamic(
  () => import("@/components/portfolio-hero-scene-canvas").then((module) => module.PortfolioHeroSceneCanvas),
  {
    ssr: false,
    loading: () => (
      <div className="hero-scene-fallback flex h-full min-h-[26rem] w-full items-center justify-center rounded-[1.85rem] border border-[rgba(140,172,255,0.16)] bg-[radial-gradient(circle_at_20%_14%,rgba(255,255,255,0.06),transparent_16rem),linear-gradient(145deg,#060d24,#0b1532_52%,#11285d_100%)]">
        <div className="hero-scene-fallback-stack">
          <div className="hero-scene-fallback-slab hero-scene-fallback-slab-back" />
          <div className="hero-scene-fallback-slab hero-scene-fallback-slab-mid" />
          <div className="hero-scene-fallback-slab hero-scene-fallback-slab-front" />
          <div className="hero-scene-fallback-orb" />
          <div className="hero-scene-fallback-ring" />
        </div>
      </div>
    ),
  },
);

interface PortfolioHeroSceneProps {
  activeSlug: string;
  modes: HomeMode[];
  onActivate: (slug: string) => void;
}

export function PortfolioHeroScene({ activeSlug, modes, onActivate }: PortfolioHeroSceneProps) {
  const { locale } = useLocale();
  const copy = homeCopy[locale];
  const reduceMotion = useReducedMotion() ?? false;
  const rootRef = useRef<HTMLDivElement>(null);
  const activeMode = modes.find((mode) => mode.slug === activeSlug) ?? modes[0];
  const compactMetrics = useMemo(() => activeMode.metrics.slice(0, 3), [activeMode.metrics]);
  const modeVars = useMemo(
    () =>
      ({
        "--mode-accent": activeMode.accent,
        "--mode-accent-soft": activeMode.accentSoft,
      }) as CSSProperties,
    [activeMode.accent, activeMode.accentSoft],
  );

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from("[data-stage-reveal]", {
          duration: 0.78,
          ease: "power3.out",
          opacity: 0,
          y: 26,
          stagger: 0.08,
        });

        gsap.from(".hero-mode-trigger", {
          duration: 0.62,
          ease: "power3.out",
          opacity: 0,
          y: 18,
          stagger: 0.06,
          delay: 0.12,
        });
      });

      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.from("[data-stage-reveal]", {
          duration: 0.22,
          opacity: 0,
          stagger: 0.04,
        });
      });

      return () => {
        mm.revert();
      };
    },
    { scope: rootRef },
  );

  useEffect(() => {
    const context = gsap.context(() => {
      gsap.fromTo(
        "[data-stage-swap]",
        { opacity: 0, y: reduceMotion ? 0 : 14, filter: reduceMotion ? "blur(0px)" : "blur(6px)" },
        {
          duration: reduceMotion ? 0.16 : 0.48,
          ease: "power2.out",
          filter: "blur(0px)",
          opacity: 1,
          y: 0,
          stagger: 0.04,
        },
      );
    }, rootRef);

    return () => context.revert();
  }, [activeMode.slug, reduceMotion]);

  return (
    <div
      className="hero-stage-shell relative overflow-hidden rounded-[2.1rem] border border-[rgba(132,162,255,0.22)] p-4 md:p-5"
      ref={rootRef}
      style={modeVars}
    >
      <div className="hero-stage-grid pointer-events-none absolute inset-0 -z-10" />

      <div className="space-y-4">
        <div className="hero-stage-frame relative min-h-[27rem] overflow-hidden rounded-[1.85rem] border border-[rgba(137,171,255,0.14)] bg-[radial-gradient(circle_at_top_left,rgba(123,232,255,0.08),transparent_16rem),linear-gradient(180deg,rgba(8,17,42,0.96),rgba(5,12,30,0.96))] md:min-h-[31rem] xl:min-h-[33rem]">
          <div aria-hidden="true" className="hero-stage-scene-window">
            <div className="hero-stage-canvas-shell">
              <PortfolioHeroSceneCanvas
                activeSlug={activeMode.slug}
                accent={activeMode.accent}
                glow={activeMode.accent}
                reduceMotion={reduceMotion}
              />
            </div>
          </div>

          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(255,255,255,0.08),transparent_20rem),linear-gradient(180deg,transparent,rgba(3,8,22,0.18)_76%,rgba(3,8,22,0.58))]" />

          <div className="hero-stage-overlay left-4 top-4 md:left-5 md:top-5" data-stage-reveal>
            <p className="font-signal text-[10px] uppercase tracking-[0.2em] text-[var(--mode-accent)]">{copy.commandStageLabel}</p>
            <p className="mt-2 max-w-[18rem] text-sm leading-6 text-white/82 md:max-w-[20rem]">{activeMode.valueLine}</p>
          </div>

          <div className="hero-stage-overlay right-4 top-4 md:right-5 md:top-5" data-stage-reveal>
            <div className="hero-stage-pill-grid">
              <span className="hero-stage-pill hero-stage-pill-strong">{activeMode.label}</span>
              <span className="hero-stage-pill">{activeMode.eyebrow}</span>
            </div>
          </div>

          <div className="hero-stage-overlay bottom-4 left-4 right-4 md:bottom-5 md:left-5 md:right-5" data-stage-reveal>
            <div className="grid gap-3 md:grid-cols-3">
              {compactMetrics.map((metric) => (
                <div className="hero-stage-chip rounded-[1.1rem] px-4 py-3" key={metric.label}>
                  <p className="font-signal text-[10px] uppercase tracking-[0.16em] text-white/62">{metric.label}</p>
                  <p className="mt-2 text-sm font-semibold text-white">{metric.value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="grid gap-4 xl:auto-rows-fr xl:grid-cols-[1.06fr_0.94fr]">
          <div
            className="hero-stage-note flex min-h-[18rem] flex-col rounded-[1.5rem] border border-[rgba(131,164,255,0.14)] px-4 py-4 lg:min-h-[20.75rem] xl:h-[24rem] xl:min-h-0"
            data-stage-reveal
            data-stage-swap
          >
            <p className="font-signal text-[10px] uppercase tracking-[0.18em] text-[var(--mode-accent)]">{activeMode.label}</p>
            <h2 className="mt-3 max-w-[22ch] text-balance font-display text-[clamp(1.42rem,2vw,2.15rem)] leading-[0.96] tracking-[-0.04em] text-white">
              {activeMode.stageTitle}
            </h2>
            <p className="mt-3 max-w-[34rem] text-sm leading-7 text-[rgba(232,240,255,0.8)]">{activeMode.stageSummary}</p>
          </div>

          <div
            className="hero-stage-note flex min-h-[18rem] flex-col rounded-[1.5rem] border border-[rgba(131,164,255,0.14)] px-4 py-4 lg:min-h-[20.75rem] xl:h-[24rem] xl:min-h-0"
            data-stage-reveal
            data-stage-swap
          >
            <p className="font-signal text-[10px] uppercase tracking-[0.18em] text-[var(--mode-accent)]">{copy.currentRegisterLabel}</p>
            <p className="mt-3 max-w-[32rem] text-sm leading-7 text-[rgba(235,242,255,0.84)]">{activeMode.pulse}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {activeMode.cues.map((cue) => (
                <span
                  className="rounded-full border border-[rgba(145,180,255,0.16)] bg-[rgba(255,255,255,0.06)] px-3 py-1.5 text-xs text-white/80"
                  key={cue}
                >
                  {cue}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="grid gap-2 sm:grid-cols-2">
          {modes.map((mode) => {
            const active = mode.slug === activeSlug;

            return (
              <button
                aria-pressed={active}
                className={clsx(
                  "hero-mode-trigger cursor-pointer rounded-[1.35rem] border p-3 text-left transition-colors duration-200",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[rgba(121,170,255,0.44)] focus-visible:ring-offset-2 focus-visible:ring-offset-transparent",
                  active ? "hero-mode-trigger-active" : "",
                )}
                key={mode.slug}
                onClick={() => onActivate(mode.slug)}
                onFocus={() => onActivate(mode.slug)}
                type="button"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="font-signal text-[10px] uppercase tracking-[0.18em] text-[inherit]">{mode.label}</p>
                    <p
                      className={clsx(
                        "mt-2 text-sm leading-6",
                        active ? "text-white/84" : "text-[rgba(205,220,255,0.68)]",
                      )}
                    >
                      {mode.eyebrow}
                    </p>
                  </div>
                  <span className="hero-mode-dot mt-0.5 h-2.5 w-2.5 shrink-0 rounded-full" />
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
