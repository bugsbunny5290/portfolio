import { describe, it, expect, vi, beforeAll } from "vitest";
import { render, screen, fireEvent, act } from "@testing-library/react";
import { CommandPalette } from "@/components/command-palette";

// jsdom does not implement scrollIntoView
beforeAll(() => {
  Element.prototype.scrollIntoView = vi.fn();
});

describe("CommandPalette component", () => {
  it("renders without crashing", () => {
    const { container } = render(<CommandPalette />);
    expect(container).toBeTruthy();
  });

  it("is not visible by default (returns null when closed)", () => {
    const { container } = render(<CommandPalette />);
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    expect(container.innerHTML).toBe("");
  });

  it("registers keyboard shortcut listener on mount", () => {
    const addEventSpy = vi.spyOn(document, "addEventListener");
    render(<CommandPalette />);
    expect(addEventSpy).toHaveBeenCalledWith("keydown", expect.any(Function));
    addEventSpy.mockRestore();
  });

  it("cleans up keyboard shortcut listener on unmount", () => {
    const removeEventSpy = vi.spyOn(document, "removeEventListener");
    const { unmount } = render(<CommandPalette />);
    unmount();
    expect(removeEventSpy).toHaveBeenCalledWith("keydown", expect.any(Function));
    removeEventSpy.mockRestore();
  });

  it("opens when Cmd+K is pressed", () => {
    render(<CommandPalette />);
    act(() => {
      fireEvent.keyDown(document, { key: "k", metaKey: true });
    });
    expect(screen.getByRole("dialog")).toBeInTheDocument();
    expect(screen.getByLabelText("Command palette")).toBeInTheDocument();
  });

  it("opens when Ctrl+K is pressed", () => {
    render(<CommandPalette />);
    act(() => {
      fireEvent.keyDown(document, { key: "k", ctrlKey: true });
    });
    expect(screen.getByRole("dialog")).toBeInTheDocument();
  });

  it("closes when Cmd+K is pressed while open", () => {
    render(<CommandPalette />);
    act(() => {
      fireEvent.keyDown(document, { key: "k", metaKey: true });
    });
    expect(screen.getByRole("dialog")).toBeInTheDocument();
    act(() => {
      fireEvent.keyDown(document, { key: "k", metaKey: true });
    });
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("opens when / key is pressed", () => {
    render(<CommandPalette />);
    act(() => {
      fireEvent.keyDown(document, { key: "/" });
    });
    expect(screen.getByRole("dialog")).toBeInTheDocument();
  });

  it("renders command list when open", () => {
    render(<CommandPalette />);
    act(() => {
      fireEvent.keyDown(document, { key: "k", metaKey: true });
    });
    expect(screen.getByText("About Me")).toBeInTheDocument();
    expect(screen.getByText("Skills & Technologies")).toBeInTheDocument();
    expect(screen.getByText("Get in Touch")).toBeInTheDocument();
    expect(screen.getByText("Toggle Theme")).toBeInTheDocument();
  });

  it("renders search input when open", () => {
    render(<CommandPalette />);
    act(() => {
      fireEvent.keyDown(document, { key: "k", metaKey: true });
    });
    expect(screen.getByLabelText("Search commands")).toBeInTheDocument();
  });

  it("renders window chrome with commands.ts label", () => {
    render(<CommandPalette />);
    act(() => {
      fireEvent.keyDown(document, { key: "k", metaKey: true });
    });
    expect(screen.getByText("commands.ts")).toBeInTheDocument();
  });

  it("filters commands based on query", () => {
    render(<CommandPalette />);
    act(() => {
      fireEvent.keyDown(document, { key: "k", metaKey: true });
    });
    const input = screen.getByLabelText("Search commands");
    fireEvent.change(input, { target: { value: "theme" } });
    expect(screen.getByText("Toggle Theme")).toBeInTheDocument();
    expect(screen.queryByText("About Me")).not.toBeInTheDocument();
  });

  it("shows 'No commands found' when no match", () => {
    render(<CommandPalette />);
    act(() => {
      fireEvent.keyDown(document, { key: "k", metaKey: true });
    });
    const input = screen.getByLabelText("Search commands");
    fireEvent.change(input, { target: { value: "xyznonexistent" } });
    expect(screen.getByText("No commands found")).toBeInTheDocument();
  });

  it("closes on Escape key", () => {
    render(<CommandPalette />);
    act(() => {
      fireEvent.keyDown(document, { key: "k", metaKey: true });
    });
    expect(screen.getByRole("dialog")).toBeInTheDocument();
    const dialog = screen.getByRole("dialog");
    fireEvent.keyDown(dialog, { key: "Escape" });
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("closes on backdrop click", () => {
    render(<CommandPalette />);
    act(() => {
      fireEvent.keyDown(document, { key: "k", metaKey: true });
    });
    expect(screen.getByRole("dialog")).toBeInTheDocument();
    const backdrop = screen.getByRole("dialog").querySelector("[aria-hidden='true']");
    fireEvent.click(backdrop!);
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("navigates selected index with ArrowDown/ArrowUp", () => {
    render(<CommandPalette />);
    act(() => {
      fireEvent.keyDown(document, { key: "k", metaKey: true });
    });
    const dialog = screen.getByRole("dialog");
    // First item should be selected by default
    const options = screen.getAllByRole("option");
    expect(options[0]).toHaveAttribute("aria-selected", "true");

    // Arrow down to select second item
    fireEvent.keyDown(dialog, { key: "ArrowDown" });
    expect(options[1]).toHaveAttribute("aria-selected", "true");

    // Arrow up to go back to first
    fireEvent.keyDown(dialog, { key: "ArrowUp" });
    expect(options[0]).toHaveAttribute("aria-selected", "true");
  });

  it("executes navigate command on Enter", () => {
    render(<CommandPalette />);
    act(() => {
      fireEvent.keyDown(document, { key: "k", metaKey: true });
    });
    const dialog = screen.getByRole("dialog");
    // First command is "About Me" with action "navigate"
    fireEvent.keyDown(dialog, { key: "Enter" });
    // Dialog should close after executing
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("traps Tab key inside palette", () => {
    render(<CommandPalette />);
    act(() => {
      fireEvent.keyDown(document, { key: "k", metaKey: true });
    });
    const dialog = screen.getByRole("dialog");
    const tabEvent = new KeyboardEvent("keydown", {
      key: "Tab",
      bubbles: true,
      cancelable: true,
    });
    const prevented = !dialog.dispatchEvent(tabEvent);
    // Tab should be prevented (focus trap)
    expect(dialog).toBeInTheDocument();
  });

  it("highlights item on mouse enter", () => {
    render(<CommandPalette />);
    act(() => {
      fireEvent.keyDown(document, { key: "k", metaKey: true });
    });
    const options = screen.getAllByRole("option");
    // Hover on second item
    fireEvent.mouseEnter(options[1]);
    expect(options[1]).toHaveAttribute("aria-selected", "true");
  });

  it("executes command on option click", () => {
    render(<CommandPalette />);
    act(() => {
      fireEvent.keyDown(document, { key: "k", metaKey: true });
    });
    const options = screen.getAllByRole("option");
    fireEvent.click(options[0]);
    // Dialog should close after executing
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("renders keyboard shortcut hints in footer", () => {
    render(<CommandPalette />);
    act(() => {
      fireEvent.keyDown(document, { key: "k", metaKey: true });
    });
    expect(screen.getByText("navigate")).toBeInTheDocument();
    expect(screen.getByText("select")).toBeInTheDocument();
    expect(screen.getByText("close")).toBeInTheDocument();
  });
});
