"use client";

import { useTranslations } from "next-intl";
import { Button, EmailIcon, GitHubIcon } from "@/components/ui";
import { useLanguage } from "@/lib/language-context";

export function Hero(): React.ReactElement {
  const t = useTranslations("hero");
  const { content, locale } = useLanguage();
  const { personalInfo } = content;

  return (
    <section className="mx-auto max-w-5xl px-4 py-12 sm:px-6 sm:py-24 lg:px-8">
      <div className="max-w-3xl">
        <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
          {personalInfo.name}
        </h1>
        <p className="mt-3 text-lg font-medium text-primary sm:mt-4 sm:text-2xl">
          {personalInfo.subtitle}
        </p>
        <p className="mt-2 text-sm text-muted-foreground">
          {personalInfo.location} · {personalInfo.workAuth}
        </p>

        <p className="mt-6 text-base leading-relaxed text-muted-foreground sm:mt-8 sm:text-lg">
          {personalInfo.tagline}
        </p>

        <div className="mt-8 flex flex-col gap-3 sm:mt-10 sm:flex-row sm:flex-wrap sm:gap-4">
          <Button href="/about" size="lg" className="w-full sm:w-auto">
            {t("viewMyWork")}
          </Button>
          <Button
            href={`/api/cv?lang=${locale}&format=pdf`}
            variant="secondary"
            size="lg"
            className="w-full sm:w-auto"
            external
          >
            {t("downloadCV")}
          </Button>
        </div>

        <div className="mt-8 flex flex-wrap items-center gap-4 sm:mt-12 sm:gap-6">
          <a
            href={personalInfo.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-primary transition-colors"
          >
            <span className="sr-only">GitHub</span>
            <GitHubIcon className="w-5 h-5 sm:w-6 sm:h-6" />
          </a>
          <a
            href={`mailto:${personalInfo.email}`}
            className="text-muted-foreground hover:text-primary transition-colors"
          >
            <span className="sr-only">Email</span>
            <EmailIcon className="w-5 h-5 sm:w-6 sm:h-6" />
          </a>
        </div>
      </div>
    </section>
  );
}
