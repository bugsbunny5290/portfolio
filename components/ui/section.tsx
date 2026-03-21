import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface SectionProps {
  children: ReactNode;
  className?: string;
  id?: string;
}

export function Section({ children, className, id }: SectionProps): React.ReactElement {
  return (
    <section id={id} className={cn("mx-auto max-w-6xl px-6 md:px-24 py-12 sm:py-24", className)}>
      {children}
    </section>
  );
}

interface SectionHeaderProps {
  title: string;
  description?: string;
  className?: string;
}

export function SectionHeader({
  title,
  description,
  className,
}: SectionHeaderProps): React.ReactElement {
  return (
    <div className={cn("mb-10 animate-on-scroll", className)}>
      <h2
        className="text-3xl md:text-4xl font-extrabold tracking-tight mb-2"
        style={{ color: "var(--fg-heading)" }}
      >
        {title}
      </h2>
      {description && (
        <p className="text-lg" style={{ color: "var(--fg-muted)" }}>
          {description}
        </p>
      )}
    </div>
  );
}
