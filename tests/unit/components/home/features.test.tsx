import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { Features } from "@/components/home/features";

vi.mock("@/lib/language-context", () => ({
  useLanguage: () => ({
    locale: "en",
    content: {
      whatIDo: [
        { title: "Technical Strategy", description: "Architecture roadmaps and high-impact decisions." },
        { title: "Platform Engineering", description: "Cloud infrastructure and CI/CD pipelines." },
        { title: "AI-Assisted Development", description: "Leveraging AI tools for rapid prototyping." },
        { title: "Hands-On Execution", description: "Staying close to the code." },
      ],
    },
  }),
}));

describe("Features component", () => {
  it('renders section with "whatIDo" heading', () => {
    render(<Features />);
    // useTranslations mock returns the key itself
    expect(screen.getByText("whatIDo")).toBeInTheDocument();
  });

  it("renders 4 feature cards", () => {
    render(<Features />);
    expect(screen.getByText("Technical Strategy")).toBeInTheDocument();
    expect(screen.getByText("Platform Engineering")).toBeInTheDocument();
    expect(screen.getByText("AI-Assisted Development")).toBeInTheDocument();
    expect(screen.getByText("Hands-On Execution")).toBeInTheDocument();
  });

  it("renders feature descriptions", () => {
    render(<Features />);
    expect(screen.getByText("Architecture roadmaps and high-impact decisions.")).toBeInTheDocument();
    expect(screen.getByText("Cloud infrastructure and CI/CD pipelines.")).toBeInTheDocument();
  });

  it("renders card-brutal styled cards", () => {
    const { container } = render(<Features />);
    const cards = container.querySelectorAll(".card-brutal");
    expect(cards.length).toBe(4);
  });
});
