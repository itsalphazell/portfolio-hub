"use client"

import { useEffect, useRef } from "react"

interface LayeredParallaxSceneProps {
  className?: string
}

export function LayeredParallaxScene({ className = "" }: LayeredParallaxSceneProps) {
  const rootRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const root = rootRef.current
    if (!root) {
      return
    }

    const layers = Array.from(root.querySelectorAll<HTMLElement>("[data-depth]"))

    const update = () => {
      const rect = root.getBoundingClientRect()
      const progress = Math.max(0, Math.min(1, (window.innerHeight - rect.top) / (window.innerHeight + rect.height)))
      layers.forEach((layer) => {
        const depth = Number(layer.dataset.depth || 0)
        const offset = (progress - 0.5) * depth * 160
        layer.style.transform = `translate3d(0, ${offset}px, 0)`
      })
    }

    update()
    window.addEventListener("scroll", update, { passive: true })
    window.addEventListener("resize", update)
    return () => {
      window.removeEventListener("scroll", update)
      window.removeEventListener("resize", update)
    }
  }, [])

  return (
    <section
      ref={rootRef}
      className={`relative overflow-hidden rounded-[2rem] border border-white/10 bg-slate-950 px-6 py-24 text-white shadow-[0_40px_140px_rgba(2,6,23,0.55)] ${className}`}
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(148,163,184,0.16),transparent_32%),radial-gradient(circle_at_bottom_right,rgba(56,189,248,0.14),transparent_38%)]" />
      <div className="relative min-h-[32rem]">
        <div data-depth="0.12" className="absolute inset-x-[10%] top-[8%] h-40 rounded-full bg-sky-300/12 blur-3xl" />
        <div data-depth="0.28" className="absolute right-[8%] top-[18%] h-48 w-48 rounded-[2rem] border border-white/10 bg-white/5 backdrop-blur-sm" />
        <div data-depth="0.18" className="absolute left-[12%] top-[24%] max-w-xl">
          <span className="inline-flex rounded-full border border-white/12 bg-white/6 px-4 py-2 text-xs font-semibold uppercase tracking-[0.32em] text-slate-200">
            Layered parallax scene
          </span>
          <h2 className="mt-5 max-w-[12ch] text-4xl font-semibold tracking-tight md:text-6xl">Build depth from layers before you reach for a full scene.</h2>
          <p className="mt-4 max-w-xl text-base leading-7 text-slate-300 md:text-lg">
            This module gives premium-web and static immersive pages more spatial feel without forcing a React canvas or 3D object into the layout.
          </p>
        </div>
        <div data-depth="0.42" className="absolute bottom-[12%] right-[14%] h-72 w-72 rounded-full border border-cyan-300/15 bg-cyan-400/8 blur-2xl" />
        <div data-depth="0.22" className="absolute bottom-[10%] left-[10%] h-44 w-44 rounded-[2rem] bg-gradient-to-br from-indigo-400/18 via-transparent to-cyan-400/10 shadow-[0_24px_80px_rgba(59,130,246,0.25)]" />
      </div>
    </section>
  )
}
