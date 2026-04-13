import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render } from "@testing-library/react";
import { DevtoolsEasterEggs } from "@/components/devtools-easter-eggs";

vi.mock("@/lib/quips", () => ({
  quips: ["Test quip 1", "Test quip 2"],
}));

describe("DevtoolsEasterEggs component", () => {
  beforeEach(() => {
    vi.spyOn(console, "log").mockImplementation(() => {});
    vi.spyOn(console, "table").mockImplementation(() => {});
  });

  it("renders the hidden data-message div", () => {
    const { container } = render(<DevtoolsEasterEggs />);
    const hiddenDiv = container.querySelector("[data-message]");
    expect(hiddenDiv).toBeInTheDocument();
    expect(hiddenDiv).toHaveAttribute("aria-hidden", "true");
    expect(hiddenDiv).toHaveStyle({ display: "none" });
    expect(hiddenDiv?.getAttribute("data-message")).toContain("pranav.hire");
  });

  it("renders the devtools-hint element", () => {
    const { container } = render(<DevtoolsEasterEggs />);
    const hint = container.querySelector(".devtools-hint");
    expect(hint).toBeInTheDocument();
    expect(hint?.textContent).toContain("Curious? Press F12");
  });

  it("sets up window.pranav on mount", () => {
    render(<DevtoolsEasterEggs />);
    expect(window.pranav).toBeDefined();
    expect(Object.getOwnPropertyDescriptor(window.pranav, "hire")).toBeDefined();
    expect(Object.getOwnPropertyDescriptor(window.pranav, "skills")).toBeDefined();
    expect(Object.getOwnPropertyDescriptor(window.pranav, "joke")).toBeDefined();
  });

  it("cleans up window.pranav on unmount", () => {
    const { unmount } = render(<DevtoolsEasterEggs />);
    expect(window.pranav).toBeDefined();
    unmount();
    expect(window.pranav).toBeUndefined();
  });

  it("logs ASCII art and welcome message on mount", () => {
    render(<DevtoolsEasterEggs />);
    expect(console.log).toHaveBeenCalled();
    // Check that the ASCII art was logged
    const calls = (console.log as ReturnType<typeof vi.fn>).mock.calls;
    const asciiCall = calls.find((c: unknown[]) => typeof c[0] === "string" && c[0].includes("____"));
    expect(asciiCall).toBeDefined();
  });

  it("pranav.hire getter redirects to contact page", () => {
    render(<DevtoolsEasterEggs />);
    // Access the hire getter, which should log and redirect
    const hireDescriptor = Object.getOwnPropertyDescriptor(window.pranav, "hire");
    expect(hireDescriptor?.get).toBeDefined();
    // Calling the getter triggers console.log and sets window.location.href
    hireDescriptor?.get?.call(window.pranav);
    expect(console.log).toHaveBeenCalledWith(
      expect.stringContaining("Redirecting"),
      expect.any(String),
    );
  });

  it("pranav.skills getter logs tech stack table", () => {
    render(<DevtoolsEasterEggs />);
    const skillsDescriptor = Object.getOwnPropertyDescriptor(window.pranav, "skills");
    expect(skillsDescriptor?.get).toBeDefined();
    skillsDescriptor?.get?.call(window.pranav);
    expect(console.table).toHaveBeenCalled();
  });

  it("pranav.joke getter fetches and logs a joke", async () => {
    // Mock fetch for the joke API
    const mockFetch = vi.fn().mockResolvedValue({
      json: () =>
        Promise.resolve({
          type: "single",
          joke: "Test joke",
        }),
    });
    vi.stubGlobal("fetch", mockFetch);

    render(<DevtoolsEasterEggs />);
    const jokeDescriptor = Object.getOwnPropertyDescriptor(window.pranav, "joke");
    expect(jokeDescriptor?.get).toBeDefined();
    jokeDescriptor?.get?.call(window.pranav);

    // Wait for the async fetch to complete
    await vi.waitFor(() => {
      expect(mockFetch).toHaveBeenCalledWith(
        "https://v2.jokeapi.dev/joke/Programming?safe-mode&type=twopart,single",
      );
    });

    vi.unstubAllGlobals();
  });

  it("pranav.joke getter handles twopart jokes", async () => {
    const mockFetch = vi.fn().mockResolvedValue({
      json: () =>
        Promise.resolve({
          type: "twopart",
          setup: "Why do programmers?",
          delivery: "Because they do.",
        }),
    });
    vi.stubGlobal("fetch", mockFetch);

    render(<DevtoolsEasterEggs />);
    const jokeDescriptor = Object.getOwnPropertyDescriptor(window.pranav, "joke");
    jokeDescriptor?.get?.call(window.pranav);

    await vi.waitFor(() => {
      expect(mockFetch).toHaveBeenCalled();
    });

    vi.unstubAllGlobals();
  });

  it("pranav.joke getter handles fetch errors gracefully", async () => {
    const mockFetch = vi.fn().mockRejectedValue(new Error("Network error"));
    vi.stubGlobal("fetch", mockFetch);

    render(<DevtoolsEasterEggs />);
    const jokeDescriptor = Object.getOwnPropertyDescriptor(window.pranav, "joke");
    jokeDescriptor?.get?.call(window.pranav);

    await vi.waitFor(() => {
      expect(mockFetch).toHaveBeenCalled();
    });

    vi.unstubAllGlobals();
  });

  describe("rate limiting", () => {
    beforeEach(() => {
      vi.useFakeTimers();
    });

    afterEach(() => {
      vi.useRealTimers();
    });

    it("pranav.skills only fires once within cooldown window", () => {
      render(<DevtoolsEasterEggs />);
      const desc = Object.getOwnPropertyDescriptor(window.pranav, "skills");

      desc?.get?.call(window.pranav);
      desc?.get?.call(window.pranav);
      desc?.get?.call(window.pranav);

      expect(console.table).toHaveBeenCalledTimes(1);
    });

    it("pranav.hire only fires once within cooldown window", () => {
      render(<DevtoolsEasterEggs />);
      const desc = Object.getOwnPropertyDescriptor(window.pranav, "hire");

      desc?.get?.call(window.pranav);
      desc?.get?.call(window.pranav);
      desc?.get?.call(window.pranav);

      const redirectCalls = (console.log as ReturnType<typeof vi.fn>).mock.calls.filter(
        (c: unknown[]) => typeof c[0] === "string" && c[0].includes("Redirecting"),
      );
      expect(redirectCalls).toHaveLength(1);
    });

    it("getter works again after cooldown expires", () => {
      render(<DevtoolsEasterEggs />);
      const desc = Object.getOwnPropertyDescriptor(window.pranav, "skills");

      desc?.get?.call(window.pranav);
      expect(console.table).toHaveBeenCalledTimes(1);

      vi.advanceTimersByTime(3001);

      desc?.get?.call(window.pranav);
      expect(console.table).toHaveBeenCalledTimes(2);
    });

    it("pranav.joke blocks concurrent fetches via in-flight guard", () => {
      const mockFetch = vi.fn().mockReturnValue(new Promise(() => {}));
      vi.stubGlobal("fetch", mockFetch);

      render(<DevtoolsEasterEggs />);
      const desc = Object.getOwnPropertyDescriptor(window.pranav, "joke");

      desc?.get?.call(window.pranav);

      // Advance past cooldown so only the in-flight guard blocks
      vi.advanceTimersByTime(3001);

      desc?.get?.call(window.pranav);

      expect(mockFetch).toHaveBeenCalledTimes(1);

      vi.unstubAllGlobals();
    });

    it("while(true) loop simulation only triggers one fetch", () => {
      const mockFetch = vi.fn().mockReturnValue(new Promise(() => {}));
      vi.stubGlobal("fetch", mockFetch);

      render(<DevtoolsEasterEggs />);
      const desc = Object.getOwnPropertyDescriptor(window.pranav, "joke");

      for (let i = 0; i < 1000; i++) {
        desc?.get?.call(window.pranav);
      }

      expect(mockFetch).toHaveBeenCalledTimes(1);

      vi.unstubAllGlobals();
    });
  });
});
