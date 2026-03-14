"use client";

import { startTransition, useMemo, useRef, useState, type CSSProperties } from "react";
import Link from "next/link";
import clsx from "clsx";
import { ArrowUpRight } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import PremiumScrollSequence from "@/codex-premium-immersive/components/PremiumScrollSequence";
import CanvasScrollPortfolioShell from "@/codex-premium-immersive/presets/CanvasScrollPortfolioShell";
import { PortfolioHeroScene } from "@/components/portfolio-hero-scene";
import { ProjectCard } from "@/components/project-card";
import { useLocale } from "@/components/locale-provider";
import { homeCopy, homeModesByLocale, homeStageChaptersByLocale } from "@/lib/locale-data";
import type { Locale, ProjectFrontmatter } from "@/lib/types";

gsap.registerPlugin(useGSAP, ScrollTrigger);

interface HomeSignatureShowcaseProps {
  featuredProjectsByLocale: Record<Locale, ProjectFrontmatter[]>;
}

interface ActivateOptions {
  scroll?: boolean;
}

export function HomeSignatureShowcase({ featuredProjectsByLocale }: HomeSignatureShowcaseProps) {
  const { locale } = useLocale();
  const rootRef = useRef<HTMLElement>(null);
  const copy = homeCopy[locale];
  const homeModes = homeModesByLocale[locale];
  const chapters = homeStageChaptersByLocale[locale];
  const featuredProjects = featuredProjectsByLocale[locale];
  const [activeSlug, setActiveSlug] = useState<string>(chapters[0]?.slug ?? homeModes[0].slug);

  const orderedProjects = useMemo(
    () =>
      homeModes
        .map((mode) => featuredProjects.find((project) => project.slug === mode.slug))
        .filter((project): project is ProjectFrontmatter => Boolean(project)),
    [featuredProjects, homeModes],
  );

  const activeMode = homeModes.find((item) => item.slug === activeSlug) ?? homeModes[0];
  const activeChapter = chapters.find((chapter) => chapter.slug === activeSlug) ?? chapters[0];

  const scrollToChapter = (slug: string) => {
    if (typeof window === "undefined") {
      return;
    }

    const chapterNode = rootRef.current?.querySelector<HTMLElement>(`[data-home-chapter][data-slug="${slug}"]`);
    if (!chapterNode) {
      return;
    }

    const offset = window.innerWidth >= 1024 ? 128 : 92;
    const top = chapterNode.getBoundingClientRect().top + window.scrollY - offset;
    const prefersReducedMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;
    window.scrollTo({ top, behavior: prefersReducedMotion ? "auto" : "smooth" });
  };

  const handleActivate = (slug: string, options: ActivateOptions = {}) => {
    startTransition(() => {
      setActiveSlug(slug);
    });

    if (options.scroll) {
      scrollToChapter(slug);
    }
  };

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      const chapterNodes = gsap.utils.toArray<HTMLElement>("[data-home-chapter]");

      const syncActiveSlug = (slug: string) => {
        setActiveSlug((current) => (current === slug ? current : slug));
      };

      const desktopTriggers: ScrollTrigger[] = [];
      const mobileTriggers: ScrollTrigger[] = [];

      mm.add("(min-width: 1024px)", () => {
        chapterNodes.forEach((node) => {
          desktopTriggers.push(
            ScrollTrigger.create({
              trigger: node,
              start: "top center+=40",
              end: "bottom center-=40",
              onToggle: (self) => {
                if (self.isActive && node.dataset.slug) {
                  syncActiveSlug(node.dataset.slug);
                }
              },
            }),
          );
        });

        gsap.from("[data-shell-intro]", {
          duration: 0.8,
          ease: "power3.out",
          opacity: 0,
          y: 28,
          stagger: 0.08,
        });

        gsap.from("[data-shell-stage]", {
          duration: 0.9,
          ease: "power3.out",
          opacity: 0,
          y: 30,
        });

        gsap.from("[data-home-featured-head]", {
          duration: 0.78,
          ease: "power3.out",
          opacity: 0,
          y: 26,
          scrollTrigger: {
            trigger: "[data-home-featured-section]",
            start: "top 82%",
          },
        });

        gsap.from(".featured-project-card", {
          duration: 0.76,
          ease: "power3.out",
          opacity: 0,
          y: 32,
          stagger: 0.1,
          scrollTrigger: {
            trigger: "[data-home-featured-grid]",
            start: "top 82%",
          },
        });
      });

      mm.add("(max-width: 1023px)", () => {
        chapterNodes.forEach((node) => {
          mobileTriggers.push(
            ScrollTrigger.create({
              trigger: node,
              start: "top 72%",
              end: "bottom 36%",
              onEnter: () => {
                if (node.dataset.slug) {
                  syncActiveSlug(node.dataset.slug);
                }
              },
              onEnterBack: () => {
                if (node.dataset.slug) {
                  syncActiveSlug(node.dataset.slug);
                }
              },
            }),
          );
        });
      });

      return () => {
        desktopTriggers.forEach((trigger) => trigger.kill());
        mobileTriggers.forEach((trigger) => trigger.kill());
        mm.revert();
      };
    },
    { scope: rootRef, dependencies: [locale] },
  );

  return (
    <section className="space-y-20" ref={rootRef}>
      <section className="page-shell" data-home-shell>
        <CanvasScrollPortfolioShell
          description={copy.heroBody}
          eyebrow={copy.badge}
          introAside={
            <div className="grid gap-4 xl:grid-cols-[1.02fr_0.98fr]" style={{ "--mode-accent": activeMode.accent } as CSSProperties}>
              <div className="canvas-intro-proof-panel rounded-[1.8rem] p-6 shadow-[0_18px_42px_rgba(14,18,36,0.08)]" data-shell-intro>
                <p className="font-signal text-[10px] uppercase tracking-[0.2em] text-[var(--mode-accent)]">
                  {copy.currentSignalLabel}
                </p>
                <h2 className="mt-4 max-w-[12ch] font-display text-[clamp(1.9rem,3vw,2.8rem)] leading-[0.96] tracking-[-0.04em] text-white">
                  {activeMode.stageTitle}
                </h2>
                <p className="mt-4 max-w-[34rem] text-base leading-7 text-white/74">{activeMode.pulse}</p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {activeMode.modules.map((module) => (
                    <span className="canvas-inline-pill canvas-inline-pill-dark" key={module.label}>
                      {module.label}: {module.value}
                    </span>
                  ))}
                </div>
              </div>

              <div className="grid gap-3" data-shell-intro>
                {copy.capabilities.map((capability) => (
                  <div className="canvas-intro-capability rounded-[1.6rem] p-5 shadow-[0_18px_42px_rgba(14,18,36,0.08)]" key={capability.label}>
                    <p className="font-signal text-[10px] uppercase tracking-[0.18em] text-white/58">{capability.label}</p>
                    <p className="mt-3 text-sm leading-6 text-white/86">{capability.body}</p>
                  </div>
                ))}
              </div>
            </div>
          }
          primaryCta={copy.heroPrimaryCta}
          primaryHref="#selected-work"
          proof={activeMode.cues}
          secondaryCta={copy.heroSecondaryCta}
          secondaryHref="/contact"
          renderStage={() => (
            <div data-shell-stage>
              <PortfolioHeroScene
                activeChapter={activeChapter}
                activeSlug={activeSlug}
                modes={homeModes}
                onActivate={handleActivate}
              />
            </div>
          )}
          story={
            <>
              {chapters.map((chapter) => {
                const active = chapter.slug === activeSlug;
                const chapterMode = homeModes.find((mode) => mode.slug === chapter.slug) ?? activeMode;

                return (
                  <PremiumScrollSequence key={chapter.slug}>
                    <article
                      className={clsx("canvas-story-card", active ? "canvas-story-card-active" : "")}
                      data-home-chapter
                      data-premium-reveal
                      data-slug={chapter.slug}
                      style={{ "--mode-accent": chapterMode.accent } as CSSProperties}
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="min-w-0">
                          <p className="font-signal text-[10px] uppercase tracking-[0.2em] text-[var(--mode-accent)]">
                            {chapter.chapter} / {chapter.chapterLabel}
                          </p>
                          <h3 className="mt-5 max-w-[16ch] text-balance font-display text-[clamp(2rem,2.8vw,3.2rem)] leading-[0.97] tracking-[-0.045em] text-white">
                            {chapter.headline}
                          </h3>
                        </div>
                        <span className="canvas-story-card-dot h-3 w-3 shrink-0 rounded-full" />
                      </div>

                      <div className="mt-6 grid gap-5 lg:grid-cols-[1.08fr_0.92fr]">
                        <p className="max-w-[36rem] text-base leading-8 text-white/74">{chapter.body}</p>
                        <div className="space-y-4 rounded-[1.55rem] border border-white/10 bg-white/[0.045] p-5">
                          <p className="font-signal text-[10px] uppercase tracking-[0.18em] text-white/56">
                            {copy.currentRegisterLabel}
                          </p>
                          <p className="text-sm leading-7 text-white/82">{chapter.valueCue}</p>
                          <div className="flex flex-wrap gap-2">
                            {chapterMode.metrics.slice(0, 3).map((metric) => (
                              <span className="canvas-inline-pill canvas-inline-pill-dark" key={metric.label}>
                                {metric.label}: {metric.value}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>

                      <div className="mt-6 flex flex-wrap items-center gap-3">
                        <button
                          aria-pressed={active}
                          className={clsx("story-sync-button", active ? "story-sync-button-active" : "")}
                          onClick={() => handleActivate(chapter.slug)}
                          type="button"
                        >
                          {active ? copy.currentSignalLabel : copy.commandStageLabel}
                        </button>
                        <Link
                          className="inline-flex items-center gap-2 text-sm font-semibold text-white underline underline-offset-4"
                          href={`/work/${chapter.slug}`}
                        >
                          {copy.linkedCaseCta}
                          <ArrowUpRight className="h-4 w-4" />
                        </Link>
                      </div>
                    </article>
                  </PremiumScrollSequence>
                );
              })}
            </>
          }
          storyHeading={
            <div className="space-y-3" data-shell-intro>
              <p className="hero-dark-kicker">{copy.stageNarrativeKicker}</p>
              <h2 className="section-subtitle max-w-[14ch] text-balance text-white">{copy.stageNarrativeTitle}</h2>
              <p className="max-w-[36rem] text-base leading-7 text-white/74">{copy.stageNarrativeBody}</p>
            </div>
          }
          title={copy.heroTitle}
        />
      </section>

      <section className="page-shell space-y-7" data-home-featured-section id="selected-work">
        <div className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_22rem] xl:items-end">
          <div className="space-y-3" data-home-featured-head>
            <p className="section-kicker">{copy.featuredKicker}</p>
            <h2 className="section-subtitle max-w-[16ch] text-balance">{copy.featuredTitle}</h2>
            <p className="max-w-[42rem] text-base leading-7 text-muted">{copy.featuredBody}</p>
          </div>
          <div className="featured-current-panel rounded-[1.7rem] p-5 shadow-[0_18px_42px_rgba(14,18,36,0.08)]" data-home-featured-head>
            <p className="font-signal text-[10px] uppercase tracking-[0.18em] text-accent-deep">{copy.currentSignalLabel}</p>
            <p className="mt-3 text-sm leading-7 text-muted">{activeMode.stageSummary}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {activeMode.cues.map((cue) => (
                <span className="canvas-inline-pill" key={cue}>
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
            <ProjectCard active={project.slug === activeSlug} key={project.slug} project={project} variant="featured" />
          ))}
        </div>
      </section>
    </section>
  );
}
