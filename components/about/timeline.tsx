"use client";

import type { Experience } from "@/lib/content";
import { useLanguage } from "@/lib/language-context";

export function Timeline(): React.ReactElement {
  const { content } = useLanguage();

  return (
    <div className="space-y-5">
      {content.experiences.map((experience, index) => (
        <TimelineItem
          key={`${experience.company}-${index}`}
          experience={experience}
          index={index}
        />
      ))}
    </div>
  );
}

interface TimelineItemProps {
  experience: Experience;
  index: number;
}

function TimelineItem({ experience, index }: TimelineItemProps): React.ReactElement {
  return (
    <div className={`animate-on-scroll stagger-${Math.min(index + 1, 6)} card-brutal p-5 md:p-6`}>
      <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between flex-wrap mb-2">
        <h3 className="text-base md:text-lg font-bold" style={{ color: "var(--fg-heading)" }}>
          {experience.role}
        </h3>
        <span className="date-badge flex-shrink-0">
          {experience.startDate} - {experience.endDate}
        </span>
      </div>
      <p className="text-sm mb-3" style={{ color: "var(--fg-muted)" }}>
        {experience.company} | {experience.location}
      </p>
      {experience.contextNote && (
        <p className="text-sm italic mb-3" style={{ color: "var(--fg-subtle)" }}>
          {experience.contextNote}
        </p>
      )}
      <p className="text-sm leading-relaxed" style={{ color: "var(--fg)" }}>
        {experience.description}
      </p>
      {experience.highlights.length > 0 && (
        <ul className="mt-4 space-y-2">
          {experience.highlights.map((highlight) => (
            <li
              key={highlight}
              className="flex items-start gap-2 text-sm"
              style={{ color: "var(--fg)" }}
            >
              <span
                className="mt-2 h-1.5 w-1.5 flex-shrink-0"
                style={{ background: "var(--color-purple)" }}
              />
              <span>
                <HighlightMetrics text={highlight} />
              </span>
            </li>
          ))}
        </ul>
      )}
      <div className="mt-4 flex flex-wrap gap-1.5">
        {experience.technologies.map((tech) => (
          <span key={tech} className="tag-brutal">
            {tech}
          </span>
        ))}
      </div>
    </div>
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
      <strong key={match.index} className="font-semibold" style={{ color: "var(--color-purple)" }}>
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
