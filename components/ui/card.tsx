import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface CardProps {
  children: ReactNode;
  className?: string;
  variant?: "brutal" | "dashed";
}

export function Card({ children, className, variant = "brutal" }: CardProps): React.ReactElement {
  return (
    <div className={cn(variant === "brutal" ? "card-brutal" : "card-dashed", "p-6", className)}>
      {children}
    </div>
  );
}

interface CardHeaderProps {
  children: ReactNode;
  className?: string;
}

export function CardHeader({ children, className }: CardHeaderProps): React.ReactElement {
  return <div className={cn("mb-4", className)}>{children}</div>;
}

interface CardTitleProps {
  children: ReactNode;
  className?: string;
}

export function CardTitle({ children, className }: CardTitleProps): React.ReactElement {
  return (
    <h3 className={cn("text-base font-bold", className)} style={{ color: "var(--fg-heading)" }}>
      {children}
    </h3>
  );
}

interface CardDescriptionProps {
  children: ReactNode;
  className?: string;
}

export function CardDescription({ children, className }: CardDescriptionProps): React.ReactElement {
  return (
    <p className={cn("text-sm", className)} style={{ color: "var(--fg-muted)" }}>
      {children}
    </p>
  );
}

interface CardContentProps {
  children: ReactNode;
  className?: string;
}

export function CardContent({ children, className }: CardContentProps): React.ReactElement {
  return <div className={className}>{children}</div>;
}
