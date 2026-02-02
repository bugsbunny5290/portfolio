"use client";

import { Button, Section } from "@/components/ui";
import { useLanguage } from "@/lib/language-context";

export default function NotFound(): React.ReactElement {
  const { locale } = useLanguage();

  const content = locale === "de"
    ? {
      title: "404",
      heading: "Seite nicht gefunden",
      description: "Die gesuchte Seite existiert nicht oder wurde verschoben.",
      backHome: "Zur Startseite",
    }
    : {
      title: "404",
      heading: "Page Not Found",
      description: "The page you're looking for doesn't exist or has been moved.",
      backHome: "Back to Home",
    };

  return (
    <Section className="flex flex-col items-center justify-center text-center min-h-[60vh]">
      <p className="text-8xl font-bold text-primary mb-4">{content.title}</p>
      <h1 className="text-3xl font-bold text-foreground mb-4">{content.heading}</h1>
      <p className="text-muted-foreground mb-8 max-w-md">{content.description}</p>
      <Button href="/" size="lg">
        {content.backHome}
      </Button>
    </Section>
  );
}
