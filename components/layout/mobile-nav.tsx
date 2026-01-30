"use client";

import { useState } from "react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { useLanguage } from "@/lib/language-context";
import { cn } from "@/lib/utils";

export function MobileNav(): React.ReactElement {
  const [isOpen, setIsOpen] = useState(false);
  const t = useTranslations("nav");
  const { content } = useLanguage();

  function toggleMenu(): void {
    setIsOpen(!isOpen);
  }

  function closeMenu(): void {
    setIsOpen(false);
  }

  return (
    <>
      <button
        type="button"
        onClick={toggleMenu}
        className={cn(
          "inline-flex h-9 w-9 items-center justify-center rounded-md border border-border",
          "bg-background text-foreground hover:bg-accent hover:text-accent-foreground",
          "transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        )}
        aria-label={isOpen ? "Close menu" : "Open menu"}
        aria-expanded={isOpen}
      >
        {isOpen ? (
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
            aria-hidden="true"
          >
            <path d="M18 6 6 18" />
            <path d="m6 6 12 12" />
          </svg>
        ) : (
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
            aria-hidden="true"
          >
            <line x1="4" x2="20" y1="12" y2="12" />
            <line x1="4" x2="20" y1="6" y2="6" />
            <line x1="4" x2="20" y1="18" y2="18" />
          </svg>
        )}
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm"
            onClick={closeMenu}
            aria-hidden="true"
          />
          <nav
            className={cn(
              "fixed right-0 top-16 z-50 w-full max-w-xs border-l border-border bg-background p-6",
              "h-[calc(100vh-4rem)] overflow-y-auto"
            )}
          >
            <ul className="flex flex-col gap-4">
              {content.navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={closeMenu}
                    className="block py-2 text-lg font-medium text-foreground hover:text-primary transition-colors"
                  >
                    {t(link.label)}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </>
      )}
    </>
  );
}
