/**
 * Single source of truth for the site color palette.
 *
 * To change the theme, update values here.
 * Also keep the :root block in styles/styles.css in sync.
 */
export const palette = {
  // Backgrounds
  bg: "#060b0f",
  bgDeep: "#03060a",
  bgSurface: "#0a2535",
  bgHighlight: "#152438",

  // Foregrounds
  fg: "#c8eeff",
  fgSubtle: "#8ab8d4",
  fgBright: "#f0faff",

  // Accent — cyan family
  accent: "#00e5ff",
  accentBright: "#80f4ff",

  // Blue family
  blue: "#00a8cc",
  blueBright: "#00c8f0",

  // ANSI support
  green: "#00ff88",
  yellow: "#ffe066",
  red: "#ff4d6a",
} as const;

export type Palette = typeof palette;
