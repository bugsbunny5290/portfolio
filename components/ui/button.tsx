import Link from "next/link";
import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: "primary" | "secondary" | "outline";
  size?: "sm" | "md" | "lg";
  href?: string;
  external?: boolean;
}

export function Button({
  children,
  variant = "primary",
  size = "md",
  href,
  external,
  className,
  "aria-label": ariaLabel,
  ...props
}: ButtonProps): React.ReactElement {
  const baseStyles =
    "btn-brutal inline-flex items-center justify-center font-bold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50";

  const variants = {
    primary: "btn-brutal-primary",
    secondary: "btn-brutal-secondary",
    outline: "btn-brutal-secondary",
  };

  const sizes = {
    sm: "px-3 py-1.5 text-xs",
    md: "px-5 py-2.5 text-sm",
    lg: "px-7 py-3 text-sm",
  };

  const classes = cn(baseStyles, variants[variant], sizes[size], className);

  if (href) {
    if (external) {
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={classes}
          aria-label={ariaLabel}
        >
          {children}
        </a>
      );
    }
    return (
      <Link href={href} className={classes} aria-label={ariaLabel}>
        {children}
      </Link>
    );
  }

  return (
    <button className={classes} aria-label={ariaLabel} {...props}>
      {children}
    </button>
  );
}
