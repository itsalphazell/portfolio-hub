"use client";

import { useRef, type ReactNode } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { PremiumTextReveal } from "../components/PremiumTextReveal";

type EditorialShowcaseHeroProps = {
  kicker?: string;
  title?: string;
  body?: string;
  primaryLabel?: string;
  primaryHref?: string;
  secondaryLabel?: string;
  secondaryHref?: string;
  supportItems?: string[];
  visual?: ReactNode;
};

function DefaultEditorialVisual() {
  return (
    <div className="relative h-[420px] overflow-hidden rounded-[32px] border border-black/10 bg-[linear-gradient(180deg,rgba(17,17,17,0.02),rgba(17,17,17,0.08))]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_28%_22%,rgba(0,0,0,0.08),transparent_0,transparent_34%),radial-gradient(circle_at_72%_24%,rgba(184,144,76,0.28),transparent_0,transparent_28%),linear-gradient(135deg,rgba(255,255,255,0.4),rgba(255,255,255,0.05))]" />
      <div className="absolute left-8 top-8 rounded-full border border-black/10 bg-white/55 px-3 py-2 text-[11px] uppercase tracking-[0.18em] text-black/65">
        Editorial motion
      </div>
      <div className="absolute left-10 top-20 h-56 w-56 rounded-full bg-black/90 shadow-[0_30px_80px_rgba(0,0,0,0.22)]" />
      <div className="absolute left-[7.5rem] top-28 h-32 w-32 rounded-full border border-white/25 bg-[radial-gradient(circle,rgba(255,255,255,0.9),rgba(255,255,255,0.2))]" />
      <div className="absolute bottom-8 right-8 w-40 text-right text-[11px] uppercase tracking-[0.18em] text-black/50">
        one visual accent only
      </div>
    </div>
  );
}

export default function EditorialShowcaseHero({
  kicker = "Premium editorial preset",
  title = "Build premium web pages that feel composed before they feel flashy.",
  body = "Use strong typography, section rhythm, and one restrained visual accent to reach an AWWWARDS-lite finish without turning the page into a scene demo.",
  primaryLabel = "Start the hero",
  primaryHref = "#contact",
  secondaryLabel = "See the work",
  secondaryHref = "#work",
  supportItems = ["Editorial typography", "One accent visual", "Smooth-scroll optional"],
  visual,
}: EditorialShowcaseHeroProps) {
  const rootRef = useRef<HTMLElement | null>(null);

  useGSAP(() => {
    if (!rootRef.current || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return undefined;
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        "[data-editorial-copy]",
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.78,
          ease: "power3.out",
          stagger: 0.1,
        }
      );
      gsap.fromTo(
        "[data-editorial-visual]",
        { opacity: 0, x: 24, scale: 0.97 },
        {
          opacity: 1,
          x: 0,
          scale: 1,
          duration: 0.95,
          ease: "power3.out",
        }
      );
    }, rootRef);

    return () => ctx.revert();
  }, { scope: rootRef });

  return (
    <section
      ref={rootRef}
      className="relative overflow-hidden bg-[#e7e3db] text-[#101010]"
    >
      <div className="mx-auto grid min-h-[min(100vh,920px)] max-w-7xl items-end gap-10 px-6 py-10 sm:px-8 lg:grid-cols-[minmax(0,0.95fr)_minmax(360px,0.9fr)] lg:px-12 lg:py-14">
        <div className="max-w-3xl pb-6 lg:pb-12">
          <div
            className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white/60 px-4 py-2 text-xs uppercase tracking-[0.18em] text-black/65 backdrop-blur"
            data-editorial-copy
          >
            <span className="h-2 w-2 rounded-full bg-[#b8904c]" />
            {kicker}
          </div>
          <div data-editorial-copy>
            <PremiumTextReveal className="mt-6 max-w-[10ch] text-5xl font-semibold leading-[0.9] tracking-[-0.06em] text-black md:text-7xl lg:text-[5.6rem]">
              {title}
            </PremiumTextReveal>
          </div>
          <p
            className="mt-6 max-w-2xl text-base leading-7 text-black/68 sm:text-lg"
            data-editorial-copy
          >
            {body}
          </p>
          <div className="mt-8 flex flex-wrap gap-3" data-editorial-copy>
            <a
              className="rounded-full bg-black px-5 py-3 text-sm font-medium text-white transition-transform hover:-translate-y-0.5 sm:px-6 sm:text-base"
              href={primaryHref}
            >
              {primaryLabel}
            </a>
            <a
              className="rounded-full border border-black/15 px-5 py-3 text-sm font-medium text-black/80 transition-colors hover:bg-black/5 sm:px-6 sm:text-base"
              href={secondaryHref}
            >
              {secondaryLabel}
            </a>
          </div>
          <div className="mt-8 flex flex-wrap gap-2 text-xs text-black/58 sm:text-sm" data-editorial-copy>
            {supportItems.map((item) => (
              <span
                key={item}
                className="rounded-full border border-black/10 bg-white/50 px-3 py-2"
              >
                {item}
              </span>
            ))}
          </div>
        </div>

        <div className="relative lg:pb-8" data-editorial-visual>
          {visual ?? <DefaultEditorialVisual />}
        </div>
      </div>
    </section>
  );
}
