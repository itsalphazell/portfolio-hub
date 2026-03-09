"use client";

import { useState } from "react";
import clsx from "clsx";

const sceneCards = [
  {
    title: "Coconut Paradise Spa",
    meta: "Hospitality / marketing",
    value: "Premium service brand",
    tone: "from-[rgba(255,188,129,0.85)] to-[rgba(235,150,96,0.22)]",
    position: "left-[8%] top-[10%] md:left-[6%] md:top-[12%]",
    depth: 0.65,
  },
  {
    title: "AnimAid",
    meta: "Product landing",
    value: "Conversion-led AI flow",
    tone: "from-[rgba(42,91,255,0.88)] to-[rgba(42,91,255,0.18)]",
    position: "right-[7%] top-[18%] md:right-[10%] md:top-[10%]",
    depth: 0.35,
  },
  {
    title: "DashboardMeta",
    meta: "Analytics app",
    value: "Meta Ads + profit operations",
    tone: "from-[rgba(38,211,156,0.8)] to-[rgba(38,211,156,0.16)]",
    position: "left-[10%] bottom-[16%] md:left-[14%] md:bottom-[10%]",
    depth: 0.45,
  },
  {
    title: "Signal Desk",
    meta: "Interactive prototype",
    value: "Product UI depth and state",
    tone: "from-[rgba(16,36,95,0.9)] to-[rgba(16,36,95,0.18)]",
    position: "right-[8%] bottom-[12%] md:right-[12%] md:bottom-[8%]",
    depth: 0.75,
  },
];

export function PortfolioHeroScene() {
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  return (
    <div
      className="hero-scene relative isolate min-h-[30rem] overflow-hidden rounded-[2.3rem] border border-[rgba(22,17,13,0.08)] bg-[linear-gradient(135deg,rgba(255,255,255,0.82),rgba(255,248,242,0.64))] p-6 md:min-h-[34rem] md:p-8"
      onPointerLeave={() => setOffset({ x: 0, y: 0 })}
      onPointerMove={(event) => {
        const rect = event.currentTarget.getBoundingClientRect();
        const x = (event.clientX - rect.left) / rect.width - 0.5;
        const y = (event.clientY - rect.top) / rect.height - 0.5;
        setOffset({ x, y });
      }}
    >
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_20%_20%,rgba(42,91,255,0.2),transparent_28%),radial-gradient(circle_at_78%_24%,rgba(255,188,129,0.24),transparent_30%),linear-gradient(180deg,rgba(255,255,255,0.42),transparent)]" />
      <div className="hero-grid absolute inset-[10%] -z-10 rounded-[2rem]" />
      <div className="hero-orbit absolute left-1/2 top-1/2 -z-10 h-[22rem] w-[22rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[rgba(16,36,95,0.08)]" />
      <div className="hero-orbit hero-orbit-delayed absolute left-1/2 top-1/2 -z-10 h-[15rem] w-[15rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[rgba(22,17,13,0.08)]" />

      <div className="relative flex h-full flex-col justify-between gap-10">
        <div className="flex flex-wrap gap-2">
          <span className="rounded-full border border-[rgba(22,17,13,0.08)] bg-white/84 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-accent-deep">
            Four interface modes
          </span>
          <span className="rounded-full border border-[rgba(22,17,13,0.08)] bg-white/78 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-muted">
            Design-led, end-to-end
          </span>
        </div>

        <div className="mx-auto max-w-sm space-y-4 text-center">
          <p className="section-kicker">Portfolio signal stage</p>
          <h2 className="font-display text-[clamp(2.25rem,5vw,4.5rem)] leading-[0.9] tracking-[-0.05em] text-ink">
            One portfolio.
            <span className="block text-accent-deep">Four real interface registers.</span>
          </h2>
          <p className="text-sm leading-7 text-muted">
            The stage turns the project line-up into a visual system: brand atmosphere, product conversion, analytics depth,
            and interactive prototype behavior.
          </p>
        </div>

        <div className="hero-axis mx-auto flex max-w-max items-center gap-3 rounded-full border border-[rgba(22,17,13,0.08)] bg-white/84 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-muted">
          <span>Marketing</span>
          <i aria-hidden className="h-1 w-1 rounded-full bg-[rgba(22,17,13,0.2)]" />
          <span>Conversion</span>
          <i aria-hidden className="h-1 w-1 rounded-full bg-[rgba(22,17,13,0.2)]" />
          <span>Analytics</span>
          <i aria-hidden className="h-1 w-1 rounded-full bg-[rgba(22,17,13,0.2)]" />
          <span>Prototype</span>
        </div>

        {sceneCards.map((card) => (
          <div
            aria-hidden="true"
            className={clsx(
              "hero-layer absolute w-[13rem] rounded-[1.6rem] border border-white/60 bg-white/78 p-4 shadow-[0_20px_44px_rgba(18,15,12,0.12)] backdrop-blur-xl md:w-[14rem]",
              card.position,
            )}
            key={card.title}
            style={{
              transform: `translate3d(${offset.x * 34 * card.depth}px, ${offset.y * 28 * card.depth}px, 0) rotate(${offset.x * 7 * card.depth}deg)`,
            }}
          >
            <div className={clsx("mb-4 h-20 rounded-[1.15rem] bg-gradient-to-br", card.tone)} />
            <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-muted">{card.meta}</div>
            <div className="mt-2 font-display text-2xl leading-[0.95] text-ink">{card.title}</div>
            <div className="mt-2 text-sm leading-6 text-muted">{card.value}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
