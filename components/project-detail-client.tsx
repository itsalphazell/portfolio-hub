"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { useLocale } from "@/components/locale-provider";
import { ProjectGallery } from "@/components/project-gallery";
import { SiteShell } from "@/components/site-shell";
import { caseStudyCopy, projectTagLabels } from "@/lib/locale-data";
import type { Locale, ProjectRecord, ProjectShowcase } from "@/lib/types";

interface ProjectDetailClientProps {
  projectsByLocale: Record<Locale, ProjectRecord>;
  showcasesByLocale: Record<Locale, ProjectShowcase | undefined>;
  contentByLocale: Record<Locale, ReactNode>;
}

export function ProjectDetailClient({
  projectsByLocale,
  showcasesByLocale,
  contentByLocale,
}: ProjectDetailClientProps) {
  const { locale } = useLocale();
  const copy = caseStudyCopy[locale];
  const tagLabels = projectTagLabels[locale];
  const project = projectsByLocale[locale];
  const showcase = showcasesByLocale[locale];
  const projectMetrics = showcase?.metrics ?? [];

  return (
    <SiteShell>
      <main className="page-shell space-y-12 pb-12 pt-12">
        <section
          className="case-study-hero-shell relative overflow-hidden rounded-[2.6rem] border border-[rgba(38,54,108,0.12)] px-6 py-8 md:px-10 md:py-10"
          data-audit-bg="rgba(7,16,43,1)"
        >
          <div className="grid gap-8 xl:grid-cols-[1.16fr_0.84fr] xl:items-end">
            <div className="space-y-6">
              <div className="flex flex-wrap gap-2 text-xs uppercase tracking-[0.16em] text-muted">
                <span className="rounded-full border border-white/12 bg-white/8 px-3 py-1.5 text-white/84">
                  {project.type === "concept" ? copy.conceptCase : copy.shippedCase}
                </span>
                <span className="rounded-full border border-white/12 bg-white/8 px-3 py-1.5 text-white/84">
                  {project.industry}
                </span>
                <span className="rounded-full border border-white/12 bg-white/8 px-3 py-1.5 text-white/84">
                  {project.status}
                </span>
              </div>

              <div className="space-y-5">
                <p className="hero-dark-kicker">{copy.topKicker}</p>
                <h1 className="section-title max-w-4xl text-white">{project.title}</h1>
                <p className="max-w-3xl text-lg leading-8 text-white/78">{project.summary}</p>
              </div>

              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    className="rounded-full border border-white/12 bg-[rgba(12,20,45,0.72)] px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-white"
                    key={tag}
                  >
                    {tagLabels[tag as keyof typeof tagLabels] ?? tag}
                  </span>
                ))}
              </div>

              <div className="flex flex-wrap gap-3">
                {project.liveUrl ? (
                  <Link
                    className="inline-flex cursor-pointer items-center rounded-full bg-white px-5 py-3 text-sm font-semibold text-ink"
                    href={project.liveUrl}
                    rel="noreferrer"
                    target="_blank"
                  >
                    {copy.openLiveDemo}
                  </Link>
                ) : null}
                {project.repoUrl ? (
                  <Link
                    className="inline-flex cursor-pointer items-center rounded-full border border-white/16 bg-white/8 px-5 py-3 text-sm font-semibold text-white"
                    href={project.repoUrl}
                    rel="noreferrer"
                    target="_blank"
                  >
                    {copy.viewRepository}
                  </Link>
                ) : null}
                <Link
                  className="inline-flex cursor-pointer items-center rounded-full border border-white/16 bg-white/8 px-5 py-3 text-sm font-semibold text-white"
                  href="/contact"
                >
                  {copy.discussSimilar}
                </Link>
              </div>
            </div>

            <div className="case-study-side-panel rounded-[2.1rem] p-6 md:p-7">
              <div className="space-y-5">
                <div className="flex items-center justify-between text-sm text-white/70">
                  <span>{copy.projectFrame}</span>
                  <span>{project.type === "concept" ? copy.portfolioConcept : copy.clientDelivery}</span>
                </div>
                <div className="rounded-[1.55rem] bg-[rgba(255,255,255,0.08)] p-5 text-white shadow-[var(--shadow-strong)]">
                  <p className="text-xs uppercase tracking-[0.16em] text-white/84">{copy.outcomeFrame}</p>
                  <p className="mt-3 font-display text-3xl leading-[0.98]">{copy.outcomeBody}</p>
                </div>
                <div className="grid gap-3 sm:grid-cols-2">
                  <div className="rounded-[1.4rem] bg-white/8 p-5">
                    <p className="text-xs uppercase tracking-[0.16em] text-white/58">{copy.industry}</p>
                    <p className="mt-2 text-sm leading-7 text-white">{project.industry}</p>
                  </div>
                  <div className="rounded-[1.4rem] bg-white/8 p-5">
                    <p className="text-xs uppercase tracking-[0.16em] text-white/58">{copy.status}</p>
                    <p className="mt-2 text-sm leading-7 text-white">{project.status}</p>
                  </div>
                </div>
                {projectMetrics.length ? (
                  <div className="grid gap-3 sm:grid-cols-3">
                    {projectMetrics.map((metric) => (
                      <div
                        className="rounded-[1.35rem] border border-white/10 bg-white/7 p-4"
                        key={metric.label}
                      >
                        <p className="text-[11px] uppercase tracking-[0.18em] text-white/58">{metric.label}</p>
                        <p className="mt-3 font-display text-2xl leading-none text-white">{metric.value}</p>
                      </div>
                    ))}
                  </div>
                ) : null}
                <div>
                  <p className="text-xs uppercase tracking-[0.16em] text-white/58">{copy.stack}</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {project.stack.map((entry) => (
                      <span className="rounded-full border border-white/12 bg-white/7 px-3 py-1.5 text-sm text-white/88" key={entry}>
                        {entry}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <ProjectGallery showcasesByLocale={showcasesByLocale} />

        <section className="grid gap-8 xl:grid-cols-[0.78fr_1.22fr] xl:items-start">
          <aside className="space-y-4 xl:sticky xl:top-28">
            <div className="rounded-[1.9rem] border border-[rgba(22,17,13,0.08)] bg-white/82 p-6 shadow-[0_18px_42px_rgba(18,15,12,0.07)]">
              <p className="section-kicker">{copy.readingLens}</p>
              <p className="mt-3 font-display text-3xl leading-[0.98] text-ink">{copy.readingTitle}</p>
              <p className="mt-3 text-sm leading-7 text-muted">{copy.readingBody}</p>
            </div>
            <div className="rounded-[1.9rem] border border-[rgba(22,17,13,0.08)] bg-white/82 p-6 shadow-[0_18px_42px_rgba(18,15,12,0.07)]">
              <p className="text-xs uppercase tracking-[0.16em] text-muted">{copy.structureTitle}</p>
              <div className="mt-4 space-y-3 text-sm leading-7 text-muted">
                <p>{copy.structureBodyOne}</p>
                <p>{copy.structureBodyTwo}</p>
              </div>
            </div>
          </aside>

          <article className="glass-panel rounded-[2.2rem] px-6 py-8 md:px-10 md:py-12">
            <div className="prose-shell max-w-none">{contentByLocale[locale]}</div>
          </article>
        </section>

        <section
          className="signature-cta-shell rounded-[2.3rem] border border-[rgba(22,17,13,0.08)] px-6 py-8 text-white md:px-8 md:py-10"
          data-audit-bg="rgba(10,17,47,1)"
        >
          <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <div className="space-y-3">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/90">{copy.nextMove}</p>
              <h2 className="font-display text-[clamp(2.1rem,4vw,3.4rem)] leading-[0.96] text-white">{copy.nextTitle}</h2>
              <p className="max-w-2xl text-base leading-7 text-white/90">{copy.nextBody}</p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link
                className="inline-flex cursor-pointer items-center rounded-full bg-white px-5 py-3 text-sm font-semibold text-ink"
                href="/contact"
              >
                {copy.nextPrimaryCta}
              </Link>
              <Link
                className="inline-flex cursor-pointer items-center rounded-full border border-white/18 px-5 py-3 text-sm font-semibold text-white"
                href="/work"
              >
                {copy.nextSecondaryCta}
              </Link>
            </div>
          </div>
        </section>
      </main>
    </SiteShell>
  );
}
