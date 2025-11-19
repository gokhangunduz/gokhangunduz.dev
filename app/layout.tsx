import type { Metadata } from "next";
import { ReactNode } from "react";
import "@/styles/styles.css";

export const metadata: Metadata = {
  title: "Gökhan Gündüz",
  description: "Hi! I'm Gökhan Gündüz. I'm a software developer.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
