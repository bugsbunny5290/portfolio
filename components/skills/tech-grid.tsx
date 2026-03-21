"use client";

import { useTranslations } from "next-intl";
import { type SkillCategory, skillCategories } from "@/lib/content";
import { useLanguage } from "@/lib/language-context";

export function TechGrid(): React.ReactElement {
  const t = useTranslations("categories");
  const { content } = useLanguage();
  const { skills } = content;

  return (
    <div className="grid gap-4 sm:gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {skillCategories.map((category, i) => {
        const categorySkills = skills.filter((skill) => skill.category === category);

        return (
          <div
            key={category}
            className={`animate-on-scroll stagger-${i + 1} card-brutal overflow-hidden`}
          >
            <div className="window-chrome">
              <div className="window-dot" style={{ background: "#ef4444" }} />
              <div className="window-dot" style={{ background: "#eab308" }} />
              <div className="window-dot" style={{ background: "#22c55e" }} />
              <span
                className="text-xs ml-2 truncate"
                style={{ color: "var(--fg-subtle)", fontFamily: "var(--font-mono)" }}
              >
                {category}.ts
              </span>
            </div>
            <div className="p-5">
              <h3
                className="flex items-center gap-2 text-base font-bold mb-4"
                style={{ color: "var(--fg-heading)" }}
              >
                <CategoryIcon icon={category} />
                {t(category)}
              </h3>
              <div className="flex flex-wrap gap-1.5">
                {categorySkills.map((skill) => (
                  <span key={`${skill.name}-${skill.category}`} className="tag-brutal">
                    {skill.name}
                  </span>
                ))}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

interface CategoryIconProps {
  icon: SkillCategory;
}

const svgProps = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true as const,
  className: "w-4 h-4 sm:w-5 sm:h-5",
};

function CategoryIcon({ icon }: CategoryIconProps): React.ReactElement {
  const iconMap: Record<SkillCategory, React.ReactElement> = {
    cloud: (
      <svg {...svgProps} role="presentation">
        <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z" />
      </svg>
    ),
    backend: (
      <svg {...svgProps} role="presentation">
        <rect width="20" height="8" x="2" y="2" rx="2" ry="2" />
        <rect width="20" height="8" x="2" y="14" rx="2" ry="2" />
        <line x1="6" x2="6.01" y1="6" y2="6" />
        <line x1="6" x2="6.01" y1="18" y2="18" />
      </svg>
    ),
    frontend: (
      <svg {...svgProps} role="presentation">
        <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
        <line x1="3" x2="21" y1="9" y2="9" />
        <line x1="9" x2="9" y1="21" y2="9" />
      </svg>
    ),
    devops: (
      <svg {...svgProps} role="presentation">
        <circle cx="12" cy="12" r="3" />
        <line x1="3" x2="9" y1="12" y2="12" />
        <line x1="15" x2="21" y1="12" y2="12" />
      </svg>
    ),
    languages: (
      <svg {...svgProps} role="presentation">
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
      </svg>
    ),
  };

  return iconMap[icon];
}
