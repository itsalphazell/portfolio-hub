"use client"

import { useMemo, useState } from "react"

interface PointerMediaItem {
  id: string
  title: string
  eyebrow: string
  image: string
}

interface PointerMediaRevealProps {
  items?: PointerMediaItem[]
  className?: string
}

const defaultItems: PointerMediaItem[] = [
  {
    id: "1",
    title: "Launch direction",
    eyebrow: "Campaign",
    image: "https://images.unsplash.com/photo-1516321497487-e288fb19713f?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: "2",
    title: "Product detail",
    eyebrow: "Showcase",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: "3",
    title: "Editorial motion",
    eyebrow: "Story",
    image: "https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=900&q=80",
  },
]

export function PointerMediaReveal({ items = defaultItems, className = "" }: PointerMediaRevealProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(0)
  const [pointer, setPointer] = useState({ x: 50, y: 50 })

  const activeItem = useMemo(() => {
    if (activeIndex === null) {
      return items[0]
    }
    return items[activeIndex] ?? items[0]
  }, [activeIndex, items])

  const handleMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect()
    const x = ((event.clientX - rect.left) / rect.width) * 100
    const y = ((event.clientY - rect.top) / rect.height) * 100
    setPointer({ x, y })
  }

  return (
    <section
      className={`relative overflow-hidden rounded-[2rem] border border-white/10 bg-slate-950 px-6 py-8 text-white shadow-[0_40px_120px_rgba(2,6,23,0.5)] ${className}`}
      onMouseMove={handleMove}
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(99,102,241,0.16),transparent_35%),radial-gradient(circle_at_bottom_right,rgba(56,189,248,0.14),transparent_38%)]" />
      <div className="relative grid gap-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-center">
        <div className="space-y-3">
          <span className="inline-flex rounded-full border border-white/12 bg-white/6 px-4 py-2 text-xs font-semibold uppercase tracking-[0.32em] text-slate-200">
            Pointer media reveal
          </span>
          <div className="space-y-2">
            {items.map((item, index) => {
              const isActive = index === activeIndex
              return (
                <button
                  key={item.id}
                  type="button"
                  onMouseEnter={() => setActiveIndex(index)}
                  onFocus={() => setActiveIndex(index)}
                  className={`block w-full rounded-2xl border px-5 py-4 text-left transition ${
                    isActive
                      ? "border-white/16 bg-white/10 text-white"
                      : "border-white/8 bg-white/[0.03] text-slate-300 hover:border-white/14 hover:bg-white/8"
                  }`}
                >
                  <div className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-400">{item.eyebrow}</div>
                  <div className="mt-2 text-2xl font-semibold tracking-tight">{item.title}</div>
                </button>
              )
            })}
          </div>
        </div>

        <div className="relative min-h-[24rem] overflow-hidden rounded-[1.75rem] border border-white/10 bg-black/30">
          <div className="absolute inset-0">
            <img src={activeItem.image} alt={activeItem.title} className="h-full w-full object-cover opacity-30" />
          </div>
          <div
            className="absolute h-52 w-52 -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-full border border-white/20 shadow-[0_20px_80px_rgba(15,23,42,0.55)] transition-transform duration-200"
            style={{
              left: `${pointer.x}%`,
              top: `${pointer.y}%`,
            }}
          >
            <img src={activeItem.image} alt={activeItem.title} className="h-full w-full object-cover" />
          </div>
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950 via-slate-950/70 to-transparent px-6 py-6">
            <div className="text-xs font-semibold uppercase tracking-[0.32em] text-slate-400">{activeItem.eyebrow}</div>
            <div className="mt-2 text-2xl font-semibold text-white">{activeItem.title}</div>
            <p className="mt-2 max-w-md text-sm leading-7 text-slate-300">
              Use this when one visual should react to pointer intent without committing the page to a full immersive stage.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
