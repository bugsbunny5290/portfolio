import { describe, it, expect } from "vitest";
import { CVDocument } from "@/lib/cv-template";

describe("CVDocument", () => {
  it("returns a React element for English", () => {
    const result = CVDocument({ language: "en" });
    expect(result).toBeTruthy();
    expect(result.type).toBeDefined();
  });

  it("returns a React element for German", () => {
    const result = CVDocument({ language: "de" });
    expect(result).toBeTruthy();
    expect(result.type).toBeDefined();
  });
});
