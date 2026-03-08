import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { compileMDX } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import { mdxComponents } from "@/components/mdx";
import { ProjectGallery } from "@/components/project-gallery";
import { SiteShell } from "@/components/site-shell";
import { getProjectBySlug, getProjectSlugs } from "@/lib/content";
import { projectShowcases } from "@/lib/site-data";

export function generateStaticParams() {
  return getProjectSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    return {};
  }

  return {
    title: `${project.title} | Thomas`,
    description: project.summary,
  };
}

export default async function ProjectDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const showcase = projectShowcases[project.slug];
  const projectMetrics = showcase?.metrics ?? [];

  const { content } = await compileMDX({
    source: project.content,
    components: mdxComponents,
    options: {
      mdxOptions: {
        remarkPlugins: [remarkGfm],
      },
    },
  });

  return (
    <SiteShell>
      <main className="page-shell space-y-12 pb-12 pt-12">
        <section className="relative overflow-hidden rounded-[2.6rem] border border-[rgba(22,17,13,0.08)] px-6 py-8 soft-grid md:px-10 md:py-10">
          <div className="absolute inset-0 -z-10 bg-[linear-gradient(135deg,rgba(255,255,255,0.88),rgba(255,247,239,0.68))]" />
          <div className="grid gap-8 xl:grid-cols-[1.16fr_0.84fr] xl:items-end">
            <div className="space-y-6">
              <div className="flex flex-wrap gap-2 text-xs uppercase tracking-[0.16em] text-muted">
                <span className="rounded-full border border-[rgba(22,17,13,0.08)] bg-white/84 px-3 py-1.5">
                  {project.type === "concept" ? "Concept case study" : "Shipped case study"}
                </span>
                <span className="rounded-full border border-[rgba(22,17,13,0.08)] bg-white/84 px-3 py-1.5">
                  {project.industry}
                </span>
                <span className="rounded-full border border-[rgba(22,17,13,0.08)] bg-white/84 px-3 py-1.5">
                  {project.status}
                </span>
              </div>

              <div className="space-y-5">
                <p className="section-kicker">Client-facing project story</p>
                <h1 className="section-title max-w-4xl">{project.title}</h1>
                <p className="max-w-3xl text-lg leading-8 text-muted">{project.summary}</p>
              </div>

              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    className="rounded-full border border-[rgba(16,36,95,0.14)] bg-[rgba(16,36,95,0.94)] px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-white"
                    key={tag}
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className="flex flex-wrap gap-3">
                {project.liveUrl ? (
                  <Link
                    className="inline-flex cursor-pointer items-center rounded-full bg-ink px-5 py-3 text-sm font-semibold text-[rgb(255_255_255)]"
                    href={project.liveUrl}
                    rel="noreferrer"
                    target="_blank"
                  >
                    Open live demo
                  </Link>
                ) : null}
                {project.repoUrl ? (
                  <Link
                    className="inline-flex cursor-pointer items-center rounded-full border border-[rgba(22,17,13,0.12)] bg-white/80 px-5 py-3 text-sm font-semibold text-ink"
                    href={project.repoUrl}
                    rel="noreferrer"
                    target="_blank"
                  >
                    View repository
                  </Link>
                ) : null}
                <Link
                  className="inline-flex cursor-pointer items-center rounded-full border border-[rgba(22,17,13,0.12)] bg-white/70 px-5 py-3 text-sm font-semibold text-ink"
                  href="/contact"
                >
                  Discuss a similar project
                </Link>
              </div>
            </div>

            <div className="glass-panel rounded-[2.1rem] p-6 md:p-7">
              <div className="space-y-5">
                <div className="flex items-center justify-between text-sm text-muted">
                  <span>Project frame</span>
                  <span>{project.type === "concept" ? "Portfolio concept" : "Client delivery"}</span>
                </div>
                <div className="rounded-[1.55rem] bg-[rgba(16,36,95,0.95)] p-5 text-white shadow-[var(--shadow-strong)]">
                  <p className="text-xs uppercase tracking-[0.16em] text-white/84">Outcome frame</p>
                  <p className="mt-3 font-display text-3xl leading-[0.98]">
                    Built to show how design direction holds up once the interface has to work.
                  </p>
                </div>
                <div className="grid gap-3 sm:grid-cols-2">
                  <div className="rounded-[1.4rem] bg-white/90 p-5">
                    <p className="text-xs uppercase tracking-[0.16em] text-muted">Industry</p>
                    <p className="mt-2 text-sm leading-7 text-ink">{project.industry}</p>
                  </div>
                  <div className="rounded-[1.4rem] bg-white/90 p-5">
                    <p className="text-xs uppercase tracking-[0.16em] text-muted">Status</p>
                    <p className="mt-2 text-sm leading-7 text-ink">{project.status}</p>
                  </div>
                </div>
                {projectMetrics.length ? (
                  <div className="grid gap-3 sm:grid-cols-3">
                    {projectMetrics.map((metric) => (
                      <div
                        className="rounded-[1.35rem] border border-[rgba(22,17,13,0.08)] bg-white/86 p-4"
                        key={metric.label}
                      >
                        <p className="text-[11px] uppercase tracking-[0.18em] text-muted">{metric.label}</p>
                        <p className="mt-3 font-display text-2xl leading-none text-ink">{metric.value}</p>
                      </div>
                    ))}
                  </div>
                ) : null}
                <div>
                  <p className="text-xs uppercase tracking-[0.16em] text-muted">Stack</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {project.stack.map((entry) => (
                      <span className="rounded-full border border-[rgba(22,17,13,0.1)] px-3 py-1.5 text-sm" key={entry}>
                        {entry}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {showcase ? <ProjectGallery showcase={showcase} /> : null}

        <section className="grid gap-8 xl:grid-cols-[0.78fr_1.22fr] xl:items-start">
          <aside className="space-y-4 xl:sticky xl:top-28">
            <div className="rounded-[1.9rem] border border-[rgba(22,17,13,0.08)] bg-white/82 p-6 shadow-[0_18px_42px_rgba(18,15,12,0.07)]">
              <p className="section-kicker">Reading lens</p>
              <p className="mt-3 font-display text-3xl leading-[0.98] text-ink">A sellable project story, not just a build log.</p>
              <p className="mt-3 text-sm leading-7 text-muted">
                Each case study is structured to show the business problem, the interface system, and the implementation
                decisions behind the outcome.
              </p>
            </div>
            <div className="rounded-[1.9rem] border border-[rgba(22,17,13,0.08)] bg-white/82 p-6 shadow-[0_18px_42px_rgba(18,15,12,0.07)]">
              <p className="text-xs uppercase tracking-[0.16em] text-muted">Case structure</p>
              <div className="mt-4 space-y-3 text-sm leading-7 text-muted">
                <p>Challenge, role, system, interactions, implementation, and outcome stay consistent across every project.</p>
                <p>That makes it easier to compare different project types without losing the business story behind the visuals.</p>
              </div>
            </div>
          </aside>

          <article className="glass-panel rounded-[2.2rem] px-6 py-8 md:px-10 md:py-12">
            <div className="prose-shell max-w-none">{content}</div>
          </article>
        </section>

        <section className="rounded-[2.3rem] border border-[rgba(22,17,13,0.08)] bg-[#14100d] bg-[linear-gradient(135deg,#14100d,#2a221c_55%,#10245f)] px-6 py-8 text-white md:px-8 md:py-10">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <div className="space-y-3">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/90">Next move</p>
              <h2 className="font-display text-[clamp(2.1rem,4vw,3.4rem)] leading-[0.96] text-white">
                If you need the same standard on a real product, website, or redesign, let&apos;s talk.
              </h2>
              <p className="max-w-2xl text-base leading-7 text-white/90">
                I work on projects that need stronger interface direction, better interaction quality, and cleaner delivery
                from concept through implementation.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link
                className="inline-flex cursor-pointer items-center rounded-full bg-white px-5 py-3 text-sm font-semibold text-ink"
                href="/contact"
              >
                Discuss a project
              </Link>
              <Link
                className="inline-flex cursor-pointer items-center rounded-full border border-white/18 px-5 py-3 text-sm font-semibold text-white"
                href="/work"
              >
                Back to archive
              </Link>
            </div>
          </div>
        </section>
      </main>
    </SiteShell>
  );
}
