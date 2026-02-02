import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import SkillsPage from "@/app/skills/page";

vi.mock("@/components/skills/tech-grid", () => ({
  TechGrid: () => <div data-testid="tech-grid">TechGrid Component</div>,
}));

describe("Skills Page", () => {
  it("renders the tech grid component", () => {
    render(<SkillsPage />);
    expect(screen.getByTestId("tech-grid")).toBeInTheDocument();
  });

  it("renders within a section", () => {
    render(<SkillsPage />);
    const section = screen.getByTestId("tech-grid").closest("section");
    expect(section).toBeInTheDocument();
  });
});
