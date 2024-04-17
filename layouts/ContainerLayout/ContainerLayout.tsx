import { ReactElement } from "react";

interface IContainerLayout {
  children: ReactElement | ReactElement[];
}

export default function ContainerLayout({
  children,
}: IContainerLayout): ReactElement {
  return (
    <main className="min-h-[88dvh] bg-palette-50 px-96 py-12 dark:bg-palette-950">
      {children}
    </main>
  );
}
