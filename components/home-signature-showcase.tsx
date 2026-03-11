"use client";

import { startTransition, useDeferredValue, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Sparkles } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { HeroAccentLine } from "@/components/hero-accent-line";
import { HomeSignalBand } from "@/components/home-signal-band";
import { useLocale } from "@/components/locale-provider";
import { PortfolioHeroScene } from "@/components/portfolio-hero-scene";
import { ProjectCard } from "@/components/project-card";
import { homeCopy, homeModesByLocale } from "@/lib/locale-data";
import type { Locale, ProjectFrontmatter } from "@/lib/types";

gsap.registerPlugin(useGSAP, ScrollTrigger);

interface HomeSignatureShowcaseProps {
  featuredProjectsByLocale: Record<Locale, ProjectFrontmatter[]>;
}

export function HomeSignatureShowcase({ featuredProjectsByLocale }: HomeSignatureShowcaseProps) {
  const { locale } = useLocale();
  const rootRef = useRef<HTMLElement>(null);
  const copy = homeCopy[locale];
  const homeModes = homeModesByLocale[locale];
  const [activeSlug, setActiveSlug] = useState<string>(homeModesByLocale.en[0].slug);
  const deferredActiveSlug = useDeferredValue(activeSlug);
  const featuredProjects = featuredProjectsByLocale[locale];
  const activeMode = homeModes.find((item) => item.slug === deferredActiveSlug) ?? homeModes[0];
  const orderedProjects = useMemo(
    () =>
      homeModes
        .map((mode) => featuredProjects.find((project) => project.slug === mode.slug))
        .filter((project): project is ProjectFrontmatter => Boolean(project)),
    [featuredProjects, homeModes],
  );

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from("[data-home-hero-copy]", {
          duration: 0.8,
          ease: "power3.out",
          opacity: 0,
          y: 30,
          stagger: 0.08,
        });

        gsap.from("[data-home-featured-intro]", {
          duration: 0.72,
          ease: "power3.out",
          opacity: 0,
          y: 24,
          stagger: 0.08,
          scrollTrigger: {
            trigger: "[data-home-featured-section]",
            start: "top 78%",
          },
        });

        gsap.from(".featured-project-card", {
          duration: 0.84,
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

      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.from("[data-home-hero-copy]", {
          duration: 0.18,
          opacity: 0,
          stagger: 0.05,
        });
      });

      return () => mm.revert();
    },
    { scope: rootRef },
  );

  const handleActivate = (slug: string) => {
    startTransition(() => {
      setActiveSlug(slug);
    });
  };

  return (
    <section className="space-y-10" ref={rootRef}>
      <section className="page-shell hero-shell hero-command-shell relative overflow-hidden rounded-[2.75rem] border border-[rgba(73,116,255,0.16)] px-6 py-9 md:px-10 md:py-12">
        <div className="hero-shell-noise absolute inset-0 -z-10" />
        <div className="hero-shell-grid absolute inset-[1px] -z-10 rounded-[2.7rem]" />
        <div className="grid gap-8 xl:grid-cols-[0.88fr_1.12fr] xl:items-start">
          <div className="space-y-7">
            <div
              className="inline-flex max-w-fit items-center gap-2 rounded-full border border-[rgba(145,180,255,0.22)] bg-[rgba(8,18,48,0.76)] px-4 py-2 text-sm text-[rgba(239,245,255,0.94)] backdrop-blur-md"
              data-home-hero-copy
            >
              <Sparkles className="h-4 w-4 text-[rgb(142_192_255)]" />
              {copy.badge}
            </div>

            <div className="space-y-4">
              <p className="hero-dark-kicker" data-home-hero-copy>
                {copy.kicker}
              </p>
              <h1 className="section-title max-w-[13ch] text-balance text-white" data-home-hero-copy>
                {copy.heroTitle}
                <HeroAccentLine key={activeMode.slug}>{activeMode.heroLine}</HeroAccentLine>
              </h1>
              <p
                className="hero-copy-measure max-w-[34rem] text-pretty text-lg leading-8 text-[rgba(239,244,255,0.9)] md:text-[1.12rem]"
                data-home-hero-copy
              >
                {copy.heroBody}
              </p>
            </div>

            <div className="flex flex-wrap gap-3" data-home-hero-copy>
              <Link
                className="cta-electric inline-flex cursor-pointer items-center gap-2 rounded-full px-5 py-3 text-sm font-semibold transition-transform duration-200 hover:-translate-y-0.5"
                href="/work"
              >
                {copy.heroPrimaryCta}
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-[rgba(145,180,255,0.24)] bg-[rgba(8,18,48,0.78)] px-5 py-3 text-sm font-semibold text-white transition-colors duration-200 hover:bg-[rgba(12,24,62,0.92)]"
                href="/contact"
              >
                {copy.heroSecondaryCta}
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </div>

            <div className="grid gap-3 md:grid-cols-3" data-home-hero-copy>
              {copy.capabilities.map((capability) => (
                <div className="hero-capability-card rounded-[1.35rem] border p-4" key={capability.label}>
                  <p className="font-signal text-[10px] uppercase tracking-[0.18em] text-[rgba(197,221,255,0.9)]">
                    {capability.label}
                  </p>
                  <p className="mt-3 text-sm leading-6 text-[rgba(242,246,255,0.94)]">{capability.body}</p>
                </div>
              ))}
            </div>
          </div>

          <PortfolioHeroScene activeSlug={deferredActiveSlug} modes={homeModes} onActivate={handleActivate} />
        </div>
      </section>

      <section className="page-shell space-y-7" data-home-featured-section>
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div className="space-y-3">
            <p className="section-kicker" data-home-featured-intro>
              {copy.featuredKicker}
            </p>
            <h2 className="section-subtitle max-w-[18ch] text-balance" data-home-featured-intro>
              {copy.featuredTitle}
            </h2>
            <p className="max-w-[42rem] text-base leading-7 text-muted" data-home-featured-intro>
              {copy.featuredBody}
            </p>
          </div>
          <Link className="text-sm font-semibold text-accent-deep underline underline-offset-4" data-home-featured-intro href="/work">
            {copy.featuredArchiveLink}
          </Link>
        </div>

        <div data-home-featured-intro>
          <HomeSignalBand activeSlug={deferredActiveSlug} items={homeModes} onSelect={handleActivate} />
        </div>

        <div className="grid gap-6 xl:grid-cols-2" data-home-featured-grid>
          {orderedProjects.map((project) => (
            <ProjectCard
              active={project.slug === deferredActiveSlug}
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
