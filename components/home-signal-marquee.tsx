"use client";

import { motion, useReducedMotion } from "motion/react";

interface HomeSignalMarqueeProps {
  items: string[];
}

const repeated = (items: string[]) => [...items, ...items];

export function HomeSignalMarquee({ items }: HomeSignalMarqueeProps) {
  const reduceMotion = useReducedMotion();
  const marqueeItems = repeated(items);

  return (
    <div className="wow-marquee relative overflow-hidden rounded-[2rem] border border-[rgba(92,130,255,0.24)] bg-[linear-gradient(135deg,rgba(10,18,50,0.96),rgba(16,27,66,0.92))] px-4 py-4 md:px-6">
      <div className="wow-marquee-scan pointer-events-none absolute inset-y-0 left-[-22%] w-1/3" />
      {reduceMotion ? (
        <div className="relative z-10 flex flex-wrap gap-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-[rgba(240,245,255,0.92)]">
          {items.map((item) => (
            <span
              className="rounded-full border border-[rgba(134,168,255,0.24)] bg-[rgba(7,16,44,0.82)] px-3 py-1.5"
              key={item}
            >
              {item}
            </span>
          ))}
        </div>
      ) : (
        <div className="relative z-10 overflow-hidden">
          <motion.div
            animate={{ x: ["0%", "-50%"] }}
            className="flex w-max gap-2 pr-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-[rgba(240,245,255,0.92)]"
            transition={{
              duration: 20,
              ease: "linear",
              repeat: Number.POSITIVE_INFINITY,
            }}
          >
            {marqueeItems.map((item, index) => (
              <span
                className="whitespace-nowrap rounded-full border border-[rgba(134,168,255,0.24)] bg-[rgba(7,16,44,0.82)] px-3 py-1.5 shadow-[0_0_24px_rgba(74,120,255,0.12)]"
                key={`${item}-${index}`}
              >
                {item}
              </span>
            ))}
          </motion.div>
        </div>
      )}
    </div>
  );
}
