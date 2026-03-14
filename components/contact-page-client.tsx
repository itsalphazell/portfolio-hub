"use client";

import Link from "next/link";
import { ArrowUpRight, Github, Linkedin, Mail } from "lucide-react";
import { SiteShell } from "@/components/site-shell";
import { useLocale } from "@/components/locale-provider";
import { contactPageCopy, servicesByLocale } from "@/lib/locale-data";
import { contactLinks } from "@/lib/site-data";

export function ContactPageClient() {
  const { locale } = useLocale();
  const copy = contactPageCopy[locale];
  const services = servicesByLocale[locale];
  const socialLinks = [
    contactLinks.github ? { href: contactLinks.github, label: "GitHub", icon: Github } : null,
    contactLinks.linkedin ? { href: contactLinks.linkedin, label: "LinkedIn", icon: Linkedin } : null,
  ].filter(Boolean) as Array<{ href: string; label: string; icon: typeof Github }>;

  return (
    <SiteShell>
      <main className="page-shell space-y-12 pb-14 pt-14 md:pt-16">
        <section
          className="contact-stage-shell grid gap-8 overflow-hidden rounded-[2.8rem] px-6 py-8 md:px-8 md:py-10 lg:grid-cols-[1.08fr_0.92fr]"
          data-audit-bg="rgb(7,16,43)"
        >
          <div className="space-y-5">
            <p className="section-kicker text-white/76">{copy.kicker}</p>
            <h1 className="section-title max-w-[12ch] text-balance text-white">{copy.title}</h1>
            <p className="max-w-2xl text-lg leading-8 text-white/88">{copy.body}</p>
          </div>

          <div
            className="contact-stage-panel rounded-[2rem] border border-white/10 bg-white/[0.05] p-6 shadow-[0_20px_48px_rgba(4,10,28,0.18)]"
            data-audit-bg="rgb(11,23,56)"
          >
            <p className="font-signal text-[10px] uppercase tracking-[0.18em] text-white/72">{copy.primaryContact}</p>
            <div className="mt-5 space-y-3">
              <Link
                className="inline-flex w-full items-center justify-between rounded-[1.4rem] bg-white px-5 py-4 text-sm font-semibold text-ink transition-transform duration-200 hover:-translate-y-0.5"
                href={`mailto:${contactLinks.email}`}
              >
                <span className="inline-flex items-center gap-3">
                  <Mail className="h-4 w-4" />
                  {contactLinks.email}
                </span>
                <ArrowUpRight className="h-4 w-4" />
              </Link>

              {contactLinks.bookingUrl ? (
                <Link
                  className="inline-flex w-full items-center justify-between rounded-[1.4rem] border border-white/14 bg-white/[0.05] px-5 py-4 text-sm font-semibold text-white transition-colors duration-200 hover:bg-white/[0.08]"
                  data-audit-bg="rgb(11,23,56)"
                  href={contactLinks.bookingUrl}
                  rel="noreferrer"
                  target="_blank"
                >
                  <span>{copy.bookCall}</span>
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
              ) : null}

              {socialLinks.length ? (
                <div className="flex flex-wrap gap-3 pt-2">
                  {socialLinks.map((item) => (
                    <Link
                      className="inline-flex items-center gap-2 rounded-full border border-white/12 px-4 py-2 text-sm font-semibold text-white/86 transition-colors duration-200 hover:bg-white/[0.08]"
                      data-audit-bg="rgb(11,23,56)"
                      href={item.href}
                      key={item.label}
                      rel="noreferrer"
                      target="_blank"
                    >
                      <item.icon className="h-4 w-4" />
                      {item.label}
                    </Link>
                  ))}
                </div>
              ) : null}
            </div>
          </div>
        </section>

        <section className="grid gap-5 md:grid-cols-3">
          {services.map((service) => (
            <article className="service-stage-card rounded-[1.8rem] border p-6 shadow-[0_18px_42px_rgba(18,15,12,0.07)]" key={service.title}>
              <div className="space-y-4">
                <span className="inline-flex rounded-full border border-[rgba(16,36,95,0.12)] bg-white/84 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-accent-deep">
                  {service.ctaLabel}
                </span>
                <div className="space-y-3">
                  <h2 className="font-display text-[clamp(1.8rem,2.2vw,2.35rem)] leading-[0.98] text-balance text-ink">{service.title}</h2>
                  <p className="text-base leading-7 text-muted">{service.deliverable}</p>
                  <p className="text-sm leading-7 text-muted">{service.fit}</p>
                </div>
              </div>
            </article>
          ))}
        </section>
      </main>
    </SiteShell>
  );
}
