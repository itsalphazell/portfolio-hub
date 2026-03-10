import Link from "next/link";
import { ArrowRight, ArrowUpRight, Sparkles } from "lucide-react";
import { HeroAccentLine } from "@/components/hero-accent-line";
import { HomeSignalMarquee } from "@/components/home-signal-marquee";
import { PortfolioHeroScene } from "@/components/portfolio-hero-scene";
import { ProjectCard } from "@/components/project-card";
import { SiteShell } from "@/components/site-shell";
import { getFeaturedProjects } from "@/lib/content";
import { contactLinks, processSteps, proofPoints, services } from "@/lib/site-data";

export default function HomePage() {
  const featuredProjects = getFeaturedProjects();

  return (
    <SiteShell>
      <main className="space-y-24 pb-10 pt-10 md:space-y-32">
        <section className="page-shell hero-shell relative overflow-hidden rounded-[2.9rem] border border-[rgba(73,116,255,0.18)] px-6 py-10 md:px-10 md:py-14">
          <div className="hero-shell-noise absolute inset-0 -z-10" />
          <div className="hero-shell-grid absolute inset-[1px] -z-10 rounded-[2.8rem]" />
          <div className="grid gap-10 xl:grid-cols-[1.02fr_0.98fr] xl:items-center">
            <div className="space-y-8">
              <div className="inline-flex items-center gap-2 rounded-full border border-[rgba(145,180,255,0.28)] bg-[rgba(8,18,48,0.82)] px-4 py-2 text-sm text-[rgba(239,245,255,0.94)] backdrop-blur-md">
                <Sparkles className="h-4 w-4 text-[rgb(142_192_255)]" />
                UI designer, product engineer, full-stack delivery
              </div>
              <div className="space-y-5">
                <p className="hero-dark-kicker">Thomas / UI, UX &amp; Product Engineering Portfolio</p>
                <h1 className="section-title max-w-4xl text-white">
                  Design-led websites and product surfaces
                  <HeroAccentLine>that scan fast, sell clearly, and hold up in production.</HeroAccentLine>
                </h1>
                <p className="max-w-2xl text-lg leading-8 text-[rgba(239,244,255,0.9)] md:text-xl">
                  I design and build launches, product surfaces, and digital systems with a stronger eye for message clarity,
                  interaction depth, and implementation detail. The portfolio stays interface-led because that is what prospects need first.
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <Link
                  className="cta-electric inline-flex cursor-pointer items-center gap-2 rounded-full px-5 py-3 text-sm font-semibold transition-transform duration-200 hover:-translate-y-0.5"
                  href="/work"
                >
                  Browse case studies
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-[rgba(145,180,255,0.24)] bg-[rgba(8,18,48,0.78)] px-5 py-3 text-sm font-semibold text-white transition-colors duration-200 hover:bg-[rgba(12,24,62,0.92)]"
                  href="/contact"
                >
                  Discuss a project
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
              </div>
              <div className="grid gap-3 md:grid-cols-3">
                <div className="hero-capability-card rounded-[1.5rem] border p-4">
                  <p className="text-xs uppercase tracking-[0.16em] text-[rgba(197,221,255,0.9)]">Public launches</p>
                  <p className="mt-3 text-sm leading-7 text-[rgba(242,246,255,0.94)]">
                    Rebrands, campaign pages, hospitality sites, and premium public-facing surfaces with clearer value framing.
                  </p>
                </div>
                <div className="hero-capability-card rounded-[1.5rem] border p-4">
                  <p className="text-xs uppercase tracking-[0.16em] text-[rgba(197,221,255,0.9)]">Product depth</p>
                  <p className="mt-3 text-sm leading-7 text-[rgba(242,246,255,0.94)]">
                    Dashboards, onboarding, analytics, and interactive prototypes where structure matters as much as polish.
                  </p>
                </div>
                <div className="hero-capability-card rounded-[1.5rem] border p-4">
                  <p className="text-xs uppercase tracking-[0.16em] text-[rgba(197,221,255,0.9)]">Delivery posture</p>
                  <p className="mt-3 text-sm leading-7 text-[rgba(242,246,255,0.94)]">
                    Design-led and end-to-end, with full-stack awareness when the delivery path needs more than a UI pass.
                  </p>
                </div>
              </div>
            </div>

            <PortfolioHeroScene />
          </div>
        </section>

        <section className="page-shell space-y-8">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div className="space-y-3">
              <p className="section-kicker">Featured work</p>
              <h2 className="section-subtitle max-w-4xl">Four project registers, one consistent standard.</h2>
              <p className="max-w-3xl text-base leading-7 text-muted">
                Hospitality branding, conversion-led AI, a shipped analytics product, and an interactive B2B prototype.
                The section stays fast to scan while making the range feel sharper and more intentional.
              </p>
            </div>
            <Link className="text-sm font-semibold text-accent-deep underline underline-offset-4" href="/work">
              See the full archive
            </Link>
          </div>

          <HomeSignalMarquee
            items={[
              "Hospitality brand / atmosphere-led service site",
              "AI conversion flow / upload to unlock",
              "Analytics operations app / live product signal",
              "Interactive prototype / product state depth",
            ]}
          />

          <div className="grid gap-6 xl:grid-cols-2">
            {featuredProjects.map((project) => (
              <ProjectCard key={project.slug} project={project} variant="featured" />
            ))}
          </div>
        </section>

        <section className="page-shell grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
          <div className="space-y-4">
            <p className="section-kicker">Services</p>
            <h2 className="section-subtitle">Three offers shaped for the right level of clarity, polish, and depth.</h2>
            <p className="max-w-xl text-lg leading-8 text-muted">
              The public launch, the campaign page, and the product surface do not need the same rhythm. The offer is split so
              each project gets the right level of structure, motion, and product discipline.
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
                  <span className="rounded-full border border-[rgba(16,36,95,0.22)] bg-accent-deep px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-white">
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

          <div className="proof-stage relative overflow-hidden rounded-[2rem] border border-[rgba(22,17,13,0.08)] bg-[rgba(16,36,95,0.95)] p-6 text-white md:p-8">
            <div className="proof-stage-beam absolute inset-y-0 right-[-10%] w-1/2" />
            <div className="relative">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/90">Proof</p>
              <div className="mt-5 grid gap-4 md:grid-cols-3">
                {proofPoints.map((item) => (
                  <div
                    className="rounded-[1.5rem] border border-white/12 bg-white/6 p-5 shadow-[0_18px_46px_rgba(0,0,0,0.16)]"
                    key={item.label}
                  >
                    <p className="text-xs uppercase tracking-[0.16em] text-white/85">{item.label}</p>
                    <p className="mt-3 font-display text-3xl leading-none">{item.value}</p>
                  </div>
                ))}
              </div>
              <div className="mt-7 grid gap-4 text-sm text-white/90 md:grid-cols-2">
                <div className="rounded-[1.5rem] border border-white/10 bg-white/5 p-5">
                  <p className="font-semibold text-white">Tooling in the stack</p>
                  <p className="mt-2 leading-7 text-white/90">
                    Next.js 15, React 19, Tailwind 4, Cloudflare-ready delivery, and Playwright smoke checks for release confidence.
                  </p>
                </div>
                <div className="rounded-[1.5rem] border border-white/10 bg-white/5 p-5">
                  <p className="font-semibold text-white">What I optimise for</p>
                  <p className="mt-2 leading-7 text-white/90">
                    Strong first impression, tight CTA hierarchy, believable product depth, and motion that never blocks readability.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="page-shell">
          <div className="wow-cta-shell rounded-[2.4rem] border border-[rgba(92,130,255,0.22)] px-6 py-10 text-white md:px-10 md:py-12">
            <div className="wow-cta-beam pointer-events-none absolute inset-y-0 right-[8%] w-1/3" />
            <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
              <div className="space-y-4">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/90">Next step</p>
                <h2 className="section-subtitle text-white">
                  If the project needs stronger direction and sharper execution, I can help shape it.
                </h2>
                <p className="max-w-2xl text-lg leading-8 text-white/88">
                  I take on premium landing rebuilds, product UI direction, and design-led digital work that needs to go from
                  interface strategy to implementation without losing clarity.
                </p>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row lg:justify-end">
                <Link
                  className="cta-electric inline-flex cursor-pointer items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-semibold transition-transform duration-200 hover:-translate-y-0.5"
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
