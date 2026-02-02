import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import ContactPage from "@/app/contact/page";

vi.mock("@/components/contact/contact-info", () => ({
  ContactInfo: () => <div data-testid="contact-info">ContactInfo Component</div>,
}));

describe("Contact Page", () => {
  it("renders the contact info component", () => {
    render(<ContactPage />);
    expect(screen.getByTestId("contact-info")).toBeInTheDocument();
  });

  it("renders within a section", () => {
    render(<ContactPage />);
    const section = screen.getByTestId("contact-info").closest("section");
    expect(section).toBeInTheDocument();
  });
});
