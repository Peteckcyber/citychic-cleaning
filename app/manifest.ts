import type { MetadataRoute } from "next";

import { company } from "@/data/company";
import { siteName } from "@/lib/seo";

export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: siteName,
    short_name: company.shortName,
    description:
      "Post-construction, deep cleaning and fogging disinfection for homes, offices and new builds in Lagos.",
    start_url: "/",
    display: "standalone",
    background_color: "#FFFFFF",
    theme_color: "#232D84",
    icons: [
      { src: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
  };
}
