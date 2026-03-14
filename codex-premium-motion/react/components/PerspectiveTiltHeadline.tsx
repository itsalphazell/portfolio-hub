"use client"

import { useMemo, useState } from "react"

interface PerspectiveTiltHeadlineProps {
  kicker?: string
  headline?: string
  supportingLine?: string
  className?: string
}

export function PerspectiveTiltHeadline({
  kicker = "Premium motion",
  headline = "Build depth into the headline before you add spectacle",
  supportingLine = "Use perspective and layered type to make the first message feel tactile without hiding the CTA.",
  className = "",
}: PerspectiveTiltHeadlineProps) {
  const [rotation, setRotation] = useState({ x: 0, y: 0 })

  const layers = useMemo(
    () => [
      { label: kicker.toUpperCase(), depth: 18, opacity: 0.22 },
      { label: headline, depth: 42, opacity: 1 },
      { label: supportingLine, depth: 12, opacity: 0.72 },
    ],
    [headline, kicker, supportingLine],
  )

  const handlePointerMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect()
    const relativeX = (event.clientX - rect.left) / rect.width - 0.5
    const relativeY = (event.clientY - rect.top) / rect.height - 0.5
    setRotation({
      x: relativeY * -12,
      y: relativeX * 16,
    })
  }

  const resetRotation = () => setRotation({ x: 0, y: 0 })

  return (
    <div
      className={className}
      onMouseMove={handlePointerMove}
      onMouseLeave={resetRotation}
      style={{ perspective: "1400px" }}
    >
      <div
        className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-slate-950/80 px-8 py-10 text-white shadow-[0_40px_120px_rgba(15,23,42,0.45)]"
        style={{
          transformStyle: "preserve-3d",
          transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
          transition: "transform 180ms cubic-bezier(0.22, 1, 0.36, 1)",
        }}
      >
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(148,163,184,0.18),transparent_40%),radial-gradient(circle_at_bottom_right,rgba(99,102,241,0.16),transparent_38%)]" />
        <div className="relative flex flex-col gap-4">
          {layers.map((layer, index) => (
            <div
              key={`${layer.label}-${index}`}
              style={{
                transform: `translateZ(${layer.depth}px)`,
                opacity: layer.opacity,
              }}
            >
              {index === 0 ? (
                <span className="text-xs font-semibold uppercase tracking-[0.32em] text-slate-300">{layer.label}</span>
              ) : null}
              {index === 1 ? (
                <h2 className="max-w-4xl text-balance text-4xl font-semibold leading-[0.95] text-white md:text-6xl">
                  {layer.label}
                </h2>
              ) : null}
              {index === 2 ? (
                <p className="max-w-2xl text-base leading-7 text-slate-300 md:text-lg">{layer.label}</p>
              ) : null}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
