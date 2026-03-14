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
        <section className="work-hero-shell grid gap-8 overflow-hidden rounded-[2.6rem] border border-[rgba(63,91,170,0.12)] px-6 py-8 md:px-8 md:py-10 lg:grid-cols-[1.04fr_0.96fr] lg:items-end">
          <div className="space-y-4">
            <p className="section-kicker">{copy.kicker}</p>
            <h1 className="section-title max-w-4xl">{copy.title}</h1>
            <p className="max-w-2xl text-lg leading-8 text-muted">{copy.body}</p>
          </div>
          <div className="rounded-[1.9rem] border border-[rgba(66,96,175,0.12)] bg-[linear-gradient(180deg,rgba(255,255,255,0.94),rgba(242,247,255,0.88))] p-6 shadow-[0_18px_42px_rgba(14,18,36,0.08)]">
            <p className="font-signal text-[10px] uppercase tracking-[0.18em] text-accent-deep">{copy.kicker}</p>
            <p className="mt-4 text-base leading-7 text-muted">
              {locale === "fr"
                ? "L'archive reste selective, mais elle couvre aujourd'hui quatre registres clairs : marque de service, conversion produit, application analytics et prototype interactif."
                : "The archive stays selective, but it now covers four clear registers: service brand, conversion product, analytics app, and interactive prototype."}
            </p>
          </div>
        </section>
        <WorkArchive projectsByLocale={projectsByLocale} />
      </main>
    </SiteShell>
  );
}
