"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { useLanguage } from "@/lib/language-context";
import { cn } from "@/lib/utils";

export function MobileNav(): React.ReactElement {
  const [isOpen, setIsOpen] = useState(false);
  const t = useTranslations("nav");
  const { content } = useLanguage();
  const navRef = useRef<HTMLElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  function toggleMenu(): void {
    setIsOpen(!isOpen);
  }

  const closeMenu = useCallback((): void => {
    setIsOpen(false);
    toggleRef.current?.focus();
  }, []);

  // Focus trap and Escape key handling
  useEffect(() => {
    if (!isOpen) return;

    function handleKeyDown(e: KeyboardEvent): void {
      if (e.key === "Escape") {
        closeMenu();
        return;
      }

      if (e.key !== "Tab" || !navRef.current) return;

      const focusable = navRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
      );
      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }

    document.addEventListener("keydown", handleKeyDown);

    // Focus the first link when the menu opens
    const focusable = navRef.current?.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled])'
    );
    if (focusable && focusable.length > 0) {
      focusable[0].focus();
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, closeMenu]);

  return (
    <>
      <button
        ref={toggleRef}
        type="button"
        onClick={toggleMenu}
        className={cn(
          "inline-flex h-11 w-11 items-center justify-center rounded-md border border-border",
          "bg-background text-foreground hover:bg-accent hover:text-accent-foreground",
          "transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        )}
        aria-label={isOpen ? "Close menu" : "Open menu"}
        aria-expanded={isOpen}
        aria-controls="mobile-nav-panel"
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
            ref={navRef}
            id="mobile-nav-panel"
            role="dialog"
            aria-label="Mobile navigation"
            className={cn(
              "fixed right-0 top-14 sm:top-16 z-50 w-3/4 max-w-xs border-l border-border bg-background p-6",
              "h-[calc(100vh-3.5rem)] sm:h-[calc(100vh-4rem)] overflow-y-auto"
            )}
          >
            <ul className="flex flex-col gap-2">
              {content.navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={closeMenu}
                    className="block min-h-[44px] py-3 text-lg font-medium text-foreground hover:text-primary transition-colors"
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
