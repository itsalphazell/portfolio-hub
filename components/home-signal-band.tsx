"use client";

import clsx from "clsx";
import { motion, useReducedMotion } from "motion/react";
import { useLocale } from "@/components/locale-provider";
import { homeCopy } from "@/lib/locale-data";
import type { HomeMode } from "@/lib/types";

interface HomeSignalBandProps {
  items: HomeMode[];
  activeSlug: string;
  onSelect: (slug: string) => void;
}

export function HomeSignalBand({ items, activeSlug, onSelect }: HomeSignalBandProps) {
  const { locale } = useLocale();
  const copy = homeCopy[locale];
  const reduceMotion = useReducedMotion();
  const activeItem = items.find((item) => item.slug === activeSlug) ?? items[0];

  return (
    <div className="signal-band-shell relative overflow-hidden rounded-[1.8rem] border border-[rgba(94,124,214,0.14)] px-4 py-4 md:px-5">
      {reduceMotion ? null : <div className="signal-band-pulse pointer-events-none absolute inset-y-0 left-0 w-1/3" />}
      <div className="relative z-10 grid gap-4 lg:grid-cols-[1fr_auto] lg:items-center">
        <div className="flex flex-wrap gap-2">
          {items.map((item) => {
            const active = item.slug === activeSlug;

            return (
              <motion.button
                className={clsx(
                  "cursor-pointer rounded-full border px-3 py-2 text-left transition-colors duration-200",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[rgba(111,158,255,0.42)] focus-visible:ring-offset-2 focus-visible:ring-offset-transparent",
                  active
                    ? "border-[rgba(112,163,255,0.42)] bg-[rgba(10,21,52,0.94)] text-white shadow-[0_14px_30px_rgba(9,20,56,0.24)]"
                    : "border-[rgba(101,122,188,0.16)] bg-white/72 text-ink hover:border-[rgba(112,163,255,0.28)] hover:bg-white",
                )}
                key={item.slug}
                onClick={() => onSelect(item.slug)}
                type="button"
                whileHover={reduceMotion ? undefined : { y: -2 }}
                whileTap={reduceMotion ? undefined : { scale: 0.98 }}
              >
                <span className="font-signal text-[10px] uppercase tracking-[0.18em] text-[inherit]">{item.label}</span>
                <span className={clsx("mt-1 block text-xs", active ? "text-white/76" : "text-muted")}>{item.eyebrow}</span>
              </motion.button>
            );
          })}
        </div>

        <motion.div
          animate={reduceMotion ? undefined : { opacity: [0.9, 1, 0.92] }}
          className="rounded-[1.3rem] border border-[rgba(101,122,188,0.16)] bg-[rgba(255,255,255,0.72)] px-4 py-3"
          transition={reduceMotion ? undefined : { duration: 4.5, ease: "easeInOut", repeat: Number.POSITIVE_INFINITY }}
        >
          <p className="font-signal text-[10px] uppercase tracking-[0.18em] text-accent-deep">{copy.currentSignalLabel}</p>
          <p className="mt-2 max-w-xl text-sm leading-6 text-muted">{activeItem.pulse}</p>
        </motion.div>
      </div>
    </div>
  );
}
