import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { Timeline } from "@/components/about/timeline";

vi.mock("@/lib/language-context", () => ({
  useLanguage: () => ({
    locale: "en",
    content: {
      experiences: [
        {
          company: "DrAnsay AU-Schein GmbH",
          role: "Staff Engineer",
          location: "Heidelberg, Germany",
          startDate: "2022",
          endDate: "Present",
          contextNote: "Previously CTO (team of 15); transitioned to Staff Engineer.",
          description: "Leading platform engineering",
          highlights: ["Built scalable systems", "Led architecture decisions"],
          technologies: ["GCP", "Kubernetes", "TypeScript"],
        },
        {
          company: "Data4Life",
          role: "Resident Entrepreneur",
          location: "Potsdam, Germany",
          startDate: "2018",
          endDate: "2019",
          contextNote: "",
          description: "R&D programme at HPI",
          highlights: ["Designed voice-driven platform"],
          technologies: ["Node.js"],
        },
      ],
    },
  }),
}));

describe("Timeline component", () => {
  it("renders all experiences by company in description", () => {
    render(<Timeline />);
    expect(screen.getByText(/DrAnsay AU-Schein GmbH/)).toBeInTheDocument();
    expect(screen.getByText(/Data4Life/)).toBeInTheDocument();
  });

  it("displays role for each experience as title", () => {
    render(<Timeline />);
    expect(screen.getByText("Staff Engineer")).toBeInTheDocument();
    expect(screen.getByText("Resident Entrepreneur")).toBeInTheDocument();
  });

  it("displays date ranges", () => {
    render(<Timeline />);
    expect(screen.getByText("2022 - Present")).toBeInTheDocument();
    expect(screen.getByText("2018 - 2019")).toBeInTheDocument();
  });

  it("displays context note when present", () => {
    render(<Timeline />);
    expect(screen.getByText(/Previously CTO/)).toBeInTheDocument();
  });

  it("displays highlights as list items", () => {
    render(<Timeline />);
    expect(screen.getByText("Built scalable systems")).toBeInTheDocument();
    expect(screen.getByText("Led architecture decisions")).toBeInTheDocument();
    expect(screen.getByText("Designed voice-driven platform")).toBeInTheDocument();
  });

  it("displays technologies as badges", () => {
    render(<Timeline />);
    const gcpBadges = screen.getAllByText("GCP");
    expect(gcpBadges.length).toBeGreaterThanOrEqual(1);
    expect(screen.getByText("Kubernetes")).toBeInTheDocument();
    expect(screen.getByText("TypeScript")).toBeInTheDocument();
  });
});
