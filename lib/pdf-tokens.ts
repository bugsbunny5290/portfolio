/**
 * Shared color tokens for PDF/print documents.
 * Mirrors the web design system but uses hex values
 * since @react-pdf/renderer doesn't support CSS variables.
 */
export const pdfColors = {
  foreground: "#0f172a",
  mutedForeground: "#3b4a5c",
  secondary: "#64748b",
  border: "#d4d9e1",
  tagBackground: "#eef1f5",
} as const;
