"use client"

import { useState } from "react"

interface CardShowcaseItem {
  id: string
  title: string
  label: string
  body: string
}

interface CardShowcaseStackProps {
  items?: CardShowcaseItem[]
  className?: string
}

const defaultItems: CardShowcaseItem[] = [
  {
    id: "1",
    title: "Launch narrative",
    label: "Campaign",
    body: "Use one hero card to anchor the story, then let secondary cards support the scroll instead of competing with it.",
  },
  {
    id: "2",
    title: "Feature reveal",
    label: "Product",
    body: "Card stacks work well when the page needs depth and hierarchy but cannot support a full scene or object pipeline.",
  },
  {
    id: "3",
    title: "Proof block",
    label: "Premium web",
    body: "The stack creates visual pacing and keeps supporting information feeling designed rather than list-like.",
  },
  {
    id: "4",
    title: "Offer framing",
    label: "Conversion",
    body: "Keep the active card readable and keep the stack secondary to the CTA and the core message.",
  },
]

export function CardShowcaseStack({ items = defaultItems, className = "" }: CardShowcaseStackProps) {
  const [activeIndex, setActiveIndex] = useState(0)

  return (
    <section className={`overflow-hidden rounded-[2rem] border border-white/10 bg-slate-950 px-6 py-8 text-white shadow-[0_40px_120px_rgba(2,6,23,0.5)] ${className}`}>
      <div className="mb-6 max-w-2xl">
        <span className="inline-flex rounded-full border border-white/12 bg-white/6 px-4 py-2 text-xs font-semibold uppercase tracking-[0.32em] text-slate-200">
          Card showcase stack
        </span>
        <h2 className="mt-4 text-4xl font-semibold tracking-tight md:text-5xl">Build a premium section from depth, not from a scene.</h2>
      </div>

      <div className="grid gap-5 lg:grid-cols-2 lg:items-center">
        <div className="relative min-h-[24rem]">
          {items.map((item, index) => {
            const offset = index - activeIndex
            const isActive = offset === 0
            return (
              <article
                key={item.id}
                className="absolute left-0 right-8 rounded-[1.75rem] border border-white/10 bg-white/[0.05] p-6 backdrop-blur-sm transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
                style={{
                  top: `${index * 1.2}rem`,
                  transform: `translateX(${Math.max(0, offset) * 2.8}rem) rotate(${offset * 2.4}deg) scale(${isActive ? 1 : Math.max(0.82, 1 - Math.abs(offset) * 0.06)})`,
                  opacity: isActive ? 1 : Math.max(0.35, 0.82 - Math.abs(offset) * 0.18),
                  zIndex: items.length - index,
                }}
              >
                <div className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-400">{item.label}</div>
                <h3 className="mt-3 text-2xl font-semibold tracking-tight">{item.title}</h3>
                <p className="mt-4 text-sm leading-7 text-slate-300">{item.body}</p>
              </article>
            )
          })}
        </div>

        <div className="grid gap-3">
          {items.map((item, index) => {
            const isActive = index === activeIndex
            return (
              <button
                key={item.id}
                type="button"
                onMouseEnter={() => setActiveIndex(index)}
                onFocus={() => setActiveIndex(index)}
                className={`rounded-2xl border px-5 py-4 text-left transition ${
                  isActive
                    ? "border-white/18 bg-white/10"
                    : "border-white/8 bg-white/[0.03] hover:border-white/14 hover:bg-white/[0.06]"
                }`}
              >
                <div className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-400">{item.label}</div>
                <div className="mt-2 text-xl font-semibold text-white">{item.title}</div>
              </button>
            )
          })}
        </div>
      </div>
    </section>
  )
}
