import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { Header } from "@/components/layout/header";

vi.mock("@/lib/language-context", () => ({
  useLanguage: () => ({
    locale: "en",
    content: {
      navLinks: [
        { href: "/", label: "home" },
        { href: "/about", label: "about" },
        { href: "/skills", label: "skills" },
        { href: "/contact", label: "contact" },
      ],
      personalInfo: { name: "Test Name" },
    },
  }),
}));

describe("Header component", () => {
  it("renders navigation", () => {
    render(<Header />);
    expect(screen.getByRole("navigation")).toBeInTheDocument();
  });

  it("renders home link", () => {
    render(<Header />);
    const homeLinks = screen.getAllByRole("link");
    expect(homeLinks.length).toBeGreaterThan(0);
  });

  it("renders nav links", () => {
    render(<Header />);
    expect(screen.getByText("home")).toBeInTheDocument();
    expect(screen.getByText("about")).toBeInTheDocument();
    expect(screen.getByText("skills")).toBeInTheDocument();
    expect(screen.getByText("contact")).toBeInTheDocument();
  });

  it("has correct structure with header element", () => {
    render(<Header />);
    expect(screen.getByRole("banner")).toBeInTheDocument();
  });
});
