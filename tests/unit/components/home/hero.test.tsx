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
        workAuth: "Work-authorised (EU Blue Card)",
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

  it("renders the subtitle", () => {
    render(<Hero />);
    expect(screen.getByText("Staff Engineer · Platform & Backend")).toBeInTheDocument();
  });

  it("renders work authorisation status", () => {
    render(<Hero />);
    expect(screen.getByText(/Work-authorised/)).toBeInTheDocument();
  });

  it("renders call-to-action buttons", () => {
    render(<Hero />);
    expect(screen.getByText("viewMyWork")).toBeInTheDocument();
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

  it("renders location with work auth", () => {
    render(<Hero />);
    expect(screen.getByText(/Heidelberg, Germany/)).toBeInTheDocument();
  });
});
