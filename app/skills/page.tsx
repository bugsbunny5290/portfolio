"use client";

import { TechGrid } from "@/components/skills/tech-grid";
import { Section, SectionHeader } from "@/components/ui";
import { useLanguage } from "@/lib/language-context";

export default function SkillsPage(): React.ReactElement {
  const { data } = useLanguage();

  return (
    <Section>
      <SectionHeader title={data.ui.skills.title} description={data.ui.skills.subtitle} />
      <TechGrid />
    </Section>
  );
}
