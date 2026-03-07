import Link from "next/link";
import { Mail, ArrowUpRight, Github, Linkedin } from "lucide-react";
import { SiteShell } from "@/components/site-shell";
import { contactLinks, services } from "@/lib/site-data";

export default function ContactPage() {
  const socialLinks = [
    contactLinks.github ? { href: contactLinks.github, label: "GitHub", icon: Github } : null,
    contactLinks.linkedin ? { href: contactLinks.linkedin, label: "LinkedIn", icon: Linkedin } : null,
  ].filter(Boolean) as Array<{ href: string; label: string; icon: typeof Github }>;

  return (
    <SiteShell>
      <main className="page-shell space-y-10 pb-12 pt-12">
        <section className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-5">
            <p className="section-kicker">Contact</p>
            <h1 className="section-title max-w-4xl">If the next release needs a sharper front-end, start here.</h1>
            <p className="max-w-2xl text-lg leading-8 text-muted">
              I take on selective freelance work around premium public-facing UI and product surfaces. The fastest path
              is to send the current site, the goal, and where the interface is underperforming.
            </p>
          </div>
          <div className="glass-panel rounded-[2rem] p-6">
            <p className="text-xs uppercase tracking-[0.16em] text-muted">Primary contact</p>
            <div className="mt-4 space-y-3">
              <Link
                className="inline-flex w-full cursor-pointer items-center justify-between rounded-[1.4rem] bg-ink px-5 py-4 text-sm font-semibold text-[rgb(255_255_255)] transition-transform duration-200 hover:-translate-y-0.5"
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
                  className="inline-flex w-full cursor-pointer items-center justify-between rounded-[1.4rem] border border-[rgba(22,17,13,0.12)] px-5 py-4 text-sm font-semibold text-ink"
                  href={contactLinks.bookingUrl}
                  rel="noreferrer"
                  target="_blank"
                >
                  <span>Book a call</span>
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
              ) : null}
              {socialLinks.length ? (
                <div className="flex flex-wrap gap-3 pt-2">
                  {socialLinks.map((item) => (
                    <Link
                      className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-[rgba(22,17,13,0.12)] px-4 py-2 text-sm font-semibold text-ink"
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

        <section className="grid gap-5">
          {services.map((service) => (
            <article
              className="rounded-[1.8rem] border border-[rgba(22,17,13,0.08)] bg-white/80 p-6 shadow-[0_18px_42px_rgba(18,15,12,0.07)]"
              key={service.title}
            >
              <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                <div className="space-y-2">
                  <h2 className="font-display text-3xl leading-none text-ink">{service.title}</h2>
                  <p className="max-w-3xl text-base leading-7 text-muted">{service.deliverable}</p>
                </div>
                <span className="rounded-full border border-[rgba(16,36,95,0.22)] bg-accent-deep px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-white">
                  {service.ctaLabel}
                </span>
              </div>
            </article>
          ))}
        </section>
      </main>
    </SiteShell>
  );
}
