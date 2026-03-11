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
  onActivate?: () => void;
}

export function ProjectCard({ project, variant = "archive", active = false, onActivate }: ProjectCardProps) {
  const { locale } = useLocale();
  const labels = projectCardLabels[locale];
  const tagLabels = projectTagLabels[locale];
  const enablePreviewToggle = variant === "featured" && Boolean(onActivate);

  return (
    <article
      className={clsx(
        "group relative flex h-full flex-col overflow-hidden rounded-[2rem] border border-[rgba(22,17,13,0.08)] bg-white/80 transition-transform duration-300 hover:-translate-y-1",
        variant === "featured"
          ? "featured-project-card h-full overflow-hidden border-[rgba(74,110,255,0.14)] bg-[linear-gradient(180deg,rgba(255,255,255,0.96),rgba(247,250,255,0.92))] shadow-[0_24px_64px_rgba(18,15,12,0.12)]"
          : "shadow-[0_18px_46px_rgba(18,15,12,0.08)]",
        enablePreviewToggle ? "cursor-pointer" : "",
        active && variant === "featured" ? "featured-project-card-active" : "",
      )}
      onClick={enablePreviewToggle ? onActivate : undefined}
      onFocusCapture={onActivate}
      onMouseEnter={variant === "archive" ? onActivate : undefined}
    >
      <div className="relative overflow-hidden border-b border-[rgba(22,17,13,0.08)] bg-[linear-gradient(180deg,rgba(255,255,255,0.18),rgba(255,255,255,0.02))]">
        <img
          alt={`${project.title} ${labels.caseStudy.toLowerCase()} cover`}
          className={clsx(
            "w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]",
            variant === "featured" ? "aspect-[16/10] saturate-[1.06]" : "aspect-[16/10]",
          )}
          src={project.coverImage}
        />
        <div
          className={clsx(
            "pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,transparent,rgba(18,15,12,0.04))]",
            variant === "featured" ? "featured-project-glow" : "",
            active && variant === "featured" ? "opacity-100" : "",
          )}
        />
        <div className="absolute left-4 top-4 flex flex-wrap gap-2">
          <span className="rounded-full border border-white/18 bg-[rgba(7,12,28,0.82)] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-white">
            {project.type === "concept" ? labels.conceptCase : labels.shippedCase}
          </span>
          <span className="rounded-full border border-white/18 bg-white/92 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-ink">
            {project.industry}
          </span>
        </div>
        <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between gap-3">
          <span className="rounded-full border border-white/18 bg-[rgba(7,12,28,0.82)] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-white">
            {project.status}
          </span>
          <div className="flex flex-wrap gap-2">
            {project.liveUrl ? (
              <span className="rounded-full border border-white/18 bg-white/92 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-ink">
                {labels.live}
              </span>
            ) : null}
            <span className="rounded-full border border-white/18 bg-white/78 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-ink">
              {project.type === "concept" ? labels.prototype : labels.delivery}
            </span>
          </div>
        </div>
      </div>
      <div className="flex h-full flex-col space-y-4 p-6 md:p-7">
        <div className="flex flex-wrap items-center gap-2 text-[11px] uppercase tracking-[0.18em] text-muted">
          <span>{project.industry}</span>
          <i aria-hidden className="h-1 w-1 rounded-full bg-[rgba(22,17,13,0.25)]" />
          <span>{labels.caseStudy}</span>
        </div>
        <div className="space-y-2.5">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
            <h3
              className={clsx(
                "max-w-[16ch] text-balance font-display leading-[0.95] text-ink",
                variant === "featured" ? "text-[clamp(1.7rem,2.2vw,2.45rem)]" : "text-[1.95rem]",
              )}
            >
              {project.title}
            </h3>
            <Link
              className={clsx(
                "inline-flex shrink-0 cursor-pointer items-center gap-1 self-start rounded-full px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.16em] transition-colors duration-200",
                variant === "featured"
                  ? "border border-[rgba(74,110,255,0.18)] bg-[rgba(255,255,255,0.8)] text-accent-deep hover:bg-accent-deep hover:text-white"
                  : "border border-[rgba(22,17,13,0.1)] text-ink hover:bg-ink hover:text-white",
              )}
              href={`/work/${project.slug}`}
            >
              {labels.view}
              <ArrowUpRight className="h-3.5 w-3.5" />
            </Link>
          </div>
          <p
            className={clsx(
              "card-summary-clamp max-w-2xl text-[0.98rem] leading-7 text-muted",
              variant === "featured" ? "card-summary-clamp-featured" : "",
            )}
          >
            {project.summary}
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span
              className="rounded-full border border-[rgba(16,36,95,0.12)] bg-[rgba(16,36,95,0.96)] px-3 py-1 text-xs font-medium text-white"
              key={tag}
            >
              {tagLabels[tag as keyof typeof tagLabels] ?? tag}
            </span>
          ))}
        </div>
        <div className="flex flex-wrap gap-2 text-sm text-muted">
          {project.stack.map((entry) => (
            <span className="rounded-full border border-[rgba(22,17,13,0.08)] px-3 py-1.5" key={entry}>
              {entry}
            </span>
          ))}
        </div>
        <div className="mt-auto flex flex-wrap gap-3 pt-2">
          {project.liveUrl ? (
            <Link
              className="inline-flex cursor-pointer items-center gap-2 rounded-full bg-ink px-4 py-2 text-sm font-semibold text-[rgb(255_255_255)] transition-transform duration-200 hover:-translate-y-0.5"
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
              className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-[rgba(22,17,13,0.12)] px-4 py-2 text-sm font-semibold text-ink transition-colors duration-200 hover:bg-black/5"
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
