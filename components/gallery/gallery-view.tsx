"use client";

import { useEffect, useRef, useState, type KeyboardEvent, type PointerEvent } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Expand, Images, Play, X } from "lucide-react";

import {
  categoryService,
  galleryCategories,
  galleryItems,
  itemMedia,
  type GalleryCategory,
  type GalleryItem,
} from "@/data/gallery";
import { getService } from "@/data/services";
import { WhatsAppLink } from "@/components/shared/whatsapp-link";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { serviceQuoteMessage } from "@/lib/whatsapp";

export type GalleryFilter = GalleryCategory | "all";

const categoryLabel = Object.fromEntries(
  galleryCategories.map((category) => [category.value, category.label]),
) as Record<GalleryCategory, string>;

/** Only show filters that have at least one item, so nobody lands on an empty view. */
const filters: { value: GalleryFilter; label: string; count: number }[] = [
  { value: "all", label: "All Work", count: galleryItems.length },
  ...galleryCategories
    .map((category) => ({
      value: category.value,
      label: category.label,
      count: galleryItems.filter((item) => item.category === category.value).length,
    }))
    .filter((filter) => filter.count > 0),
];

export function isGalleryFilter(value: string | null): value is GalleryFilter {
  return filters.some((filter) => filter.value === value);
}

type GalleryViewProps = {
  filter: GalleryFilter;
  onFilterChange?: (filter: GalleryFilter) => void;
};

