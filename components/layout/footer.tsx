"use client";

import { useTranslations } from "next-intl";
import { useLanguage } from "@/lib/language-context";

export function Footer(): React.ReactElement {
  const currentYear = new Date().getFullYear();
  const t = useTranslations("footer");
  const { content } = useLanguage();

  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <p className="text-sm text-muted-foreground">
            {currentYear} {content.personalInfo.name}. {t("allRightsReserved")}
          </p>
          <div className="flex items-center gap-4">
            <a
              href={content.personalInfo.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              GitHub
            </a>
            <a
              href={`mailto:${content.personalInfo.email}`}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              {t("allRightsReserved").includes("Alle") ? "E-Mail" : "Email"}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
