"use client";

import { useTranslations } from "next-intl";
import { useLanguage } from "@/lib/language-context";

export function ExperienceHighlights(): React.ReactElement {
  const { content } = useLanguage();
  const t = useTranslations("about");

  // Show top 3 experiences
  const topExperiences = content.experiences.slice(0, 3);

  return (
    <section>
      <div className="mb-10 animate-on-scroll">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          <div>
            <h2
              className="text-3xl md:text-4xl font-extrabold tracking-tight mb-3"
              style={{ color: "var(--fg-heading)" }}
            >
              {t("experience")}
            </h2>
            <p className="text-lg" style={{ color: "var(--fg-muted)" }}>
              From research labs to scaling startups.
            </p>
          </div>
          <div className="hidden sm:block shrink-0">
            <a href="/about" className="btn-brutal btn-brutal-secondary text-sm">
              Full timeline
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

      <div className="space-y-5">
        {topExperiences.map((exp, i) => (
          <div
            key={`${exp.company}-${i}`}
            className={`animate-on-scroll stagger-${i + 1} card-brutal overflow-hidden`}
          >
            <div className="window-chrome">
              <div className="window-dot" style={{ background: "#ef4444" }} />
              <div className="window-dot" style={{ background: "#eab308" }} />
              <div className="window-dot" style={{ background: "#22c55e" }} />
              <span
                className="truncate"
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.6875rem",
                  color: "var(--fg-subtle)",
                  marginLeft: "4px",
                  maxWidth: "60%",
                }}
              >
                experience/{exp.company.toLowerCase().replace(/\s+/g, "-")}.ts
              </span>
            </div>
            <div className="p-5 md:p-6">
              <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between mb-2">
                <h3
                  className="text-base md:text-lg font-bold"
                  style={{ color: "var(--fg-heading)" }}
                >
                  {exp.role}
                </h3>
                <span className="date-badge">
                  {exp.startDate} - {exp.endDate}
                </span>
              </div>
              <p className="text-sm mb-3" style={{ color: "var(--fg-muted)" }}>
                {exp.company} | {exp.location}
              </p>
              <p className="text-sm leading-relaxed mb-4" style={{ color: "var(--fg)" }}>
                {exp.description}
              </p>
              <div className="flex flex-wrap gap-1.5">
                {exp.technologies.map((tech) => (
                  <span key={tech} className="tag-brutal">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 text-center sm:hidden">
        <a href="/about" className="btn-brutal btn-brutal-secondary text-sm inline-flex">
          Full timeline
        </a>
      </div>
    </section>
  );
}
