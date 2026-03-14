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
  const mobileCta = copy.ctaMobile;
  const navigation = [
    { href: "/", label: copy.nav.home },
    { href: "/work", label: copy.nav.work },
    { href: "/contact", label: copy.nav.contact },
  ];

  return (
    <div className="relative min-h-screen pb-16">
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[36rem] overflow-hidden">
        <div className="floating-orb left-[8%] top-18 h-48 w-48 bg-[rgba(42,91,255,0.14)]" />
        <div className="floating-orb right-[10%] top-12 h-60 w-60 bg-[rgba(112,150,255,0.12)]" />
        <div className="floating-orb left-[40%] top-44 h-36 w-36 bg-[rgba(123,232,255,0.12)]" />
      </div>
      <header className="page-shell sticky top-0 z-40 pt-4">
        <div className="site-header-shell flex items-center justify-between gap-3 rounded-[1.8rem] px-4 py-3 md:px-6">
          <Link className="link-reset flex min-w-0 flex-col justify-center gap-0.5" href="/">
            <span className="font-display text-xl text-ink">Thomas</span>
            <span className="hidden truncate text-[11px] uppercase tracking-[0.18em] text-muted lg:block">{copy.strapline}</span>
          </Link>
          <div className="hidden items-center gap-4 md:flex">
            <nav className="site-nav-shell flex items-center gap-1 rounded-full px-2 py-1 text-sm text-muted">
              {navigation.map((item) => (
                <Link
                  className="link-reset rounded-full px-4 py-2 transition-colors duration-200 hover:bg-[rgba(12,20,45,0.05)] hover:text-ink focus-visible:bg-[rgba(12,20,45,0.05)] focus-visible:text-ink"
                  href={item.href}
                  key={item.href}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
            <LanguageSwitcher />
          </div>
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="md:hidden">
              <LanguageSwitcher />
            </div>
            <Link
              className="inline-flex shrink-0 cursor-pointer items-center gap-1.5 rounded-full bg-accent px-3 py-2 text-xs font-semibold text-[rgb(255_255_255)] transition-transform duration-200 hover:-translate-y-0.5 focus-visible:-translate-y-0.5 sm:gap-2 sm:px-4 sm:text-sm"
              href={contactLinks.bookingUrl || "/contact"}
              rel={contactLinks.bookingUrl ? "noreferrer" : undefined}
              target={contactLinks.bookingUrl ? "_blank" : undefined}
            >
              <span className="sm:hidden">{mobileCta}</span>
              <span className="hidden sm:inline">{copy.cta}</span>
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </header>
      {children}
      <footer className="page-shell mt-20">
        <div className="site-footer-shell grid gap-6 rounded-[2.1rem] px-6 py-8 text-sm text-muted md:grid-cols-[1fr_auto] md:items-end md:px-8">
          <div className="space-y-3">
            <p className="font-display text-2xl text-ink">Thomas</p>
            <p className="max-w-[34rem] leading-7">{copy.footerLine}</p>
          </div>
          <div className="flex flex-wrap items-center gap-4 md:justify-end">
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
