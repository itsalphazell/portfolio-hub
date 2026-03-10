"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { LanguageSwitcher } from "@/components/language-switcher";
import { useLocale } from "@/components/locale-provider";
import { siteShellCopy } from "@/lib/locale-data";
import { contactLinks } from "@/lib/site-data";

export function SiteShell({ children }: { children: ReactNode }) {
  const { locale } = useLocale();
  const copy = siteShellCopy[locale];
  const navigation = [
    { href: "/", label: copy.nav.home },
    { href: "/work", label: copy.nav.work },
    { href: "/contact", label: copy.nav.contact },
  ];

  return (
    <div className="relative min-h-screen pb-16">
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[32rem] overflow-hidden">
        <div className="floating-orb left-[10%] top-20 h-44 w-44 bg-[rgba(42,91,255,0.14)]" />
        <div className="floating-orb right-[12%] top-14 h-56 w-56 bg-[rgba(255,188,129,0.24)]" />
        <div className="floating-orb left-[45%] top-44 h-28 w-28 bg-[rgba(18,36,95,0.14)]" />
      </div>
      <header className="page-shell sticky top-0 z-40 pt-4">
        <div className="glass-panel flex items-center justify-between rounded-full px-4 py-3 md:px-6">
          <Link className="link-reset flex items-baseline gap-2 text-sm font-medium" href="/">
            <span className="font-display text-xl">Thomas</span>
            <span className="text-muted">{copy.strapline}</span>
          </Link>
          <div className="hidden items-center gap-4 md:flex">
            <nav className="flex items-center gap-6 text-sm text-muted">
              {navigation.map((item) => (
                <Link
                  className="link-reset transition-colors duration-200 hover:text-ink focus-visible:text-ink"
                  href={item.href}
                  key={item.href}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
            <LanguageSwitcher />
          </div>
          <div className="flex items-center gap-3">
            <div className="md:hidden">
              <LanguageSwitcher />
            </div>
            <Link
              className="inline-flex cursor-pointer items-center gap-2 rounded-full bg-accent px-4 py-2 text-sm font-semibold text-[rgb(255_255_255)] transition-transform duration-200 hover:-translate-y-0.5 focus-visible:-translate-y-0.5"
              href={contactLinks.bookingUrl || "/contact"}
              rel={contactLinks.bookingUrl ? "noreferrer" : undefined}
              target={contactLinks.bookingUrl ? "_blank" : undefined}
            >
              {copy.cta}
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </header>
      {children}
      <footer className="page-shell mt-20">
        <div className="flex flex-col gap-6 border-t border-[rgba(22,17,13,0.08)] py-8 text-sm text-muted md:flex-row md:items-center md:justify-between">
          <div>
            <p className="font-display text-2xl text-ink">Thomas</p>
            <p>{copy.footerLine}</p>
          </div>
          <div className="flex flex-wrap items-center gap-4">
            <Link className="link-reset transition-colors hover:text-ink" href={`mailto:${contactLinks.email}`}>
              {contactLinks.email}
            </Link>
            {contactLinks.github ? (
              <Link
                className="link-reset transition-colors hover:text-ink"
                href={contactLinks.github}
                rel="noreferrer"
                target="_blank"
              >
                GitHub
              </Link>
            ) : null}
            {contactLinks.linkedin ? (
              <Link
                className="link-reset transition-colors hover:text-ink"
                href={contactLinks.linkedin}
                rel="noreferrer"
                target="_blank"
              >
                LinkedIn
              </Link>
            ) : null}
          </div>
        </div>
      </footer>
    </div>
  );
}
