import MainProvider from "@/providers/MainProvider/MainProvider";
import { Fragment, ReactElement } from "react";

interface IRootLayout {
  children: ReactElement | ReactElement[];
}

export default function RootLayout({ children }: IRootLayout): ReactElement {
  return (
    <MainProvider>
      <Fragment>{children}</Fragment>
    </MainProvider>
  );
}
