"use client";

import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import { useCallback, useEffect, useRef, useState } from "react";

interface PaletteCommand {
  id: string;
  label: string;
  description: string;
  action: "navigate" | "link" | "theme" | "external";
  href?: string;
  icon: string;
}

const paletteCommands: PaletteCommand[] = [
  {
    id: "about",
    label: "About Me",
    description: "View professional background",
    action: "navigate",
    href: "/about",
    icon: "\u2192",
  },
  {
    id: "skills",
    label: "Skills & Technologies",
    description: "View tech stack",
    action: "navigate",
    href: "/skills",
    icon: "\u2192",
  },
  {
    id: "contact",
    label: "Get in Touch",
    description: "Contact information & CV download",
    action: "navigate",
    href: "/contact",
    icon: "\u2192",
  },
  {
    id: "cv-pdf",
    label: "Download CV (PDF)",
    description: "English PDF resume",
    action: "link",
    href: "/api/cv?lang=en&format=pdf",
    icon: "\u2193",
  },
  {
    id: "cv-de",
    label: "Download CV (DE)",
    description: "German PDF resume",
    action: "link",
    href: "/api/cv?lang=de&format=pdf",
    icon: "\u2193",
  },
  {
    id: "theme",
    label: "Toggle Theme",
    description: "Switch dark/light mode",
    action: "theme",
    icon: "\u25D0",
  },
  {
    id: "github",
    label: "GitHub Profile",
    description: "View source code",
    action: "external",
    href: "https://github.com/bugsbunny5290",
    icon: "\u2197",
  },
  {
    id: "linkedin",
    label: "LinkedIn Profile",
    description: "Professional network",
    action: "external",
    href: "https://linkedin.com/in/pranavgautam",
    icon: "\u2197",
  },
];

