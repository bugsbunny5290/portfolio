import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, act } from "@testing-library/react";
import { InteractiveTerminal } from "@/components/home/interactive-terminal";

vi.mock("@/lib/language-context", () => ({
  useLanguage: () => ({
    locale: "en",
    content: {
      personalInfo: {
        name: "Pranav Gautam",
        title: "Staff Engineer",
        subtitle: "Staff Engineer · Platform & Backend",
        tagline: "Test tagline",
        workAuth: "Work-authorised (EU Blue Card)",
        github: "https://github.com/test",
        linkedin: "https://linkedin.com/in/test",
        email: "test@example.com",
        location: "Heidelberg, Germany",
      },
    },
  }),
}));

async function renderAndFinishAutoplay() {
  render(<InteractiveTerminal />);
  for (let i = 0; i < 20; i++) {
    await act(async () => {
      vi.advanceTimersByTime(1000);
    });
  }
}

describe("InteractiveTerminal component", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("renders the terminal window chrome with colored dots", () => {
    render(<InteractiveTerminal />);
    const dots = document.querySelectorAll(".window-dot");
    expect(dots.length).toBe(3);
  });

  it('renders the "terminal.ts" label in the window chrome', () => {
    render(<InteractiveTerminal />);
    expect(screen.getByText("terminal.ts")).toBeInTheDocument();
  });

  it("renders suggested command buttons after auto-play finishes", async () => {
    await renderAndFinishAutoplay();

    const expectedCommands = ["--skills", "--about", "--contact", "--cv", "--help"];
    for (const cmd of expectedCommands) {
      expect(screen.getByRole("button", { name: cmd })).toBeInTheDocument();
    }
  });

  it("renders the terminal container with proper card-brutal styling", () => {
    render(<InteractiveTerminal />);
    const card = document.querySelector(".card-brutal");
    expect(card).toBeInTheDocument();
    expect(card).toHaveClass("overflow-hidden");
  });

  it('renders the terminal body with role="log"', () => {
    render(<InteractiveTerminal />);
    const log = screen.getByRole("log");
    expect(log).toBeInTheDocument();
    expect(log).toHaveAttribute("aria-label", "Interactive terminal");
  });

  it("renders the auto-play prompt symbol", () => {
    render(<InteractiveTerminal />);
    const prompts = screen.getAllByText("$");
    expect(prompts.length).toBeGreaterThanOrEqual(1);
  });

  it("shows input field after auto-play finishes", async () => {
    await renderAndFinishAutoplay();
    const input = screen.getByLabelText("Terminal input");
    expect(input).toBeInTheDocument();
  });

  it("executes --help command", async () => {
    await renderAndFinishAutoplay();
    const input = screen.getByLabelText("Terminal input");
    fireEvent.change(input, { target: { value: "--help" } });
    fireEvent.keyDown(input, { key: "Enter" });
    expect(screen.getByText(/Available commands/)).toBeInTheDocument();
  });

  it("executes --skills command and shows tags", async () => {
    await renderAndFinishAutoplay();
    const input = screen.getByLabelText("Terminal input");
    fireEvent.change(input, { target: { value: "--skills" } });
    fireEvent.keyDown(input, { key: "Enter" });
    expect(screen.getByText("GCP")).toBeInTheDocument();
    expect(screen.getByText("Kubernetes")).toBeInTheDocument();
    expect(screen.getByText("TypeScript")).toBeInTheDocument();
  });

  it("executes --contact command", async () => {
    await renderAndFinishAutoplay();
    const input = screen.getByLabelText("Terminal input");
    fireEvent.change(input, { target: { value: "--contact" } });
    fireEvent.keyDown(input, { key: "Enter" });
    expect(screen.getByText(/pranav.gautam.pro@gmail.com/)).toBeInTheDocument();
  });

  it("executes --status command with green dot", async () => {
    await renderAndFinishAutoplay();
    const input = screen.getByLabelText("Terminal input");
    fireEvent.change(input, { target: { value: "--status" } });
    fireEvent.keyDown(input, { key: "Enter" });
    // The status response has a colored dot
    const dots = document.querySelectorAll('[style*="color: rgb(34, 197, 94)"]');
    expect(dots.length).toBeGreaterThanOrEqual(1);
  });

  it("executes --sudo command", async () => {
    await renderAndFinishAutoplay();
    const input = screen.getByLabelText("Terminal input");
    fireEvent.change(input, { target: { value: "--sudo" } });
    fireEvent.keyDown(input, { key: "Enter" });
    expect(screen.getByText(/Permission denied/)).toBeInTheDocument();
  });

  it("executes --coffee command", async () => {
    await renderAndFinishAutoplay();
    const input = screen.getByLabelText("Terminal input");
    fireEvent.change(input, { target: { value: "--coffee" } });
    fireEvent.keyDown(input, { key: "Enter" });
    expect(screen.getByText(/coffee count/i)).toBeInTheDocument();
  });

  it("shows error for unknown command", async () => {
    await renderAndFinishAutoplay();
    const input = screen.getByLabelText("Terminal input");
    fireEvent.change(input, { target: { value: "--unknown" } });
    fireEvent.keyDown(input, { key: "Enter" });
    expect(screen.getByText(/Command not found/)).toBeInTheDocument();
  });

  it("ignores empty input", async () => {
    await renderAndFinishAutoplay();
    const input = screen.getByLabelText("Terminal input");
    fireEvent.keyDown(input, { key: "Enter" });
    // No error message should appear for empty input
    expect(screen.queryByText(/Command not found/)).not.toBeInTheDocument();
  });

  it("executes --about command and navigates", async () => {
    await renderAndFinishAutoplay();
    const input = screen.getByLabelText("Terminal input");
    fireEvent.change(input, { target: { value: "--about" } });
    fireEvent.keyDown(input, { key: "Enter" });
    expect(screen.getByText(/Navigating to/)).toBeInTheDocument();
  });

  it("executes --cv command (link type)", async () => {
    const openSpy = vi.spyOn(window, "open").mockImplementation(() => null);
    await renderAndFinishAutoplay();
    const input = screen.getByLabelText("Terminal input");
    fireEvent.change(input, { target: { value: "--cv" } });
    fireEvent.keyDown(input, { key: "Enter" });
    expect(screen.getByText("Downloading CV...")).toBeInTheDocument();
    openSpy.mockRestore();
  });

  it("executes --joke command", async () => {
    await renderAndFinishAutoplay();
    const input = screen.getByLabelText("Terminal input");
    fireEvent.change(input, { target: { value: "--joke" } });
    fireEvent.keyDown(input, { key: "Enter" });
    // The joke output should be in the history (one of the joke responses)
    const historyItems = document.querySelectorAll('[class*="mt-2"]');
    expect(historyItems.length).toBeGreaterThanOrEqual(1);
  });

  it("executes command via suggested command button click", async () => {
    await renderAndFinishAutoplay();
    const helpButton = screen.getByRole("button", { name: "--help" });
    fireEvent.click(helpButton);
    expect(screen.getByText(/Available commands/)).toBeInTheDocument();
  });

  it("shows autocomplete when typing with --", async () => {
    await renderAndFinishAutoplay();
    const input = screen.getByLabelText("Terminal input");
    fireEvent.change(input, { target: { value: "--sk" } });
    // Autocomplete should show --skills
    expect(screen.getByText("Show tech stack")).toBeInTheDocument();
  });

  it("selects autocomplete with Tab", async () => {
    await renderAndFinishAutoplay();
    const input = screen.getByLabelText("Terminal input");
    fireEvent.change(input, { target: { value: "--sk" } });
    fireEvent.keyDown(input, { key: "Tab" });
    expect(input).toHaveValue("--skills");
  });

  it("closes autocomplete with Escape", async () => {
    await renderAndFinishAutoplay();
    const input = screen.getByLabelText("Terminal input");
    fireEvent.change(input, { target: { value: "--sk" } });
    expect(screen.getByText("Show tech stack")).toBeInTheDocument();
    fireEvent.keyDown(input, { key: "Escape" });
    expect(screen.queryByText("Show tech stack")).not.toBeInTheDocument();
  });

  it("navigates autocomplete with ArrowDown/ArrowUp", async () => {
    await renderAndFinishAutoplay();
    const input = screen.getByLabelText("Terminal input");
    fireEvent.change(input, { target: { value: "--" } });
    // Open autocomplete via Tab
    fireEvent.keyDown(input, { key: "Tab" });
    // Navigate down
    fireEvent.keyDown(input, { key: "ArrowDown" });
    fireEvent.keyDown(input, { key: "ArrowUp" });
    // Just verify no crash
    expect(input).toBeInTheDocument();
  });
});
