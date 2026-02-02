import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { TechGrid } from "@/components/skills/tech-grid";

vi.mock("@/lib/language-context", () => ({
  useLanguage: () => ({
    locale: "en",
    content: {
      skills: [
        { name: "GCP", category: "cloud" },
        { name: "AWS", category: "cloud" },
        { name: "Kubernetes", category: "devops" },
        { name: "Docker", category: "devops" },
        { name: "TypeScript", category: "languages" },
        { name: "Python", category: "languages" },
        { name: "Node.js", category: "backend" },
        { name: "NestJS", category: "backend" },
        { name: "React", category: "frontend" },
        { name: "Next.js", category: "frontend" },
      ],
    },
  }),
}));

describe("TechGrid component", () => {
  it("renders skill category titles", () => {
    render(<TechGrid />);
    expect(screen.getByText("cloud")).toBeInTheDocument();
    expect(screen.getByText("devops")).toBeInTheDocument();
    expect(screen.getByText("languages")).toBeInTheDocument();
    expect(screen.getByText("backend")).toBeInTheDocument();
    expect(screen.getByText("frontend")).toBeInTheDocument();
  });

  it("renders cloud skills", () => {
    render(<TechGrid />);
    expect(screen.getByText("GCP")).toBeInTheDocument();
    expect(screen.getByText("AWS")).toBeInTheDocument();
  });

  it("renders devops skills", () => {
    render(<TechGrid />);
    expect(screen.getByText("Kubernetes")).toBeInTheDocument();
    expect(screen.getByText("Docker")).toBeInTheDocument();
  });

  it("renders language skills", () => {
    render(<TechGrid />);
    expect(screen.getByText("TypeScript")).toBeInTheDocument();
    expect(screen.getByText("Python")).toBeInTheDocument();
  });

  it("renders backend skills", () => {
    render(<TechGrid />);
    expect(screen.getByText("Node.js")).toBeInTheDocument();
    expect(screen.getByText("NestJS")).toBeInTheDocument();
  });

  it("renders frontend skills", () => {
    render(<TechGrid />);
    expect(screen.getByText("React")).toBeInTheDocument();
    expect(screen.getByText("Next.js")).toBeInTheDocument();
  });

  it("renders skills as badges with proper styling", () => {
    render(<TechGrid />);
    const gcpBadge = screen.getByText("GCP");
    expect(gcpBadge).toHaveClass("rounded-full", "bg-secondary");
  });

  it("renders all five skill categories", () => {
    render(<TechGrid />);
    const titles = screen.getAllByRole("heading", { level: 3 });
    expect(titles.length).toBe(5);
  });
});
