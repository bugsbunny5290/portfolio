"use client";

import { useTranslations } from "next-intl";
import { ContactInfo } from "@/components/contact/contact-info";
import { Section, SectionHeader } from "@/components/ui";

export default function ContactPage(): React.ReactElement {
  const t = useTranslations("contact");

  return (
    <Section>
      <SectionHeader title={t("title")} description={t("subtitle")} />
      <ContactInfo />
    </Section>
  );
}
