import { describe, it, expect } from "vitest";
import { locales, defaultLocale, type Locale } from "@/lib/i18n";

describe("i18n configuration", () => {
  it("should have correct locales defined", () => {
    expect(locales).toContain("en");
    expect(locales).toContain("de");
    expect(locales).toHaveLength(2);
  });

  it("should have English as default locale", () => {
    expect(defaultLocale).toBe("en");
  });

  it("should have valid locale type", () => {
    const validLocale: Locale = "en";
    expect(locales).toContain(validLocale);
  });

  it("locales array should have expected length", () => {
    expect(locales.length).toBe(2);
  });
});
