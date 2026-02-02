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
});
