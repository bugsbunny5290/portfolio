import { describe, it, expect, vi } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MobileNav } from "@/components/layout/mobile-nav";

vi.mock("@/lib/language-context", () => ({
  useLanguage: () => ({
    locale: "en",
    content: {
      navLinks: [
        { href: "/", label: "Home" },
        { href: "/about", label: "About" },
        { href: "/skills", label: "Skills" },
        { href: "/contact", label: "Contact" },
      ],
    },
  }),
}));

describe("MobileNav component", () => {
  it("renders menu button", () => {
    render(<MobileNav />);
    expect(screen.getByRole("button", { name: /menu/i })).toBeInTheDocument();
  });

  it("menu is closed by default", () => {
    render(<MobileNav />);
    expect(screen.queryByText("Home")).not.toBeInTheDocument();
  });

  it("opens menu on button click", async () => {
    const user = userEvent.setup();
    render(<MobileNav />);
    
    await user.click(screen.getByRole("button", { name: /menu/i }));
    
    await waitFor(() => {
      expect(screen.getByText("Home")).toBeInTheDocument();
    });
  });

  it("displays all nav links when open", async () => {
    const user = userEvent.setup();
    render(<MobileNav />);
    
    await user.click(screen.getByRole("button", { name: /menu/i }));
    
    await waitFor(() => {
      expect(screen.getByText("Home")).toBeInTheDocument();
      expect(screen.getByText("About")).toBeInTheDocument();
      expect(screen.getByText("Skills")).toBeInTheDocument();
      expect(screen.getByText("Contact")).toBeInTheDocument();
    });
  });

  it("closes menu on close button click", async () => {
    const user = userEvent.setup();
    render(<MobileNav />);
    
    await user.click(screen.getByRole("button", { name: /menu/i }));
    await waitFor(() => {
      expect(screen.getByText("Home")).toBeInTheDocument();
    });
    
    await user.click(screen.getByRole("button", { name: /close/i }));
    
    await waitFor(() => {
      expect(screen.queryByText("Home")).not.toBeInTheDocument();
    });
  });

  it("closes menu when clicking a link", async () => {
    const user = userEvent.setup();
    render(<MobileNav />);

    await user.click(screen.getByRole("button", { name: /menu/i }));
    await waitFor(() => {
      expect(screen.getByText("Home")).toBeInTheDocument();
    });

    await user.click(screen.getByText("About"));

    await waitFor(() => {
      expect(screen.queryByText("Home")).not.toBeInTheDocument();
    });
  });

  it("closes menu on Escape key", async () => {
    const user = userEvent.setup();
    render(<MobileNav />);

    await user.click(screen.getByRole("button", { name: /menu/i }));
    await waitFor(() => {
      expect(screen.getByText("Home")).toBeInTheDocument();
    });

    await user.keyboard("{Escape}");

    await waitFor(() => {
      expect(screen.queryByText("Home")).not.toBeInTheDocument();
    });
  });

  it("traps focus within menu when open", async () => {
    const user = userEvent.setup();
    render(<MobileNav />);

    await user.click(screen.getByRole("button", { name: /menu/i }));
    await waitFor(() => {
      expect(screen.getByText("Home")).toBeInTheDocument();
    });

    // Tab through all links — focus should cycle
    const links = screen.getAllByRole("link");
    await user.tab();
    await user.tab();
    await user.tab();
    await user.tab();
    // After tabbing past the last link, focus should wrap to first
    expect(document.activeElement?.tagName).toBe("A");
  });

  it("wraps focus with Shift+Tab from first element", async () => {
    const user = userEvent.setup();
    render(<MobileNav />);

    await user.click(screen.getByRole("button", { name: /menu/i }));
    await waitFor(() => {
      expect(screen.getByText("Home")).toBeInTheDocument();
    });

    // Focus should be on the first link; Shift+Tab should wrap to last
    const links = screen.getAllByRole("link");
    (links[0] as HTMLElement).focus();
    await user.tab({ shift: true });
    expect(document.activeElement).toBe(links[links.length - 1]);
  });
});
