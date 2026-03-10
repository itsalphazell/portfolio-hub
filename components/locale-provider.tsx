"use client";

import {
  createContext,
  startTransition,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { Locale } from "@/lib/types";

const STORAGE_KEY = "portfolio-hub-locale";

interface LocaleContextValue {
  locale: Locale;
  setLocale: (nextLocale: Locale) => void;
}

const LocaleContext = createContext<LocaleContextValue | null>(null);

function getBrowserLocale(): Locale {
  if (typeof navigator === "undefined") {
    return "en";
  }

  return navigator.language.toLowerCase().startsWith("fr") ? "fr" : "en";
}

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("en");

  useEffect(() => {
    const storedLocale = window.localStorage.getItem(STORAGE_KEY);
    const nextLocale = storedLocale === "fr" || storedLocale === "en" ? storedLocale : getBrowserLocale();
    setLocaleState(nextLocale);
  }, []);

  useEffect(() => {
    document.documentElement.lang = locale;
    window.localStorage.setItem(STORAGE_KEY, locale);
  }, [locale]);

  const value = useMemo<LocaleContextValue>(
    () => ({
      locale,
      setLocale: (nextLocale) => {
        startTransition(() => {
          setLocaleState(nextLocale);
        });
      },
    }),
    [locale],
  );

  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>;
}

export function useLocale() {
  const context = useContext(LocaleContext);

  if (!context) {
    throw new Error("useLocale must be used within LocaleProvider");
  }

  return context;
}
