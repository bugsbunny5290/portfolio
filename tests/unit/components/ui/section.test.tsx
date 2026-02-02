import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Section, SectionHeader } from "@/components/ui/section";

describe("Section component", () => {
  it("renders children", () => {
    render(<Section>Section content</Section>);
    expect(screen.getByText("Section content")).toBeInTheDocument();
  });

  it("renders as section element", () => {
    render(<Section>Content</Section>);
    const section = screen.getByText("Content").closest("section");
    expect(section).toBeInTheDocument();
    expect(section?.tagName).toBe("SECTION");
  });

  it("applies custom className", () => {
    render(<Section className="custom-class">Content</Section>);
    const section = screen.getByText("Content").closest("section");
    expect(section).toHaveClass("custom-class");
  });

  it("has correct base styles", () => {
    render(<Section>Content</Section>);
    const section = screen.getByText("Content").closest("section");
    expect(section).toHaveClass("mx-auto", "max-w-5xl");
  });

  it("applies id attribute", () => {
    render(<Section id="test-section">Content</Section>);
    const section = screen.getByText("Content").closest("section");
    expect(section).toHaveAttribute("id", "test-section");
  });
});

describe("SectionHeader component", () => {
  it("renders title", () => {
    render(<SectionHeader title="Test Title" />);
    expect(screen.getByRole("heading", { name: "Test Title" })).toBeInTheDocument();
  });

  it("renders description when provided", () => {
    render(<SectionHeader title="Title" description="Test description" />);
    expect(screen.getByText("Test description")).toBeInTheDocument();
  });

  it("does not render description when not provided", () => {
    const { container } = render(<SectionHeader title="Title" />);
    const paragraphs = container.querySelectorAll("p");
    expect(paragraphs).toHaveLength(0);
  });

  it("applies custom className", () => {
    render(<SectionHeader title="Title" className="custom-class" />);
    const header = screen.getByRole("heading", { name: "Title" }).parentElement;
    expect(header).toHaveClass("custom-class");
  });

  it("renders title as h2", () => {
    render(<SectionHeader title="Title" />);
    const heading = screen.getByRole("heading", { level: 2 });
    expect(heading).toHaveTextContent("Title");
  });
});
