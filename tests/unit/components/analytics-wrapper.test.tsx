import { describe, it, expect, vi } from "vitest";
import { render } from "@testing-library/react";
import { AnalyticsWrapper } from "@/components/analytics-wrapper";

vi.mock("@vercel/analytics/next", () => ({
  Analytics: () => <div data-testid="analytics" />,
}));

vi.mock("@/components/cookie-consent", () => ({
  CookieConsent: ({ onAccept, onDecline }: { onAccept: () => void; onDecline: () => void }) => (
    <div data-testid="cookie-consent">
      <button onClick={onAccept}>Accept</button>
      <button onClick={onDecline}>Decline</button>
    </div>
  ),
}));

describe("AnalyticsWrapper component", () => {
  it("renders CookieConsent component", () => {
    const { getByTestId } = render(<AnalyticsWrapper />);
    expect(getByTestId("cookie-consent")).toBeInTheDocument();
  });

  it("does not render Analytics initially", () => {
    const { queryByTestId } = render(<AnalyticsWrapper />);
    expect(queryByTestId("analytics")).not.toBeInTheDocument();
  });

  it("renders Analytics after accepting consent", async () => {
    const { getByTestId, getByText } = render(<AnalyticsWrapper />);

    await getByText("Accept").click();

    expect(getByTestId("analytics")).toBeInTheDocument();
  });

  it("does not render Analytics after declining consent", async () => {
    const { queryByTestId, getByText } = render(<AnalyticsWrapper />);

    await getByText("Decline").click();

    expect(queryByTestId("analytics")).not.toBeInTheDocument();
  });
});
