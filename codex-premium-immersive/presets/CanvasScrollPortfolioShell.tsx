"use client";

import type { ReactNode } from "react";

export default function CanvasScrollPortfolioShell({
  eyebrow = "Premium immersive portfolio",
  title = "Build one scene worth scrolling through.",
  description = "Use a single sticky immersive stage with supporting sections that reveal the work, not a full page of competing gimmicks.",
  primaryCta = "View selected work",
  secondaryCta = "Read the story",
  primaryHref = "#selected-work",
  secondaryHref = "#story",
  proof = ["Selected projects", "Fast-loading stage", "Reduced-motion safe"],
  introAside,
  storyHeading,
  story,
  renderStage,
  stageAside,
}: {
  eyebrow?: string;
  title?: string;
  description?: string;
  primaryCta?: string;
  secondaryCta?: string;
  primaryHref?: string;
  secondaryHref?: string;
  proof?: string[];
  introAside?: ReactNode;
  storyHeading?: ReactNode;
  story?: ReactNode;
  renderStage?: () => ReactNode;
  stageAside?: ReactNode;
}) {
  return (
    <section className="relative rounded-[2.8rem] border border-white/10 bg-[#050814] text-white shadow-[0_32px_96px_rgba(2,8,28,0.34)]">
      <div className="absolute inset-0 overflow-hidden rounded-[2.8rem]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(120,98,255,0.18),transparent_0,transparent_34%),radial-gradient(circle_at_bottom_right,rgba(24,210,192,0.14),transparent_0,transparent_28%)]" />
      </div>

      <div className="relative mx-auto grid max-w-7xl gap-8 px-6 py-8 lg:grid-cols-[minmax(0,0.76fr)_minmax(480px,0.94fr)] lg:gap-10 lg:px-8 lg:py-10">
        <div className="space-y-8">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/6 px-4 py-2 text-xs uppercase tracking-[0.22em] text-white/72">
              <span className="h-2 w-2 rounded-full bg-[#7c5cff]" />
              {eyebrow}
            </div>

            <div className="space-y-4">
              <h1 className="max-w-3xl text-4xl font-semibold leading-[0.95] tracking-[-0.04em] text-white sm:text-5xl lg:text-[clamp(4rem,6vw,6.6rem)]">
                {title}
              </h1>
              <p className="max-w-xl text-base leading-7 text-white/72 sm:text-lg">{description}</p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <a
                className="inline-flex items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-medium text-[#071225] transition-transform duration-300 hover:-translate-y-0.5"
                href={primaryHref}
              >
                {primaryCta}
              </a>
              <a
                className="inline-flex items-center justify-center rounded-full border border-white/16 bg-white/6 px-6 py-3 text-sm font-medium text-white/86 transition-colors duration-300 hover:bg-white/10"
                href={secondaryHref}
              >
                {secondaryCta}
              </a>
            </div>

            <div className="flex flex-wrap gap-3">
              {proof.map((item) => (
                <span
                  className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/68"
                  key={item}
                >
                  {item}
                </span>
              ))}
            </div>
          </div>

          {renderStage ? <div className="lg:hidden">{renderStage()}</div> : null}

          {introAside ? <div>{introAside}</div> : null}

          {storyHeading ? (
            <div className="rounded-[1.8rem] border border-white/10 bg-white/[0.045] p-6 shadow-[0_18px_50px_rgba(4,10,28,0.22)]">
              {storyHeading}
            </div>
          ) : null}

          {story ? (
            <div className="space-y-5" id="story">
              {story}
            </div>
          ) : null}
        </div>

        <div className="hidden space-y-5 lg:sticky lg:top-24 lg:block lg:self-start">
          {renderStage ? renderStage() : null}
          {stageAside ? <div>{stageAside}</div> : null}
        </div>
      </div>
    </section>
  );
}
