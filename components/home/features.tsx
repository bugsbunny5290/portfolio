"use client";

import { useTranslations } from "next-intl";
import { useLanguage } from "@/lib/language-context";

const featureIcons = [
  // Strategy icon - compass/direction
  <svg
    key="strategy"
    className="w-10 h-10 md:w-14 md:h-14"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    viewBox="0 0 24 24"
    aria-hidden="true"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M9 6.75V15m6-6v8.25m.503 3.498l4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 00-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0z"
    />
  </svg>,
  // Platform icon - cloud/infrastructure
  <svg
    key="platform"
    className="w-10 h-10 md:w-14 md:h-14"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    viewBox="0 0 24 24"
    aria-hidden="true"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M2.25 15a4.5 4.5 0 004.5 4.5H18a3.75 3.75 0 001.332-7.257 3 3 0 00-3.758-3.848 5.25 5.25 0 00-10.233 2.33A4.502 4.502 0 002.25 15z"
    />
  </svg>,
  // AI icon - sparkles
  <svg
    key="ai"
    className="w-10 h-10 md:w-14 md:h-14"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    viewBox="0 0 24 24"
    aria-hidden="true"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z"
    />
  </svg>,
  // Hands-on icon - code/wrench
  <svg
    key="handson"
    className="w-10 h-10 md:w-14 md:h-14"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    viewBox="0 0 24 24"
    aria-hidden="true"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5"
    />
  </svg>,
];

const featureAccents = [
  "var(--color-strategy)",
  "var(--color-platform)",
  "var(--color-ai)",
  "var(--color-code)",
];

export function Features(): React.ReactElement {
  const { content } = useLanguage();
  const t = useTranslations("about");

  return (
    <section>
      <div className="mb-10 animate-on-scroll">
        <h2
          className="text-3xl md:text-4xl font-extrabold tracking-tight mb-2"
          style={{ color: "var(--fg-heading)" }}
        >
          {t("whatIDo")}
        </h2>
        <p className="text-lg" style={{ color: "var(--fg-muted)" }}>
          Technical strategy, cloud infrastructure, and hands-on engineering.
        </p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-5">
        {content.whatIDo.map((feature, i) => (
          <div
            key={feature.title}
            className={`animate-on-scroll stagger-${i + 1} card-brutal overflow-hidden flex flex-col h-full`}
            style={{ position: "relative" }}
          >
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "4px",
                height: "100%",
                background: featureAccents[i],
              }}
            />
            <div
              className="aspect-[4/3] flex items-center justify-center p-3 md:p-6 overflow-hidden"
              style={{
                background: `var(--feature-bg-${i})`,
                borderBottom: "2px solid var(--border-strong)",
              }}
            >
              <div style={{ color: "var(--feature-icon-color)" }}>{featureIcons[i]}</div>
            </div>
            <div className="p-3 md:p-5 flex-1">
              <h3
                className="text-sm md:text-base font-bold mb-0.5 md:mb-1"
                style={{ color: "var(--fg-heading)" }}
              >
                {feature.title}
              </h3>
              <p
                className="text-xs md:text-sm leading-relaxed"
                style={{ color: "var(--fg-muted)" }}
              >
                {feature.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
