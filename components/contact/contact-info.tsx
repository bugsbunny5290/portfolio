"use client";

import { useTranslations } from "next-intl";
import { Button, EmailIcon, GitHubIcon, MapPinIcon } from "@/components/ui";
import { useLanguage } from "@/lib/language-context";

export function ContactInfo(): React.ReactElement {
  const t = useTranslations("contact");
  const { content } = useLanguage();
  const { personalInfo } = content;

  return (
    <div className="space-y-10 sm:space-y-12">
      {/* Contact details — compact, left-aligned, no cards */}
      <div className="flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:gap-x-8 sm:gap-y-4">
        <a
          href={`mailto:${personalInfo.email}`}
          className="group flex items-center gap-3 text-sm text-foreground hover:text-primary transition-colors"
        >
          <EmailIcon className="w-[18px] h-[18px] shrink-0 text-muted-foreground group-hover:text-primary transition-colors" />
          {personalInfo.email}
        </a>
        <a
          href={personalInfo.github}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center gap-3 text-sm text-foreground hover:text-primary transition-colors"
        >
          <GitHubIcon className="w-[18px] h-[18px] shrink-0 text-muted-foreground group-hover:text-primary transition-colors" />
          @{personalInfo.github.split("/").pop()}
        </a>
        <span className="flex items-center gap-3 text-sm text-muted-foreground">
          <MapPinIcon className="w-[18px] h-[18px] shrink-0" />
          {personalInfo.location}
        </span>
      </div>

      {/* Downloads — unified, no redundant cards */}
      <div className="space-y-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <h3 className="text-base font-semibold text-foreground">{t("cvResume")}</h3>
          <div className="flex flex-wrap gap-2">
            <Button href="/api/cv?lang=en&format=pdf" variant="outline" size="sm" external aria-label="Download CV as PDF in English">
              PDF (EN)
            </Button>
            <Button href="/api/cv?lang=de&format=pdf" variant="outline" size="sm" external aria-label="Download CV as PDF in German">
              PDF (DE)
            </Button>
            <Button href="/api/cv?lang=en&format=docx" variant="secondary" size="sm" external aria-label="Download CV as Word document in English">
              Word (EN)
            </Button>
            <Button href="/api/cv?lang=de&format=docx" variant="secondary" size="sm" external aria-label="Download CV as Word document in German">
              Word (DE)
            </Button>
          </div>
        </div>
        <div className="border-t border-border" />
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <h3 className="text-base font-semibold text-foreground">{t("coverLetter")}</h3>
          <div className="flex flex-wrap gap-2">
            <Button href="/api/cover-letter?lang=en&format=pdf" variant="outline" size="sm" external aria-label="Download cover letter as PDF in English">
              PDF (EN)
            </Button>
            <Button href="/api/cover-letter?lang=de&format=pdf" variant="outline" size="sm" external aria-label="Download cover letter as PDF in German">
              PDF (DE)
            </Button>
            <Button href="/api/cover-letter?lang=en&format=docx" variant="secondary" size="sm" external aria-label="Download cover letter as Word document in English">
              Word (EN)
            </Button>
            <Button href="/api/cover-letter?lang=de&format=docx" variant="secondary" size="sm" external aria-label="Download cover letter as Word document in German">
              Word (DE)
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
