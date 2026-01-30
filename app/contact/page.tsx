"use client";

import { ContactInfo } from "@/components/contact/contact-info";
import { Section, SectionHeader } from "@/components/ui";
import { useLanguage } from "@/lib/language-context";

export default function ContactPage(): React.ReactElement {
  const { data } = useLanguage();

  return (
    <Section>
      <SectionHeader title={data.ui.contact.title} description={data.ui.contact.subtitle} />
      <ContactInfo />
    </Section>
  );
}
