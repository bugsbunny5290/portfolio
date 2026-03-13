"use client";

import { useTranslations } from "next-intl";
import { Button, GitHubIcon, EmailIcon } from "@/components/ui";
import { useLanguage } from "@/lib/language-context";

const techHighlights = ["GCP", "Kubernetes", "TypeScript", "Next.js", "NestJS", "Pulumi", "GitOps", "Gravitee"];

export function Hero(): React.ReactElement {
  const t = useTranslations("hero");
  const { content } = useLanguage();
  const { personalInfo } = content;

  return (
    <section className="mx-auto max-w-5xl px-4 py-12 sm:px-6 sm:py-24 lg:px-8">
      <div className="max-w-3xl">
        <p className="text-sm font-medium text-primary">{t("greeting")}</p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
          {personalInfo.name}
        </h1>
        <p className="mt-3 text-lg text-muted-foreground sm:mt-4 sm:text-2xl">{personalInfo.title}</p>

        <p className="mt-4 text-base leading-relaxed text-muted-foreground sm:mt-6 sm:text-lg">
          {personalInfo.tagline}. {t("taglineExtended")}
        </p>

        <div className="mt-6 flex flex-wrap gap-1.5 sm:mt-8 sm:gap-2">
          {techHighlights.map((tech) => (
            <span
              key={tech}
              className="inline-flex items-center rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary sm:px-3 sm:py-1 sm:text-sm"
            >
              {tech}
            </span>
          ))}
        </div>

        <div className="mt-8 flex flex-col gap-3 sm:mt-10 sm:flex-row sm:flex-wrap sm:gap-4">
          <Button href="/about" size="lg" className="w-full sm:w-auto">
            {t("aboutMe")}
          </Button>
          <Button href="/contact" variant="outline" size="lg" className="w-full sm:w-auto">
            {t("getInTouch")}
          </Button>
          <Button href="/contact" variant="secondary" size="lg" className="w-full sm:w-auto">
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
          <span className="text-sm text-muted-foreground">{personalInfo.location}</span>
        </div>
      </div>
    </section>
  );
}
