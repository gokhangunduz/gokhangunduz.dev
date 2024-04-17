import { ReactElement } from "react";
import { IoLogoLinkedin, IoLogoGithub } from "react-icons/io5";
import Link from "next/link";

export default function SocialLinks(): ReactElement {
  const logoClassnames =
    "text-xl text-palette-950 dark:text-palette-50 hover:text-palette-600 dark:hover:text-palette-500";

  return (
    <div className="flex gap-2">
      <Link href={"https://linkedin.com/in/gokhangunduzdev"} target="_blank">
        <IoLogoLinkedin className={logoClassnames} />
      </Link>
      <Link href={"https://github.com/gokhangunduz"} target="_blank">
        <IoLogoGithub className={logoClassnames} />
      </Link>
    </div>
  );
}
