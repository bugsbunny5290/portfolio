"use client";

import { useTranslations } from "next-intl";
import { EmailIcon, GitHubIcon } from "@/components/ui";
import { useLanguage } from "@/lib/language-context";

export function Footer(): React.ReactElement {
  const t = useTranslations("footer");
  const { content } = useLanguage();

  return (
    <footer
      className="py-16"
      style={{
        borderTop: "2px dashed var(--border-medium)",
        background: "var(--bg)",
      }}
    >
      <div className="mx-auto max-w-6xl px-6 md:px-24">
        <div className="flex flex-col md:flex-row items-start justify-between gap-10">
          <div>
            <h3
              className="text-2xl md:text-3xl font-extrabold tracking-tight mb-3"
              style={{ color: "var(--fg-heading)" }}
            >
              Let&apos;s connect<span style={{ color: "var(--color-purple)" }}>.</span>
            </h3>
            <p
              className="text-sm sm:text-base break-words sm:break-normal"
              style={{ color: "var(--fg-subtle)", fontFamily: "var(--font-mono)" }}
            >
              $ pranav --connect --location=&quot;Heidelberg&quot;
              <span className="terminal-cursor" />
            </p>
          </div>
          <div className="flex items-center gap-3">
            <a
              href={content.personalInfo.github}
              target="_blank"
              rel="noopener noreferrer"
              className="social-brutal inline-flex items-center justify-center w-11 h-11 shadow-brutal-sm"
              style={{
                border: "2px solid var(--border-strong)",
                background: "var(--bg-card)",
                color: "var(--fg-muted)",
                borderRadius: "var(--radius)",
              }}
              aria-label="GitHub"
            >
              <GitHubIcon className="w-4 h-4" />
            </a>
            <a
              href={content.personalInfo.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="social-brutal inline-flex items-center justify-center w-11 h-11 shadow-brutal-sm"
              style={{
                border: "2px solid var(--border-strong)",
                background: "var(--bg-card)",
                color: "var(--fg-muted)",
                borderRadius: "var(--radius)",
              }}
              aria-label="LinkedIn"
            >
              <span className="sr-only">LinkedIn</span>
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2zM4 6a2 2 0 100-4 2 2 0 000 4z"
                />
              </svg>
            </a>
            <a
              href={`mailto:${content.personalInfo.email}`}
              className="social-brutal inline-flex items-center justify-center w-11 h-11 shadow-brutal-sm"
              style={{
                border: "2px solid var(--border-strong)",
                background: "var(--bg-card)",
                color: "var(--fg-muted)",
                borderRadius: "var(--radius)",
              }}
              aria-label="Email"
            >
              <EmailIcon className="w-4 h-4" />
            </a>
          </div>
        </div>
        <div
          className="mt-10 pt-6 text-left"
          style={{ borderTop: "2px dashed var(--border-light)" }}
        >
          <p className="text-xs" style={{ color: "var(--fg-subtle)" }}>
            {new Date().getFullYear()} {content.personalInfo.name}. {t("allRightsReserved")}
          </p>
        </div>
      </div>
    </footer>
  );
}
