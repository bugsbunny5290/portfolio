import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface SectionProps {
  children: ReactNode;
  className?: string;
  id?: string;
}

export function Section({ children, className, id }: SectionProps): React.ReactElement {
  return (
    <section
      id={id}
      className={cn("mx-auto max-w-5xl px-4 py-12 sm:px-6 sm:py-24 lg:px-8", className)}
    >
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
    <div className={cn("mb-8 sm:mb-12", className)}>
      <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-4xl">{title}</h2>
      {description && <p className="mt-2 text-base text-muted-foreground sm:mt-4 sm:text-lg">{description}</p>}
    </div>
  );
}
