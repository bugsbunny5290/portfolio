import { describe, it, expect } from "vitest";
import { quips } from "@/lib/quips";

describe("quips", () => {
  it("exports a non-empty array", () => {
    expect(Array.isArray(quips)).toBe(true);
    expect(quips.length).toBeGreaterThan(0);
  });

  it("all entries are strings", () => {
    for (const quip of quips) {
      expect(typeof quip).toBe("string");
    }
  });

  it("no duplicates", () => {
    const unique = new Set(quips);
    expect(unique.size).toBe(quips.length);
  });

  it("all entries are non-empty strings", () => {
    for (const quip of quips) {
      expect(quip.trim().length).toBeGreaterThan(0);
    }
  });
});