export function CommandPalette(): React.ReactElement | null {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const { setTheme, resolvedTheme } = useTheme();

  const filtered = paletteCommands.filter(
    (cmd) =>
      cmd.label.toLowerCase().includes(query.toLowerCase()) ||
      cmd.description.toLowerCase().includes(query.toLowerCase()),
  );

  const open = useCallback(() => {
    setIsOpen(true);
    setQuery("");
    setSelectedIndex(0);
  }, []);

  const close = useCallback(() => {
    setIsOpen(false);
    setQuery("");
    setSelectedIndex(0);
  }, []);

  const executeCommand = useCallback(
    (cmd: PaletteCommand) => {
      close();
      switch (cmd.action) {
        case "navigate":
          if (cmd.href) router.push(cmd.href);
          break;
        case "link":
          if (cmd.href) window.open(cmd.href, "_blank");
          break;
        case "theme":
          setTheme(resolvedTheme === "dark" ? "light" : "dark");
          break;
        case "external":
          if (cmd.href) window.open(cmd.href, "_blank", "noopener,noreferrer");
          break;
      }
    },
    [close, router, setTheme, resolvedTheme],
  );

  // Keyboard shortcut to open/close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Cmd+K or Ctrl+K toggles
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setIsOpen((prev) => {
          if (prev) {
            setQuery("");
            setSelectedIndex(0);
            return false;
          }
          setQuery("");
          setSelectedIndex(0);
          return true;
        });
        return;
      }

      // / key opens (only when not focused on input/textarea/contenteditable)
      if (
        e.key === "/" &&
        !isOpen &&
        !(
          e.target instanceof HTMLInputElement ||
          e.target instanceof HTMLTextAreaElement ||
          (e.target instanceof HTMLElement && e.target.isContentEditable)
        )
      ) {
        e.preventDefault();
        open();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, open]);

  // Auto-focus input when opened
  useEffect(() => {
    if (isOpen) {
      // Small delay to ensure DOM is rendered
      requestAnimationFrame(() => {
        inputRef.current?.focus();
      });
    }
  }, [isOpen]);

  // Reset selected index is handled inline when query changes (see onChange below)

  // Scroll selected item into view
  useEffect(() => {
    if (!listRef.current) return;
    const selected = listRef.current.children[selectedIndex] as HTMLElement | undefined;
    if (selected) {
      selected.scrollIntoView({ block: "nearest" });
    }
  }, [selectedIndex]);

  // Focus trap + keyboard navigation inside palette
  const handlePaletteKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      switch (e.key) {
        case "Escape":
          e.preventDefault();
          close();
          break;
        case "ArrowDown":
          e.preventDefault();
          setSelectedIndex((prev) => (prev + 1) % filtered.length);
          break;
        case "ArrowUp":
          e.preventDefault();
          setSelectedIndex((prev) => (prev - 1 + filtered.length) % filtered.length);
          break;
        case "Enter":
          e.preventDefault();
          if (filtered[selectedIndex]) {
            executeCommand(filtered[selectedIndex]);
          }
          break;
        case "Tab":
          // Trap focus inside palette
          e.preventDefault();
          break;
      }
    },
    [close, executeCommand, filtered, selectedIndex],
  );

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Command palette"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "center",
        paddingTop: "clamp(4rem, 15vh, 10rem)",
      }}
      onKeyDown={handlePaletteKeyDown}
    >
      {/* Backdrop */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundColor: "rgba(0, 0, 0, 0.5)",
        }}
        onClick={close}
        aria-hidden="true"
      />

      {/* Modal */}
      <div
        style={{
          position: "relative",
          width: "100%",
          maxWidth: "500px",
          maxHeight: "400px",
          margin: "0 1rem",
          background: "var(--bg-card)",
          border: "2px solid var(--border-strong)",
          borderRadius: "var(--radius)",
          boxShadow: "4px 4px 0px 0px var(--shadow-color)",
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
          fontFamily: "var(--font-mono)",
        }}
      >
        {/* Window chrome */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.375rem",
            padding: "0.75rem 1rem",
            background: "var(--tag-bg)",
            borderBottom: "2px dashed var(--border-medium)",
          }}
        >
          <span
            style={{
              width: "0.625rem",
              height: "0.625rem",
              borderRadius: "50%",
              backgroundColor: "#ef4444",
              border: "1.5px solid var(--border-strong)",
            }}
          />
          <span
            style={{
              width: "0.625rem",
              height: "0.625rem",
              borderRadius: "50%",
              backgroundColor: "#eab308",
              border: "1.5px solid var(--border-strong)",
            }}
          />
          <span
            style={{
              width: "0.625rem",
              height: "0.625rem",
              borderRadius: "50%",
              backgroundColor: "#22c55e",
              border: "1.5px solid var(--border-strong)",
            }}
          />
          <span
            style={{
              marginLeft: "0.5rem",
              fontSize: "0.75rem",
              color: "var(--fg-muted)",
              fontFamily: "var(--font-mono)",
            }}
          >
            commands.ts
          </span>
        </div>

        {/* Search input */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            padding: "0.75rem 1rem",
            borderBottom: "1px solid var(--border-medium)",
            gap: "0.5rem",
          }}
        >
          <span
            style={{
              color: "var(--color-purple)",
              fontFamily: "var(--font-mono)",
              fontSize: "0.875rem",
              fontWeight: 700,
              flexShrink: 0,
            }}
          >
            $
          </span>
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            placeholder="Type a command..."
            aria-label="Search commands"
            autoComplete="off"
            style={{
              flex: 1,
              background: "transparent",
              border: "none",
              outline: "none",
              color: "var(--fg)",
              fontFamily: "var(--font-mono)",
              fontSize: "0.875rem",
            }}
          />
        </div>

        {/* Command list */}
        <div
          ref={listRef}
          role="listbox"
          aria-label="Commands"
          style={{
            flex: 1,
            overflowY: "auto",
            padding: "0.25rem 0",
          }}
        >
          {filtered.length === 0 ? (
            <div
              style={{
                padding: "1.5rem 1rem",
                textAlign: "center",
                color: "var(--fg-muted)",
                fontSize: "0.8125rem",
                fontFamily: "var(--font-mono)",
              }}
            >
              No commands found
            </div>
          ) : (
            filtered.map((cmd, index) => (
              <div
                key={cmd.id}
                role="option"
                tabIndex={-1}
                aria-selected={index === selectedIndex}
                onClick={() => executeCommand(cmd)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    executeCommand(cmd);
                  }
                }}
                onMouseEnter={() => setSelectedIndex(index)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.75rem",
                  padding: "0.625rem 1rem",
                  cursor: "pointer",
                  backgroundColor: index === selectedIndex ? "var(--color-purple)" : "transparent",
                  color: index === selectedIndex ? "white" : "var(--fg)",
                  transition: "background-color 0.1s, color 0.1s",
                }}
              >
                <span
                  style={{
                    fontSize: "1rem",
                    flexShrink: 0,
                    width: "1.25rem",
                    textAlign: "center",
                    fontFamily: "var(--font-mono)",
                  }}
                >
                  {cmd.icon}
                </span>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div
                    style={{
                      fontSize: "0.8125rem",
                      fontWeight: 600,
                      fontFamily: "var(--font-mono)",
                    }}
                  >
                    {cmd.label}
                  </div>
                  <div
                    style={{
                      fontSize: "0.6875rem",
                      color:
                        index === selectedIndex ? "rgba(255, 255, 255, 0.7)" : "var(--fg-muted)",
                      fontFamily: "var(--font-mono)",
                    }}
                  >
                    {cmd.description}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer with keyboard shortcut hint */}
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
            padding: "0.5rem 1rem",
            borderTop: "1px solid var(--border-medium)",
            fontSize: "0.6875rem",
            color: "var(--fg-subtle)",
            fontFamily: "var(--font-mono)",
            gap: "0.75rem",
          }}
        >
          <span>
            <kbd
              style={{
                padding: "0.125rem 0.375rem",
                border: "1px solid var(--border-medium)",
                borderRadius: "3px",
                fontSize: "0.625rem",
              }}
            >
              &uarr;&darr;
            </kbd>{" "}
            navigate
          </span>
          <span>
            <kbd
              style={{
                padding: "0.125rem 0.375rem",
                border: "1px solid var(--border-medium)",
                borderRadius: "3px",
                fontSize: "0.625rem",
              }}
            >
              &crarr;
            </kbd>{" "}
            select
          </span>
          <span>
            <kbd
              style={{
                padding: "0.125rem 0.375rem",
                border: "1px solid var(--border-medium)",
                borderRadius: "3px",
                fontSize: "0.625rem",
              }}
            >
              &#x2318;K
            </kbd>{" "}
            close
          </span>
        </div>
      </div>
    </div>
  );
}
