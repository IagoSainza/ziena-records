import type { MetadataRoute } from "next";
import { site } from "@/data/site";

// Se sirve en https://zienarecords.com/sitemap.xml
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: site.url,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
      images: [`${site.url}/banner.png`, `${site.url}/logo.png`],
    },
  ];
}
