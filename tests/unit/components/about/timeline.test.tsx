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
          description: "Leading platform engineering",
          highlights: ["Built scalable systems", "Led architecture decisions"],
          technologies: ["GCP", "Kubernetes", "TypeScript"],
        },
        {
          company: "Au-Schein GmbH",
          role: "CTO",
          location: "Heidelberg, Germany",
          startDate: "2020",
          endDate: "2022",
          description: "Led technical strategy",
          highlights: ["Scaled from 0 to 2M users"],
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
    expect(screen.getByText(/Au-Schein GmbH/)).toBeInTheDocument();
  });

  it("displays role for each experience as title", () => {
    render(<Timeline />);
    expect(screen.getByText("Staff Engineer")).toBeInTheDocument();
    expect(screen.getByText("CTO")).toBeInTheDocument();
  });

  it("displays date ranges", () => {
    render(<Timeline />);
    expect(screen.getByText("2022 - Present")).toBeInTheDocument();
    expect(screen.getByText("2020 - 2022")).toBeInTheDocument();
  });

  it("displays experience descriptions", () => {
    render(<Timeline />);
    expect(screen.getByText("Leading platform engineering")).toBeInTheDocument();
    expect(screen.getByText("Led technical strategy")).toBeInTheDocument();
  });

  it("displays highlights as list items", () => {
    render(<Timeline />);
    expect(screen.getByText("Built scalable systems")).toBeInTheDocument();
    expect(screen.getByText("Led architecture decisions")).toBeInTheDocument();
    expect(screen.getByText("Scaled from 0 to 2M users")).toBeInTheDocument();
  });

  it("displays technologies as badges", () => {
    render(<Timeline />);
    const gcpBadges = screen.getAllByText("GCP");
    expect(gcpBadges.length).toBeGreaterThanOrEqual(1);
    expect(screen.getByText("Kubernetes")).toBeInTheDocument();
    expect(screen.getByText("TypeScript")).toBeInTheDocument();
  });
});
