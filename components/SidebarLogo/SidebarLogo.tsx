import { useTheme } from "next-themes";
import { ReactElement } from "react";
import Image from "next/image";

export default function SidebarLogo(): ReactElement {
  const { theme } = useTheme();

  return (
    <Image src={`/logo-${theme}.svg`} alt="logo" width={112} height={112} />
  );
}
