"use client";

import type { CSSProperties } from "react";
import clsx from "clsx";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useLocale } from "@/components/locale-provider";
import { homeCopy } from "@/lib/locale-data";
import type { HomeMode } from "@/lib/types";

interface PortfolioHeroSceneProps {
  activeSlug: string;
  modes: HomeMode[];
  onActivate: (slug: string) => void;
}

function getModeVars(mode: HomeMode) {
  return {
    "--mode-accent": mode.accent,
    "--mode-accent-soft": mode.accentSoft,
  } as CSSProperties;
}

export function PortfolioHeroScene({ activeSlug, modes, onActivate }: PortfolioHeroSceneProps) {
  const { locale } = useLocale();
  const copy = homeCopy[locale];
  const reduceMotion = useReducedMotion();
  const activeMode = modes.find((mode) => mode.slug === activeSlug) ?? modes[0];

  return (
    <motion.div
      className="hero-stage-shell relative overflow-hidden rounded-[2.1rem] border border-[rgba(132,162,255,0.2)] p-4 md:p-5"
      initial={reduceMotion ? false : { opacity: 0, y: 20, scale: 0.985 }}
      style={getModeVars(activeMode)}
      transition={{ duration: 0.5 }}
      viewport={{ once: true, amount: 0.35 }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0, scale: 1 }}
    >
      <div className="hero-stage-grid pointer-events-none absolute inset-0 -z-10" />
      {reduceMotion ? null : (
        <motion.div
          animate={{ x: ["-10%", "18%", "-2%"], opacity: [0.4, 0.7, 0.46] }}
          className="hero-stage-ambient pointer-events-none absolute inset-y-[-16%] right-[8%] -z-10 w-[44%]"
          transition={{
            duration: 14,
            ease: "easeInOut",
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "mirror",
          }}
        />
      )}

      <div className="space-y-4">
        <div className="grid gap-2 sm:grid-cols-2">
          {modes.map((mode) => {
            const active = mode.slug === activeSlug;

            return (
              <motion.button
                className={clsx(
                  "hero-mode-trigger cursor-pointer rounded-[1.25rem] border p-3 text-left",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[rgba(121,170,255,0.44)] focus-visible:ring-offset-2 focus-visible:ring-offset-transparent",
                  active && "hero-mode-trigger-active",
                )}
                key={mode.slug}
                onClick={() => onActivate(mode.slug)}
                onFocus={() => onActivate(mode.slug)}
                onMouseEnter={() => onActivate(mode.slug)}
                type="button"
                whileHover={reduceMotion ? undefined : { y: -2 }}
                whileTap={reduceMotion ? undefined : { scale: 0.985 }}
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="font-signal text-[10px] uppercase tracking-[0.18em] text-[inherit]">{mode.label}</p>
                    <p className={clsx("mt-2 text-sm leading-6", active ? "text-white/78" : "text-[rgba(205,220,255,0.68)]")}>
                      {mode.eyebrow}
                    </p>
                  </div>
                  <span className="hero-mode-dot mt-0.5 h-2.5 w-2.5 rounded-full" />
                </div>
              </motion.button>
            );
          })}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            className="hero-stage-surface relative overflow-hidden rounded-[1.7rem] border border-[rgba(131,164,255,0.16)] p-5 md:p-6"
            initial={reduceMotion ? { opacity: 1 } : { opacity: 0, y: 16 }}
            key={activeMode.slug}
            transition={{ duration: 0.35, ease: "easeOut" }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduceMotion ? { opacity: 1 } : { opacity: 0, y: -10 }}
            style={getModeVars(activeMode)}
          >
            <div className="grid gap-5 xl:grid-cols-[0.8fr_1.2fr]">
              <div className="space-y-4">
                <div>
                  <p className="font-signal text-[10px] uppercase tracking-[0.2em] text-[var(--mode-accent)]">{activeMode.eyebrow}</p>
                  <h2 className="mt-3 font-display text-[clamp(2rem,4vw,3.25rem)] leading-[0.92] tracking-[-0.05em] text-white">
                    {activeMode.stageTitle}
                  </h2>
                  <p className="mt-3 text-sm leading-7 text-[rgba(228,238,255,0.8)]">{activeMode.stageSummary}</p>
                </div>

                <div className="grid gap-3">
                  {activeMode.metrics.map((metric) => (
                    <div className="hero-stage-metric rounded-[1.15rem] border px-4 py-3" key={metric.label}>
                      <p className="font-signal text-[10px] uppercase tracking-[0.18em] text-[rgba(206,223,255,0.74)]">{metric.label}</p>
                      <p className="mt-2 text-base font-semibold text-white">{metric.value}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid gap-4">
                <div className="hero-stage-preview rounded-[1.5rem] border border-[rgba(131,164,255,0.16)] p-4 md:p-5">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <p className="font-signal text-[10px] uppercase tracking-[0.18em] text-[var(--mode-accent)]">
                        {copy.commandStageLabel}
                      </p>
                      <p className="mt-2 text-lg font-semibold tracking-[-0.03em] text-white">{activeMode.valueLine}</p>
                    </div>
                    <span className="rounded-full border border-[rgba(131,164,255,0.18)] bg-[rgba(8,18,48,0.78)] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-white/86">
                      {activeMode.label}
                    </span>
                  </div>

                  <div className="mt-5 grid gap-3 md:grid-cols-3">
                    {activeMode.modules.map((module) => (
                      <div className="hero-stage-mini-panel rounded-[1.2rem] border p-4" key={module.label}>
                        <p className="font-signal text-[10px] uppercase tracking-[0.18em] text-[rgba(214,228,255,0.7)]">{module.label}</p>
                        <p className="mt-2 text-base font-semibold text-white">{module.value}</p>
                        <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-[rgba(255,255,255,0.08)]">
                          <div className="hero-stage-meter h-full rounded-full" />
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-4 grid gap-3">
                    {activeMode.cues.map((cue, index) => (
                      <div className="hero-stage-rail rounded-[1.1rem] border px-4 py-3" key={cue}>
                        <div className="flex items-center gap-3">
                          <span className="hero-stage-index flex h-7 w-7 items-center justify-center rounded-full text-xs font-semibold text-white">
                            0{index + 1}
                          </span>
                          <p className="text-sm leading-6 text-[rgba(234,242,255,0.84)]">{cue}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="hero-stage-footer grid gap-3 sm:grid-cols-[1.08fr_0.92fr]">
                  <div className="rounded-[1.25rem] border border-[rgba(131,164,255,0.14)] bg-[rgba(8,18,48,0.7)] px-4 py-4">
                    <p className="font-signal text-[10px] uppercase tracking-[0.18em] text-[var(--mode-accent)]">
                      {copy.currentRegisterLabel}
                    </p>
                    <p className="mt-2 text-sm leading-6 text-[rgba(233,241,255,0.82)]">{activeMode.pulse}</p>
                  </div>
                  <div className="rounded-[1.25rem] border border-[rgba(131,164,255,0.14)] bg-[rgba(8,18,48,0.62)] px-4 py-4">
                    <p className="font-signal text-[10px] uppercase tracking-[0.18em] text-[rgba(214,228,255,0.72)]">
                      {copy.linkedCaseLabel}
                    </p>
                    <p className="mt-2 text-lg font-semibold text-white">{activeMode.label}</p>
                    <p className="mt-1 text-sm text-[rgba(214,228,255,0.72)]">{activeMode.modules[0]?.value}</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
