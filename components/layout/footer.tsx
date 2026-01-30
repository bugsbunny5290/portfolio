"use client";

import { useLanguage } from "@/lib/language-context";

export function Footer(): React.ReactElement {
  const currentYear = new Date().getFullYear();
  const { data } = useLanguage();

  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <p className="text-sm text-muted-foreground">
            {currentYear} {data.personalInfo.name}. {data.ui.footer.allRightsReserved}
          </p>
          <div className="flex items-center gap-4">
            <a
              href={data.personalInfo.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              GitHub
            </a>
            <a
              href={`mailto:${data.personalInfo.email}`}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              {data.ui.contact.email}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
