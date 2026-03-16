"use client";

import { useTranslations } from "next-intl";
import { Timeline } from "@/components/about/timeline";
import { Section, SectionHeader } from "@/components/ui";
import { useLanguage } from "@/lib/language-context";

export default function AboutPage(): React.ReactElement {
  const t = useTranslations("about");
  const { content } = useLanguage();
  const { professionalSummary, whatIDo, education, spokenLanguages } = content;

  return (
    <Section>
      <SectionHeader title={t("title")} description={t("subtitle")} />
      <div className="max-w-none mb-8 space-y-4">
        {professionalSummary.split("\n\n").map((paragraph) => (
          <p key={paragraph.slice(0, 40)} className="text-lg text-foreground/80 leading-relaxed">
            {paragraph}
          </p>
        ))}
      </div>

      <h3 className="text-2xl font-bold text-foreground mb-4">{t("whatIDo")}</h3>
      <div className="grid gap-x-8 gap-y-4 sm:grid-cols-2">
        {whatIDo.map((item) => (
          <div key={item.title}>
            <h4 className="font-semibold text-foreground mb-1">{item.title}</h4>
            <p className="text-sm text-muted-foreground">{item.description}</p>
          </div>
        ))}
      </div>

      <h3 className="text-2xl font-bold text-foreground mt-12 mb-6">{t("experience")}</h3>
      <Timeline />

      <h3 className="text-2xl font-bold text-foreground mt-12 mb-6">{t("education")}</h3>
      <div className="space-y-6">
        {education.map((edu) => (
          <div key={`${edu.degree}-${edu.startYear}`} className="border-l-2 border-primary pl-6">
            <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
              <h3 className="text-lg font-semibold text-foreground">{edu.degree}</h3>
              <span className="text-sm font-medium text-primary/70">
                {edu.startYear} - {edu.endYear}
              </span>
            </div>
            <p className="text-foreground/70">
              {edu.institution} | {edu.location}
            </p>
            {edu.description && (
              <p className="mt-2 text-sm text-muted-foreground">{edu.description}</p>
            )}
          </div>
        ))}
      </div>

      <h3 className="text-2xl font-bold text-foreground mt-12 mb-6">{t("languages")}</h3>
      <div className="flex flex-wrap gap-4">
        {spokenLanguages.map((lang) => (
          <div
            key={lang.language}
            className="flex items-center gap-2 rounded-lg border border-border bg-card px-4 py-3"
          >
            <span className="font-medium text-foreground">{lang.language}</span>
            <span className="text-muted-foreground">-</span>
            <span className="text-foreground/70">
              {lang.level}
              {lang.cefr && ` (${lang.cefr})`}
            </span>
          </div>
        ))}
      </div>
    </Section>
  );
}
