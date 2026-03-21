export const colorThemes = [
  {
    id: "rainbow",
    label: "Rainbow",
    description: "Each section its own color",
    swatches: ["#4f46e5", "#0891b2", "#7c3aed", "#ea580c"],
  },
  {
    id: "ocean",
    label: "Ocean",
    description: "Cool blues and teals",
    swatches: ["#0e7490", "#0369a1", "#4338ca", "#059669"],
  },
  {
    id: "sunset",
    label: "Sunset",
    description: "Warm oranges and reds",
    swatches: ["#ea580c", "#e11d48", "#d97706", "#be123c"],
  },
  {
    id: "forest",
    label: "Forest",
    description: "Nature greens with accents",
    swatches: ["#059669", "#0891b2", "#4f46e5", "#d97706"],
  },
  {
    id: "neon",
    label: "Neon",
    description: "Bold rose and violet",
    swatches: ["#e11d48", "#7c3aed", "#0891b2", "#ea580c"],
  },
] as const;

export type ColorThemeId = (typeof colorThemes)[number]["id"];
