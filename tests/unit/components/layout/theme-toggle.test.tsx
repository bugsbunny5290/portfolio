import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ThemeToggle } from "@/components/layout/theme-toggle";

const mockSetTheme = vi.fn();

vi.mock("next-themes", () => ({
  useTheme: () => ({
    theme: "light",
    setTheme: mockSetTheme,
    resolvedTheme: "light",
  }),
}));

describe("ThemeToggle component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    document.documentElement.classList.remove("transitioning");
  });

  it("renders toggle button", () => {
    render(<ThemeToggle />);
    expect(screen.getByRole("button")).toBeInTheDocument();
  });

  it("has accessible label", async () => {
    render(<ThemeToggle />);
    await waitFor(() => {
      expect(screen.getByLabelText(/switch to dark mode/i)).toBeInTheDocument();
    });
  });

  it("toggles theme on click", async () => {
    const user = userEvent.setup();
    render(<ThemeToggle />);
    
    await waitFor(() => {
      expect(screen.getByLabelText(/switch to dark mode/i)).toBeInTheDocument();
    });
    
    await user.click(screen.getByRole("button"));
    expect(mockSetTheme).toHaveBeenCalledWith("dark");
  });

  it("renders icon", async () => {
    render(<ThemeToggle />);
    await waitFor(() => {
      const button = screen.getByRole("button");
      const svg = button.querySelector("svg");
      expect(svg).toBeInTheDocument();
    });
  });

  it("adds transitioning class when reduced motion is not preferred", async () => {
    Object.defineProperty(window, "matchMedia", {
      writable: true,
      value: vi.fn().mockReturnValue({ matches: false }),
    });

    const user = userEvent.setup();
    render(<ThemeToggle />);

    await waitFor(() => {
      expect(screen.getByLabelText(/switch to dark mode/i)).toBeInTheDocument();
    });

    await user.click(screen.getByRole("button"));
    expect(document.documentElement.classList.contains("transitioning")).toBe(true);
  });

  it("skips transitioning class when reduced motion is preferred", async () => {
    Object.defineProperty(window, "matchMedia", {
      writable: true,
      value: vi.fn().mockReturnValue({ matches: true }),
    });

    const user = userEvent.setup();
    render(<ThemeToggle />);

    await waitFor(() => {
      expect(screen.getByLabelText(/switch to dark mode/i)).toBeInTheDocument();
    });

    await user.click(screen.getByRole("button"));
    expect(document.documentElement.classList.contains("transitioning")).toBe(false);
  });
});
