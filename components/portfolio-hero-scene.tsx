"use client";

import { useState } from "react";
import clsx from "clsx";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "motion/react";

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
  const reduceMotion = useReducedMotion();
  const pointerX = useMotionValue(50);
  const pointerY = useMotionValue(34);
  const glowX = useSpring(pointerX, { stiffness: 120, damping: 24, mass: 0.8 });
  const glowY = useSpring(pointerY, { stiffness: 120, damping: 24, mass: 0.8 });
  const spotlight = useMotionTemplate`radial-gradient(circle at ${glowX}% ${glowY}%, rgba(110, 171, 255, 0.22), transparent 28%), radial-gradient(circle at calc(${glowX}% - 18%) calc(${glowY}% + 24%), rgba(122, 247, 255, 0.14), transparent 24%), linear-gradient(145deg, rgba(4, 8, 30, 0.98), rgba(8, 15, 44, 0.92) 52%, rgba(19, 30, 72, 0.92) 100%)`;
  const orbOneY = useTransform(pointerY, (value) => `${-6 + value * 0.08}%`);
  const orbTwoX = useTransform(pointerX, (value) => `${68 + value * 0.08}%`);

  return (
    <motion.div
      className="hero-scene relative isolate min-h-[31rem] overflow-hidden rounded-[2.3rem] border border-[rgba(124,154,255,0.24)] p-6 shadow-[0_24px_90px_rgba(6,11,36,0.24)] md:min-h-[35rem] md:p-8"
      initial={reduceMotion ? false : { opacity: 0, y: 24, scale: 0.98 }}
      onPointerLeave={() => setOffset({ x: 0, y: 0 })}
      onPointerMove={(event) => {
        const rect = event.currentTarget.getBoundingClientRect();
        const x = (event.clientX - rect.left) / rect.width - 0.5;
        const y = (event.clientY - rect.top) / rect.height - 0.5;
        setOffset({ x, y });
        pointerX.set(((event.clientX - rect.left) / rect.width) * 100);
        pointerY.set(((event.clientY - rect.top) / rect.height) * 100);
      }}
      style={reduceMotion ? undefined : { backgroundImage: spotlight }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      viewport={{ once: true, amount: 0.4 }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0, scale: 1 }}
    >
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(145deg,rgba(4,8,30,0.98),rgba(7,13,36,0.96) 48%,rgba(16,28,72,0.92) 100%)]" />
      <motion.div
        animate={reduceMotion ? undefined : { opacity: [0.22, 0.5, 0.28], scale: [1.03, 1, 1.02] }}
        aria-hidden="true"
        className="hero-energy-grid absolute inset-[7%] -z-10 rounded-[2rem]"
        initial={reduceMotion ? false : { opacity: 0.22, scale: 1.03 }}
        transition={{
          duration: 10,
          ease: "easeInOut",
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "reverse",
        }}
      />
      <motion.div
        animate={reduceMotion ? undefined : { opacity: [0.34, 0.58, 0.38], x: [-10, 24, -6] }}
        aria-hidden="true"
        className="hero-beam absolute -left-[14%] top-[12%] -z-10 h-[22rem] w-[14rem] rotate-[18deg]"
        transition={{
          duration: 12,
          ease: "easeInOut",
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "mirror",
        }}
      />
      <motion.div
        animate={reduceMotion ? undefined : { opacity: [0.2, 0.46, 0.24], x: [8, -26, 4] }}
        aria-hidden="true"
        className="hero-beam hero-beam-secondary absolute bottom-[-18%] right-[-8%] -z-10 h-[21rem] w-[13rem] rotate-[-24deg]"
        transition={{
          duration: 13,
          ease: "easeInOut",
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "mirror",
        }}
      />
      <motion.div
        aria-hidden="true"
        className="hero-orb absolute -left-[2%] top-[-6%] -z-10 h-36 w-36 rounded-full"
        style={reduceMotion ? undefined : { top: orbOneY }}
      />
      <motion.div
        aria-hidden="true"
        className="hero-orb hero-orb-secondary absolute top-[56%] -z-10 h-48 w-48 rounded-full"
        style={reduceMotion ? undefined : { left: orbTwoX }}
      />
      <div className="hero-orbit absolute left-1/2 top-1/2 -z-10 h-[22rem] w-[22rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[rgba(118,151,255,0.18)]" />
      <div className="hero-orbit hero-orbit-delayed absolute left-1/2 top-1/2 -z-10 h-[15rem] w-[15rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[rgba(255,255,255,0.08)]" />

      <div className="relative flex h-full flex-col justify-between gap-10">
        <div className="flex flex-wrap gap-2">
          <span className="rounded-full border border-[rgba(140,172,255,0.28)] bg-[rgba(8,18,48,0.82)] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-[rgb(224_236_255)]">
            Four interface modes
          </span>
          <span className="rounded-full border border-[rgba(140,172,255,0.22)] bg-[rgba(8,18,48,0.7)] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-[rgba(239,245,255,0.88)]">
            Design-led, end-to-end
          </span>
        </div>

        <div className="mx-auto max-w-sm space-y-4 text-center">
          <p className="hero-dark-kicker">Portfolio signal stage</p>
          <h2 className="font-display text-[clamp(2.25rem,5vw,4.5rem)] leading-[0.9] tracking-[-0.05em] text-white">
            One portfolio.
            <span className="block text-[rgb(160_201_255)]">Four real interface registers.</span>
          </h2>
          <p className="text-sm leading-7 text-[rgba(240,245,255,0.88)]">
            The stage turns the project line-up into a visual system: brand atmosphere, product conversion, analytics depth,
            and interactive prototype behavior.
          </p>
        </div>

        <div className="hero-axis mx-auto flex max-w-max items-center gap-3 rounded-full border border-[rgba(140,172,255,0.22)] bg-[rgba(8,18,48,0.72)] px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-[rgba(239,245,255,0.9)]">
          <span>Marketing</span>
          <i aria-hidden className="h-1 w-1 rounded-full bg-[rgba(214,225,255,0.32)]" />
          <span>Conversion</span>
          <i aria-hidden className="h-1 w-1 rounded-full bg-[rgba(214,225,255,0.32)]" />
          <span>Analytics</span>
          <i aria-hidden className="h-1 w-1 rounded-full bg-[rgba(214,225,255,0.32)]" />
          <span>Prototype</span>
        </div>

        {sceneCards.map((card) => (
          <motion.div
            aria-hidden="true"
            className={clsx(
              "hero-layer absolute w-[13rem] rounded-[1.6rem] border border-[rgba(164,196,255,0.24)] bg-[linear-gradient(180deg,rgba(255,255,255,0.16),rgba(255,255,255,0.06))] p-4 shadow-[0_24px_58px_rgba(2,6,20,0.42)] backdrop-blur-xl md:w-[14rem]",
              card.position,
            )}
            initial={reduceMotion ? false : { opacity: 0, y: 34, scale: 0.94, rotateX: 12 }}
            key={card.title}
            style={{
              transform: reduceMotion
                ? undefined
                : `translate3d(${offset.x * 42 * card.depth}px, ${offset.y * 34 * card.depth}px, 0) rotate(${offset.x * 8 * card.depth}deg)`,
            }}
            transition={{
              duration: 0.58,
              ease: "easeOut",
              delay: 0.12 + card.depth * 0.18,
            }}
            viewport={{ once: true, amount: 0.35 }}
            whileInView={reduceMotion ? undefined : { opacity: 1, y: 0, scale: 1, rotateX: 0 }}
          >
            <div className="mb-4 flex items-center justify-between">
              <div className={clsx("h-20 flex-1 rounded-[1.15rem] bg-gradient-to-br", card.tone)} />
              <div className="ml-3 h-8 w-8 rounded-full border border-[rgba(201,221,255,0.24)] bg-[rgba(255,255,255,0.06)] shadow-[0_0_18px_rgba(73,127,255,0.2)]" />
            </div>
            <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[rgba(231,239,255,0.86)]">{card.meta}</div>
            <div className="mt-2 font-display text-2xl leading-[0.95] text-white">{card.title}</div>
            <div className="mt-2 text-sm leading-6 text-[rgba(241,245,255,0.9)]">{card.value}</div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
