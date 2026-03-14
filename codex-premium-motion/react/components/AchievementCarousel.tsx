"use client";

import { useState } from "react";

type AchievementItem = {
  id: string;
  title: string;
  label: string;
  body: string;
  year?: string;
};

type AchievementCarouselProps = {
  items?: AchievementItem[];
  className?: string;
};

const defaultItems: AchievementItem[] = [
  {
    id: "1",
    title: "Security engineering",
    label: "Specialization",
    body: "Use this module to present certifications, trust markers, or technical milestones without falling back to a dead grid.",
    year: "2026",
  },
  {
    id: "2",
    title: "Audit depth",
    label: "Practice",
    body: "Rotate the spotlight between a small set of achievements and keep the copy dense, factual, and easy to scan.",
    year: "2025",
  },
  {
    id: "3",
    title: "Production signal",
    label: "Portfolio",
    body: "The component works best on personal sites, trust sections, and premium resumes where proof needs more structure than a badge wall.",
    year: "2024",
  },
];

export function AchievementCarousel({ items = defaultItems, className = "" }: AchievementCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  const previous = () => {
    setActiveIndex((index) => (index === 0 ? items.length - 1 : index - 1));
  };

  const next = () => {
    setActiveIndex((index) => (index === items.length - 1 ? 0 : index + 1));
  };

  return (
    <section className={`overflow-hidden rounded-[2rem] border border-cyan-400/16 bg-[#050816] px-6 py-8 text-white shadow-[0_35px_120px_rgba(2,6,23,0.58)] ${className}`}>
      <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
        <div className="max-w-2xl">
          <span className="inline-flex rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.28em] text-cyan-200">
            Achievement carousel
          </span>
          <h2 className="mt-4 text-4xl font-semibold tracking-tight md:text-5xl">Present proof like a spotlight, not like a wall of badges.</h2>
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={previous}
            className="rounded-full border border-white/12 bg-white/[0.04] px-4 py-2 text-sm text-slate-200 transition hover:bg-white/[0.08]"
          >
            Prev
          </button>
          <button
            type="button"
            onClick={next}
            className="rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-2 text-sm font-medium text-cyan-100 transition hover:bg-cyan-400/16"
          >
            Next
          </button>
        </div>
      </div>

      <div className="grid gap-5 lg:grid-cols-[minmax(0,1.1fr)_320px] lg:items-center">
        <div className="relative min-h-[22rem]">
          {items.map((item, index) => {
            const offset = index - activeIndex;
            const isActive = offset === 0;
            return (
              <article
                key={item.id}
                className="absolute inset-x-0 rounded-[1.75rem] border border-white/10 bg-[linear-gradient(180deg,rgba(15,23,42,0.9),rgba(2,6,23,0.96))] p-6 backdrop-blur transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
                style={{
                  top: `${Math.max(index, 0) * 1.1}rem`,
                  transform: `translateX(${Math.max(0, offset) * 2.6}rem) rotate(${offset * 1.8}deg) scale(${isActive ? 1 : Math.max(0.86, 1 - Math.abs(offset) * 0.06)})`,
                  opacity: isActive ? 1 : Math.max(0.32, 0.82 - Math.abs(offset) * 0.16),
                  zIndex: items.length - index,
                }}
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="text-xs font-semibold uppercase tracking-[0.28em] text-cyan-200">{item.label}</div>
                    <h3 className="mt-3 text-2xl font-semibold tracking-tight text-white">{item.title}</h3>
                  </div>
                  {item.year ? (
                    <span className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-2 text-xs uppercase tracking-[0.22em] text-slate-400">
                      {item.year}
                    </span>
                  ) : null}
                </div>
                <p className="mt-5 max-w-xl text-sm leading-7 text-slate-300">{item.body}</p>
              </article>
            );
          })}
        </div>

        <div className="grid gap-3">
          {items.map((item, index) => {
            const isActive = index === activeIndex;
            return (
              <button
                key={item.id}
                type="button"
                onMouseEnter={() => setActiveIndex(index)}
                onFocus={() => setActiveIndex(index)}
                className={`rounded-2xl border px-4 py-4 text-left transition ${
                  isActive
                    ? "border-cyan-400/28 bg-cyan-400/10"
                    : "border-white/8 bg-white/[0.03] hover:border-white/14 hover:bg-white/[0.06]"
                }`}
              >
                <div className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-400">{item.label}</div>
                <div className="mt-2 text-lg font-semibold text-white">{item.title}</div>
                {item.year ? <div className="mt-2 text-xs uppercase tracking-[0.22em] text-slate-500">{item.year}</div> : null}
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
