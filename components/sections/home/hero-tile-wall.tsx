import type { CSSProperties } from "react";
import Image from "next/image";

import { workPhotos, type WorkPhoto } from "@/data/images";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const p = workPhotos;

/**
 * Three columns of real job photos. The middle column is wider, so its tiles
 * are bigger. Every column rises endlessly at its own pace, and the whole wall
 * is tilted, so the tiles drift sideways as they climb.
 */
const columns: { photos: WorkPhoto[]; duration: string; offset: string; wide?: boolean }[] = [
  {
    photos: [p.warehouseSweep, p.wallTileDetailing, p.disinfectionSpray, p.forecourtScrub],
    duration: "46s",
    offset: "-12s",
  },
  {
    photos: [p.industrialFloor, p.facilityFloorMopping, p.disinfectionWalk, p.factoryEquipmentClean],
    duration: "58s",
    offset: "-30s",
    wide: true,
  },
  {
    photos: [p.floorScrubbing, p.crewTeam, p.tileResidueScraping, p.thankYouSign],
    duration: "40s",
    offset: "-4s",
  },
];

/** Fades all four edges into the hero background: a vertical and a horizontal fade, intersected. */
const edgeFade =
  "linear-gradient(to bottom, transparent, black 14%, black 86%, transparent), linear-gradient(to right, transparent, black 14%, black 86%, transparent)";

const edgeFadeStyle: CSSProperties = {
  maskImage: edgeFade,
  maskComposite: "intersect",
  WebkitMaskImage: edgeFade,
  WebkitMaskComposite: "source-in",
};

export function HeroTileWall({ className }: { className?: string }) {
  return (
    <div className={cn("group relative overflow-hidden", className)} style={edgeFadeStyle}>
      <div className="absolute inset-[-18%] grid rotate-[-9deg] grid-cols-[1fr_1.4fr_1fr] gap-4 sm:gap-5">
        {columns.map((column, columnIndex) => (
          <div key={columnIndex} className="relative overflow-visible">
            <div
              className="flex animate-tile-rise flex-col group-hover:[animation-play-state:paused] motion-reduce:animate-none"
              style={
                {
                  "--tile-duration": column.duration,
                  animationDelay: column.offset,
                } as CSSProperties
              }
            >
              {/* The list renders twice so the loop is seamless. The copy is hidden from assistive tech. */}
              {[0, 1].map((copy) =>
                column.photos.map((photo, photoIndex) => (
                  <Tile
                    key={`${copy}-${photoIndex}`}
                    photo={photo}
                    wide={column.wide}
                    duplicate={copy === 1}
                    priority={copy === 0 && column.wide && photoIndex === 0}
                  />
                )),
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function Tile({
  photo,
  wide,
  duplicate,
  priority,
}: {
  photo: WorkPhoto;
  wide?: boolean;
  duplicate: boolean;
  priority?: boolean;
}) {
  return (
    <div aria-hidden={duplicate || undefined} className="pb-4 sm:pb-5">
      <figure
        className={cn(
          "relative overflow-hidden rounded-2xl bg-brand-hover shadow-2xl ring-1 ring-white/15",
          wide ? "aspect-[4/5]" : "aspect-[3/4]",
        )}
      >
        <Image
          src={photo.src}
          alt={duplicate ? "" : photo.alt}
          fill
          sizes={wide ? "(min-width: 1024px) 22vw, 40vw" : "(min-width: 1024px) 15vw, 28vw"}
          priority={priority}
          // Every tile reuses the same six small files, so load them straight away
          // rather than waiting for them to scroll into view.
          loading={priority ? undefined : "eager"}
          className="object-cover"
        />
        <div
          aria-hidden="true"
          className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-ink/70 to-transparent"
        />
        {photo.label && (
          <figcaption className="absolute bottom-3 left-3">
            <Badge variant="inverse" className="border-white/30 bg-ink/40 backdrop-blur-sm">
              {photo.label}
            </Badge>
          </figcaption>
        )}
      </figure>
    </div>
  );
}
