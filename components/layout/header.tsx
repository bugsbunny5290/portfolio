"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";
import { useLanguage } from "@/lib/language-context";
import { ThemeToggle } from "./theme-toggle";
import { LanguageToggle } from "./language-toggle";
import { MobileNav } from "./mobile-nav";

export function Header(): React.ReactElement {
  const t = useTranslations("nav");
  const { content } = useLanguage();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="text-lg font-semibold tracking-tight text-foreground hover:text-primary transition-colors"
        >
          {content.personalInfo.name.split(" ")[0]}
        </Link>

        <nav className="hidden md:flex items-center gap-6">
          {content.navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              {t(link.label)}
            </Link>
          ))}
          <LanguageToggle />
          <ThemeToggle />
        </nav>

        <div className="flex md:hidden items-center gap-2">
          <LanguageToggle />
          <ThemeToggle />
          <MobileNav />
        </div>
      </div>
    </header>
  );
}
