import { readFileSync, readdirSync } from "node:fs";
import path from "node:path";
import { cache } from "react";
import matter from "gray-matter";
import type { Locale, ProjectFrontmatter, ProjectRecord } from "@/lib/types";

const workDirectories: Record<Locale, string> = {
  en: path.join(process.cwd(), "content", "work"),
  fr: path.join(process.cwd(), "content", "work-fr"),
};

function normalizeProject(data: Record<string, unknown>): ProjectFrontmatter {
  return {
    slug: String(data.slug),
    title: String(data.title),
    type: data.type === "concept" ? "concept" : "real",
    industry: String(data.industry),
    status: String(data.status),
    summary: String(data.summary),
    stack: Array.isArray(data.stack) ? data.stack.map((entry) => String(entry)) : [],
    tags: Array.isArray(data.tags) ? data.tags.map((entry) => String(entry)) : [],
    liveUrl: data.liveUrl ? String(data.liveUrl) : undefined,
    repoUrl: data.repoUrl ? String(data.repoUrl) : undefined,
    coverImage: String(data.coverImage),
    featured: Boolean(data.featured),
    order: Number(data.order ?? 0),
  };
}

function getWorkDirectory(locale: Locale) {
  return workDirectories[locale];
}

export const getAllProjects = cache((locale: Locale = "en"): ProjectFrontmatter[] => {
  const files = readdirSync(getWorkDirectory(locale)).filter((file) => file.endsWith(".mdx"));

  return files
    .map((file) => {
      const source = readFileSync(path.join(getWorkDirectory(locale), file), "utf8");
      const { data } = matter(source);
      return normalizeProject(data);
    })
    .sort((left, right) => left.order - right.order);
});

export const getFeaturedProjects = cache((locale: Locale = "en") =>
  getAllProjects(locale)
    .filter((project) => project.featured)
    .sort((left, right) => left.order - right.order),
);

export const getProjectSlugs = cache(() => getAllProjects("en").map((project) => project.slug));

export const getProjectBySlug = cache((slug: string, locale: Locale = "en"): ProjectRecord | null => {
  const filePath = path.join(getWorkDirectory(locale), `${slug}.mdx`);

  try {
    const source = readFileSync(filePath, "utf8");
    const { data, content } = matter(source);
    return {
      ...normalizeProject(data),
      content,
    };
  } catch {
    if (locale !== "en") {
      return getProjectBySlug(slug, "en");
    }

    return null;
  }
});
