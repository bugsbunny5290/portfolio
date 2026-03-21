"use client";

import { useTranslations } from "next-intl";
import { useEffect, useRef } from "react";
import { EmailIcon, GitHubIcon } from "@/components/ui";
import { useLanguage } from "@/lib/language-context";
import { InteractiveTerminal } from "./interactive-terminal";

export function Hero(): React.ReactElement {
  const t = useTranslations("hero");
  const { content } = useLanguage();
  const { personalInfo } = content;
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    sectionRef.current?.classList.add("hero-ready");
  }, []);

  return (
    <section className="relative">
      <div ref={sectionRef} className="mx-auto max-w-6xl px-6 md:px-24 pt-12 md:pt-16 pb-6 md:pb-8">
        <div className="text-center md:text-left">
          <div className="hero-enter">
            <h1 className="text-[clamp(2.5rem,8vw,4.5rem)] font-extrabold tracking-tight leading-tight mb-6">
              <span className="text-gradient inline-block hero-scale-in">
                {personalInfo.name.split(" ")[0]}
              </span>{" "}
              {personalInfo.name.split(" ").slice(1).join(" ")}
            </h1>
          </div>

          <div className="hero-enter">
            <p
              className="text-base md:text-xl leading-relaxed max-w-xl mb-2"
              style={{ color: "var(--fg-muted)" }}
            >
              {personalInfo.subtitle}
            </p>
          </div>

          <div className="hero-enter">
            <p
              className="text-base md:text-lg leading-relaxed max-w-xl mb-6"
              style={{ color: "var(--fg-muted)" }}
            >
              {personalInfo.tagline}
            </p>
          </div>

          <div className="hero-enter">
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-3">
              <a
                href="/about"
                className="btn-brutal btn-brutal-primary inline-flex items-center gap-2 text-sm"
              >
                {t("viewMyWork")}
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
              <a
                href={personalInfo.github}
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
                <GitHubIcon className="w-5 h-5" />
              </a>
              <a
                href={personalInfo.linkedin}
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
                  className="w-5 h-5"
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
                href={`mailto:${personalInfo.email}`}
                className="social-brutal inline-flex items-center justify-center w-11 h-11 shadow-brutal-sm"
                style={{
                  border: "2px solid var(--border-strong)",
                  background: "var(--bg-card)",
                  color: "var(--fg-muted)",
                  borderRadius: "var(--radius)",
                }}
                aria-label="Email"
              >
                <EmailIcon className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div className="hero-enter">
            <InteractiveTerminal />
          </div>
        </div>
      </div>
    </section>
  );
}
