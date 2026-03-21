"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { useLanguage } from "@/lib/language-context";
import { LanguageToggle } from "./language-toggle";
import { MobileNav } from "./mobile-nav";
import { ThemeToggle } from "./theme-toggle";

export function Header(): React.ReactElement {
  const t = useTranslations("nav");
  const { content } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 80);

      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? (window.scrollY / docHeight) * 100 : 0;
      setScrollProgress(Math.min(progress, 100));
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <div className="scroll-progress" style={{ width: `${scrollProgress}%` }} />
      <header
        className={`w-full sticky top-0 z-50 transition-shadow duration-300 ${scrolled ? "header-shadow" : ""}`}
        style={{ borderBottom: "2px solid var(--border-medium)", background: "var(--bg)" }}
      >
        <nav className="mx-auto max-w-6xl px-6 md:px-24 py-3 flex items-center justify-between">
          <Link href="/" aria-label="Home" className="logo-press flex items-center gap-2.5">
            <svg
              width="28"
              height="28"
              viewBox="0 0 140 140"
              xmlns="http://www.w3.org/2000/svg"
              className="block shrink-0"
              role="presentation"
            >
              <defs>
                <linearGradient id="logo-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#3b82f6" />
                  <stop offset="50%" stopColor="#4f46e5" />
                  <stop offset="100%" stopColor="#7c3aed" />
                </linearGradient>
              </defs>
              <rect x="16" y="16" width="114" height="114" rx="8" fill="var(--shadow-color)" />
              <rect
                x="8"
                y="8"
                width="114"
                height="114"
                rx="8"
                fill="var(--bg-card)"
                stroke="var(--border-strong)"
                strokeWidth="5"
              />
              <text
                x="65"
                y="84"
                textAnchor="middle"
                fontFamily="'DM Sans',system-ui,sans-serif"
                fontWeight="800"
                fontSize="64"
                fill="url(#logo-grad)"
                letterSpacing="-3"
              >
                PG
              </text>
            </svg>
            <span
              className="text-sm font-bold overflow-hidden whitespace-nowrap transition-all duration-300 ease-out"
              style={{
                color: "var(--fg-heading)",
                maxWidth: scrolled ? "10rem" : "0",
                opacity: scrolled ? 1 : 0,
              }}
            >
              {content.personalInfo.name}
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-6">
            {content.navLinks
              .filter((l) => l.href !== "/")
              .map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm font-medium transition-colors duration-200"
                  style={{ color: "var(--fg-muted)" }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = "var(--fg-heading)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = "var(--fg-muted)";
                  }}
                >
                  {t(link.label)}
                </Link>
              ))}
            <LanguageToggle />
            <ThemeToggle />
          </div>

          <div className="flex md:hidden items-center gap-2">
            <LanguageToggle />
            <ThemeToggle />
            <MobileNav />
          </div>
        </nav>
      </header>
    </>
  );
}
