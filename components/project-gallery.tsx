import type { ProjectShowcase } from "@/lib/types";

export function ProjectGallery({ showcase }: { showcase: ProjectShowcase }) {
  return (
    <section className="space-y-8">
      <div className="grid gap-4 md:grid-cols-3">
        {showcase.metrics.map((metric) => (
          <div
            className="rounded-[1.5rem] border border-[rgba(22,17,13,0.08)] bg-white/80 px-5 py-4"
            key={metric.label}
          >
            <p className="text-xs uppercase tracking-[0.18em] text-muted">{metric.label}</p>
            <p className="mt-2 text-lg font-semibold text-ink">{metric.value}</p>
          </div>
        ))}
      </div>
      <div className="grid gap-5 lg:grid-cols-[1.35fr_1fr]">
        <div className="space-y-5">
          {showcase.shots
            .filter((shot) => shot.viewport !== "mobile")
            .map((shot) => (
              <figure className="project-shot" key={shot.src}>
                <img alt={shot.alt} src={shot.src} />
                <figcaption className="border-t border-[rgba(22,17,13,0.08)] px-5 py-4 text-sm text-muted">
                  {shot.caption}
                </figcaption>
              </figure>
            ))}
        </div>
        <div className="space-y-5">
          {showcase.shots
            .filter((shot) => shot.viewport === "mobile")
            .map((shot) => (
              <figure className="project-shot mx-auto max-w-sm" key={shot.src}>
                <img alt={shot.alt} src={shot.src} />
                <figcaption className="border-t border-[rgba(22,17,13,0.08)] px-5 py-4 text-sm text-muted">
                  {shot.caption}
                </figcaption>
              </figure>
            ))}
        </div>
      </div>
    </section>
  );
}
