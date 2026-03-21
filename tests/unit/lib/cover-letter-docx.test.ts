import { describe, it, expect } from "vitest";
import { generateCoverLetterDocx } from "@/lib/cover-letter-docx";

describe("generateCoverLetterDocx", () => {
  it("generates a valid Buffer for English", async () => {
    const result = await generateCoverLetterDocx("en");
    expect(result).toBeInstanceOf(Buffer);
    expect(result.length).toBeGreaterThan(0);
  });

  it("generates a valid Buffer for German", async () => {
    const result = await generateCoverLetterDocx("de");
    expect(result).toBeInstanceOf(Buffer);
    expect(result.length).toBeGreaterThan(0);
  });
});
