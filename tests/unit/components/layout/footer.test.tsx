import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { Footer } from "@/components/layout/footer";

vi.mock("@/lib/language-context", () => ({
  useLanguage: () => ({
    locale: "en",
    content: {
      personalInfo: {
        name: "Pranav Gautam",
        email: "test@example.com",
        github: "https://github.com/test",
      },
    },
  }),
}));

describe("Footer component", () => {
  it("renders footer element", () => {
    render(<Footer />);
    expect(screen.getByRole("contentinfo")).toBeInTheDocument();
  });

  it("displays copyright text", () => {
    render(<Footer />);
    expect(screen.getByText(/Pranav Gautam/)).toBeInTheDocument();
  });

  it("contains current year in copyright", () => {
    render(<Footer />);
    const currentYear = new Date().getFullYear().toString();
    expect(screen.getByText(new RegExp(currentYear))).toBeInTheDocument();
  });

  it("renders email link", () => {
    render(<Footer />);
    const emailLink = screen.getByRole("link", { name: /email/i });
    expect(emailLink).toHaveAttribute("href", "mailto:test@example.com");
  });

  it("renders GitHub link", () => {
    render(<Footer />);
    const githubLink = screen.getByRole("link", { name: /github/i });
    expect(githubLink).toHaveAttribute("href", "https://github.com/test");
  });
});
