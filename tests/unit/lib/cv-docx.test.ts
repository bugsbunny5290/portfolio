import { describe, it, expect } from "vitest";
import { generateCVDocx } from "@/lib/cv-docx";

describe("generateCVDocx", () => {
  it("generates a valid Buffer for English", async () => {
    const result = await generateCVDocx("en");
    expect(result).toBeInstanceOf(Buffer);
    expect(result.length).toBeGreaterThan(0);
  });

  it("generates a valid Buffer for German", async () => {
    const result = await generateCVDocx("de");
    expect(result).toBeInstanceOf(Buffer);
    expect(result.length).toBeGreaterThan(0);
  });
});
