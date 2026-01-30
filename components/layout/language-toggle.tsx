"use client";

import { useLanguage } from "@/lib/language-context";
import { cn } from "@/lib/utils";

export function LanguageToggle(): React.ReactElement {
  const { locale, setLocale, isPending } = useLanguage();

  return (
    <div className={cn("flex items-center gap-1 rounded-md border border-border bg-background p-1", isPending && "opacity-50")}>
      <button
        type="button"
        onClick={() => setLocale("en")}
        disabled={isPending}
        className={cn(
          "px-2 py-1 text-xs font-medium rounded transition-colors",
          locale === "en"
            ? "bg-primary text-primary-foreground"
            : "text-muted-foreground hover:text-foreground"
        )}
        aria-label="Switch to English"
      >
        EN
      </button>
      <button
        type="button"
        onClick={() => setLocale("de")}
        disabled={isPending}
        className={cn(
          "px-2 py-1 text-xs font-medium rounded transition-colors",
          locale === "de"
            ? "bg-primary text-primary-foreground"
            : "text-muted-foreground hover:text-foreground"
        )}
        aria-label="Auf Deutsch wechseln"
      >
        DE
      </button>
    </div>
  );
}
