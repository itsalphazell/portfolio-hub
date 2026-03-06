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
        <section className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
          <div className="space-y-5">
            <p className="section-kicker">{project.type} case study</p>
            <h1 className="section-title max-w-4xl">{project.title}</h1>
            <p className="max-w-3xl text-lg leading-8 text-muted">{project.summary}</p>
            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <span
                  className="rounded-full bg-accent-soft px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-accent-deep"
                  key={tag}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
          <div className="glass-panel rounded-[2rem] p-6">
            <p className="text-xs uppercase tracking-[0.16em] text-muted">Stack</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {project.stack.map((entry) => (
                <span className="rounded-full border border-[rgba(22,17,13,0.1)] px-3 py-1.5 text-sm" key={entry}>
                  {entry}
                </span>
              ))}
            </div>
            <div className="mt-6 flex flex-wrap gap-3">
              {project.liveUrl ? (
                <Link
                  className="inline-flex cursor-pointer items-center rounded-full bg-ink px-4 py-2 text-sm font-semibold text-white"
                  href={project.liveUrl}
                  rel="noreferrer"
                  target="_blank"
                >
                  Open live demo
                </Link>
              ) : null}
              {project.repoUrl ? (
                <Link
                  className="inline-flex cursor-pointer items-center rounded-full border border-[rgba(22,17,13,0.12)] px-4 py-2 text-sm font-semibold text-ink"
                  href={project.repoUrl}
                  rel="noreferrer"
                  target="_blank"
                >
                  View repository
                </Link>
              ) : null}
            </div>
          </div>
        </section>

        {showcase ? <ProjectGallery showcase={showcase} /> : null}

        <article className="glass-panel rounded-[2.2rem] px-6 py-8 md:px-10 md:py-12">
          <div className="prose-shell max-w-3xl">{content}</div>
        </article>

        <section className="rounded-[2rem] border border-[rgba(22,17,13,0.08)] bg-white/80 px-6 py-8 md:px-8">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="space-y-2">
              <p className="section-kicker">Want a similar result?</p>
              <h2 className="font-display text-4xl text-ink">The next surface can be shaped around the same standard.</h2>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link
                className="inline-flex cursor-pointer items-center rounded-full bg-ink px-5 py-3 text-sm font-semibold text-white"
                href="/contact"
              >
                Discuss a project
              </Link>
              <Link
                className="inline-flex cursor-pointer items-center rounded-full border border-[rgba(22,17,13,0.12)] px-5 py-3 text-sm font-semibold text-ink"
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
