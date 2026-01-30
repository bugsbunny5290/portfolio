"use client";

import { useTranslations } from "next-intl";
import { Button, Card, CardContent } from "@/components/ui";
import { useLanguage } from "@/lib/language-context";

export function ContactInfo(): React.ReactElement {
  const t = useTranslations("contact");
  const { content } = useLanguage();
  const { personalInfo } = content;

  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="grid gap-4 sm:gap-6 sm:grid-cols-3">
        <Card>
          <CardContent className="flex flex-col items-center p-4 sm:p-6 text-center">
            <div className="mb-3 sm:mb-4 rounded-full bg-secondary p-3 sm:p-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-foreground sm:w-6 sm:h-6"
                aria-hidden="true"
              >
                <rect width="20" height="16" x="2" y="4" rx="2" />
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
              </svg>
            </div>
            <h3 className="mb-1 sm:mb-2 text-base sm:text-lg font-semibold text-foreground">{t("email")}</h3>
            <a
              href={`mailto:${personalInfo.email}`}
              className="text-muted-foreground hover:text-primary transition-colors text-xs sm:text-sm break-all"
            >
              {personalInfo.email}
            </a>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex flex-col items-center p-4 sm:p-6 text-center">
            <div className="mb-3 sm:mb-4 rounded-full bg-secondary p-3 sm:p-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="text-foreground sm:w-6 sm:h-6"
                aria-hidden="true"
              >
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
            </div>
            <h3 className="mb-1 sm:mb-2 text-base sm:text-lg font-semibold text-foreground">GitHub</h3>
            <a
              href={personalInfo.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors text-xs sm:text-sm"
            >
              @{personalInfo.github.split("/").pop()}
            </a>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex flex-col items-center p-4 sm:p-6 text-center">
            <div className="mb-3 sm:mb-4 rounded-full bg-secondary p-3 sm:p-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-foreground sm:w-6 sm:h-6"
                aria-hidden="true"
              >
                <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
            </div>
            <h3 className="mb-1 sm:mb-2 text-base sm:text-lg font-semibold text-foreground">{t("location")}</h3>
            <p className="text-muted-foreground text-xs sm:text-sm">{personalInfo.location}</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 sm:gap-6 sm:grid-cols-2">
        <Card>
          <CardContent className="p-4 sm:p-6">
            <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
              <div className="rounded-full bg-secondary p-2 sm:p-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-foreground sm:w-5 sm:h-5"
                  aria-hidden="true"
                >
                  <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
                  <polyline points="14 2 14 8 20 8" />
                </svg>
              </div>
              <h3 className="text-base sm:text-lg font-semibold text-foreground">{t("cvResume")}</h3>
            </div>
            <div className="grid grid-cols-2 gap-1.5 sm:gap-2">
              <Button href="/api/cv?lang=en&format=pdf" variant="outline" size="sm" external className="text-xs sm:text-sm">
                PDF (EN)
              </Button>
              <Button href="/api/cv?lang=de&format=pdf" variant="outline" size="sm" external className="text-xs sm:text-sm">
                PDF (DE)
              </Button>
              <Button href="/api/cv?lang=en&format=docx" variant="secondary" size="sm" external className="text-xs sm:text-sm">
                Word (EN)
              </Button>
              <Button href="/api/cv?lang=de&format=docx" variant="secondary" size="sm" external className="text-xs sm:text-sm">
                Word (DE)
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 sm:p-6">
            <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
              <div className="rounded-full bg-secondary p-2 sm:p-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-foreground sm:w-5 sm:h-5"
                  aria-hidden="true"
                >
                  <path d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z" />
                </svg>
              </div>
              <h3 className="text-base sm:text-lg font-semibold text-foreground">{t("coverLetter")}</h3>
            </div>
            <div className="grid grid-cols-2 gap-1.5 sm:gap-2">
              <Button href="/api/cover-letter?lang=en&format=pdf" variant="outline" size="sm" external className="text-xs sm:text-sm">
                PDF (EN)
              </Button>
              <Button href="/api/cover-letter?lang=de&format=pdf" variant="outline" size="sm" external className="text-xs sm:text-sm">
                PDF (DE)
              </Button>
              <Button href="/api/cover-letter?lang=en&format=docx" variant="secondary" size="sm" external className="text-xs sm:text-sm">
                Word (EN)
              </Button>
              <Button href="/api/cover-letter?lang=de&format=docx" variant="secondary" size="sm" external className="text-xs sm:text-sm">
                Word (DE)
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
