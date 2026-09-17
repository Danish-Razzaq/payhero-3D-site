"use client";

import { Globe } from "lucide-react";
import { useLocale } from "./LocaleProvider";
import { track } from "@/lib/analytics/client";

export function LanguageToggle({ onDark = false }: { onDark?: boolean }) {
  const { locale, setLocale, t } = useLocale();

  return (
    <button
      type="button"
      aria-label="Switch language"
      onClick={() => {
        const next = locale === "en" ? "es" : "en";
        setLocale(next);
        track("switch_language", { lang: next });
      }}
      className={
        onDark
          ? "inline-flex items-center gap-1.5 rounded-md px-3 py-2 text-sm font-medium text-white/80 transition-colors hover:text-white"
          : "inline-flex items-center gap-1.5 rounded-md px-3 py-2 text-sm font-medium text-slate-600 transition-colors hover:text-ink-900"
      }
    >
      <Globe size={16} aria-hidden />
      {t("nav_lang_switch")}
    </button>
  );
}
