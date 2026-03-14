"use client";

import type { ReactNode } from "react";
import PremiumImmersiveStage from "../components/PremiumImmersiveStage";
import PremiumScrollSequence from "../components/PremiumScrollSequence";

type ShellSection = {
  eyebrow: string;
  title: string;
  copy: string;
};

const defaultSections: ShellSection[] = [
  {
    eyebrow: "Selected work",
    title: "Stage one signature environment, not five unrelated effects.",
    copy: "Use the immersive stage as the anchor, then let the supporting sections explain work, process, and proof without competing with the hero.",
  },
  {
    eyebrow: "Scroll narrative",
    title: "Tie section rhythm to the scene instead of stacking animation for its own sake.",
    copy: "This shell works best when each section advances the story: introduction, projects, credibility, then contact or CTA.",
  },
  {
    eyebrow: "Fallback",
    title: "Keep the page valuable when the scene is simplified or disabled.",
    copy: "Reduced motion and compact viewports should still preserve hierarchy, CTA clarity, and a premium still frame.",
  },
];

export default function CanvasScrollPortfolioShell({
  eyebrow = "Premium immersive portfolio",
  title = "Build one scene worth scrolling through.",
  description = "Use a single sticky immersive stage with supporting sections that reveal the work, not a full page of competing gimmicks.",
  primaryCta = "View selected work",
  secondaryCta = "Read the story",
  proof = ["Selected projects", "Fast-loading stage", "Reduced-motion safe"],
  sections = defaultSections,
  stage,
  backdrop,
  fallback,
}: {
  eyebrow?: string;
  title?: string;
  description?: string;
  primaryCta?: string;
  secondaryCta?: string;
  proof?: string[];
  sections?: ShellSection[];
  stage?: ReactNode;
  backdrop?: ReactNode;
  fallback?: ReactNode;
}) {
  return (
    <section className="relative overflow-hidden bg-[#050814] text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(120,98,255,0.18),transparent_0,transparent_34%),radial-gradient(circle_at_bottom_right,rgba(24,210,192,0.14),transparent_0,transparent_28%)]" />

      <div className="relative">
        <div className="sticky top-0">
          <div className="mx-auto grid min-h-[100dvh] max-w-7xl gap-12 px-6 py-8 lg:grid-cols-[minmax(0,0.92fr)_minmax(420px,560px)] lg:items-center">
            <div className="relative z-10 max-w-2xl">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/6 px-4 py-2 text-xs uppercase tracking-[0.22em] text-white/70">
                <span className="h-2 w-2 rounded-full bg-[#7c5cff]" />
                {eyebrow}
              </div>

              <h1 className="mt-6 max-w-3xl text-4xl font-semibold leading-[0.95] tracking-[-0.04em] text-white sm:text-5xl lg:text-7xl">
                {title}
              </h1>

              <p className="mt-6 max-w-xl text-base leading-7 text-white/72 sm:text-lg">
                {description}
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a
                  href="#selected-work"
                  className="inline-flex items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-medium text-[#071225] transition-transform duration-300 hover:-translate-y-0.5"
                >
                  {primaryCta}
                </a>
                <a
                  href="#story"
                  className="inline-flex items-center justify-center rounded-full border border-white/16 bg-white/6 px-6 py-3 text-sm font-medium text-white/86 transition-colors duration-300 hover:bg-white/10"
                >
                  {secondaryCta}
                </a>
              </div>

              <div className="mt-8 flex flex-wrap gap-3">
                {proof.map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/68"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>

            <div className="relative z-10 lg:justify-self-end">
              <PremiumImmersiveStage scene={stage} backdrop={backdrop} fallback={fallback} />
            </div>
          </div>
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-6 pb-24 lg:-mt-24">
          <div id="selected-work" className="grid gap-5 md:grid-cols-3">
            {sections.map((section) => (
              <PremiumScrollSequence key={section.title}>
                <article
                  data-premium-reveal
                  className="rounded-[24px] border border-white/10 bg-white/[0.045] p-6 shadow-[0_18px_50px_rgba(4,10,28,0.28)] backdrop-blur-sm"
                >
                  <p className="text-xs uppercase tracking-[0.2em] text-white/45">
                    {section.eyebrow}
                  </p>
                  <h2 className="mt-3 text-xl font-medium leading-7 text-white">
                    {section.title}
                  </h2>
                  <p className="mt-4 text-sm leading-7 text-white/66">
                    {section.copy}
                  </p>
                </article>
              </PremiumScrollSequence>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
