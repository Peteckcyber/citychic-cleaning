"use client";

import { usePathname, useSearchParams } from "next/navigation";

import { GalleryView, isGalleryFilter, type GalleryFilter } from "@/components/gallery/gallery-view";

/**
 * Keeps the active filter in the address bar (?category=fogging) so filtered views can be
 * shared and survive a refresh. Uses the History API, which Next.js syncs with
 * useSearchParams, so filtering is instant with no page request.
 */
export function GalleryBrowser() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const raw = searchParams.get("category");
  const filter: GalleryFilter = isGalleryFilter(raw) ? raw : "all";

  function handleFilterChange(next: GalleryFilter) {
    const url = next === "all" ? pathname : `${pathname}?category=${next}`;
    window.history.replaceState(null, "", url);
  }

  return <GalleryView filter={filter} onFilterChange={handleFilterChange} />;
}
