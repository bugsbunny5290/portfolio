"use client";

import { useLanguage } from "@/lib/language-context";
import { cn } from "@/lib/utils";

export function LanguageToggle(): React.ReactElement {
  const { locale, setLocale, isPending } = useLanguage();

  return (
    <div
      className={cn("flex items-center gap-0", isPending && "opacity-50")}
      style={{ border: "2px solid var(--border-strong)" }}
    >
      <button
        type="button"
        onClick={() => setLocale("en")}
        disabled={isPending}
        className="px-2.5 py-1.5 text-xs font-bold transition-colors"
        style={{
          background: locale === "en" ? "var(--color-purple)" : "var(--bg-card)",
          color: locale === "en" ? "white" : "var(--fg-muted)",
          borderRight: "1px solid var(--border-strong)",
        }}
        aria-label="Switch to English"
      >
        EN
      </button>
      <button
        type="button"
        onClick={() => setLocale("de")}
        disabled={isPending}
        className="px-2.5 py-1.5 text-xs font-bold transition-colors"
        style={{
          background: locale === "de" ? "var(--color-purple)" : "var(--bg-card)",
          color: locale === "de" ? "white" : "var(--fg-muted)",
        }}
        aria-label="Auf Deutsch wechseln"
      >
        DE
      </button>
    </div>
  );
}
