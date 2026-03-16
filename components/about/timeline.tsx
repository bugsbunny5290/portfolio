"use client";

import type React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui";
import type { Experience } from "@/lib/content";
import { useLanguage } from "@/lib/language-context";

export function Timeline(): React.ReactElement {
  const { content } = useLanguage();

  return (
    <div className="space-y-4 sm:space-y-8">
      {content.experiences.map((experience, index) => (
        <TimelineItem key={`${experience.company}-${index}`} experience={experience} />
      ))}
    </div>
  );
}

interface TimelineItemProps {
  experience: Experience;
}

function TimelineItem({ experience }: TimelineItemProps): React.ReactElement {
  return (
    <Card className="relative">
      <CardHeader>
        <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
          <CardTitle>{experience.role}</CardTitle>
          <span className="text-sm font-medium text-primary/70">
            {experience.startDate} - {experience.endDate}
          </span>
        </div>
        <CardDescription className="text-foreground/70">
          {experience.company} | {experience.location}
        </CardDescription>
        {experience.contextNote && (
          <p className="mt-1 text-sm italic text-muted-foreground">{experience.contextNote}</p>
        )}
      </CardHeader>
      <CardContent>
        {experience.highlights.length > 0 && (
          <ul className="space-y-2">
            {experience.highlights.map((highlight) => (
              <li key={highlight} className="flex items-start gap-2 text-sm text-foreground/80">
                <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary" />
                <span>
                  <HighlightMetrics text={highlight} />
                </span>
              </li>
            ))}
          </ul>
        )}
        <div className="mt-4 flex flex-wrap gap-2">
          {experience.technologies.map((tech) => (
            <span
              key={tech}
              className="inline-flex items-center rounded-full bg-secondary px-2.5 py-0.5 text-xs font-medium text-secondary-foreground"
            >
              {tech}
            </span>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

function HighlightMetrics({ text }: { text: string }): React.ReactElement {
  const pattern =
    /(\d[\d,.]*[KMB]\+?(?:\s*(?:users|requests?\/day|Requests?\/Tag|microservices|Microservices|APIs?|people|Mitarbeiter|engineers?|Engineers?))?|€[\d,.]+[KMB]?\s*(?:ARR)?|\d+-(?:person|Personen)(?:\s+(?:engineering\s+)?(?:org|Organisation))?|P\d+)/gi;

  const parts: React.ReactNode[] = [];
  let lastIndex = 0;
  const regex = new RegExp(pattern.source, pattern.flags);

  for (let match = regex.exec(text); match !== null; match = regex.exec(text)) {
    if (match.index > lastIndex) {
      parts.push(text.slice(lastIndex, match.index));
    }
    parts.push(
      <strong key={match.index} className="font-semibold text-primary">
        {match[0]}
      </strong>,
    );
    lastIndex = regex.lastIndex;
  }

  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex));
  }

  return <>{parts.length > 0 ? parts : text}</>;
}
