"use client";

import { useEffect } from "react";
import { Button, Section } from "@/components/ui";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function ErrorPage({ error, reset }: ErrorProps): React.ReactElement {
  useEffect(() => {
    console.error("Application error:", error);
  }, [error]);

  return (
    <Section className="flex flex-col items-center justify-center text-center min-h-[60vh]">
      <div className="rounded-full bg-destructive/10 p-4 mb-6">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="48"
          height="48"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-destructive"
          aria-hidden="true"
        >
          <circle cx="12" cy="12" r="10" />
          <line x1="12" x2="12" y1="8" y2="12" />
          <line x1="12" x2="12.01" y1="16" y2="16" />
        </svg>
      </div>
      <h1 className="text-3xl font-bold text-foreground mb-4">Something went wrong</h1>
      <p className="text-muted-foreground mb-8 max-w-md">
        An unexpected error occurred. Please try again or return to the homepage.
      </p>
      <div className="flex gap-4">
        <Button onClick={reset} variant="outline" size="lg">
          Try Again
        </Button>
        <Button href="/" size="lg">
          Back to Home
        </Button>
      </div>
    </Section>
  );
}
