import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ErrorPage from "@/app/error";

describe("Error Page", () => {
  const mockError = new Error("Test error message");
  const mockReset = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders error heading", () => {
    render(<ErrorPage error={mockError} reset={mockReset} />);
    expect(screen.getByRole("heading", { name: /something went wrong/i })).toBeInTheDocument();
  });

  it("renders try again button", () => {
    render(<ErrorPage error={mockError} reset={mockReset} />);
    expect(screen.getByRole("button", { name: /try again/i })).toBeInTheDocument();
  });

  it("calls reset function on button click", async () => {
    const user = userEvent.setup();
    render(<ErrorPage error={mockError} reset={mockReset} />);
    
    await user.click(screen.getByRole("button", { name: /try again/i }));
    expect(mockReset).toHaveBeenCalledTimes(1);
  });

  it("renders home link", () => {
    render(<ErrorPage error={mockError} reset={mockReset} />);
    const homeLink = screen.getByRole("link");
    expect(homeLink).toHaveAttribute("href", "/");
  });

  it("displays error description", () => {
    render(<ErrorPage error={mockError} reset={mockReset} />);
    expect(screen.getByText(/unexpected error/i)).toBeInTheDocument();
  });
});
