import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import Page from "@/app/page";

vi.mock("@/components/home/hero", () => ({
  Hero: () => <div data-testid="hero">Hero Component</div>,
}));

vi.mock("@/components/home/features", () => ({
  Features: () => <div data-testid="features">Features Component</div>,
}));

vi.mock("@/components/home/experience-highlights", () => ({
  ExperienceHighlights: () => (
    <div data-testid="experience-highlights">Experience Highlights Component</div>
  ),
}));

vi.mock("@/components/home/tech-highlights", () => ({
  TechHighlights: () => (
    <div data-testid="tech-highlights">Tech Highlights Component</div>
  ),
}));

describe("Home Page", () => {
  it("renders the hero component", () => {
    render(<Page />);
    expect(screen.getByTestId("hero")).toBeInTheDocument();
  });

  it("renders hero with correct text", () => {
    render(<Page />);
    expect(screen.getByText("Hero Component")).toBeInTheDocument();
  });

  it("renders the features component", () => {
    render(<Page />);
    expect(screen.getByTestId("features")).toBeInTheDocument();
  });

  it("renders the experience highlights component", () => {
    render(<Page />);
    expect(screen.getByTestId("experience-highlights")).toBeInTheDocument();
  });

  it("renders the tech highlights component", () => {
    render(<Page />);
    expect(screen.getByTestId("tech-highlights")).toBeInTheDocument();
  });
});
