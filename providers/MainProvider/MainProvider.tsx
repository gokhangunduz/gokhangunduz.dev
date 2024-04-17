import MainContext from "@/contexts/MainContext/MainContext";
import { ThemeProvider } from "next-themes";
import { ReactElement } from "react";
import MainLayout from "@/layouts/MainLayout/MainLayout";
import "@/styles/globals.css";

interface IMainProvider {
  children: ReactElement | ReactElement[];
}

export default function MainProvider({
  children,
}: IMainProvider): ReactElement {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider defaultTheme="dark" attribute="class">
          <MainContext>
            <MainLayout>{children}</MainLayout>
          </MainContext>
        </ThemeProvider>
      </body>
    </html>
  );
}
