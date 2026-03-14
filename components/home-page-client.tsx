"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { HomeSignatureShowcase } from "@/components/home-signature-showcase";
import { SiteShell } from "@/components/site-shell";
import { useLocale } from "@/components/locale-provider";
import { homeCopy, processStepsByLocale, proofPointsByLocale, servicesByLocale } from "@/lib/locale-data";
import { contactLinks } from "@/lib/site-data";
import type { Locale, ProjectFrontmatter } from "@/lib/types";

interface HomePageClientProps {
  featuredProjectsByLocale: Record<Locale, ProjectFrontmatter[]>;
}

export function HomePageClient({ featuredProjectsByLocale }: HomePageClientProps) {
  const { locale } = useLocale();
  const copy = homeCopy[locale];
  const services = servicesByLocale[locale];
  const processSteps = processStepsByLocale[locale];
  const proofPoints = proofPointsByLocale[locale];

  return (
    <SiteShell>
      <main className="space-y-24 pb-10 pt-10 md:space-y-32">
        <HomeSignatureShowcase featuredProjectsByLocale={featuredProjectsByLocale} />

        <section className="page-shell grid gap-8 lg:grid-cols-[0.82fr_1.18fr] lg:items-start">
          <div className="space-y-4">
            <p className="section-kicker">{copy.servicesKicker}</p>
            <h2 className="section-subtitle">{copy.servicesTitle}</h2>
            <p className="max-w-xl text-lg leading-8 text-muted">{copy.servicesBody}</p>
          </div>
          <div className="grid gap-5 lg:grid-cols-3">
            {services.map((service, index) => (
              <article
                className="service-stage-card relative overflow-hidden rounded-[1.7rem] border p-6 shadow-[0_18px_42px_rgba(18,15,12,0.07)]"
                key={service.title}
              >
                <div
                  className="absolute inset-x-0 top-0 h-1"
                  style={{
                    background:
                      index === 0
                        ? "linear-gradient(90deg, rgba(42,91,255,0.94), rgba(123,232,255,0.9))"
                        : index === 1
                          ? "linear-gradient(90deg, rgba(15,56,188,0.94), rgba(109,143,255,0.9))"
                          : "linear-gradient(90deg, rgba(47,214,187,0.94), rgba(123,232,255,0.9))",
                  }}
                />
                <div className="space-y-4">
                  <span className="inline-flex rounded-full border border-[rgba(16,36,95,0.12)] bg-white/84 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-accent-deep">
                    {service.ctaLabel}
                  </span>
                  <div className="space-y-3">
                    <h3 className="font-display text-[clamp(1.6rem,1.55vw,1.95rem)] leading-[1.02] text-balance text-ink">
                      {service.title}
                    </h3>
                    <p className="text-base leading-7 text-muted">{service.deliverable}</p>
                    <p className="text-sm leading-6 text-muted">{service.fit}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="page-shell grid gap-8 lg:grid-cols-[1.02fr_0.98fr]">
          <div
            className="proof-stage relative overflow-hidden rounded-[2rem] border border-[rgba(73,116,255,0.18)] bg-[linear-gradient(145deg,#081130,#10245f_58%,#17398d_100%)] p-6 text-white md:p-8"
            data-audit-bg="rgba(8,17,48,1)"
          >
            <div className="proof-stage-beam absolute inset-y-0 right-0 w-[42%]" />
            <div className="relative">
              <p className="font-signal text-[10px] uppercase tracking-[0.2em] text-white/90">{copy.proofKicker}</p>
              <div className="mt-5 grid gap-4 sm:grid-cols-3">
                {proofPoints.map((item) => (
                  <div
                    className="rounded-[1.35rem] border border-white/12 bg-white/6 p-5 shadow-[0_18px_46px_rgba(0,0,0,0.16)]"
                    key={item.label}
                  >
                    <p className="font-signal text-[10px] uppercase tracking-[0.18em] text-white/82">{item.label}</p>
                    <p className="mt-3 font-display text-3xl leading-none">{item.value}</p>
                  </div>
                ))}
              </div>
              <div className="mt-7 grid gap-4 text-sm text-white/90 md:grid-cols-2">
                <div className="rounded-[1.5rem] border border-white/10 bg-white/5 p-5">
                  <p className="font-semibold text-white">{copy.toolingTitle}</p>
                  <p className="mt-2 leading-7 text-white/90">{copy.toolingBody}</p>
                </div>
                <div className="rounded-[1.5rem] border border-white/10 bg-white/5 p-5">
                  <p className="font-semibold text-white">{copy.optimiseTitle}</p>
                  <p className="mt-2 leading-7 text-white/90">{copy.optimiseBody}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="glass-panel rounded-[2rem] p-6 md:p-8">
            <p className="section-kicker">{copy.processKicker}</p>
            <div className="mt-5 space-y-5">
              {processSteps.map((step, index) => (
                <div
                  className="rounded-[1.5rem] border border-[rgba(22,17,13,0.08)] bg-white/72 p-5"
                  key={step.title}
                >
                  <p className="text-xs uppercase tracking-[0.18em] text-muted">0{index + 1}</p>
                  <h3 className="mt-2 text-xl font-semibold text-ink">{step.title}</h3>
                  <p className="mt-2 text-base leading-7 text-muted">{step.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="page-shell">
          <div className="signature-cta-shell rounded-[2.2rem] border border-[rgba(92,130,255,0.18)] px-6 py-10 text-white md:px-10 md:py-12">
            <div className="wow-cta-beam pointer-events-none absolute inset-y-0 right-[8%] w-1/3" />
            <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
              <div className="space-y-4">
                <p className="font-signal text-[10px] uppercase tracking-[0.2em] text-white/90">{copy.finalKicker}</p>
                <h2 className="section-subtitle text-white">{copy.finalTitle}</h2>
                <p className="max-w-2xl text-lg leading-8 text-white/88">{copy.finalBody}</p>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row lg:justify-end">
                <Link
                  className="cta-electric inline-flex cursor-pointer items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-semibold transition-transform duration-200 hover:-translate-y-0.5"
                  href={`mailto:${contactLinks.email}`}
                >
                  {copy.finalPrimaryCta}
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
                <Link
                  className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-full border border-white/18 px-5 py-3 text-sm font-semibold text-white transition-colors duration-200 hover:bg-white/10"
                  href="/contact"
                >
                  {copy.finalSecondaryCta}
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
    </SiteShell>
  );
}
