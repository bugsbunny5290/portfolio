import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { ContactInfo } from "@/components/contact/contact-info";

vi.mock("@/lib/language-context", () => ({
  useLanguage: () => ({
    locale: "en",
    content: {
      personalInfo: {
        email: "test@example.com",
        github: "https://github.com/testuser",
        location: "Heidelberg, Germany",
        website: "https://example.com",
      },
    },
  }),
}));

describe("ContactInfo component", () => {
  it("renders email contact", () => {
    render(<ContactInfo />);
    expect(screen.getByText("test@example.com")).toBeInTheDocument();
  });

  it("renders email as mailto link", () => {
    render(<ContactInfo />);
    const emailLink = screen.getByText("test@example.com");
    expect(emailLink).toHaveAttribute("href", "mailto:test@example.com");
  });

  it("renders GitHub username as link", () => {
    render(<ContactInfo />);
    const githubLink = screen.getByText("@testuser");
    expect(githubLink).toHaveAttribute("href", "https://github.com/testuser");
  });

  it("renders location", () => {
    render(<ContactInfo />);
    expect(screen.getByText("Heidelberg, Germany")).toBeInTheDocument();
  });

  it("external GitHub link opens in new tab", () => {
    render(<ContactInfo />);
    const githubLink = screen.getByText("@testuser");
    expect(githubLink).toHaveAttribute("target", "_blank");
    expect(githubLink).toHaveAttribute("rel", "noopener noreferrer");
  });

  it("renders CV download section", () => {
    render(<ContactInfo />);
    expect(screen.getByText("cvResume")).toBeInTheDocument();
  });

  it("renders cover letter download section", () => {
    render(<ContactInfo />);
    expect(screen.getByText("coverLetter")).toBeInTheDocument();
  });

  it("renders multiple download buttons", () => {
    render(<ContactInfo />);
    const buttons = screen.getAllByRole("link");
    expect(buttons.length).toBeGreaterThan(4);
  });

  it("changes email link color on hover and resets on leave", () => {
    render(<ContactInfo />);
    const emailLink = screen.getByText("test@example.com");
    fireEvent.mouseEnter(emailLink);
    expect(emailLink.style.color).toBe("var(--color-purple)");
    fireEvent.mouseLeave(emailLink);
    expect(emailLink.style.color).toBe("var(--fg)");
  });

  it("changes GitHub link color on hover and resets on leave", () => {
    render(<ContactInfo />);
    const githubLink = screen.getByText("@testuser");
    fireEvent.mouseEnter(githubLink);
    expect(githubLink.style.color).toBe("var(--color-purple)");
    fireEvent.mouseLeave(githubLink);
    expect(githubLink.style.color).toBe("var(--fg)");
  });

  it("renders availability note", () => {
    render(<ContactInfo />);
    expect(screen.getByText("availability")).toBeInTheDocument();
  });

  it("renders all CV format buttons", () => {
    render(<ContactInfo />);
    // Each format appears twice: once for CV, once for Cover Letter
    expect(screen.getAllByText("PDF (EN)")).toHaveLength(2);
    expect(screen.getAllByText("PDF (DE)")).toHaveLength(2);
    expect(screen.getAllByText("Word (EN)")).toHaveLength(2);
    expect(screen.getAllByText("Word (DE)")).toHaveLength(2);
  });
});
