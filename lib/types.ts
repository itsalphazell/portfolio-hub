export type ProjectType = "real" | "concept";

export type ProjectFilter = "all" | "real" | "concept" | "marketing" | "product" | "motion";
export type Locale = "en" | "fr";

export interface ProjectFrontmatter {
  slug: string;
  title: string;
  type: ProjectType;
  industry: string;
  status: string;
  summary: string;
  stack: string[];
  tags: string[];
  liveUrl?: string;
  repoUrl?: string;
  coverImage: string;
  featured: boolean;
  order: number;
}

export interface ProjectRecord extends ProjectFrontmatter {
  content: string;
}

export interface ServiceCard {
  title: string;
  deliverable: string;
  fit: string;
  ctaLabel: string;
}

export interface ContactLinks {
  email: string;
  bookingUrl?: string;
  github?: string;
  linkedin?: string;
}

export interface ProjectShot {
  src: string;
  alt: string;
  caption: string;
  viewport: "desktop" | "detail" | "mobile";
}

export interface ProjectShowcase {
  metrics: Array<{ label: string; value: string }>;
  shots: ProjectShot[];
}

export interface HomeMode {
  slug: string;
  label: string;
  eyebrow: string;
  heroLine: string;
  valueLine: string;
  stageTitle: string;
  stageSummary: string;
  pulse: string;
  accent: string;
  accentSoft: string;
  metrics: Array<{ label: string; value: string }>;
  cues: string[];
  modules: Array<{ label: string; value: string }>;
}