export function GalleryView({ filter, onFilterChange }: GalleryViewProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const visible =
    filter === "all" ? galleryItems : galleryItems.filter((item) => item.category === filter);
  const activeLabel = filters.find((f) => f.value === filter)?.label ?? "All Work";

  return (
    <div>
      {/* Filter bar: stays pinned under the site header while browsing. */}
      <div className="sticky top-[4.5rem] z-30 -mx-4 mb-8 border-b border-brand/10 bg-surface/90 px-4 py-3 backdrop-blur-md sm:mx-0 sm:rounded-xl sm:border sm:px-3 md:top-28">
        <div
          role="group"
          aria-label="Filter our work by service"
          className="flex gap-2 overflow-x-auto pr-8 [mask-image:linear-gradient(to_right,black_80%,transparent)] [scrollbar-width:none] sm:pr-0 sm:[mask-image:none] [&::-webkit-scrollbar]:hidden"
        >
          {filters.map(({ value, label, count }) => {
            const active = value === filter;
            return (
              <button
                key={value}
                type="button"
                aria-pressed={active}
                onClick={() => onFilterChange?.(value)}
                className={cn(
                  "inline-flex h-10 shrink-0 items-center gap-2 rounded-full border px-4 text-sm font-semibold transition-colors outline-none focus-visible:ring-[3px] focus-visible:ring-ring/30",
                  active
                    ? "border-brand bg-brand text-white"
                    : "border-brand/15 bg-white text-ink hover:border-brand/40 hover:text-brand",
                )}
              >
                {label}
                <span
                  className={cn(
                    "rounded-full px-2 py-0.5 text-xs tabular-nums",
                    active ? "bg-white/20 text-white" : "bg-brand/10 text-brand",
                  )}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <p className="sr-only" aria-live="polite">
        Showing {visible.length} {visible.length === 1 ? "item" : "items"} in {activeLabel}.
      </p>

      {/* Masonry grid: every photo keeps its natural shape. */}
      <ul key={filter} className="columns-1 gap-5 sm:columns-2 lg:columns-3 motion-safe:animate-in motion-safe:fade-in-0 motion-safe:duration-500">
        {visible.map((item, index) => (
          <li key={item.id} className="mb-5 break-inside-avoid">
            <GalleryTile item={item} eager={index < 3} onOpen={() => setOpenIndex(index)} />
          </li>
        ))}
      </ul>

      <Lightbox
        items={visible}
        index={openIndex}
        onIndexChange={setOpenIndex}
        onClose={() => setOpenIndex(null)}
      />
    </div>
  );
}

function GalleryTile({
  item,
  eager,
  onOpen,
}: {
  item: GalleryItem;
  /** The first tiles are what visitors see first, so load them straight away. */
  eager?: boolean;
  onOpen: () => void;
}) {
  const media = itemMedia(item);
  const [loaded, setLoaded] = useState(false);

  return (
    <button
      type="button"
      onClick={onOpen}
      aria-label={`Open ${item.title}${item.type === "video" ? " video" : " photo"}`}
      className="group relative block w-full overflow-hidden rounded-2xl bg-muted text-left shadow-sm ring-1 ring-brand/10 transition-shadow outline-none hover:shadow-xl focus-visible:ring-[3px] focus-visible:ring-ring/40"
    >
      {!loaded && <span aria-hidden="true" className="absolute inset-0 animate-pulse bg-muted" />}
      <Image
        src={media.src}
        alt={media.alt}
        width={media.width}
        height={media.height}
        sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
        loading={eager ? "eager" : "lazy"}
        // Images can finish loading before hydration, when onLoad never fires, so also
        // check whether the image is already complete when it mounts.
        ref={(img) => {
          if (img?.complete && img.naturalWidth > 0) setLoaded(true);
        }}
        onLoad={() => setLoaded(true)}
        className={cn(
          "h-auto w-full transition-[transform,opacity] duration-700 group-hover:scale-105",
          loaded ? "opacity-100" : "opacity-0",
        )}
      />

      <span
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/10 to-transparent opacity-80 transition-opacity duration-300 group-hover:opacity-100"
      />

      {item.type === "video" && (
        <span className="absolute inset-0 flex items-center justify-center">
          <span className="flex size-16 items-center justify-center rounded-full bg-white/90 text-brand shadow-xl transition-transform duration-300 group-hover:scale-110">
            <Play className="ml-1 size-7 fill-current" aria-hidden="true" />
          </span>
        </span>
      )}

      <span className="absolute top-4 right-4 flex size-9 items-center justify-center rounded-full bg-ink/40 text-white opacity-0 backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100">
        <Expand className="size-4" aria-hidden="true" />
      </span>

      <span className="absolute inset-x-0 bottom-0 flex flex-col items-start gap-2 p-5">
        <span className="flex flex-wrap gap-2">
          {item.category && (
            <Badge variant="inverse" className="border-white/30 bg-ink/40 backdrop-blur-sm">
              {categoryLabel[item.category]}
            </Badge>
          )}
          {item.type === "video" && (
            <Badge variant="inverse" className="border-white/30 bg-ink/40 backdrop-blur-sm">
              Video
            </Badge>
          )}
        </span>
        <span className="text-lg font-bold text-white">{item.title}</span>
      </span>
    </button>
  );
}

type LightboxProps = {
  items: GalleryItem[];
  index: number | null;
  onIndexChange: (index: number) => void;
  onClose: () => void;
};

function Lightbox({ items, index, onIndexChange, onClose }: LightboxProps) {
  const swipeStart = useRef<number | null>(null);
  const item = index === null ? null : items[index];
  const count = items.length;

  const go = (step: number) => {
    if (index === null) return;
    onIndexChange((index + step + count) % count);
  };

  // Warm the cache for the neighbouring items so moving through feels instant.
  useEffect(() => {
    if (index === null || count < 2) return;
    [items[(index + 1) % count], items[(index - 1 + count) % count]].forEach((neighbour) => {
      const preload = new window.Image();
      preload.src = itemMedia(neighbour).src;
    });
  }, [index, items, count]);

  function handleKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (event.key === "ArrowRight") {
      event.preventDefault();
      go(1);
    } else if (event.key === "ArrowLeft") {
      event.preventDefault();
      go(-1);
    }
  }

  function handlePointerDown(event: PointerEvent<HTMLDivElement>) {
    swipeStart.current = event.clientX;
  }

  function handlePointerUp(event: PointerEvent<HTMLDivElement>) {
    if (swipeStart.current === null) return;
    const distance = event.clientX - swipeStart.current;
    swipeStart.current = null;
    if (Math.abs(distance) > 50) go(distance < 0 ? 1 : -1);
  }

  const service =
    item?.category !== undefined ? getService(categoryService[item.category]) : undefined;

  return (
    <Dialog open={item !== null} onOpenChange={(open) => !open && onClose()}>
      <DialogContent
        showCloseButton={false}
        onKeyDown={handleKeyDown}
        className="max-h-[calc(100dvh-2rem)] gap-0 overflow-hidden border-white/10 bg-ink p-0 text-white sm:max-w-6xl lg:grid-cols-[1fr_22rem]"
      >
        {item && (
          <>
            <div
              className="relative flex h-[58dvh] touch-pan-y items-center justify-center bg-black lg:h-[82dvh]"
              onPointerDown={handlePointerDown}
              onPointerUp={handlePointerUp}
            >
              {item.type === "photo" ? (
                <Image
                  key={item.id}
                  src={item.photo.src}
                  alt={item.photo.alt}
                  fill
                  sizes="(min-width: 1024px) 60vw, 100vw"
                  className="object-contain motion-safe:animate-in motion-safe:fade-in-0 motion-safe:duration-300"
                />
              ) : (
                <video
                  key={item.id}
                  src={item.video.src}
                  poster={item.video.poster}
                  aria-label={item.video.label}
                  controls
                  autoPlay
                  muted
                  playsInline
                  preload="auto"
                  className="size-full object-contain"
                />
              )}

              {count > 1 && (
                <>
                  <button
                    type="button"
                    onClick={() => go(-1)}
                    aria-label="Previous item"
                    className="absolute top-1/2 left-3 flex size-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/15 text-white backdrop-blur-sm transition-colors hover:bg-white/30 focus-visible:ring-[3px] focus-visible:ring-white/60 focus-visible:outline-none"
                  >
                    <ChevronLeft className="size-6" aria-hidden="true" />
                  </button>
                  <button
                    type="button"
                    onClick={() => go(1)}
                    aria-label="Next item"
                    className="absolute top-1/2 right-3 flex size-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/15 text-white backdrop-blur-sm transition-colors hover:bg-white/30 focus-visible:ring-[3px] focus-visible:ring-white/60 focus-visible:outline-none"
                  >
                    <ChevronRight className="size-6" aria-hidden="true" />
                  </button>
                </>
              )}

              <DialogClose className="absolute top-3 right-3 flex size-11 items-center justify-center rounded-full bg-white/15 text-white backdrop-blur-sm transition-colors hover:bg-white/30 focus-visible:ring-[3px] focus-visible:ring-white/60 focus-visible:outline-none lg:hidden">
                <X className="size-5" aria-hidden="true" />
                <span className="sr-only">Close</span>
              </DialogClose>
            </div>

            <div className="flex max-h-[calc(42dvh-2rem)] flex-col overflow-y-auto p-6 lg:max-h-none lg:p-8">
              <div className="flex items-center justify-between gap-4">
                <p className="flex items-center gap-2 text-sm text-white/60 tabular-nums">
                  <Images className="size-4" aria-hidden="true" />
                  {(index ?? 0) + 1} of {count}
                </p>
                <DialogClose className="hidden size-9 items-center justify-center rounded-full text-white/70 transition-colors hover:bg-white/10 hover:text-white focus-visible:ring-[3px] focus-visible:ring-white/60 focus-visible:outline-none lg:flex">
                  <X className="size-5" aria-hidden="true" />
                  <span className="sr-only">Close</span>
                </DialogClose>
              </div>

              <div className="mt-5 flex flex-wrap gap-2">
                {item.category && (
                  <Badge variant="inverse">{categoryLabel[item.category]}</Badge>
                )}
                {item.type === "video" && <Badge variant="inverse">Video</Badge>}
              </div>
              <DialogTitle className="mt-3 text-2xl leading-tight font-bold text-white">
                {item.title}
              </DialogTitle>
              <DialogDescription className="mt-3 text-base leading-relaxed text-white/75">
                {item.caption}
              </DialogDescription>

              {service && (
                <WhatsAppLink
                  message={serviceQuoteMessage(service.name)}
                  className={buttonVariants({ variant: "inverse", className: "mt-6 w-full" })}
                >
                  Get a Quote for {service.name}
                </WhatsAppLink>
              )}

              {count > 1 && (
                <div className="mt-8 lg:mt-auto lg:pt-8">
                  <p className="text-xs font-semibold tracking-wider text-white/50 uppercase">
                    Jump to
                  </p>
                  <ul className="mt-3 grid grid-cols-5 gap-2 lg:grid-cols-4">
                    {items.map((thumb, thumbIndex) => {
                      const thumbMedia = itemMedia(thumb);
                      const current = thumbIndex === index;
                      return (
                        <li key={thumb.id}>
                          <button
                            type="button"
                            onClick={() => onIndexChange(thumbIndex)}
                            aria-label={`Show ${thumb.title}`}
                            aria-current={current || undefined}
                            className={cn(
                              "relative block aspect-square w-full overflow-hidden rounded-lg ring-2 transition-all outline-none focus-visible:ring-white",
                              current ? "ring-white" : "opacity-60 ring-transparent hover:opacity-100",
                            )}
                          >
                            <Image
                              src={thumbMedia.src}
                              alt=""
                              fill
                              sizes="80px"
                              className="object-cover"
                            />
                            {thumb.type === "video" && (
                              <Play
                                className="absolute inset-0 m-auto size-4 fill-white text-white"
                                aria-hidden="true"
                              />
                            )}
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              )}
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
