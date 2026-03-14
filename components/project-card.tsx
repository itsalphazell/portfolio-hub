"use client";

import Link from "next/link";
import { ArrowUpRight, Github, Play } from "lucide-react";
import clsx from "clsx";
import { useLocale } from "@/components/locale-provider";
import { projectCardLabels, projectTagLabels } from "@/lib/locale-data";
import type { ProjectFrontmatter } from "@/lib/types";

interface ProjectCardProps {
  project: ProjectFrontmatter;
  variant?: "featured" | "archive";
  active?: boolean;
}

export function ProjectCard({ project, variant = "archive", active = false }: ProjectCardProps) {
  const { locale } = useLocale();
  const labels = projectCardLabels[locale];
  const tagLabels = projectTagLabels[locale];

  return (
    <article
      className={clsx(
        "group relative flex h-full flex-col overflow-hidden rounded-[2rem] border transition-transform duration-300",
        variant === "featured"
          ? "featured-project-card border-[rgba(56,86,168,0.14)] bg-[linear-gradient(180deg,rgba(255,255,255,0.99),rgba(246,249,255,0.94))] shadow-[0_24px_72px_rgba(14,18,36,0.1)] hover:-translate-y-1.5"
          : "archive-project-card border-[rgba(22,17,13,0.08)] bg-[linear-gradient(180deg,rgba(255,255,255,0.98),rgba(247,249,253,0.94))] shadow-[0_18px_46px_rgba(18,15,12,0.08)] hover:-translate-y-1",
        active && variant === "featured" ? "featured-project-card-active" : "",
      )}
      data-audit-overlay-root
    >
      <div className="relative overflow-hidden border-b border-[rgba(22,17,13,0.08)]">
        <img
          alt={`${project.title} ${labels.caseStudy.toLowerCase()} cover`}
          className={clsx("w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]", variant === "featured" ? "aspect-[15/10]" : "aspect-[16/10]")}
          src={project.coverImage}
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(8,14,34,0.04),rgba(8,14,34,0.2))]" />
        <div className="absolute left-4 top-4 flex flex-wrap gap-2">
          <span className="rounded-full border border-white/18 bg-[rgba(7,12,28,0.84)] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-white">
            {project.type === "concept" ? labels.conceptCase : labels.shippedCase}
          </span>
          <span
            className="rounded-full border border-white/18 bg-white/92 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-ink"
          >
            {project.industry}
          </span>
        </div>
        <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between gap-4">
          <div
            className="rounded-[1.1rem] border border-white/16 bg-[rgba(7,12,28,0.84)] px-3 py-2 text-white"
            data-audit-bg="rgba(7,12,28,0.84)"
          >
            <p className="font-signal text-[9px] uppercase tracking-[0.18em] text-white/72">{labels.delivery}</p>
            <p className="mt-1 text-xs font-semibold text-white">{project.status}</p>
          </div>
          <span className="rounded-full border border-white/18 bg-white/92 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-ink">
            {String(project.order).padStart(2, "0")}
          </span>
        </div>
      </div>

      <div className="flex h-full flex-col gap-5 p-6 md:p-7">
        <div className="flex flex-wrap items-center gap-2 text-[11px] uppercase tracking-[0.18em] text-muted">
          <span>{labels.caseStudy}</span>
          <i aria-hidden className="h-1 w-1 rounded-full bg-[rgba(22,17,13,0.25)]" />
          <span>{project.type === "concept" ? labels.prototype : labels.delivery}</span>
          {project.liveUrl ? (
            <>
              <i aria-hidden className="h-1 w-1 rounded-full bg-[rgba(22,17,13,0.25)]" />
              <span>{labels.live}</span>
            </>
          ) : null}
        </div>

        <div className="space-y-3">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <h3
              className={clsx(
                "max-w-[14ch] text-balance font-display leading-[0.95] tracking-[-0.04em] text-ink",
                variant === "featured" ? "text-[clamp(2rem,2.5vw,2.8rem)]" : "text-[2.1rem]",
              )}
            >
              {project.title}
            </h3>
            <Link
              className="inline-flex shrink-0 items-center gap-1 rounded-full border border-[rgba(56,86,168,0.14)] bg-white px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-accent-deep transition-colors duration-200 hover:bg-accent-deep hover:text-white"
              href={`/work/${project.slug}`}
            >
              {labels.view}
              <ArrowUpRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          <p className={clsx("card-summary-clamp text-[0.98rem] leading-7 text-muted", variant === "featured" ? "card-summary-clamp-featured" : "")}>
            {project.summary}
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span
              className={clsx(
                "rounded-full border px-3 py-1 text-xs font-medium",
                variant === "featured"
                  ? "border-[rgba(16,36,95,0.12)] bg-[rgba(16,36,95,0.96)] text-white"
                  : "border-[rgba(22,17,13,0.1)] bg-white/88 text-ink",
              )}
              key={tag}
            >
              {tagLabels[tag as keyof typeof tagLabels] ?? tag}
            </span>
          ))}
        </div>

        <div className="mt-auto flex flex-wrap gap-3 pt-2">
          {project.liveUrl ? (
            <Link
              className="inline-flex items-center gap-2 rounded-full bg-ink px-4 py-2 text-sm font-semibold text-white transition-transform duration-200 hover:-translate-y-0.5"
              href={project.liveUrl}
              rel="noreferrer"
              target="_blank"
            >
              <Play className="h-4 w-4" />
              {labels.liveDemo}
            </Link>
          ) : null}
          {project.repoUrl ? (
            <Link
              className="inline-flex items-center gap-2 rounded-full border border-[rgba(22,17,13,0.12)] px-4 py-2 text-sm font-semibold text-ink transition-colors duration-200 hover:bg-black/5"
              href={project.repoUrl}
              rel="noreferrer"
              target="_blank"
            >
              <Github className="h-4 w-4" />
              {labels.repository}
            </Link>
          ) : null}
        </div>
      </div>
    </article>
  );
}
