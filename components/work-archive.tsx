"use client";

import { useDeferredValue, useMemo, useState } from "react";
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
  const deferredFilter = useDeferredValue(activeFilter);
  const projects = projectsByLocale[locale];

  const filteredProjects = useMemo(
    () =>
      deferredFilter === "all"
        ? projects
        : projects.filter((project) =>
            deferredFilter === "real" || deferredFilter === "concept"
              ? project.type === deferredFilter
              : project.tags.includes(deferredFilter),
          ),
    [deferredFilter, projects],
  );

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap gap-3">
        {filterOrder.map((filter) => (
          <button
            aria-pressed={activeFilter === filter}
            className={clsx(
              "cursor-pointer rounded-full px-4 py-2 text-sm font-semibold capitalize transition-colors duration-200",
              activeFilter === filter
                ? "bg-ink text-white"
                : "border border-[rgba(22,17,13,0.12)] bg-white/80 text-muted hover:text-ink",
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
          <ProjectCard key={project.slug} project={project} />
        ))}
      </div>
      {!filteredProjects.length ? (
        <div className="rounded-[1.75rem] border border-dashed border-[rgba(22,17,13,0.12)] px-6 py-10 text-center text-muted">
          {labels.empty}
        </div>
      ) : null}
    </div>
  );
}
