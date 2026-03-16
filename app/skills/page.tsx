"use client";

import { useTranslations } from "next-intl";
import { TechGrid } from "@/components/skills/tech-grid";
import { Section, SectionHeader } from "@/components/ui";

export default function SkillsPage(): React.ReactElement {
  const t = useTranslations("skills");

  return (
    <Section>
      <SectionHeader title={t("title")} description={t("subtitle")} />
      <TechGrid />
    </Section>
  );
}
