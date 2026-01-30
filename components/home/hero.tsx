"use client";

import { useTranslations } from "next-intl";
import { Button } from "@/components/ui";
import { useLanguage } from "@/lib/language-context";

const techHighlights = ["GCP", "TypeScript", "Next.js", "NestJS", "Pulumi", "CI/CD"];

export function Hero(): React.ReactElement {
  const t = useTranslations("hero");
  const { content } = useLanguage();
  const { personalInfo } = content;

  const highlights = [
    { label: t("yearsExperience"), value: "7+" },
    { label: t("currentRole"), value: "Senior SWE" },
    { label: t("focus"), value: "Platform Engineering" },
  ];

  return (
    <section className="mx-auto max-w-5xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
      <div className="max-w-3xl">
        <p className="text-sm font-medium text-primary sm:text-base">{t("greeting")}</p>
        <h1 className="mt-2 text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
          {personalInfo.name}
        </h1>
        <p className="mt-4 text-xl text-muted-foreground sm:text-2xl">{personalInfo.title}</p>

        <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
          {personalInfo.tagline}. {t("taglineExtended")}
        </p>

        <div className="mt-8 flex flex-wrap gap-2">
          {techHighlights.map((tech) => (
            <span
              key={tech}
              className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary"
            >
              {tech}
            </span>
          ))}
        </div>

        <div className="mt-8 grid grid-cols-3 gap-4 sm:max-w-md">
          {highlights.map((item) => (
            <div key={item.label} className="text-center sm:text-left">
              <p className="text-2xl font-bold text-foreground sm:text-3xl">{item.value}</p>
              <p className="text-xs text-muted-foreground sm:text-sm">{item.label}</p>
            </div>
          ))}
        </div>

        <div className="mt-10 flex flex-wrap gap-4">
          <Button href="/about" size="lg">
            {t("aboutMe")}
          </Button>
          <Button href="/contact" variant="outline" size="lg">
            {t("getInTouch")}
          </Button>
          <Button href="/contact" variant="secondary" size="lg">
            {t("downloadCV")}
          </Button>
        </div>

        <div className="mt-12 flex items-center gap-6">
          <a
            href={personalInfo.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            <span className="sr-only">GitHub</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
            </svg>
          </a>
          <a
            href={`mailto:${personalInfo.email}`}
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            <span className="sr-only">Email</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <rect width="20" height="16" x="2" y="4" rx="2" />
              <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
            </svg>
          </a>
          <span className="text-sm text-muted-foreground">{personalInfo.location}</span>
        </div>
      </div>
    </section>
  );
}
