import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import AboutPage from "@/app/about/page";

vi.mock("@/lib/language-context", () => ({
  useLanguage: () => ({
    locale: "en",
    content: {
      professionalSummary: "Test professional summary with 8+ years experience.",
      whatIDo: [
        { title: "Technical Strategy", description: "Architecture roadmaps" },
        { title: "Platform Engineering", description: "Cloud infrastructure" },
      ],
      education: [
        {
          degree: "M.Sc. Computer Science",
          institution: "TU Kaiserslautern",
          location: "Germany",
          startYear: "2016",
          endYear: "2018",
        },
      ],
      spokenLanguages: [
        { language: "Hindi", level: "Native", cefr: null },
        { language: "English", level: "Advanced", cefr: "C1" },
        { language: "German", level: "Elementary", cefr: "A2" },
      ],
      experiences: [],
    },
  }),
}));

vi.mock("@/components/about/timeline", () => ({
  Timeline: () => <div data-testid="timeline">Timeline Component</div>,
}));

describe("About Page", () => {
  it("renders professional summary", () => {
    render(<AboutPage />);
    expect(screen.getByText(/Test professional summary/)).toBeInTheDocument();
  });

  it("renders what I do section", () => {
    render(<AboutPage />);
    expect(screen.getByText("Technical Strategy")).toBeInTheDocument();
    expect(screen.getByText("Platform Engineering")).toBeInTheDocument();
  });

  it("renders what I do descriptions", () => {
    render(<AboutPage />);
    expect(screen.getByText("Architecture roadmaps")).toBeInTheDocument();
    expect(screen.getByText("Cloud infrastructure")).toBeInTheDocument();
  });

  it("renders education degree", () => {
    render(<AboutPage />);
    expect(screen.getByText(/M\.Sc\. Computer Science/)).toBeInTheDocument();
  });

  it("renders education institution", () => {
    render(<AboutPage />);
    expect(screen.getByText(/TU Kaiserslautern/)).toBeInTheDocument();
  });

  it("renders spoken languages", () => {
    render(<AboutPage />);
    expect(screen.getByText("Hindi")).toBeInTheDocument();
    expect(screen.getByText("English")).toBeInTheDocument();
    expect(screen.getByText("German")).toBeInTheDocument();
  });

  it("renders language levels with CEFR", () => {
    render(<AboutPage />);
    expect(screen.getByText(/Native/)).toBeInTheDocument();
    expect(screen.getByText(/C1/)).toBeInTheDocument();
    expect(screen.getByText(/A2/)).toBeInTheDocument();
  });

  it("renders timeline component", () => {
    render(<AboutPage />);
    expect(screen.getByTestId("timeline")).toBeInTheDocument();
  });
});
