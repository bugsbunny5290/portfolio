"use client";

import { useLanguage } from "@/lib/language-context";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui";
import type { Experience } from "@/lib/content";

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
          <span className="text-sm text-muted-foreground">
            {experience.startDate} - {experience.endDate}
          </span>
        </div>
        <CardDescription>
          {experience.company} | {experience.location}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">{experience.description}</p>
        {experience.highlights.length > 0 && (
          <ul className="mt-4 space-y-2">
            {experience.highlights.map((highlight) => (
              <li key={highlight} className="flex items-start gap-2 text-sm text-muted-foreground">
                <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary" />
                {highlight}
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
