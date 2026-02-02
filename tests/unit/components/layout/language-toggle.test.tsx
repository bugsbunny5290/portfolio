import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { LanguageToggle } from "@/components/layout/language-toggle";

const mockSetLocale = vi.fn();

vi.mock("@/lib/language-context", () => ({
  useLanguage: () => ({
    locale: "en",
    setLocale: mockSetLocale,
    content: {},
    isPending: false,
  }),
}));

describe("LanguageToggle component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders EN and DE buttons", () => {
    render(<LanguageToggle />);
    expect(screen.getByText("EN")).toBeInTheDocument();
    expect(screen.getByText("DE")).toBeInTheDocument();
  });

  it("renders two buttons", () => {
    render(<LanguageToggle />);
    const buttons = screen.getAllByRole("button");
    expect(buttons).toHaveLength(2);
  });

  it("has accessible labels for both buttons", () => {
    render(<LanguageToggle />);
    expect(screen.getByLabelText(/switch to english/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/auf deutsch wechseln/i)).toBeInTheDocument();
  });

  it("switches to German when DE is clicked", async () => {
    const user = userEvent.setup();
    render(<LanguageToggle />);
    
    await user.click(screen.getByText("DE"));
    expect(mockSetLocale).toHaveBeenCalledWith("de");
  });

  it("switches to English when EN is clicked", async () => {
    const user = userEvent.setup();
    render(<LanguageToggle />);
    
    await user.click(screen.getByText("EN"));
    expect(mockSetLocale).toHaveBeenCalledWith("en");
  });

  it("highlights active locale", () => {
    render(<LanguageToggle />);
    const enButton = screen.getByText("EN");
    expect(enButton).toHaveClass("bg-primary");
  });
});
