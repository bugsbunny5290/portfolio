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

      <div className="max-w-none mb-8 animate-on-scroll">
        <p className="text-base sm:text-lg leading-relaxed" style={{ color: "var(--fg)" }}>
          {professionalSummary}
        </p>
      </div>

      <hr className="section-divider my-12" />

      <h3
        className="text-xl sm:text-2xl font-extrabold mb-6 animate-on-scroll"
        style={{ color: "var(--fg-heading)" }}
      >
        {t("whatIDo")}
      </h3>
      <div className="grid gap-3 md:gap-5 sm:grid-cols-2">
        {whatIDo.map((item, i) => (
          <div key={item.title} className={`animate-on-scroll stagger-${i + 1} card-dashed p-5`}>
            <h4 className="font-bold mb-1" style={{ color: "var(--fg-heading)" }}>
              {item.title}
            </h4>
            <p className="text-sm" style={{ color: "var(--fg-muted)" }}>
              {item.description}
            </p>
          </div>
        ))}
      </div>

      <hr className="section-divider my-12" />

      <h3
        className="text-xl sm:text-2xl font-extrabold mb-6 animate-on-scroll"
        style={{ color: "var(--fg-heading)" }}
      >
        {t("experience")}
      </h3>
      <Timeline />

      <hr className="section-divider my-12" />

      <h3
        className="text-xl sm:text-2xl font-extrabold mb-6 animate-on-scroll"
        style={{ color: "var(--fg-heading)" }}
      >
        {t("education")}
      </h3>
      <div className="space-y-5">
        {education.map((edu, i) => (
          <div
            key={`${edu.degree}-${edu.startYear}`}
            className={`animate-on-scroll stagger-${i + 1} card-dashed p-5`}
          >
            <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
              <h3 className="text-base font-bold" style={{ color: "var(--fg-heading)" }}>
                {edu.degree}
              </h3>
              <span className="text-sm font-medium" style={{ color: "var(--color-purple)" }}>
                {edu.startYear} - {edu.endYear}
              </span>
            </div>
            <p className="text-sm mt-1" style={{ color: "var(--fg-muted)" }}>
              {edu.institution} | {edu.location}
            </p>
            {edu.description && (
              <p className="mt-2 text-sm" style={{ color: "var(--fg)" }}>
                {edu.description}
              </p>
            )}
          </div>
        ))}
      </div>

      <hr className="section-divider my-12" />

      <h3
        className="text-xl sm:text-2xl font-extrabold mb-6 animate-on-scroll"
        style={{ color: "var(--fg-heading)" }}
      >
        {t("languages")}
      </h3>
      <div className="flex flex-wrap gap-3 animate-on-scroll stagger-1">
        {spokenLanguages.map((lang) => (
          <div key={lang.language} className="tag-brutal text-sm px-4 py-2">
            <span className="font-bold" style={{ color: "var(--fg-heading)" }}>
              {lang.language}
            </span>
            <span className="mx-2" style={{ color: "var(--fg-subtle)" }}>
              -
            </span>
            <span style={{ color: "var(--fg-muted)" }}>
              {lang.level}
              {lang.cefr && ` (${lang.cefr})`}
            </span>
          </div>
        ))}
      </div>
    </Section>
  );
}
