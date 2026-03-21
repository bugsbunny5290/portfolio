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
      <div className="flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:gap-x-8 sm:gap-y-4 animate-on-scroll">
        <a
          href={`mailto:${personalInfo.email}`}
          className="group flex items-center gap-3 text-sm transition-colors"
          style={{ color: "var(--fg)" }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = "var(--color-purple)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = "var(--fg)";
          }}
        >
          <EmailIcon className="w-[18px] h-[18px] shrink-0" />
          {personalInfo.email}
        </a>
        <a
          href={personalInfo.github}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center gap-3 text-sm transition-colors"
          style={{ color: "var(--fg)" }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = "var(--color-purple)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = "var(--fg)";
          }}
        >
          <GitHubIcon className="w-[18px] h-[18px] shrink-0" />@
          {personalInfo.github.split("/").pop()}
        </a>
        <span className="flex items-center gap-3 text-sm" style={{ color: "var(--fg-muted)" }}>
          <MapPinIcon className="w-[18px] h-[18px] shrink-0" />
          {personalInfo.location}
        </span>
      </div>

      <div className="space-y-6">
        <div className="card-brutal p-5 md:p-6 animate-on-scroll stagger-1">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <h3 className="text-base font-bold" style={{ color: "var(--fg-heading)" }}>
              {t("cvResume")}
            </h3>
            <div className="flex flex-wrap gap-2">
              <Button
                href="/api/cv?lang=en&format=pdf"
                variant="primary"
                size="sm"
                external
                aria-label="Download CV as PDF in English"
              >
                PDF (EN)
              </Button>
              <Button
                href="/api/cv?lang=de&format=pdf"
                variant="primary"
                size="sm"
                external
                aria-label="Download CV as PDF in German"
              >
                PDF (DE)
              </Button>
              <Button
                href="/api/cv?lang=en&format=docx"
                variant="secondary"
                size="sm"
                external
                aria-label="Download CV as Word document in English"
              >
                Word (EN)
              </Button>
              <Button
                href="/api/cv?lang=de&format=docx"
                variant="secondary"
                size="sm"
                external
                aria-label="Download CV as Word document in German"
              >
                Word (DE)
              </Button>
            </div>
          </div>
        </div>
        <div className="card-brutal p-5 md:p-6 animate-on-scroll stagger-2">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <h3 className="text-base font-bold" style={{ color: "var(--fg-heading)" }}>
              {t("coverLetter")}
            </h3>
            <div className="flex flex-wrap gap-2">
              <Button
                href="/api/cover-letter?lang=en&format=pdf"
                variant="primary"
                size="sm"
                external
                aria-label="Download cover letter as PDF in English"
              >
                PDF (EN)
              </Button>
              <Button
                href="/api/cover-letter?lang=de&format=pdf"
                variant="primary"
                size="sm"
                external
                aria-label="Download cover letter as PDF in German"
              >
                PDF (DE)
              </Button>
              <Button
                href="/api/cover-letter?lang=en&format=docx"
                variant="secondary"
                size="sm"
                external
                aria-label="Download cover letter as Word document in English"
              >
                Word (EN)
              </Button>
              <Button
                href="/api/cover-letter?lang=de&format=docx"
                variant="secondary"
                size="sm"
                external
                aria-label="Download cover letter as Word document in German"
              >
                Word (DE)
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
