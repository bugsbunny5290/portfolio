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
        subtitle: "Staff Engineer · Platform & Backend",
        tagline: "Test tagline",
        github: "https://github.com/test",
        linkedin: "https://linkedin.com/in/test",
        email: "test@example.com",
        location: "Heidelberg, Germany",
      },
    },
  }),
}));

describe("Hero component", () => {
  it("renders the first name with text-gradient styling", () => {
    render(<Hero />);
    const firstName = screen.getByText("Pranav");
    expect(firstName).toBeInTheDocument();
    expect(firstName).toHaveClass("text-gradient");
  });

  it("renders the last name", () => {
    render(<Hero />);
    expect(screen.getByText(/Gautam/)).toBeInTheDocument();
  });

  it("renders the subtitle", () => {
    render(<Hero />);
    expect(screen.getByText("Staff Engineer · Platform & Backend")).toBeInTheDocument();
  });

  it("renders the aboutMe call-to-action link", () => {
    render(<Hero />);
    expect(screen.getByText("aboutMe")).toBeInTheDocument();
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

  it("renders LinkedIn link", () => {
    render(<Hero />);
    const linkedinLink = screen.getByRole("link", { name: /linkedin/i });
    expect(linkedinLink).toHaveAttribute("href", "https://linkedin.com/in/test");
  });

  it("renders the interactive terminal", () => {
    render(<Hero />);
    // The InteractiveTerminal component is rendered inside the hero
    expect(screen.getByText("terminal.ts")).toBeInTheDocument();
  });
});
