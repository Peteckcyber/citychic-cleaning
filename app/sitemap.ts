import type { MetadataRoute } from "next";
import { staticRoutes } from "@/data/navigation";
import { services } from "@/data/services";
import { absoluteUrl } from "@/lib/seo";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const pages = staticRoutes.map((route) => ({
    url: absoluteUrl(route.path),
    lastModified,
    changeFrequency: "monthly" as const,
    priority: route.priority,
  }));

  const servicePages = services.map((service) => ({
    url: absoluteUrl(`/services/${service.slug}`),
    lastModified,
    changeFrequency: "monthly" as const,
    priority: service.flagship ? 0.9 : 0.8,
  }));

  return [...pages, ...servicePages];
}
