import { readFileSync, readdirSync } from "node:fs";
import path from "node:path";
import { cache } from "react";
import matter from "gray-matter";
import type { ProjectFrontmatter, ProjectRecord } from "@/lib/types";

const workDirectory = path.join(process.cwd(), "content", "work");

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

export const getAllProjects = cache((): ProjectFrontmatter[] => {
  const files = readdirSync(workDirectory).filter((file) => file.endsWith(".mdx"));

  return files
    .map((file) => {
      const source = readFileSync(path.join(workDirectory, file), "utf8");
      const { data } = matter(source);
      return normalizeProject(data);
    })
    .sort((left, right) => left.order - right.order);
});

export const getFeaturedProjects = cache(() =>
  getAllProjects()
    .filter((project) => project.featured)
    .sort((left, right) => left.order - right.order),
);

export const getProjectSlugs = cache(() => getAllProjects().map((project) => project.slug));

export const getProjectBySlug = cache((slug: string): ProjectRecord | null => {
  const filePath = path.join(workDirectory, `${slug}.mdx`);

  try {
    const source = readFileSync(filePath, "utf8");
    const { data, content } = matter(source);
    return {
      ...normalizeProject(data),
      content,
    };
  } catch {
    return null;
  }
});
