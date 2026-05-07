import { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://gokhangunduz.dev",
      lastModified: new Date("2025-05-07"),
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
