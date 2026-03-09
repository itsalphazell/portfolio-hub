import Link from "next/link";
import { ArrowUpRight, Github, Play } from "lucide-react";
import clsx from "clsx";
import type { ProjectFrontmatter } from "@/lib/types";

interface ProjectCardProps {
  project: ProjectFrontmatter;
  variant?: "featured" | "archive";
}

export function ProjectCard({ project, variant = "archive" }: ProjectCardProps) {
  return (
    <article
      className={clsx(
        "group relative overflow-hidden rounded-[2rem] border border-[rgba(22,17,13,0.08)] bg-white/75 transition-transform duration-300 hover:-translate-y-1",
        variant === "featured"
          ? "glass-panel h-full shadow-[0_24px_64px_rgba(18,15,12,0.12)]"
          : "shadow-[0_18px_46px_rgba(18,15,12,0.08)]",
      )}
    >
      <div className="relative overflow-hidden border-b border-[rgba(22,17,13,0.08)] bg-[linear-gradient(180deg,rgba(255,255,255,0.18),rgba(255,255,255,0.02))]">
        <img
          alt={`${project.title} case study cover`}
          className={clsx(
            "w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]",
            variant === "featured" ? "aspect-[16/10]" : "aspect-[16/10]",
          )}
          src={project.coverImage}
        />
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,transparent,rgba(18,15,12,0.04))]" />
        <div className="absolute left-4 top-4 flex flex-wrap gap-2">
          <span className="rounded-full border border-white/18 bg-[rgba(17,15,14,0.68)] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-white">
            {project.type === "concept" ? "Concept case" : "Shipped case"}
          </span>
          <span className="rounded-full border border-white/18 bg-white/86 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-ink">
            {project.industry}
          </span>
        </div>
        <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between gap-3">
          <span className="rounded-full border border-white/18 bg-[rgba(17,15,14,0.68)] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-white">
            {project.status}
          </span>
          <div className="flex flex-wrap gap-2">
            {project.liveUrl ? (
              <span className="rounded-full border border-white/18 bg-white/86 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-ink">
                Live
              </span>
            ) : null}
            <span className="rounded-full border border-white/18 bg-white/70 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-ink">
              {project.type === "concept" ? "Prototype" : "Delivery"}
            </span>
          </div>
        </div>
      </div>
      <div className="space-y-4 p-6 md:p-7">
        <div className="flex flex-wrap items-center gap-2 text-[11px] uppercase tracking-[0.18em] text-muted">
          <span>{project.industry}</span>
          <i aria-hidden className="h-1 w-1 rounded-full bg-[rgba(22,17,13,0.25)]" />
          <span>Case study</span>
        </div>
        <div className="space-y-2.5">
          <div className="flex items-start justify-between gap-4">
            <h3
              className={clsx(
                "font-display leading-[0.95] text-ink",
                variant === "featured" ? "text-[clamp(1.65rem,2.4vw,2.4rem)]" : "text-[2rem]",
              )}
            >
              {project.title}
            </h3>
            <Link
              className="inline-flex cursor-pointer items-center gap-1 rounded-full border border-[rgba(22,17,13,0.1)] px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-ink transition-colors duration-200 hover:bg-ink hover:text-white"
              href={`/work/${project.slug}`}
            >
              View
              <ArrowUpRight className="h-3.5 w-3.5" />
            </Link>
          </div>
          <p className="max-w-2xl text-[0.98rem] leading-7 text-muted">{project.summary}</p>
        </div>
        <div className="flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span
              className="rounded-full border border-[rgba(16,36,95,0.12)] bg-[rgba(16,36,95,0.94)] px-3 py-1 text-xs font-medium text-white"
              key={tag}
            >
              {tag}
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
        <div className="flex flex-wrap gap-3">
          {project.liveUrl ? (
            <Link
              className="inline-flex cursor-pointer items-center gap-2 rounded-full bg-ink px-4 py-2 text-sm font-semibold text-[rgb(255_255_255)] transition-transform duration-200 hover:-translate-y-0.5"
              href={project.liveUrl}
              rel="noreferrer"
              target="_blank"
            >
              <Play className="h-4 w-4" />
              Live demo
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
              Repository
            </Link>
          ) : null}
        </div>
      </div>
    </article>
  );
}
