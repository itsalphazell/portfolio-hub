"use client";

export default function PremiumSceneFallback({
  eyebrow = "Reduced-motion and mobile-safe fallback",
  title = "Keep the world-building. Remove the runtime risk.",
  body = "Use the same visual direction with a static atmosphere, clean copy hierarchy, and CTA clarity when the full scene is not worth the cost.",
}: {
  eyebrow?: string;
  title?: string;
  body?: string;
}) {
  return (
    <div className="absolute inset-0 overflow-hidden rounded-[28px] bg-[radial-gradient(circle_at_24%_28%,rgba(124,92,255,0.34),transparent_0,transparent_34%),radial-gradient(circle_at_78%_32%,rgba(22,183,165,0.2),transparent_0,transparent_30%),linear-gradient(180deg,#090d1f_0%,#080c1a_46%,#060914_100%)] p-6 sm:p-8">
      <div className="absolute inset-x-10 top-10 h-24 rounded-full bg-[radial-gradient(circle,rgba(124,92,255,0.2),transparent_70%)] blur-2xl" />
      <div className="absolute right-10 top-16 h-44 w-44 rounded-full border border-white/10 bg-white/[0.04] backdrop-blur-2xl" />
      <div className="absolute bottom-10 left-10 h-28 w-28 rounded-[32px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.12),rgba(255,255,255,0.02))] backdrop-blur-xl" />

      <div className="relative flex h-full flex-col justify-end rounded-[24px] border border-white/8 bg-[linear-gradient(180deg,rgba(255,255,255,0.04),rgba(255,255,255,0.02))] p-5 shadow-[0_30px_80px_rgba(2,8,28,0.34)]">
        <div className="max-w-sm">
          <p className="text-[11px] uppercase tracking-[0.18em] text-slate-300/70">
            {eyebrow}
          </p>
          <h3 className="mt-3 text-2xl font-semibold tracking-[-0.04em] text-white sm:text-3xl">
            {title}
          </h3>
          <p className="mt-3 text-sm leading-6 text-slate-300 sm:text-base">
            {body}
          </p>
        </div>

        <div className="mt-6 flex flex-wrap gap-2 text-xs text-slate-200/80 sm:text-sm">
          <span className="rounded-full border border-white/10 bg-white/[0.05] px-3 py-2">
            Static atmosphere
          </span>
          <span className="rounded-full border border-white/10 bg-white/[0.05] px-3 py-2">
            Same CTA hierarchy
          </span>
          <span className="rounded-full border border-white/10 bg-white/[0.05] px-3 py-2">
            Lower runtime weight
          </span>
        </div>
      </div>
    </div>
  );
}
