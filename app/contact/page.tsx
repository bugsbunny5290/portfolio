"use client";

import { useTranslations } from "next-intl";
import { Section, SectionHeader } from "@/components/ui";
import { ContactInfo } from "@/components/contact/contact-info";

export default function ContactPage(): React.ReactElement {
  const t = useTranslations("contact");

  return (
    <Section>
      <SectionHeader title={t("title")} description={t("subtitle")} />
      <ContactInfo />
    </Section>
  );
}
