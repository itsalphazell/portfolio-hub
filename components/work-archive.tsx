"use client";

import { useMemo, useState } from "react";
import clsx from "clsx";
import { useLocale } from "@/components/locale-provider";
import { ProjectCard } from "@/components/project-card";
import { workArchiveLabels } from "@/lib/locale-data";
import type { Locale, ProjectFilter, ProjectFrontmatter } from "@/lib/types";

const filterOrder: ProjectFilter[] = ["all", "real", "concept", "marketing", "product", "motion"];

interface WorkArchiveProps {
  projectsByLocale: Record<Locale, ProjectFrontmatter[]>;
}

export function WorkArchive({ projectsByLocale }: WorkArchiveProps) {
  const { locale } = useLocale();
  const labels = workArchiveLabels[locale];
  const [activeFilter, setActiveFilter] = useState<ProjectFilter>("all");
  const projects = projectsByLocale[locale];

  const filteredProjects = useMemo(
    () =>
      activeFilter === "all"
        ? projects
        : projects.filter((project) =>
            activeFilter === "real" || activeFilter === "concept"
              ? project.type === activeFilter
              : project.tags.includes(activeFilter),
          ),
    [activeFilter, projects],
  );

  return (
    <div className="space-y-8">
      <div className="archive-filter-shell flex flex-wrap gap-3 rounded-[1.9rem] border border-[rgba(22,17,13,0.08)] bg-white/88 p-4 shadow-[0_18px_42px_rgba(18,15,12,0.06)]">
        {filterOrder.map((filter) => (
          <button
            aria-pressed={activeFilter === filter}
            className={clsx(
              "rounded-full px-4 py-2 text-sm font-semibold capitalize transition-colors duration-200",
              activeFilter === filter
                ? "bg-ink text-white shadow-[0_14px_28px_rgba(12,20,45,0.12)]"
                : "border border-[rgba(22,17,13,0.12)] bg-white text-muted hover:text-ink",
            )}
            key={filter}
            onClick={() => setActiveFilter(filter)}
            type="button"
          >
            {labels[filter]}
          </button>
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {filteredProjects.map((project) => (
          <ProjectCard key={project.slug} project={project} variant="archive" />
        ))}
      </div>

      {!filteredProjects.length ? (
        <div className="rounded-[1.8rem] border border-dashed border-[rgba(22,17,13,0.12)] bg-white/82 px-6 py-10 text-center text-muted">
          {labels.empty}
        </div>
      ) : null}
    </div>
  );
}
