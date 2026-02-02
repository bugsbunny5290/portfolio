import { describe, it, expect, vi, beforeEach } from "vitest";
import { GET } from "@/app/api/cv/route";
import { NextRequest } from "next/server";

vi.mock("@react-pdf/renderer", () => ({
  renderToBuffer: vi.fn().mockResolvedValue(Buffer.from("mock pdf content")),
  Document: ({ children }: { children: React.ReactNode }) => children,
  Page: ({ children }: { children: React.ReactNode }) => children,
  View: ({ children }: { children: React.ReactNode }) => children,
  Text: ({ children }: { children: React.ReactNode }) => children,
  StyleSheet: { create: (styles: object) => styles },
  Font: { register: vi.fn() },
}));

vi.mock("@/lib/cv-docx", () => ({
  generateCVDocx: vi.fn().mockResolvedValue(Buffer.from("mock docx content")),
}));

describe("CV API Route", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("returns PDF by default", async () => {
    const request = new NextRequest("http://localhost:3000/api/cv");
    const response = await GET(request);

    expect(response.status).toBe(200);
    expect(response.headers.get("Content-Type")).toBe("application/pdf");
    expect(response.headers.get("Content-Disposition")).toContain(".pdf");
  });

  it("returns PDF when format=pdf", async () => {
    const request = new NextRequest("http://localhost:3000/api/cv?format=pdf");
    const response = await GET(request);

    expect(response.status).toBe(200);
    expect(response.headers.get("Content-Type")).toBe("application/pdf");
  });

  it("returns DOCX when format=docx", async () => {
    const request = new NextRequest("http://localhost:3000/api/cv?format=docx");
    const response = await GET(request);

    expect(response.status).toBe(200);
    expect(response.headers.get("Content-Type")).toBe(
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    );
    expect(response.headers.get("Content-Disposition")).toContain(".docx");
  });

  it("uses English by default", async () => {
    const request = new NextRequest("http://localhost:3000/api/cv");
    const response = await GET(request);

    expect(response.headers.get("Content-Disposition")).toContain("_EN.pdf");
  });

  it("uses German when lang=de", async () => {
    const request = new NextRequest("http://localhost:3000/api/cv?lang=de");
    const response = await GET(request);

    expect(response.headers.get("Content-Disposition")).toContain("_DE.pdf");
  });

  it("includes filename in Content-Disposition header", async () => {
    const request = new NextRequest("http://localhost:3000/api/cv");
    const response = await GET(request);

    expect(response.headers.get("Content-Disposition")).toContain("Pranav_Gautam_CV");
  });

  it("sets no-store cache control", async () => {
    const request = new NextRequest("http://localhost:3000/api/cv");
    const response = await GET(request);

    expect(response.headers.get("Cache-Control")).toBe("no-store");
  });

  it("handles German DOCX format", async () => {
    const request = new NextRequest("http://localhost:3000/api/cv?lang=de&format=docx");
    const response = await GET(request);

    expect(response.status).toBe(200);
    expect(response.headers.get("Content-Disposition")).toContain("_DE.docx");
  });
});
