"use client";

import { useTranslations } from "next-intl";
import { Section, SectionHeader, Card, CardContent } from "@/components/ui";
import { Timeline } from "@/components/about/timeline";
import { useLanguage } from "@/lib/language-context";

export default function AboutPage(): React.ReactElement {
  const t = useTranslations("about");
  const { content } = useLanguage();
  const { professionalSummary, whatIDo, education, spokenLanguages } = content;

  return (
    <Section>
      <SectionHeader title={t("title")} description={t("subtitle")} />
      <div className="max-w-none mb-8">
        <p className="text-lg text-muted-foreground leading-relaxed">{professionalSummary}</p>
      </div>

      <h3 className="text-xl font-semibold text-foreground mb-4">{t("whatIDo")}</h3>
      <div className="grid gap-4 sm:grid-cols-2">
        {whatIDo.map((item) => (
          <Card key={item.title} className="bg-card/50">
            <CardContent className="pt-6">
              <h4 className="font-semibold text-foreground mb-2">{item.title}</h4>
              <p className="text-sm text-muted-foreground">{item.description}</p>
            </CardContent>
          </Card>
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
              <span className="text-sm text-muted-foreground">
                {edu.startYear} - {edu.endYear}
              </span>
            </div>
            <p className="text-muted-foreground">
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
          <div key={lang.language} className="flex items-center gap-2 rounded-lg border border-border bg-card px-4 py-3">
            <span className="font-medium text-foreground">{lang.language}</span>
            <span className="text-muted-foreground">-</span>
            <span className="text-muted-foreground">
              {lang.level}
              {lang.cefr && ` (${lang.cefr})`}
            </span>
          </div>
        ))}
      </div>
    </Section>
  );
}
