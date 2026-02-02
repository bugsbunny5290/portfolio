import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { Providers } from "@/components/providers";

vi.mock("next-intl", () => ({
  NextIntlClientProvider: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="intl-provider">{children}</div>
  ),
}));

vi.mock("next-themes", () => ({
  ThemeProvider: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="theme-provider">{children}</div>
  ),
}));

vi.mock("@/lib/language-context", () => ({
  LanguageProvider: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="language-provider">{children}</div>
  ),
}));

describe("Providers component", () => {
  const mockMessages = { test: "message" };

  it("renders children", () => {
    render(
      <Providers locale="en" messages={mockMessages}>
        <div>Test content</div>
      </Providers>
    );
    expect(screen.getByText("Test content")).toBeInTheDocument();
  });

  it("wraps children with NextIntlClientProvider", () => {
    render(
      <Providers locale="en" messages={mockMessages}>
        <div>Test content</div>
      </Providers>
    );
    expect(screen.getByTestId("intl-provider")).toBeInTheDocument();
  });

  it("wraps children with ThemeProvider", () => {
    render(
      <Providers locale="en" messages={mockMessages}>
        <div>Test content</div>
      </Providers>
    );
    expect(screen.getByTestId("theme-provider")).toBeInTheDocument();
  });

  it("wraps children with LanguageProvider", () => {
    render(
      <Providers locale="en" messages={mockMessages}>
        <div>Test content</div>
      </Providers>
    );
    expect(screen.getByTestId("language-provider")).toBeInTheDocument();
  });

  it("nests providers correctly", () => {
    render(
      <Providers locale="en" messages={mockMessages}>
        <div>Nested content</div>
      </Providers>
    );
    const intlProvider = screen.getByTestId("intl-provider");
    const themeProvider = screen.getByTestId("theme-provider");
    const languageProvider = screen.getByTestId("language-provider");
    
    expect(intlProvider).toContainElement(themeProvider);
    expect(themeProvider).toContainElement(languageProvider);
    expect(languageProvider).toContainElement(screen.getByText("Nested content"));
  });
});
