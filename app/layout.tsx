import type { Metadata } from "next";
import { ReactNode } from "react";
import { JetBrains_Mono } from "next/font/google";
import "@/styles/styles.css";

const jetBrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Gökhan Gündüz",
  description: "Hi! I'm Gökhan Gündüz. I'm a software developer.",
  openGraph: {
    title: "Gökhan Gündüz",
    description: "Hi! I'm Gökhan Gündüz. I'm a software developer.",
    url: "https://gokhangunduz.dev",
    siteName: "Gökhan Gündüz",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en" className={jetBrainsMono.className}>
      <body>{children}</body>
    </html>
  );
}
