"use client";

import { ReactElement } from "react";
import { motion, AnimatePresence } from "framer-motion";
import useMain from "@/hooks/useMain";
import SidebarMenu from "../SidebarMenu/SidebarMenu";
import SidebarLogo from "../SidebarLogo/SidebarLogo";
import SocialLinks from "../SocialLinks/SocialLinks";
import Title from "../Title/Title";

export default function Sidebar(): ReactElement {
  const { sidebarState } = useMain();

  return (
    <AnimatePresence>
      {sidebarState.isOpen && (
        <motion.aside
          initial={{ x: 512, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: 512, opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="absolute right-0 flex h-[92dvh] w-96 flex-col items-center justify-between border-l border-palette-200 bg-palette-50 p-16 dark:border-palette-800 dark:bg-palette-950"
        >
          <div className="flex flex-col items-center justify-center gap-6">
            <SidebarLogo />
            <Title />
          </div>
          <SidebarMenu />
          <SocialLinks />
        </motion.aside>
      )}
    </AnimatePresence>
  );
}
