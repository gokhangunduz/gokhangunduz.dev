import { ReactElement } from "react";
import SocialLinks from "../SocialLinks/SocialLinks";

export default function Footer(): ReactElement {
  return (
    <footer className="flex h-[4dvh] items-center justify-center border-t border-palette-200 bg-palette-50 shadow dark:border-palette-800 dark:bg-palette-950">
      <SocialLinks />
    </footer>
  );
}
