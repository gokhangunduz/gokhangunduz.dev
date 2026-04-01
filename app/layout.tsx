import type { Metadata, Viewport } from "next";
import { ReactNode } from "react";
import { JetBrains_Mono } from "next/font/google";
import "@/styles/styles.css";

const jetBrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

const description =
  "Hi! I'm Gökhan Gündüz, a Frontend Developer specializing in React, Next.js and TypeScript. Explore my interactive terminal portfolio.";

export const metadata: Metadata = {
  title: "Gökhan Gündüz — Frontend Developer",
  description,
  keywords: [
    "Frontend Developer",
    "React",
    "Next.js",
    "TypeScript",
    "JavaScript",
    "Gökhan Gündüz",
    "Software Developer",
    "Istanbul",
  ],
  authors: [{ name: "Gökhan Gündüz", url: "https://gokhangunduz.dev" }],
  creator: "Gökhan Gündüz",
  category: "technology",
  openGraph: {
    title: "Gökhan Gündüz — Frontend Developer",
    description,
    url: "https://gokhangunduz.dev",
    siteName: "Gökhan Gündüz",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Gökhan Gündüz — Frontend Developer",
    description,
    creator: "@gokhangunduz",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Gökhan Gündüz",
  jobTitle: "Frontend Developer",
  email: "me@gokhangunduz.dev",
  url: "https://gokhangunduz.dev",
  sameAs: [
    "https://github.com/gokhangunduz",
    "https://linkedin.com/in/iamgokhangunduz",
    "https://medium.com/@iamgokhangunduz",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en" className={jetBrainsMono.className}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
