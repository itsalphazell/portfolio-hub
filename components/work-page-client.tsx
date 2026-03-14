"use client";

import { SiteShell } from "@/components/site-shell";
import { useLocale } from "@/components/locale-provider";
import { WorkArchive } from "@/components/work-archive";
import { homeModesByLocale, workPageCopy } from "@/lib/locale-data";
import type { Locale, ProjectFrontmatter } from "@/lib/types";

interface WorkPageClientProps {
  projectsByLocale: Record<Locale, ProjectFrontmatter[]>;
}

export function WorkPageClient({ projectsByLocale }: WorkPageClientProps) {
  const { locale } = useLocale();
  const copy = workPageCopy[locale];
  const registers = homeModesByLocale[locale];

  return (
    <SiteShell>
      <main className="page-shell space-y-12 pb-14 pt-14 md:pt-16">
        <section
          className="archive-hero-shell grid gap-8 overflow-hidden rounded-[2.8rem] px-6 py-8 md:px-8 md:py-10 lg:grid-cols-[1.02fr_0.98fr] lg:items-end"
          data-audit-bg="rgb(7,16,43)"
        >
          <div className="space-y-5">
            <p className="section-kicker text-white/76">{copy.kicker}</p>
            <h1 className="section-title max-w-[12ch] text-balance text-white">{copy.title}</h1>
            <p className="max-w-2xl text-lg leading-8 text-white/86">{copy.body}</p>
          </div>

          <div
            className="archive-hero-side rounded-[2rem] border border-white/10 bg-white/[0.045] p-6 shadow-[0_18px_42px_rgba(4,10,28,0.18)]"
            data-audit-bg="rgb(11,23,56)"
          >
            <p className="font-signal text-[10px] uppercase tracking-[0.18em] text-white/72">
              {locale === "fr" ? "Registres couverts" : "Covered registers"}
            </p>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {registers.map((register, index) => (
                <div
                  className="archive-register-card rounded-[1.4rem] border border-white/10 bg-white/[0.04] p-4"
                  data-audit-bg="rgb(14,28,67)"
                  key={register.slug}
                >
                  <p className="font-signal text-[10px] uppercase tracking-[0.18em] text-white/62">
                    {String(index + 1).padStart(2, "0")}
                  </p>
                  <p className="mt-3 text-sm font-semibold text-white">{register.label}</p>
                  <p className="mt-2 text-sm leading-6 text-white/80">{register.eyebrow}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <WorkArchive projectsByLocale={projectsByLocale} />
      </main>
    </SiteShell>
  );
}
