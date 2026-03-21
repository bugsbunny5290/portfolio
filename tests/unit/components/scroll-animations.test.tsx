import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { render } from "@testing-library/react";
import { ScrollAnimations } from "@/components/scroll-animations";

// Store callbacks so we can invoke them in tests
let intersectionCallback: IntersectionObserverCallback;
let mutationCallback: MutationCallback;

const mockIOObserve = vi.fn();
const mockIODisconnect = vi.fn();
const mockIOUnobserve = vi.fn();

class MockIntersectionObserver {
  constructor(callback: IntersectionObserverCallback, public options?: IntersectionObserverInit) {
    intersectionCallback = callback;
  }
  observe = mockIOObserve;
  disconnect = mockIODisconnect;
  unobserve = mockIOUnobserve;
  takeRecords = vi.fn().mockReturnValue([]);
  root = null;
  rootMargin = "";
  thresholds = [0];
}

vi.stubGlobal("IntersectionObserver", MockIntersectionObserver);

const mockMOObserve = vi.fn();
const mockMODisconnect = vi.fn();

class MockMutationObserver {
  constructor(callback: MutationCallback) {
    mutationCallback = callback;
  }
  observe = mockMOObserve;
  disconnect = mockMODisconnect;
  takeRecords = vi.fn().mockReturnValue([]);
}

vi.stubGlobal("MutationObserver", MockMutationObserver);

describe("ScrollAnimations component", () => {
  beforeEach(() => {
    mockIOObserve.mockClear();
    mockIODisconnect.mockClear();
    mockIOUnobserve.mockClear();
    mockMOObserve.mockClear();
    mockMODisconnect.mockClear();
  });

  afterEach(() => {
    document.documentElement.classList.remove("scroll-ready");
  });

  it("returns null (renders nothing visible)", () => {
    const { container } = render(<ScrollAnimations />);
    expect(container.innerHTML).toBe("");
  });

  it("adds scroll-ready class to documentElement on mount", () => {
    render(<ScrollAnimations />);
    expect(document.documentElement.classList.contains("scroll-ready")).toBe(true);
  });

  it("creates an IntersectionObserver and MutationObserver on mount", () => {
    render(<ScrollAnimations />);
    expect(mockMOObserve).toHaveBeenCalled();
  });

  it("disconnects observers on unmount", () => {
    const { unmount } = render(<ScrollAnimations />);
    unmount();
    expect(mockIODisconnect).toHaveBeenCalled();
    expect(mockMODisconnect).toHaveBeenCalled();
  });

  it("observes existing animate-on-scroll elements", () => {
    // Add an element with the class before rendering
    const el = document.createElement("div");
    el.classList.add("animate-on-scroll");
    document.body.appendChild(el);

    render(<ScrollAnimations />);

    expect(mockIOObserve).toHaveBeenCalled();
    document.body.removeChild(el);
  });

  it("adds visible class when element is intersecting", () => {
    render(<ScrollAnimations />);

    const el = document.createElement("div");
    el.classList.add("animate-on-scroll");

    // Simulate IntersectionObserver callback with isIntersecting = true
    intersectionCallback(
      [{ isIntersecting: true, target: el } as unknown as IntersectionObserverEntry],
      {} as IntersectionObserver,
    );

    expect(el.classList.contains("visible")).toBe(true);
    expect(mockIOUnobserve).toHaveBeenCalledWith(el);
  });

  it("does not add visible class when element is not intersecting", () => {
    render(<ScrollAnimations />);

    const el = document.createElement("div");
    el.classList.add("animate-on-scroll");

    intersectionCallback(
      [{ isIntersecting: false, target: el } as unknown as IntersectionObserverEntry],
      {} as IntersectionObserver,
    );

    expect(el.classList.contains("visible")).toBe(false);
    expect(mockIOUnobserve).not.toHaveBeenCalledWith(el);
  });

  it("observes newly added animate-on-scroll elements via MutationObserver", () => {
    render(<ScrollAnimations />);

    const newEl = document.createElement("div");
    newEl.classList.add("animate-on-scroll");

    // Simulate MutationObserver callback with added nodes
    mutationCallback(
      [
        {
          addedNodes: [newEl] as unknown as NodeList,
          removedNodes: [] as unknown as NodeList,
          type: "childList",
          target: document.body,
          attributeName: null,
          attributeNamespace: null,
          nextSibling: null,
          previousSibling: null,
          oldValue: null,
        },
      ],
      {} as MutationObserver,
    );

    expect(mockIOObserve).toHaveBeenCalledWith(newEl);
  });

  it("observes child animate-on-scroll elements within added nodes", () => {
    render(<ScrollAnimations />);

    const parent = document.createElement("div");
    const child = document.createElement("span");
    child.classList.add("animate-on-scroll");
    parent.appendChild(child);

    mutationCallback(
      [
        {
          addedNodes: [parent] as unknown as NodeList,
          removedNodes: [] as unknown as NodeList,
          type: "childList",
          target: document.body,
          attributeName: null,
          attributeNamespace: null,
          nextSibling: null,
          previousSibling: null,
          oldValue: null,
        },
      ],
      {} as MutationObserver,
    );

    expect(mockIOObserve).toHaveBeenCalledWith(child);
  });
});
