"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";
import { useCallback, useEffect, useRef, useState } from "react";
import { useLanguage } from "@/lib/language-context";

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

  useEffect(() => {
    if (!isOpen) return;

    function handleKeyDown(e: KeyboardEvent): void {
      if (e.key === "Escape") {
        closeMenu();
        return;
      }

      if (e.key !== "Tab" || !navRef.current) return;

      const focusable = navRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
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

    const focusable = navRef.current?.querySelectorAll<HTMLElement>(
      "a[href], button:not([disabled])",
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
        className="inline-flex items-center justify-center w-10 h-10 shadow-brutal-sm transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
        style={{
          border: "2px solid var(--border-strong)",
          background: "var(--bg-card)",
          color: "var(--fg-muted)",
        }}
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
            className="fixed inset-0 z-40"
            style={{ background: "rgba(0,0,0,0.5)" }}
            onClick={closeMenu}
            aria-hidden="true"
          />
          <nav
            ref={navRef}
            id="mobile-nav-panel"
            role="dialog"
            aria-label="Mobile navigation"
            className="fixed right-0 top-[65px] z-50 w-3/4 max-w-xs p-6 h-[calc(100vh-65px)] overflow-y-auto"
            style={{
              borderLeft: "2px solid var(--border-strong)",
              background: "var(--bg)",
            }}
          >
            <ul className="flex flex-col gap-1">
              {content.navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={closeMenu}
                    className="block min-h-[44px] py-3 text-lg font-bold transition-colors"
                    style={{ color: "var(--fg)" }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = "var(--color-purple)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = "var(--fg)";
                    }}
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
