import Link from "next/link";
import { ReactElement } from "react";

export default function SidebarMenu(): ReactElement {
  const linkClassnames =
    "text-2xl font-semibold text-palette-950 dark:text-palette-50 hover:text-palette-500 dark:hover:text-palette-500";

  const links: { alias: string; href: string }[] = [
    { alias: "Home", href: "/" },
    { alias: "Resume", href: "/resume" },
    { alias: "Blog", href: "/blog" },
    { alias: "Projects", href: "/projects" },
    { alias: "Contact", href: "/contact" },
  ];

  return (
    <nav className="flex flex-col items-center gap-8">
      {links.map((link, index) => (
        <Link className={linkClassnames} href={link.href} key={index}>
          {link.alias}
        </Link>
      ))}
    </nav>
  );
}
