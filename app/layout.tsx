import type { Metadata, Viewport } from "next";
import { ReactNode } from "react";
import { JetBrains_Mono } from "next/font/google";
import "@/styles/styles.css";
import me from "@/constants/me";

const jetBrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#22d3ee",
};

const title = "Gökhan Gündüz — Full Stack Developer";
const description =
  "Full Stack Developer at Presidency of Defense Industries, Turkey. Specializing in React, Next.js, TypeScript and Node.js. Explore my interactive terminal portfolio — type commands to discover my skills, experience, and projects.";
const url = "https://gokhangunduz.dev";

export const metadata: Metadata = {
  title,
  description,
  keywords: [
    "Full Stack Developer",
    "Frontend Developer",
    "Backend Developer",
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
    "Portfolio",
    "Docker",
    "GraphQL",
    "AWS",
    "Open Source",
    "Defense Industries",
  ],
  authors: [{ name: "Gökhan Gündüz", url }],
  creator: "Gökhan Gündüz",
  publisher: "Gökhan Gündüz",
  category: "technology",
  metadataBase: new URL(url),
  alternates: {
    canonical: url,
    languages: {
      en: url,
      tr: url,
    },
  },
  manifest: "/manifest.webmanifest",
  icons: {
    icon: [
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-192x192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
    apple: "/apple-touch-icon.png",
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
  "@graph": [
    {
      "@type": "Person",
      "@id": `${url}/#person`,
      name: "Gökhan Gündüz",
      givenName: "Gökhan",
      familyName: "Gündüz",
      jobTitle: "Full Stack Developer",
      email: "me@gokhangunduz.dev",
      url,
      image: `${url}/opengraph-image.png`,
      nationality: { "@type": "Country", name: "Turkey" },
      address: {
        "@type": "PostalAddress",
        addressLocality: "Istanbul",
        addressCountry: "TR",
      },
      knowsAbout: me.skills,
      worksFor: {
        "@type": "Organization",
        name: me.experiences[0].company,
      },
      alumniOf: me.educations.map((edu) => ({
        "@type": "EducationalOrganization",
        name: edu.school,
      })),
      sameAs: [
        "https://github.com/gokhangunduz",
        "https://linkedin.com/in/iamgokhangunduz",
        "https://medium.com/@iamgokhangunduz",
        "https://x.com/gokhangunduz",
      ],
    },
    {
      "@type": "WebSite",
      "@id": `${url}/#website`,
      url,
      name: "Gökhan Gündüz — Portfolio",
      description,
      author: { "@id": `${url}/#person` },
    },
    {
      "@type": "ItemList",
      "@id": `${url}/#projects`,
      name: "Projects by Gökhan Gündüz",
      itemListElement: me.projects.map((project, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: project.name,
        url: project.live,
      })),
    },
  ],
};

const noscriptHtml = `
<div style="position:absolute;left:-9999px;top:0;width:1px;height:1px;overflow:hidden">
  <h1>${me.firstName} ${me.lastName} — ${me.title}</h1>
  <h2>Skills</h2>
  <p>${me.skills.join(", ")}</p>
  <h2>Experience</h2>
  <ul>
    ${me.experiences.map((exp) => `<li>${exp.title} at ${exp.company} (${exp.date})</li>`).join("")}
  </ul>
  <h2>Education</h2>
  <ul>
    ${me.educations.map((edu) => `<li>${edu.degree} in ${edu.title} — ${edu.school}</li>`).join("")}
  </ul>
  <h2>Projects</h2>
  <ul>
    ${me.projects.map((p) => `<li><a href="${p.live}">${p.name}</a>${p.url !== p.live ? ` (<a href="${p.url}">GitHub</a>)` : ""}</li>`).join("")}
  </ul>
  <h2>Contact</h2>
  <ul>
    <li><a href="${me.socials.github}">GitHub</a></li>
    <li><a href="${me.socials.linkedin}">LinkedIn</a></li>
    <li><a href="${me.socials.medium}">Medium</a></li>
    <li><a href="mailto:${me.socials.email}">${me.socials.email}</a></li>
  </ul>
</div>
`;

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
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        <link rel="dns-prefetch" href="https://ipinfo.io" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta
          name="apple-mobile-web-app-status-bar-style"
          content="black-translucent"
        />
        <meta name="apple-mobile-web-app-title" content="gokhangunduz" />
        <meta name="mobile-web-app-capable" content="yes" />
        <link rel="me" href="https://github.com/gokhangunduz" />
        <link rel="me" href="https://linkedin.com/in/iamgokhangunduz" />
        <link rel="me" href="https://medium.com/@iamgokhangunduz" />
      </head>
      <body>
        {children}
        <noscript dangerouslySetInnerHTML={{ __html: noscriptHtml }} />
      </body>
    </html>
  );
}
