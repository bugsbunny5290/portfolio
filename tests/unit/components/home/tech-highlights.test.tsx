import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { TechHighlights } from "@/components/home/tech-highlights";

describe("TechHighlights component", () => {
  it("renders skills heading", () => {
    render(<TechHighlights />);
    // useTranslations mock returns the key itself
    expect(screen.getByText("title")).toBeInTheDocument();
  });

  it("renders subtitle", () => {
    render(<TechHighlights />);
    expect(screen.getByText("subtitle")).toBeInTheDocument();
  });

  it("renders all tech tags", () => {
    render(<TechHighlights />);
    const expectedTags = [
      "GCP",
      "Kubernetes",
      "TypeScript",
      "Next.js",
      "NestJS",
      "Pulumi",
      "GitOps",
      "Gravitee",
    ];
    for (const tag of expectedTags) {
      expect(screen.getByText(tag)).toBeInTheDocument();
    }
  });

  it("renders tags with tag-brutal styling", () => {
    const { container } = render(<TechHighlights />);
    const tags = container.querySelectorAll(".tag-brutal");
    expect(tags.length).toBe(8);
  });

  it("renders the 'All skills' link", () => {
    render(<TechHighlights />);
    const links = screen.getAllByText("All skills");
    expect(links.length).toBeGreaterThanOrEqual(1);
  });
});
