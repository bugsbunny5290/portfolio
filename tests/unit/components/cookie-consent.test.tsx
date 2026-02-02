import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { CookieConsent } from "@/components/cookie-consent";

const mockLanguageContext: {
  locale: "en" | "de";
  setLocale: ReturnType<typeof vi.fn>;
  content: any;
  isPending: boolean;
} = {
  locale: "en",
  setLocale: vi.fn(),
  content: {},
  isPending: false,
};

vi.mock("@/lib/language-context", () => ({
  useLanguage: () => mockLanguageContext,
}));

describe("CookieConsent component", () => {
  const mockOnAccept = vi.fn();
  const mockOnDecline = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(localStorage.getItem).mockReturnValue(null);
    mockLanguageContext.locale = "en";
  });

  it("renders consent banner when no consent stored", async () => {
    render(<CookieConsent onAccept={mockOnAccept} onDecline={mockOnDecline} />);
    await waitFor(() => {
      expect(screen.getByText("Cookie Consent")).toBeInTheDocument();
    });
  });

  it("displays English content by default", async () => {
    render(<CookieConsent onAccept={mockOnAccept} onDecline={mockOnDecline} />);
    await waitFor(() => {
      expect(screen.getByText("Accept Analytics")).toBeInTheDocument();
      expect(screen.getByText("Decline")).toBeInTheDocument();
    });
  });

  it("displays German content when locale is de", async () => {
    mockLanguageContext.locale = "de";
    render(<CookieConsent onAccept={mockOnAccept} onDecline={mockOnDecline} />);
    await waitFor(() => {
      expect(screen.getByText("Cookie-Einwilligung")).toBeInTheDocument();
      expect(screen.getByText("Analytics akzeptieren")).toBeInTheDocument();
      expect(screen.getByText("Ablehnen")).toBeInTheDocument();
    });
  });

  it("calls onAccept and stores consent when accept button clicked", async () => {
    const user = userEvent.setup();
    render(<CookieConsent onAccept={mockOnAccept} onDecline={mockOnDecline} />);

    await waitFor(() => {
      expect(screen.getByText("Accept Analytics")).toBeInTheDocument();
    });

    await user.click(screen.getByText("Accept Analytics"));

    expect(mockOnAccept).toHaveBeenCalledTimes(1);
    expect(localStorage.setItem).toHaveBeenCalledWith("cookie-consent", "accepted");
  });

  it("calls onDecline and stores consent when decline button clicked", async () => {
    const user = userEvent.setup();
    render(<CookieConsent onAccept={mockOnAccept} onDecline={mockOnDecline} />);

    await waitFor(() => {
      expect(screen.getByText("Decline")).toBeInTheDocument();
    });

    await user.click(screen.getByText("Decline"));

    expect(mockOnDecline).toHaveBeenCalledTimes(1);
    expect(localStorage.setItem).toHaveBeenCalledWith("cookie-consent", "declined");
  });

  it("does not render when consent already accepted", async () => {
    vi.mocked(localStorage.getItem).mockReturnValue("accepted");
    render(<CookieConsent onAccept={mockOnAccept} onDecline={mockOnDecline} />);

    await waitFor(() => {
      expect(screen.queryByText("Cookie Consent")).not.toBeInTheDocument();
    });
  });

  it("does not render when consent already declined", async () => {
    vi.mocked(localStorage.getItem).mockReturnValue("declined");
    render(<CookieConsent onAccept={mockOnAccept} onDecline={mockOnDecline} />);

    await waitFor(() => {
      expect(screen.queryByText("Cookie Consent")).not.toBeInTheDocument();
    });
  });

  it("calls onAccept if previous consent was accepted", async () => {
    vi.mocked(localStorage.getItem).mockReturnValue("accepted");
    render(<CookieConsent onAccept={mockOnAccept} onDecline={mockOnDecline} />);

    await waitFor(() => {
      expect(mockOnAccept).toHaveBeenCalledTimes(1);
    });
  });
});
