"use client";

import clsx from "clsx";
import { localeOptions, siteShellCopy } from "@/lib/locale-data";
import { useLocale } from "@/components/locale-provider";

export function LanguageSwitcher() {
  const { locale, setLocale } = useLocale();
  const copy = siteShellCopy[locale];

  return (
    <div
      aria-label={copy.languageLabel}
      className="inline-flex items-center gap-1 rounded-full border border-[rgba(22,17,13,0.1)] bg-white/84 p-1 shadow-[0_8px_18px_rgba(18,15,12,0.06)]"
      role="group"
    >
      <span className="sr-only">{copy.languageLabel}</span>
      {localeOptions.map((option) => {
        const active = option.value === locale;

        return (
          <button
            aria-pressed={active}
            className={clsx(
              "cursor-pointer rounded-full px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.16em] transition-colors duration-200",
              active ? "bg-ink text-white" : "text-muted hover:text-ink",
            )}
            key={option.value}
            onClick={() => setLocale(option.value)}
            type="button"
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}
