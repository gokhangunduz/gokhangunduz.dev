"use client";

import { useTheme } from "next-themes";
import { ReactElement } from "react";

export default function ThemeToggle(): ReactElement {
  const { theme, setTheme } = useTheme();

  return (
    <button
      className="text-3xl"
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
    >
      {theme === "light" ? "🌑" : "🌕"}
    </button>
  );
}
