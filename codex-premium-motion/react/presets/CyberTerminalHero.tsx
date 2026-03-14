"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

type CyberTerminalHeroProps = {
  kicker?: string;
  title?: string;
  body?: string;
  primaryLabel?: string;
  primaryHref?: string;
  secondaryLabel?: string;
  secondaryHref?: string;
  metrics?: Array<{ label: string; value: string }>;
};

const defaultMetrics = [
  { label: "Threat hunts", value: "124" },
  { label: "Critical fixes", value: "18" },
  { label: "Systems covered", value: "42" },
];

export default function CyberTerminalHero({
  kicker = "Technical premium preset",
  title = "Build a cyber portfolio hero that feels live without becoming effect spam.",
  body = "Use one terminal-led stage, clear proof metrics, and restrained neon motion to create a high-signal technical identity for security, infrastructure, or developer-facing brands.",
  primaryLabel = "View case studies",
  primaryHref = "#work",
  secondaryLabel = "Open contact",
  secondaryHref = "#contact",
  metrics = defaultMetrics,
}: CyberTerminalHeroProps) {
  const rootRef = useRef<HTMLElement | null>(null);

  useGSAP(
    () => {
      if (!rootRef.current || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        return undefined;
      }

      const ctx = gsap.context(() => {
        gsap.fromTo(
          "[data-cyber-copy]",
          { opacity: 0, y: 18 },
          {
            opacity: 1,
            y: 0,
            duration: 0.72,
            ease: "power3.out",
            stagger: 0.08,
          }
        );

        gsap.fromTo(
          "[data-cyber-panel]",
          { opacity: 0, x: 28, scale: 0.98 },
          {
            opacity: 1,
            x: 0,
            scale: 1,
            duration: 0.9,
            ease: "power3.out",
          }
        );

        gsap.to("[data-cyber-line]", {
          backgroundPositionX: "160%",
          duration: 3.6,
          repeat: -1,
          ease: "none",
          stagger: 0.18,
        });
      }, rootRef);

      return () => ctx.revert();
    },
    { scope: rootRef }
  );

  return (
    <section
      ref={rootRef}
      className="overflow-hidden bg-[#050816] text-white"
    >
      <div className="mx-auto grid min-h-[min(100vh,920px)] max-w-7xl items-center gap-10 px-6 py-10 sm:px-8 lg:grid-cols-[minmax(0,0.95fr)_minmax(360px,0.88fr)] lg:px-12 lg:py-14">
        <div className="max-w-3xl">
          <div
            className="inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-2 text-xs uppercase tracking-[0.22em] text-cyan-200"
            data-cyber-copy
          >
            <span className="h-2 w-2 rounded-full bg-emerald-300 shadow-[0_0_14px_rgba(110,231,183,0.95)]" />
            {kicker}
          </div>
          <h1
            className="mt-6 max-w-[11ch] text-5xl font-semibold leading-[0.92] tracking-[-0.06em] text-white md:text-7xl lg:text-[5.6rem]"
            data-cyber-copy
          >
            {title}
          </h1>
          <p
            className="mt-6 max-w-2xl text-base leading-7 text-slate-300 sm:text-lg"
            data-cyber-copy
          >
            {body}
          </p>
          <div className="mt-8 flex flex-wrap gap-3" data-cyber-copy>
            <a
              href={primaryHref}
              className="rounded-full bg-cyan-300 px-5 py-3 text-sm font-semibold text-slate-950 transition-transform hover:-translate-y-0.5 sm:px-6 sm:text-base"
            >
              {primaryLabel}
            </a>
            <a
              href={secondaryHref}
              className="rounded-full border border-white/14 bg-white/5 px-5 py-3 text-sm font-medium text-white/88 transition-colors hover:bg-white/10 sm:px-6 sm:text-base"
            >
              {secondaryLabel}
            </a>
          </div>
          <div className="mt-8 grid gap-3 sm:grid-cols-3" data-cyber-copy>
            {metrics.map((metric) => (
              <div
                key={metric.label}
                className="rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-4 backdrop-blur"
              >
                <div className="text-[11px] uppercase tracking-[0.24em] text-slate-400">{metric.label}</div>
                <div className="mt-2 text-2xl font-semibold text-white">{metric.value}</div>
              </div>
            ))}
          </div>
        </div>

        <div
          className="relative overflow-hidden rounded-[32px] border border-cyan-400/18 bg-[radial-gradient(circle_at_top,rgba(34,211,238,0.16),transparent_0,transparent_38%),linear-gradient(180deg,rgba(5,8,22,0.98),rgba(3,7,18,0.94))] p-5 shadow-[0_40px_120px_rgba(2,6,23,0.72)]"
          data-cyber-panel
        >
          <div className="flex items-center justify-between rounded-2xl border border-white/8 bg-white/[0.03] px-4 py-3 text-[11px] uppercase tracking-[0.24em] text-slate-400">
            <div className="flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full bg-rose-400" />
              <span className="h-2.5 w-2.5 rounded-full bg-amber-300" />
              <span className="h-2.5 w-2.5 rounded-full bg-emerald-300" />
            </div>
            <span>terminal/session.secure</span>
          </div>
          <div className="mt-4 rounded-[28px] border border-white/8 bg-[#020617] p-5">
            <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.24em] text-slate-500">
              <span className="rounded-full border border-cyan-400/20 bg-cyan-400/8 px-2 py-1 text-cyan-200">status</span>
              <span>Monitoring active</span>
            </div>
            <div className="mt-5 space-y-3">
              {[
                "$ scan --surface premium-web",
                "> motion pack: online",
                "> qa pack: reduced-motion-safe",
                "> output: high-signal technical identity",
              ].map((line) => (
                <div
                  key={line}
                  className="relative overflow-hidden rounded-2xl border border-white/8 bg-white/[0.03] px-4 py-3 text-sm text-slate-200"
                  data-cyber-line
                  style={{
                    backgroundImage:
                      "linear-gradient(110deg,transparent 0%,transparent 30%,rgba(34,211,238,0.16) 48%,transparent 64%,transparent 100%)",
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "220% 100%",
                    backgroundPositionX: "-120%",
                  }}
                >
                  {line}
                </div>
              ))}
            </div>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              <div className="rounded-2xl border border-white/8 bg-cyan-400/[0.08] px-4 py-4">
                <div className="text-[11px] uppercase tracking-[0.22em] text-cyan-200">Live signal</div>
                <div className="mt-2 text-xl font-semibold text-white">Terminal-led hero</div>
                <p className="mt-2 text-sm leading-6 text-slate-300">
                  Best for security, infra, and technical founder brands that need a stronger visual identity than a plain editorial hero.
                </p>
              </div>
              <div className="rounded-2xl border border-white/8 bg-white/[0.03] px-4 py-4">
                <div className="text-[11px] uppercase tracking-[0.22em] text-slate-400">Guardrails</div>
                <ul className="mt-2 space-y-2 text-sm leading-6 text-slate-300">
                  <li>One hero spectacle only</li>
                  <li>Readable CTA zone</li>
                  <li>No fake command spam</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
