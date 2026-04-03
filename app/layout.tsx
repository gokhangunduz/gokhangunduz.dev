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
  themeColor: "#00e5ff",
};

const title = "Gökhan Gündüz — Full Stack Developer";
const description =
  "Hi! I'm Gökhan Gündüz, a Full Stack Developer specializing in React, Next.js, TypeScript and Node.js. Explore my interactive terminal portfolio.";
const url = "https://gokhangunduz.dev";

export const metadata: Metadata = {
  title,
  description,
  keywords: [
    "Full Stack Developer",
    "Frontend Developer",
    "React",
    "Next.js",
    "TypeScript",
    "JavaScript",
    "Node.js",
    "Gökhan Gündüz",
    "Software Developer",
    "Istanbul",
    "Turkey",
    "Web Developer",
  ],
  authors: [{ name: "Gökhan Gündüz", url }],
  creator: "Gökhan Gündüz",
  publisher: "Gökhan Gündüz",
  category: "technology",
  metadataBase: new URL(url),
  alternates: {
    canonical: url,
  },
  manifest: "/manifest.webmanifest",
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/favicon.ico",
  },
  openGraph: {
    title,
    description,
    url,
    siteName: "Gökhan Gündüz",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    creator: "@gokhangunduz",
    site: "@gokhangunduz",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Gökhan Gündüz",
  jobTitle: "Full Stack Developer",
  email: "me@gokhangunduz.dev",
  url,
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
