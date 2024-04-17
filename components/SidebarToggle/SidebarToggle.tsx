"use client";

import { VscClose } from "react-icons/vsc";
import { VscMenu } from "react-icons/vsc";
import useMain from "@/hooks/useMain";
import { ReactElement } from "react";

export default function SidebarToggle(): ReactElement {
  const { sidebarState, setSidebarState } = useMain();

  const buttonClassnames =
    "text-3xl text-palette-950 hover:text-palette-500 text-palette-950 dark:text-palette-50 dark:hover:text-palette-500";

  return (
    <button onClick={() => setSidebarState({ isOpen: !sidebarState.isOpen })}>
      {sidebarState.isOpen ? (
        <VscClose className={buttonClassnames} />
      ) : (
        <VscMenu className={buttonClassnames} />
      )}
    </button>
  );
}
