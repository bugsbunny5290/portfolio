import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, waitFor, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { LanguageProvider, useLanguage } from "@/lib/language-context";

const mockRefresh = vi.fn();

vi.mock("next/navigation", () => ({
  useRouter: () => ({
    refresh: mockRefresh,
  }),
}));

function TestConsumer(): React.ReactElement {
  const { locale, setLocale, content, isPending } = useLanguage();
  return (
    <div>
      <span data-testid="locale">{locale}</span>
      <span data-testid="pending">{isPending ? "pending" : "idle"}</span>
      <span data-testid="name">{content.personalInfo.name}</span>
      <button onClick={() => setLocale("de")} type="button">
        Switch to German
      </button>
      <button onClick={() => setLocale("en")} type="button">
        Switch to English
      </button>
    </div>
  );
}

describe("LanguageProvider", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(localStorage.getItem).mockReturnValue(null);
  });

  it("provides initial locale", () => {
    render(
      <LanguageProvider initialLocale="en">
        <TestConsumer />
      </LanguageProvider>
    );
    expect(screen.getByTestId("locale")).toHaveTextContent("en");
  });

  it("provides content based on locale", () => {
    render(
      <LanguageProvider initialLocale="en">
        <TestConsumer />
      </LanguageProvider>
    );
    expect(screen.getByTestId("name")).toHaveTextContent("Pranav Gautam");
  });

  it("allows switching locale", async () => {
    const user = userEvent.setup();
    render(
      <LanguageProvider initialLocale="en">
        <TestConsumer />
      </LanguageProvider>
    );

    await user.click(screen.getByText("Switch to German"));

    await waitFor(() => {
      expect(screen.getByTestId("locale")).toHaveTextContent("de");
    });
  });

  it("calls router.refresh when locale changes", async () => {
    const user = userEvent.setup();
    render(
      <LanguageProvider initialLocale="en">
        <TestConsumer />
      </LanguageProvider>
    );

    await user.click(screen.getByText("Switch to German"));

    await waitFor(() => {
      expect(mockRefresh).toHaveBeenCalled();
    });
  });

  it("provides isPending state", () => {
    render(
      <LanguageProvider initialLocale="en">
        <TestConsumer />
      </LanguageProvider>
    );
    expect(screen.getByTestId("pending")).toHaveTextContent("idle");
  });
});

describe("useLanguage hook", () => {
  it("throws error when used outside provider", () => {
    const consoleError = vi.spyOn(console, "error").mockImplementation(() => {});
    
    expect(() => {
      render(<TestConsumer />);
    }).toThrow("useLanguage must be used within a LanguageProvider");
    
    consoleError.mockRestore();
  });

  it("returns locale from context", () => {
    render(
      <LanguageProvider initialLocale="de">
        <TestConsumer />
      </LanguageProvider>
    );
    expect(screen.getByTestId("locale")).toHaveTextContent("de");
  });

  it("returns content for German locale", () => {
    render(
      <LanguageProvider initialLocale="de">
        <TestConsumer />
      </LanguageProvider>
    );
    expect(screen.getByTestId("name")).toHaveTextContent("Pranav Gautam");
  });
});
