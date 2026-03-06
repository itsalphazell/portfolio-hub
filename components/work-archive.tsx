"use client";

import { useDeferredValue, useState } from "react";
import clsx from "clsx";
import { ProjectCard } from "@/components/project-card";
import type { ProjectFilter, ProjectFrontmatter } from "@/lib/types";

const filterOrder: ProjectFilter[] = ["all", "real", "concept", "marketing", "product", "motion"];

export function WorkArchive({ projects }: { projects: ProjectFrontmatter[] }) {
  const [activeFilter, setActiveFilter] = useState<ProjectFilter>("all");
  const deferredFilter = useDeferredValue(activeFilter);

  const filteredProjects =
    deferredFilter === "all"
      ? projects
      : projects.filter((project) =>
          deferredFilter === "real" || deferredFilter === "concept"
            ? project.type === deferredFilter
            : project.tags.includes(deferredFilter),
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
            {filter}
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
          No projects match this filter yet.
        </div>
      ) : null}
    </div>
  );
}
