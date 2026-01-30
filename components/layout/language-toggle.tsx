"use client";

import { useLanguage } from "@/lib/language-context";
import { cn } from "@/lib/utils";

export function LanguageToggle(): React.ReactElement {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="flex items-center gap-1 rounded-md border border-border bg-background p-1">
      <button
        type="button"
        onClick={() => setLanguage("en")}
        className={cn(
          "px-2 py-1 text-xs font-medium rounded transition-colors",
          language === "en"
            ? "bg-primary text-primary-foreground"
            : "text-muted-foreground hover:text-foreground",
        )}
        aria-label="Switch to English"
      >
        EN
      </button>
      <button
        type="button"
        onClick={() => setLanguage("de")}
        className={cn(
          "px-2 py-1 text-xs font-medium rounded transition-colors",
          language === "de"
            ? "bg-primary text-primary-foreground"
            : "text-muted-foreground hover:text-foreground",
        )}
        aria-label="Auf Deutsch wechseln"
      >
        DE
      </button>
    </div>
  );
}
