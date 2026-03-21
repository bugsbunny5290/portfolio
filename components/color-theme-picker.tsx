"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { type ColorThemeId, colorThemes } from "@/lib/color-themes";

const STORAGE_KEY = "color-theme";
const THEME_CLASS_PREFIX = "theme-";

function getThemeClasses(): string[] {
  return colorThemes.map((t) => `${THEME_CLASS_PREFIX}${t.id}`);
}

export function ColorThemePicker(): React.ReactElement {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTheme, setActiveTheme] = useState<ColorThemeId>("rainbow");
  const popupRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const applyTheme = useCallback((themeId: ColorThemeId) => {
    const html = document.documentElement;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (!prefersReducedMotion) {
      html.classList.add("transitioning");
    }

    const allClasses = getThemeClasses();
    for (const cls of allClasses) {
      html.classList.remove(cls);
    }
    html.classList.add(`${THEME_CLASS_PREFIX}${themeId}`);
    localStorage.setItem(STORAGE_KEY, themeId);

    if (!prefersReducedMotion) {
      setTimeout(() => {
        html.classList.remove("transitioning");
      }, 200);
    }
  }, []);

  // On mount, read localStorage and apply saved theme
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY) as ColorThemeId | null;
    if (saved && colorThemes.some((t) => t.id === saved)) {
      applyTheme(saved);
      setActiveTheme(saved);
    } else {
      applyTheme("rainbow");
    }
  }, [applyTheme]);

  const handleSelect = useCallback(
    (themeId: ColorThemeId) => {
      applyTheme(themeId);
      setActiveTheme(themeId);
      setIsOpen(false);
    },
    [applyTheme],
  );

  // Close on Escape
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsOpen(false);
        buttonRef.current?.focus();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  // Close on click outside
  useEffect(() => {
    if (!isOpen) return;
    const handleClickOutside = (e: MouseEvent) => {
      if (
        popupRef.current &&
        !popupRef.current.contains(e.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  return (
    <>
      <button
        ref={buttonRef}
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-label="Change color theme"
        aria-expanded={isOpen}
        aria-haspopup="true"
        className="color-theme-btn"
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <circle cx="13.5" cy="6.5" r="2.5" />
          <circle cx="17.5" cy="10.5" r="2.5" />
          <circle cx="8.5" cy="7.5" r="2.5" />
          <circle cx="6.5" cy="12.5" r="2.5" />
          <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z" />
        </svg>
      </button>

      {isOpen && (
        <div
          ref={popupRef}
          className="color-theme-picker"
          role="dialog"
          aria-label="Color theme picker"
        >
          {/* Window chrome */}
          <div className="window-chrome">
            <div className="window-dot" style={{ background: "#ef4444" }} />
            <div className="window-dot" style={{ background: "#eab308" }} />
            <div className="window-dot" style={{ background: "#22c55e" }} />
            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.6875rem",
                color: "var(--fg-subtle)",
                marginLeft: "0.5rem",
              }}
            >
              theme-config.ts
            </span>
          </div>

          {/* Theme options */}
          <div
            style={{ padding: "0.5rem", display: "flex", flexDirection: "column", gap: "0.375rem" }}
          >
            {colorThemes.map((theme) => {
              const isActive = activeTheme === theme.id;
              return (
                <button
                  key={theme.id}
                  type="button"
                  onClick={() => handleSelect(theme.id)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.75rem",
                    width: "100%",
                    padding: "0.5rem 0.625rem",
                    border: isActive ? "2px solid var(--color-purple)" : "2px solid transparent",
                    borderRadius: "var(--radius)",
                    background: isActive ? "var(--color-purple)" : "transparent",
                    color: isActive ? "white" : "inherit",
                    boxShadow: isActive ? "2px 2px 0px 0px var(--shadow-color)" : "none",
                    cursor: "pointer",
                    transition: "all 0.15s",
                    textAlign: "left",
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.background = "var(--bg-card-hover)";
                      e.currentTarget.style.border = "2px solid var(--border-strong)";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.background = "transparent";
                      e.currentTarget.style.border = "2px solid transparent";
                    }
                  }}
                >
                  {/* Swatches */}
                  <div
                    style={{
                      display: "flex",
                      gap: "3px",
                      flexShrink: 0,
                    }}
                  >
                    {theme.swatches.map((color) => (
                      <div
                        key={color}
                        style={{
                          width: "14px",
                          height: "14px",
                          borderRadius: "2px",
                          background: color,
                          border: "1px solid var(--border-medium)",
                        }}
                      />
                    ))}
                  </div>

                  {/* Label and description */}
                  <div style={{ minWidth: 0 }}>
                    <div
                      style={{
                        fontSize: "0.8125rem",
                        fontWeight: 700,
                        color: isActive ? "white" : "var(--fg-heading)",
                        lineHeight: 1.3,
                      }}
                    >
                      {theme.label}
                    </div>
                    <div
                      style={{
                        fontSize: "0.6875rem",
                        color: isActive ? "rgba(255,255,255,0.8)" : "var(--fg-muted)",
                        lineHeight: 1.3,
                      }}
                    >
                      {theme.description}
                    </div>
                  </div>

                  {/* Active indicator */}
                  {isActive && (
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="white"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      style={{ marginLeft: "auto", flexShrink: 0 }}
                      aria-hidden="true"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
}
