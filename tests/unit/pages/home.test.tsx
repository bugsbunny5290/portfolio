import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import Page from "@/app/page";

vi.mock("@/components/home/hero", () => ({
  Hero: () => <div data-testid="hero">Hero Component</div>,
}));

describe("Home Page", () => {
  it("renders the hero component", () => {
    render(<Page />);
    expect(screen.getByTestId("hero")).toBeInTheDocument();
  });

  it("renders hero with correct text", () => {
    render(<Page />);
    expect(screen.getByText("Hero Component")).toBeInTheDocument();
  });
});
