"use client"

import { useMemo, useState } from "react"

interface ProductBlurSlide {
  id: string
  name: string
  description: string
  price: string
  image: string
  accent: string
}

interface ProductBlurSliderProps {
  slides?: ProductBlurSlide[]
  className?: string
}

const defaultSlides: ProductBlurSlide[] = [
  {
    id: "1",
    name: "QuietComfort Ultra",
    description: "Spatial audio earbuds with active noise cancelling and a hero image that needs room to breathe.",
    price: "$279",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=900&q=80",
    accent: "from-slate-200 via-slate-400 to-slate-600",
  },
  {
    id: "2",
    name: "Open Ear Studio",
    description: "Open-fit audio hardware presented like a premium campaign slide instead of a plain carousel.",
    price: "$299",
    image: "https://images.unsplash.com/photo-1518444065439-e933c06ce9cd?auto=format&fit=crop&w=900&q=80",
    accent: "from-cyan-200 via-sky-300 to-blue-500",
  },
  {
    id: "3",
    name: "Carbon Monitor",
    description: "A product story card with depth, blur, and clear buying context under motion.",
    price: "$605",
    image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=900&q=80",
    accent: "from-orange-200 via-amber-300 to-rose-500",
  },
]

export function ProductBlurSlider({ slides = defaultSlides, className = "" }: ProductBlurSliderProps) {
  const [activeIndex, setActiveIndex] = useState(0)
  const total = slides.length

  const orderedSlides = useMemo(() => {
    return slides.map((slide, index) => {
      const delta = (index - activeIndex + total) % total
      return { slide, delta }
    })
  }, [activeIndex, slides, total])

  const goNext = () => setActiveIndex((current) => (current + 1) % total)
  const goPrev = () => setActiveIndex((current) => (current - 1 + total) % total)

  return (
    <section className={`relative overflow-hidden rounded-[2rem] border border-white/10 bg-[#050816] px-6 py-8 text-white shadow-[0_40px_140px_rgba(2,6,23,0.55)] ${className}`}>
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(99,102,241,0.18),transparent_35%),radial-gradient(circle_at_bottom_right,rgba(14,165,233,0.14),transparent_40%)]" />
      <div className="relative flex flex-col gap-8 lg:min-h-[34rem] lg:flex-row lg:items-center lg:justify-between">
        <div className="max-w-xl space-y-5">
          <span className="inline-flex rounded-full border border-white/12 bg-white/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.32em] text-slate-200">
            Product campaign preset
          </span>
          <div className="space-y-3">
            <h2 className="text-4xl font-semibold tracking-tight md:text-5xl">{slides[activeIndex].name}</h2>
            <p className="text-base leading-7 text-slate-300 md:text-lg">{slides[activeIndex].description}</p>
          </div>
          <div className="flex items-center gap-5">
            <div className="text-3xl font-semibold text-white">{slides[activeIndex].price}</div>
            <button className="rounded-full border border-white/15 bg-white/8 px-5 py-3 text-sm font-medium text-white transition hover:bg-white/14">
              Explore product
            </button>
          </div>
          <div className="flex items-center gap-3 pt-4">
            <button
              type="button"
              onClick={goPrev}
              className="rounded-full border border-white/12 bg-white/6 px-4 py-2 text-sm text-slate-200 transition hover:bg-white/12"
            >
              Prev
            </button>
            <button
              type="button"
              onClick={goNext}
              className="rounded-full border border-white/12 bg-white/6 px-4 py-2 text-sm text-slate-200 transition hover:bg-white/12"
            >
              Next
            </button>
          </div>
        </div>

        <div className="relative min-h-[22rem] flex-1 overflow-visible">
          {orderedSlides.map(({ slide, delta }) => {
            const isActive = delta === 0
            const isNext = delta === 1
            const isTail = delta > 1
            return (
              <article
                key={slide.id}
                className="absolute inset-0 flex items-center justify-center transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
                style={{
                  transform: isActive
                    ? "translateX(-12%) scale(1.55)"
                    : isNext
                      ? "translateX(18%) scale(1.1)"
                      : `translateX(${22 + delta * 6}%) scale(${Math.max(0.68, 1 - delta * 0.12)})`,
                  opacity: isActive ? 0 : isNext ? 1 : Math.max(0.2, 0.72 - delta * 0.16),
                  filter: isActive ? "blur(22px)" : isNext ? "blur(0px)" : `blur(${Math.min(12, delta * 4)}px)`,
                  zIndex: isActive ? 1 : isNext ? 3 : Math.max(1, 4 - delta),
                }}
              >
                <div
                  className={`absolute inset-10 rounded-full bg-gradient-to-br ${slide.accent} blur-3xl`}
                  style={{ opacity: isNext ? 0.55 : 0.2 }}
                />
                <img
                  src={slide.image}
                  alt={slide.name}
                  className={`relative max-h-[20rem] w-auto rounded-[1.5rem] object-cover shadow-[0_35px_120px_rgba(2,6,23,0.45)] ${isTail ? 'opacity-85' : ''}`}
                />
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
