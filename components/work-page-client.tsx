"use client";

import { SiteShell } from "@/components/site-shell";
import { useLocale } from "@/components/locale-provider";
import { WorkArchive } from "@/components/work-archive";
import { workPageCopy } from "@/lib/locale-data";
import type { Locale, ProjectFrontmatter } from "@/lib/types";

interface WorkPageClientProps {
  projectsByLocale: Record<Locale, ProjectFrontmatter[]>;
}

export function WorkPageClient({ projectsByLocale }: WorkPageClientProps) {
  const { locale } = useLocale();
  const copy = workPageCopy[locale];

  return (
    <SiteShell>
      <main className="page-shell space-y-10 pb-12 pt-12">
        <section className="space-y-4">
          <p className="section-kicker">{copy.kicker}</p>
          <h1 className="section-title max-w-4xl">{copy.title}</h1>
          <p className="max-w-2xl text-lg leading-8 text-muted">{copy.body}</p>
        </section>
        <WorkArchive projectsByLocale={projectsByLocale} />
      </main>
    </SiteShell>
  );
}
