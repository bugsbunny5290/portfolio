import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { ExperienceHighlights } from "@/components/home/experience-highlights";

vi.mock("@/lib/language-context", () => ({
  useLanguage: () => ({
    locale: "en",
    content: {
      experiences: [
        {
          company: "DrAnsay AU-Schein GmbH",
          role: "Staff Engineer",
          location: "Hamburg, Germany",
          startDate: "Dec 2019",
          endDate: "Present",
          description: "Platform engineering and cloud architecture.",
          technologies: ["GCP", "Kubernetes"],
        },
        {
          company: "Data4Life",
          role: "Resident Entrepreneur",
          location: "Potsdam, Germany",
          startDate: "Nov 2018",
          endDate: "Apr 2019",
          description: "Selected for a competitive R&D programme.",
          technologies: ["Architecture", "Healthcare"],
        },
        {
          company: "DFKI GmbH",
          role: "Guest Researcher",
          location: "Kaiserslautern, Germany",
          startDate: "Feb 2018",
          endDate: "Oct 2018",
          description: "Research on AI systems.",
          technologies: ["AI", "Python"],
        },
      ],
    },
  }),
}));

describe("ExperienceHighlights component", () => {
  it("renders experience section heading", () => {
    render(<ExperienceHighlights />);
    // useTranslations mock returns the key itself
    expect(screen.getByText("experience")).toBeInTheDocument();
  });

  it("renders window chrome on cards", () => {
    const { container } = render(<ExperienceHighlights />);
    const windowChromes = container.querySelectorAll(".window-chrome");
    expect(windowChromes.length).toBe(3);
    // Each window chrome should have 3 dots
    for (const chrome of windowChromes) {
      const dots = chrome.querySelectorAll(".window-dot");
      expect(dots.length).toBe(3);
    }
  });

  it("renders date badges", () => {
    const { container } = render(<ExperienceHighlights />);
    const badges = container.querySelectorAll(".date-badge");
    expect(badges.length).toBe(3);
    expect(screen.getByText("Dec 2019 - Present")).toBeInTheDocument();
    expect(screen.getByText("Nov 2018 - Apr 2019")).toBeInTheDocument();
    expect(screen.getByText("Feb 2018 - Oct 2018")).toBeInTheDocument();
  });

  it("renders experience roles", () => {
    render(<ExperienceHighlights />);
    expect(screen.getByText("Staff Engineer")).toBeInTheDocument();
    expect(screen.getByText("Resident Entrepreneur")).toBeInTheDocument();
    expect(screen.getByText("Guest Researcher")).toBeInTheDocument();
  });

  it("renders technology tags", () => {
    render(<ExperienceHighlights />);
    expect(screen.getByText("GCP")).toBeInTheDocument();
    expect(screen.getByText("Kubernetes")).toBeInTheDocument();
    expect(screen.getByText("Healthcare")).toBeInTheDocument();
  });
});
