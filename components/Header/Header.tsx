import SidebarToggle from "../SidebarToggle/SidebarToggle";
import ThemeToggle from "../ThemeToggle/ThemeToggle";
import { ReactElement } from "react";
import Title from "../Title/Title";

export default function Header(): ReactElement {
  return (
    <header className="sticky top-0 flex h-[8dvh] items-center justify-between border-b border-palette-200 bg-palette-50 px-96 shadow dark:border-palette-800 dark:bg-palette-950">
      <Title />
      <div className="flex gap-10">
        <ThemeToggle />
        <SidebarToggle />
      </div>
    </header>
  );
}
