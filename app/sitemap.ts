import type { MetadataRoute } from "next";

import { galleryItems } from "@/data/gallery";
import { workPhotos } from "@/data/images";
import { getServiceDetail } from "@/data/service-details";
import { services } from "@/data/services";
import { absoluteUrl } from "@/lib/seo";

export const dynamic = "force-static";

type SitemapEntry = MetadataRoute.Sitemap[number];

const photoUrls = (...srcs: string[]) => srcs.map((src) => absoluteUrl(src));

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const galleryPhotos = galleryItems.flatMap((item) =>
    item.type === "photo" ? [absoluteUrl(item.photo.src)] : [],
  );
  const galleryVideos = galleryItems.flatMap((item) =>
    item.type === "video"
      ? [
          {
            title: item.title,
            description: item.caption,
            thumbnail_loc: absoluteUrl(item.video.poster),
            content_loc: absoluteUrl(item.video.src),
            duration: item.video.durationSeconds,
            family_friendly: "yes" as const,
          },
        ]
      : [],
  );

  const pages: SitemapEntry[] = [
    {
      url: absoluteUrl("/"),
      lastModified,
      changeFrequency: "monthly",
      priority: 1,
      images: photoUrls(
        workPhotos.industrialFloor.src,
        workPhotos.facilityFloorMopping.src,
        workPhotos.crewTeam.src,
      ),
    },
    {
      url: absoluteUrl("/services"),
      lastModified,
      changeFrequency: "monthly",
      priority: 0.9,
      images: photoUrls(workPhotos.industrialFloor.src, workPhotos.floorScrubbing.src),
    },
    {
      url: absoluteUrl("/gallery"),
      lastModified,
      changeFrequency: "weekly",
      priority: 0.8,
      images: galleryPhotos,
      videos: galleryVideos,
    },
    {
      url: absoluteUrl("/about"),
      lastModified,
      changeFrequency: "yearly",
      priority: 0.7,
      images: photoUrls(workPhotos.crewTeam.src, workPhotos.thankYouSign.src),
    },
    {
      url: absoluteUrl("/contact"),
      lastModified,
      changeFrequency: "yearly",
      priority: 0.8,
    },
  ];

  const servicePages: SitemapEntry[] = services.map((service) => ({
    url: absoluteUrl(`/services/${service.slug}`),
    lastModified,
    changeFrequency: "monthly",
    priority: service.flagship ? 0.9 : 0.8,
    images: photoUrls(getServiceDetail(service.slug).photo.src),
  }));

  return [...pages, ...servicePages];
}
