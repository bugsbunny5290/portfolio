import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { Footer } from "@/components/layout/footer";

const mockUseLanguage = vi.fn();

vi.mock("@/lib/language-context", () => ({
  useLanguage: () => mockUseLanguage(),
}));

describe("Footer component", () => {
  beforeEach(() => {
    mockUseLanguage.mockReturnValue({
      locale: "en",
      content: {
        personalInfo: {
          name: "Pranav Gautam",
          email: "test@example.com",
          github: "https://github.com/test",
          linkedin: "https://linkedin.com/in/test",
        },
      },
    });
  });

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

  it("renders email link with aria-label", () => {
    render(<Footer />);
    const emailLink = screen.getByRole("link", { name: /^email$/i });
    expect(emailLink).toHaveAttribute("href", "mailto:test@example.com");
  });

  it("renders GitHub link", () => {
    render(<Footer />);
    const githubLink = screen.getByRole("link", { name: /github/i });
    expect(githubLink).toHaveAttribute("href", "https://github.com/test");
  });

  it("renders Let's connect heading", () => {
    render(<Footer />);
    expect(screen.getByText(/Let's connect/)).toBeInTheDocument();
  });

  it("renders LinkedIn link", () => {
    render(<Footer />);
    const linkedinLink = screen.getByRole("link", { name: /linkedin/i });
    expect(linkedinLink).toHaveAttribute("href", "https://linkedin.com/in/test");
  });

  it("renders icon links in German locale too", () => {
    mockUseLanguage.mockReturnValue({
      locale: "de",
      content: {
        personalInfo: {
          name: "Pranav Gautam",
          email: "test@example.com",
          github: "https://github.com/test",
          linkedin: "https://linkedin.com/in/test",
        },
      },
    });

    render(<Footer />);
    // Footer now uses icon links with aria-labels in both locales
    const emailLink = screen.getByRole("link", { name: /email/i });
    expect(emailLink).toHaveAttribute("href", "mailto:test@example.com");
  });
});
