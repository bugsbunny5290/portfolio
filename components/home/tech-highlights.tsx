"use client";

import { useTranslations } from "next-intl";

const techHighlights = [
  "GCP",
  "Kubernetes",
  "TypeScript",
  "Next.js",
  "NestJS",
  "Pulumi",
  "GitOps",
  "Gravitee",
];

export function TechHighlights(): React.ReactElement {
  const t = useTranslations("skills");

  return (
    <section>
      <div className="mb-10 animate-on-scroll">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          <div>
            <h2
              className="text-3xl md:text-4xl font-extrabold tracking-tight mb-3"
              style={{ color: "var(--fg-heading)" }}
            >
              {t("title")}
            </h2>
            <p className="text-lg" style={{ color: "var(--fg-muted)" }}>
              {t("subtitle")}
            </p>
          </div>
          <div className="hidden sm:block shrink-0">
            <a href="/skills" className="btn-brutal btn-brutal-secondary text-sm">
              All skills
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2.5"
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </a>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 md:gap-3 animate-on-scroll stagger-1">
        {techHighlights.map((tech) => (
          <span key={tech} className="tag-brutal text-sm md:text-base px-4 py-2">
            {tech}
          </span>
        ))}
      </div>

      <div className="mt-8 text-center sm:hidden">
        <a href="/skills" className="btn-brutal btn-brutal-secondary text-sm inline-flex">
          All skills
        </a>
      </div>
    </section>
  );
}
