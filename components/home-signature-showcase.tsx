"use client";

import { startTransition, useMemo, useRef, useState, type CSSProperties } from "react";
import Link from "next/link";
import clsx from "clsx";
import { ArrowRight, ArrowUpRight, Sparkles } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useReducedMotion } from "motion/react";
import { HeroAccentLine } from "@/components/hero-accent-line";
import { PortfolioHeroScene } from "@/components/portfolio-hero-scene";
import { ProjectCard } from "@/components/project-card";
import { useLocale } from "@/components/locale-provider";
import { homeCopy, homeModesByLocale, homeStageChaptersByLocale } from "@/lib/locale-data";
import type { Locale, ProjectFrontmatter } from "@/lib/types";

gsap.registerPlugin(useGSAP, ScrollTrigger);

interface HomeSignatureShowcaseProps {
  featuredProjectsByLocale: Record<Locale, ProjectFrontmatter[]>;
}

export function HomeSignatureShowcase({ featuredProjectsByLocale }: HomeSignatureShowcaseProps) {
  const { locale } = useLocale();
  const reduceMotion = useReducedMotion() ?? false;
  const rootRef = useRef<HTMLElement>(null);
  const copy = homeCopy[locale];
  const homeModes = homeModesByLocale[locale];
  const chapters = homeStageChaptersByLocale[locale];
  const [activeSlug, setActiveSlug] = useState<string>(chapters[0]?.slug ?? homeModes[0].slug);
  const featuredProjects = featuredProjectsByLocale[locale];
  const activeMode = homeModes.find((item) => item.slug === activeSlug) ?? homeModes[0];
  const activeChapter = chapters.find((chapter) => chapter.slug === activeSlug) ?? chapters[0];
  const orderedProjects = useMemo(
    () =>
      homeModes
        .map((mode) => featuredProjects.find((project) => project.slug === mode.slug))
        .filter((project): project is ProjectFrontmatter => Boolean(project)),
    [featuredProjects, homeModes],
  );

  const handleActivate = (slug: string) => {
    startTransition(() => {
      setActiveSlug(slug);
    });

    const chapterNode = rootRef.current?.querySelector<HTMLElement>(`[data-home-chapter][data-slug="${slug}"]`);
    chapterNode?.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "center" });
  };

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      const chapterNodes = gsap.utils.toArray<HTMLElement>("[data-home-chapter]");
      const triggers = chapterNodes.map((node) =>
        ScrollTrigger.create({
          trigger: node,
          start: "top 58%",
          end: "bottom 42%",
          onEnter: () => setActiveSlug(node.dataset.slug || chapters[0].slug),
          onEnterBack: () => setActiveSlug(node.dataset.slug || chapters[0].slug),
        }),
      );

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from("[data-home-intro]", {
          duration: 0.85,
          ease: "power3.out",
          opacity: 0,
          y: 28,
          stagger: 0.08,
        });

        gsap.from("[data-home-stage-intro]", {
          duration: 0.72,
          ease: "power3.out",
          opacity: 0,
          y: 22,
          stagger: 0.08,
          scrollTrigger: {
            trigger: "[data-home-stage-shell]",
            start: "top 82%",
          },
        });

        gsap.from(".home-stage-chapter", {
          duration: 0.72,
          ease: "power3.out",
          opacity: 0,
          y: 30,
          stagger: 0.12,
          scrollTrigger: {
            trigger: "[data-home-stage-narrative]",
            start: "top 76%",
          },
        });

        gsap.from(".featured-project-card", {
          duration: 0.78,
          ease: "power3.out",
          opacity: 0,
          y: 34,
          stagger: 0.1,
          scrollTrigger: {
            trigger: "[data-home-featured-grid]",
            start: "top 82%",
          },
        });
      });

      return () => {
        triggers.forEach((trigger) => trigger.kill());
        mm.revert();
      };
    },
    { scope: rootRef, dependencies: [chapters, reduceMotion] },
  );

  return (
    <section className="space-y-16" ref={rootRef}>
      <section className="page-shell home-canvas-intro-shell overflow-hidden rounded-[2.75rem] border border-[rgba(62,93,176,0.12)] px-6 py-8 md:px-8 md:py-10">
        <div className="grid gap-8 xl:grid-cols-[0.96fr_1.04fr] xl:items-end">
          <div className="space-y-6">
            <div
              className="inline-flex max-w-fit items-center gap-2 rounded-full border border-[rgba(118,157,255,0.18)] bg-white/86 px-4 py-2 text-sm text-ink shadow-[0_12px_28px_rgba(8,15,34,0.06)]"
              data-home-intro
            >
              <Sparkles className="h-4 w-4 text-accent" />
              {copy.badge}
            </div>
            <div className="space-y-4">
              <p className="section-kicker" data-home-intro>
                {copy.kicker}
              </p>
              <h1 className="section-title max-w-[11ch] text-balance text-ink" data-home-intro>
                {copy.heroTitle}
                <HeroAccentLine key={activeMode.slug}>{activeMode.heroLine}</HeroAccentLine>
              </h1>
              <p className="max-w-[38rem] text-lg leading-8 text-muted" data-home-intro>
                {copy.heroBody}
              </p>
            </div>
            <div className="flex flex-wrap gap-3" data-home-intro>
              <Link
                className="cta-electric inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-semibold transition-transform duration-200 hover:-translate-y-0.5"
                href="/work"
              >
                {copy.heroPrimaryCta}
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                className="inline-flex items-center gap-2 rounded-full border border-[rgba(44,69,132,0.12)] bg-white/86 px-5 py-3 text-sm font-semibold text-ink transition-transform duration-200 hover:-translate-y-0.5"
                href="/contact"
              >
                {copy.heroSecondaryCta}
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-[1.02fr_0.98fr]">
            <div className="canvas-intro-proof-panel" data-home-intro>
              <p className="font-signal text-[10px] uppercase tracking-[0.2em] text-accent-deep">{copy.currentSignalLabel}</p>
              <h2 className="mt-4 max-w-[12ch] font-display text-[clamp(1.85rem,3vw,2.8rem)] leading-[0.96] tracking-[-0.04em] text-ink">
                {copy.stageNarrativeTitle}
              </h2>
              <p className="mt-4 max-w-[32rem] text-base leading-7 text-muted">{copy.stageNarrativeBody}</p>
              <div className="mt-5 flex flex-wrap gap-2">
                {activeMode.modules.map((module) => (
                  <span className="canvas-inline-pill" key={module.label}>
                    {module.label}: {module.value}
                  </span>
                ))}
              </div>
            </div>

            <div className="grid gap-3" data-home-intro>
              {copy.capabilities.map((capability) => (
                <div className="canvas-intro-capability" key={capability.label}>
                  <p className="font-signal text-[10px] uppercase tracking-[0.18em] text-accent-deep">{capability.label}</p>
                  <p className="mt-3 text-sm leading-6 text-ink">{capability.body}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section
        className="page-shell canvas-scroll-shell overflow-hidden rounded-[2.9rem] border border-[rgba(66,96,175,0.12)] px-6 py-8 md:px-8 md:py-10"
        data-audit-bg="rgba(7,16,43,1)"
        data-audit-overlay-root
        data-home-stage-shell
      >
        <div className="grid gap-8 xl:grid-cols-[0.88fr_1.12fr] xl:items-start">
          <div className="order-2 space-y-4 xl:order-1" data-home-stage-narrative>
            <div className="space-y-3 pb-3" data-home-stage-intro>
              <p className="hero-dark-kicker">{copy.stageNarrativeKicker}</p>
              <h2 className="section-subtitle max-w-[16ch] text-balance text-white">{copy.stageNarrativeTitle}</h2>
              <p className="max-w-[34rem] text-base leading-7 text-white/74">{copy.stageNarrativeBody}</p>
            </div>

            {chapters.map((chapter) => {
              const active = chapter.slug === activeSlug;
              const chapterMode = homeModes.find((mode) => mode.slug === chapter.slug) ?? activeMode;

              return (
                <article
                  className={clsx("home-stage-chapter", active ? "home-stage-chapter-active" : "")}
                  data-audit-overlay-root
                  data-home-chapter
                  data-slug={chapter.slug}
                  key={chapter.slug}
                  style={{ "--mode-accent": chapterMode.accent, "--chapter-accent": chapterMode.accent } as CSSProperties}
                >
                  <button
                    className="block w-full cursor-pointer text-left"
                    onClick={() => handleActivate(chapter.slug)}
                    type="button"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="min-w-0">
                        <p className="font-signal text-[10px] uppercase tracking-[0.2em] text-[var(--chapter-accent,#9fb7ff)]">
                          {chapter.chapter} / {chapter.chapterLabel}
                        </p>
                        <h3 className="mt-4 max-w-[18ch] text-balance font-display text-[clamp(1.7rem,2.4vw,2.5rem)] leading-[0.97] tracking-[-0.04em] text-white">
                          {chapter.headline}
                        </h3>
                        <p className="mt-4 max-w-[34rem] text-sm leading-7 text-white/72">{chapter.body}</p>
                      </div>
                      <span className="home-stage-chapter-dot mt-1 h-3 w-3 shrink-0 rounded-full" />
                    </div>
                    <div className="mt-5 flex flex-wrap items-center gap-3">
                      <span className="home-stage-value-chip">{chapter.valueCue}</span>
                      <span className="inline-flex items-center gap-2 text-sm font-semibold text-white/82">
                        {copy.linkedCaseCta}
                        <ArrowUpRight className="h-4 w-4" />
                      </span>
                    </div>
                  </button>
                </article>
              );
            })}
          </div>

          <div className="order-1 xl:order-2">
            <PortfolioHeroScene
              activeChapter={activeChapter}
              activeSlug={activeSlug}
              modes={homeModes}
              onActivate={handleActivate}
            />
          </div>
        </div>
      </section>

      <section className="page-shell space-y-7" data-home-featured-section>
        <div className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_20rem] xl:items-end">
          <div className="space-y-3">
            <p className="section-kicker">{copy.featuredKicker}</p>
            <h2 className="section-subtitle max-w-[18ch] text-balance">{copy.featuredTitle}</h2>
            <p className="max-w-[42rem] text-base leading-7 text-muted">{copy.featuredBody}</p>
          </div>
          <div className="featured-current-panel rounded-[1.6rem] border border-[rgba(63,91,170,0.12)] bg-[linear-gradient(180deg,rgba(255,255,255,0.96),rgba(244,248,255,0.92))] p-5 shadow-[0_18px_42px_rgba(14,18,36,0.08)]">
            <p className="font-signal text-[10px] uppercase tracking-[0.18em] text-accent-deep">{copy.currentSignalLabel}</p>
            <p className="mt-3 text-sm leading-7 text-muted">{activeMode.pulse}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {activeMode.cues.map((cue) => (
                <span
                  className="rounded-full border border-[rgba(63,91,170,0.12)] bg-white px-3 py-1.5 text-xs font-medium text-ink"
                  key={cue}
                >
                  {cue}
                </span>
              ))}
            </div>
            <Link className="mt-4 inline-flex text-sm font-semibold text-accent-deep underline underline-offset-4" href="/work">
              {copy.featuredArchiveLink}
            </Link>
          </div>
        </div>

        <div className="grid gap-6 xl:grid-cols-2" data-home-featured-grid>
          {orderedProjects.map((project) => (
            <ProjectCard
              active={project.slug === activeSlug}
              key={project.slug}
              onActivate={() => handleActivate(project.slug)}
              project={project}
              variant="featured"
            />
          ))}
        </div>
      </section>
    </section>
  );
}
