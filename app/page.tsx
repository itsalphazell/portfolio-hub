import Link from "next/link";
import { ArrowRight, ArrowUpRight, Sparkles } from "lucide-react";
import { ProjectCard } from "@/components/project-card";
import { SiteShell } from "@/components/site-shell";
import { getFeaturedProjects } from "@/lib/content";
import { contactLinks, processSteps, proofPoints, services } from "@/lib/site-data";

export default function HomePage() {
  const featuredProjects = getFeaturedProjects();

  return (
    <SiteShell>
      <main className="space-y-24 pb-10 pt-10 md:space-y-32">
        <section className="page-shell relative overflow-hidden rounded-[2.5rem] border border-[rgba(22,17,13,0.08)] px-6 py-10 soft-grid md:px-10 md:py-14">
          <div className="absolute inset-0 -z-10 bg-[linear-gradient(135deg,rgba(255,255,255,0.86),rgba(255,248,240,0.62))]" />
          <div className="grid gap-10 lg:grid-cols-[1.25fr_0.85fr] lg:items-end">
            <div className="space-y-7">
              <div className="inline-flex items-center gap-2 rounded-full border border-[rgba(22,17,13,0.1)] bg-white/75 px-4 py-2 text-sm text-muted">
                <Sparkles className="h-4 w-4 text-accent" />
                English-first front-end portfolio for premium freelance work
              </div>
              <div className="space-y-5">
                <p className="section-kicker">Thomas · front-end designer-builder</p>
                <h1 className="section-title max-w-4xl">
                  Premium interfaces
                  <span className="block text-accent-deep">that explain, convert, and feel built with intent.</span>
                </h1>
                <p className="max-w-2xl text-lg leading-8 text-muted md:text-xl">
                  I design and build front-end surfaces for launches, redesigns, and product experiences. The goal is
                  simple: make the work look sharp, scan fast, and feel credible under real use.
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <Link
                  className="inline-flex cursor-pointer items-center gap-2 rounded-full bg-ink px-5 py-3 text-sm font-semibold text-white transition-transform duration-200 hover:-translate-y-0.5"
                  href="/work"
                >
                  Browse case studies
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-[rgba(22,17,13,0.12)] bg-white/80 px-5 py-3 text-sm font-semibold text-ink transition-colors duration-200 hover:bg-white"
                  href={contactLinks.bookingUrl || "/contact"}
                  rel={contactLinks.bookingUrl ? "noreferrer" : undefined}
                  target={contactLinks.bookingUrl ? "_blank" : undefined}
                >
                  Start a project
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
            <div className="glass-panel rounded-[2rem] p-6">
              <div className="space-y-6">
                <div className="flex items-center justify-between text-sm text-muted">
                  <span>Offer focus</span>
                  <span>Front-end only</span>
                </div>
                <div className="space-y-3">
                  <div className="rounded-[1.4rem] bg-[rgba(18,36,95,0.94)] p-5 text-white shadow-[var(--shadow-strong)]">
                    <p className="text-xs uppercase tracking-[0.16em] text-white/70">Primary positioning</p>
                    <p className="mt-2 font-display text-3xl">Marketing surfaces with product discipline.</p>
                  </div>
                  <div className="grid gap-3 sm:grid-cols-2">
                    <div className="rounded-[1.4rem] bg-white/90 p-5">
                      <p className="text-xs uppercase tracking-[0.16em] text-muted">Public pages</p>
                      <p className="mt-2 text-sm leading-6 text-ink">
                        Launch pages, rebrands, storytelling layouts, and conversion-led refreshes.
                      </p>
                    </div>
                    <div className="rounded-[1.4rem] bg-white/90 p-5">
                      <p className="text-xs uppercase tracking-[0.16em] text-muted">Product UI</p>
                      <p className="mt-2 text-sm leading-6 text-ink">
                        Dashboards, onboarding, analytics, settings, and premium internal tooling.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="page-shell space-y-8">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div className="space-y-3">
              <p className="section-kicker">Featured work</p>
              <h2 className="section-subtitle max-w-3xl">Three interface registers, one consistent standard.</h2>
            </div>
            <Link className="text-sm font-semibold text-accent-deep underline underline-offset-4" href="/work">
              See the full archive
            </Link>
          </div>
          <div className="grid gap-6 xl:grid-cols-[1.25fr_1.25fr_1fr]">
            {featuredProjects.map((project) => (
              <ProjectCard key={project.slug} project={project} variant="featured" />
            ))}
          </div>
        </section>

        <section className="page-shell grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
          <div className="space-y-4">
            <p className="section-kicker">Services</p>
            <h2 className="section-subtitle">Three offers built to make the next surface easier to sell.</h2>
            <p className="max-w-xl text-lg leading-8 text-muted">
              The public site, the campaign page, and the product UI do not need the same rhythm. The offer is split
              so each project gets the right level of structure and visual pressure.
            </p>
          </div>
          <div className="grid gap-5">
            {services.map((service) => (
              <article
                className="rounded-[1.8rem] border border-[rgba(22,17,13,0.08)] bg-white/80 p-6 shadow-[0_18px_42px_rgba(18,15,12,0.07)]"
                key={service.title}
              >
                <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                  <div className="space-y-3">
                    <h3 className="font-display text-3xl leading-none text-ink">{service.title}</h3>
                    <p className="max-w-2xl text-base leading-7 text-muted">{service.deliverable}</p>
                    <p className="max-w-2xl text-sm leading-7 text-muted">{service.fit}</p>
                  </div>
                  <span className="rounded-full bg-accent-soft px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-accent-deep">
                    {service.ctaLabel}
                  </span>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="page-shell grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
          <div className="glass-panel rounded-[2rem] p-6 md:p-8">
            <p className="section-kicker">Process</p>
            <div className="mt-5 space-y-6">
              {processSteps.map((step, index) => (
                <div
                  className="border-b border-[rgba(22,17,13,0.08)] pb-6 last:border-b-0 last:pb-0"
                  key={step.title}
                >
                  <p className="text-xs uppercase tracking-[0.18em] text-muted">0{index + 1}</p>
                  <h3 className="mt-2 text-xl font-semibold text-ink">{step.title}</h3>
                  <p className="mt-2 text-base leading-7 text-muted">{step.body}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-[2rem] border border-[rgba(22,17,13,0.08)] bg-[rgba(16,36,95,0.95)] p-6 text-white md:p-8">
            <p className="section-kicker text-white/70">Proof</p>
            <div className="mt-5 grid gap-4 md:grid-cols-3">
              {proofPoints.map((item) => (
                <div
                  className="rounded-[1.5rem] border border-white/12 bg-white/6 p-5 shadow-[0_18px_46px_rgba(0,0,0,0.16)]"
                  key={item.label}
                >
                  <p className="text-xs uppercase tracking-[0.16em] text-white/64">{item.label}</p>
                  <p className="mt-3 font-display text-3xl leading-none">{item.value}</p>
                </div>
              ))}
            </div>
            <div className="mt-7 grid gap-4 text-sm text-white/76 md:grid-cols-2">
              <div className="rounded-[1.5rem] border border-white/10 bg-white/5 p-5">
                <p className="font-semibold text-white">Tooling in the stack</p>
                <p className="mt-2 leading-7">
                  Next.js 15, React 19, Tailwind 4, Cloudflare-ready delivery, and Playwright smoke checks for UI
                  quality.
                </p>
              </div>
              <div className="rounded-[1.5rem] border border-white/10 bg-white/5 p-5">
                <p className="font-semibold text-white">What I optimise for</p>
                <p className="mt-2 leading-7">
                  Strong first impression, tight CTA hierarchy, responsive polish, and motion that never blocks
                  readability.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="page-shell">
          <div className="rounded-[2.4rem] border border-[rgba(22,17,13,0.08)] bg-[linear-gradient(135deg,#14100d,#2a221c_55%,#10245f)] px-6 py-10 text-white md:px-10 md:py-12">
            <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
              <div className="space-y-4">
                <p className="section-kicker text-white/70">Next step</p>
                <h2 className="section-subtitle text-white">If the surface matters to the sale, I can help shape it.</h2>
                <p className="max-w-2xl text-lg leading-8 text-white/74">
                  I take on premium landing rebuilds, product UI direction, and front-end refreshes that need a sharper
                  identity without becoming noisy.
                </p>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row lg:justify-end">
                <Link
                  className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-ink transition-transform duration-200 hover:-translate-y-0.5"
                  href={`mailto:${contactLinks.email}`}
                >
                  Email Thomas
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
                <Link
                  className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-full border border-white/18 px-5 py-3 text-sm font-semibold text-white transition-colors duration-200 hover:bg-white/10"
                  href="/contact"
                >
                  Contact page
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
    </SiteShell>
  );
}
