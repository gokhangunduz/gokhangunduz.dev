import Link from "next/link";
import { ReactElement } from "react";

export default function Title(): ReactElement {
  return (
    <Link href="/">
      <h1 className="text-2xl font-semibold text-palette-950 dark:text-palette-50">
        Gökhan Gündüz
      </h1>
    </Link>
  );
}
