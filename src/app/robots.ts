import type { MetadataRoute } from "next";
import { site } from "@/data/site";

// Se sirve en https://zienarecords.com/robots.txt
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${site.url}/sitemap.xml`,
    host: site.url,
  };
}
