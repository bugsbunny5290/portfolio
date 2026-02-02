import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import GlobalError from "@/app/global-error";

describe("GlobalError Page", () => {
  const mockError = new Error("Global test error");
  const mockReset = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders error heading", () => {
    render(<GlobalError error={mockError} reset={mockReset} />);
    expect(screen.getByRole("heading", { name: /something went wrong/i })).toBeInTheDocument();
  });

  it("renders try again button", () => {
    render(<GlobalError error={mockError} reset={mockReset} />);
    expect(screen.getByRole("button", { name: /try again/i })).toBeInTheDocument();
  });

  it("calls reset function on button click", async () => {
    const user = userEvent.setup();
    render(<GlobalError error={mockError} reset={mockReset} />);
    
    await user.click(screen.getByRole("button", { name: /try again/i }));
    expect(mockReset).toHaveBeenCalledTimes(1);
  });

  it("displays error icon", () => {
    render(<GlobalError error={mockError} reset={mockReset} />);
    const svg = document.querySelector('svg[role="img"]');
    expect(svg).toBeInTheDocument();
  });

  it("displays error description", () => {
    render(<GlobalError error={mockError} reset={mockReset} />);
    expect(screen.getByText(/critical error/i)).toBeInTheDocument();
  });
});
