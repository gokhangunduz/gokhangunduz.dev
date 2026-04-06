/**
 * Single source of truth for the site color palette.
 *
 * To change the theme, update values here.
 * Also keep the :root block in styles/styles.css in sync.
 */
export const palette = {
  // Backgrounds
  bg: "#070c11",
  bgDeep: "#040810",
  bgSurface: "#0c2535",
  bgHighlight: "#172840",

  // Foregrounds
  fg: "#e2f4ff",
  fgSubtle: "#7fb8cc",
  fgBright: "#f5fbff",

  // Accent — cyan family
  accent: "#22d3ee",
  accentBright: "#67e8f9",

  // Blue family
  blue: "#0ea5e9",
  blueBright: "#38bdf8",

  // ANSI support
  green: "#34d399",
  yellow: "#fbbf24",
  red: "#f87171",
} as const;

export type Palette = typeof palette;
