import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { Hero } from "@/components/home/hero";

vi.mock("@/lib/language-context", () => ({
  useLanguage: () => ({
    locale: "en",
    content: {
      personalInfo: {
        name: "Pranav Gautam",
        title: "Staff Engineer",
        tagline: "Test tagline",
        github: "https://github.com/test",
        email: "test@example.com",
        location: "Heidelberg, Germany",
      },
    },
  }),
}));

describe("Hero component", () => {
  it("renders the name", () => {
    render(<Hero />);
    expect(screen.getByText("Pranav Gautam")).toBeInTheDocument();
  });

  it("renders the title", () => {
    render(<Hero />);
    expect(screen.getByText("Staff Engineer")).toBeInTheDocument();
  });

  it("renders tech highlights", () => {
    render(<Hero />);
    expect(screen.getByText("GCP")).toBeInTheDocument();
    expect(screen.getByText("Kubernetes")).toBeInTheDocument();
    expect(screen.getByText("TypeScript")).toBeInTheDocument();
  });

  it("renders experience highlights", () => {
    render(<Hero />);
    expect(screen.getByText("8+")).toBeInTheDocument();
    expect(screen.getByText("5+")).toBeInTheDocument();
  });

  it("renders call-to-action buttons", () => {
    render(<Hero />);
    expect(screen.getByText("aboutMe")).toBeInTheDocument();
    expect(screen.getByText("getInTouch")).toBeInTheDocument();
    expect(screen.getByText("downloadCV")).toBeInTheDocument();
  });

  it("renders GitHub link", () => {
    render(<Hero />);
    const githubLink = screen.getByRole("link", { name: /github/i });
    expect(githubLink).toHaveAttribute("href", "https://github.com/test");
  });

  it("renders email link", () => {
    render(<Hero />);
    const emailLink = screen.getByRole("link", { name: /email/i });
    expect(emailLink).toHaveAttribute("href", "mailto:test@example.com");
  });

  it("renders location", () => {
    render(<Hero />);
    expect(screen.getByText("Heidelberg, Germany")).toBeInTheDocument();
  });
});
