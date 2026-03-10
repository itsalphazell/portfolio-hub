import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { compileMDX } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import { mdxComponents } from "@/components/mdx";
import { ProjectDetailClient } from "@/components/project-detail-client";
import { getProjectBySlug, getProjectSlugs } from "@/lib/content";
import { projectShowcasesByLocale } from "@/lib/locale-data";

export function generateStaticParams() {
  return getProjectSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug, "en");

  if (!project) {
    return {};
  }

  return {
    title: `${project.title} | Thomas`,
    description: project.summary,
  };
}

async function compileProjectContent(source: string) {
  const { content } = await compileMDX({
    source,
    components: mdxComponents,
    options: {
      mdxOptions: {
        remarkPlugins: [remarkGfm],
      },
    },
  });

  return content;
}

export default async function ProjectDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const projectEn = getProjectBySlug(slug, "en");
  const projectFr = getProjectBySlug(slug, "fr");

  if (!projectEn || !projectFr) {
    notFound();
  }

  const [contentEn, contentFr] = await Promise.all([
    compileProjectContent(projectEn.content),
    compileProjectContent(projectFr.content),
  ]);

  return (
    <ProjectDetailClient
      contentByLocale={{ en: contentEn, fr: contentFr }}
      projectsByLocale={{ en: projectEn, fr: projectFr }}
      showcasesByLocale={{
        en: projectShowcasesByLocale.en[slug],
        fr: projectShowcasesByLocale.fr[slug],
      }}
    />
  );
}
