"use client";

import { useEffect } from "react";

interface GlobalErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function GlobalError({ error, reset }: GlobalErrorProps): React.ReactElement {
  useEffect(() => {
    console.error("Global error:", error);
  }, [error]);

  return (
    <html lang="en">
      <head>
        <style>{`
          :root {
            color-scheme: light dark;
            --ge-bg: hsl(210, 20%, 98%);
            --ge-fg: hsl(222, 47%, 11%);
            --ge-muted: hsl(215, 20%, 32%);
            --ge-error-bg: hsl(0, 80%, 92%);
            --ge-error-stroke: hsl(0, 72%, 40%);
            --ge-border: hsl(214, 25%, 85%);
            --ge-btn-bg: hsl(210, 20%, 98%);
            --ge-btn-fg: hsl(222, 47%, 11%);
            --ge-btn-primary-bg: hsl(222, 47%, 11%);
            --ge-btn-primary-fg: hsl(210, 40%, 98%);
          }
          @media (prefers-color-scheme: dark) {
            :root {
              --ge-bg: hsl(222, 47%, 11%);
              --ge-fg: hsl(210, 40%, 98%);
              --ge-muted: hsl(215, 20%, 65%);
              --ge-error-bg: hsl(0, 50%, 18%);
              --ge-error-stroke: hsl(0, 70%, 60%);
              --ge-border: hsl(217, 33%, 25%);
              --ge-btn-bg: hsl(217, 33%, 17%);
              --ge-btn-fg: hsl(210, 40%, 98%);
              --ge-btn-primary-bg: hsl(210, 40%, 98%);
              --ge-btn-primary-fg: hsl(222, 47%, 11%);
            }
          }
          @media (prefers-reduced-motion: reduce) {
            * { transition-duration: 0.01ms !important; }
          }
        `}</style>
      </head>
      <body style={{ margin: 0, fontFamily: "system-ui, sans-serif" }}>
        <div
          style={{
            minHeight: "100vh",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "2rem",
            textAlign: "center",
            backgroundColor: "var(--ge-bg)",
            color: "var(--ge-fg)",
          }}
        >
          <div
            style={{
              width: "64px",
              height: "64px",
              borderRadius: "50%",
              backgroundColor: "var(--ge-error-bg)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: "1.5rem",
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              viewBox="0 0 24 24"
              fill="none"
              stroke="var(--ge-error-stroke)"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              role="img"
              aria-label="Error icon"
            >
              <circle cx="12" cy="12" r="10" />
              <line x1="12" x2="12" y1="8" y2="12" />
              <line x1="12" x2="12.01" y1="16" y2="16" />
            </svg>
          </div>
          <h1
            style={{
              fontSize: "1.875rem",
              fontWeight: "bold",
              color: "var(--ge-fg)",
              marginBottom: "1rem",
            }}
          >
            Something went wrong
          </h1>
          <p style={{ color: "var(--ge-muted)", marginBottom: "2rem", maxWidth: "400px" }}>
            A critical error occurred. Please try again or contact support if the problem persists.
          </p>
          <div style={{ display: "flex", gap: "1rem" }}>
            <button
              onClick={reset}
              type="button"
              style={{
                padding: "0.75rem 1.5rem",
                fontSize: "1rem",
                fontWeight: "500",
                color: "var(--ge-btn-fg)",
                backgroundColor: "var(--ge-btn-bg)",
                border: "1px solid var(--ge-border)",
                borderRadius: "0.5rem",
                cursor: "pointer",
                minHeight: "44px",
              }}
            >
              Try Again
            </button>
            <a
              href="/"
              style={{
                padding: "0.75rem 1.5rem",
                fontSize: "1rem",
                fontWeight: "500",
                color: "var(--ge-btn-primary-fg)",
                backgroundColor: "var(--ge-btn-primary-bg)",
                border: "none",
                borderRadius: "0.5rem",
                textDecoration: "none",
                display: "inline-flex",
                alignItems: "center",
                minHeight: "44px",
              }}
            >
              Back to Home
            </a>
          </div>
        </div>
      </body>
    </html>
  );
}
