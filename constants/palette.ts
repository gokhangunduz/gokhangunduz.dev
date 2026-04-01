/**
 * Single source of truth for the site color palette.
 *
 * To change the theme, update values here.
 * Also keep the :root block in styles/styles.css in sync.
 */
export const palette = {
  // Backgrounds
  bg: "#090f14",
  bgDeep: "#050a0f",
  bgSurface: "#0d2d40",
  bgHighlight: "#1a2d40",

  // Foregrounds
  fg: "#b0e4ff",
  fgSubtle: "#b0d4e4",
  fgBright: "#e0f4ff",

  // Accent — cyan family
  accent: "#7ae4ff",
  accentBright: "#b0f0ff",

  // Blue family
  blue: "#1a9aba",
  blueBright: "#1ab8e0",

  // ANSI support
  green: "#7ae4a0",
  yellow: "#e4cc7a",
  red: "#e05c7a",
} as const;

export type Palette = typeof palette;
