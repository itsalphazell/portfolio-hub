import type { ProjectShowcase } from "@/lib/types";

export function ProjectGallery({ showcase }: { showcase: ProjectShowcase }) {
  const leadShot = showcase.shots.find((shot) => shot.viewport === "desktop") ?? showcase.shots[0];
  const detailShots = showcase.shots.filter((shot) => shot.viewport === "detail");
  const mobileShot = showcase.shots.find((shot) => shot.viewport === "mobile");

  return (
    <section className="space-y-8">
      <div className="grid gap-5 xl:grid-cols-[1.18fr_0.82fr]">
        {leadShot ? (
          <figure className="project-shot">
            <img alt={leadShot.alt} src={leadShot.src} />
            <figcaption className="border-t border-[rgba(22,17,13,0.08)] px-5 py-4">
              <p className="text-xs uppercase tracking-[0.16em] text-muted">Lead surface</p>
              <p className="mt-2 text-sm leading-7 text-muted">{leadShot.caption}</p>
            </figcaption>
          </figure>
        ) : null}
        <div className="grid gap-5">
          <div className="grid gap-4 md:grid-cols-3 xl:grid-cols-1">
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
          {mobileShot ? (
            <figure className="project-shot mx-auto max-w-sm xl:mx-0 xl:max-w-none">
              <img alt={mobileShot.alt} src={mobileShot.src} />
              <figcaption className="border-t border-[rgba(22,17,13,0.08)] px-5 py-4">
                <p className="text-xs uppercase tracking-[0.16em] text-muted">Mobile view</p>
                <p className="mt-2 text-sm leading-7 text-muted">{mobileShot.caption}</p>
              </figcaption>
            </figure>
          ) : null}
        </div>
      </div>
      <div className="grid gap-5 md:grid-cols-2">
        {detailShots.map((shot, index) => (
          <figure className="project-shot" key={shot.src}>
            <img alt={shot.alt} src={shot.src} />
            <figcaption className="border-t border-[rgba(22,17,13,0.08)] px-5 py-4">
              <p className="text-xs uppercase tracking-[0.16em] text-muted">Detail 0{index + 1}</p>
              <p className="mt-2 text-sm leading-7 text-muted">{shot.caption}</p>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
