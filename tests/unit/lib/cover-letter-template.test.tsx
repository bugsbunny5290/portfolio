import { describe, it, expect } from "vitest";
import { CoverLetterDocument } from "@/lib/cover-letter-template";

describe("CoverLetterDocument", () => {
  it("returns a React element for English", () => {
    const result = CoverLetterDocument({ language: "en" });
    expect(result).toBeTruthy();
    expect(result.type).toBeDefined();
  });

  it("returns a React element for German", () => {
    const result = CoverLetterDocument({ language: "de" });
    expect(result).toBeTruthy();
    expect(result.type).toBeDefined();
  });
});
