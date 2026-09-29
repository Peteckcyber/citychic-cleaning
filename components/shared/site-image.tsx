import Image from "next/image";
import { ImageIcon } from "lucide-react";

import type { SiteImage as SiteImageData } from "@/data/images";
import { cn } from "@/lib/utils";

type SiteImageProps = {
  image: SiteImageData;
  /** Sizing classes for the frame, for example an aspect ratio. The image fills it. */
  className?: string;
  sizes?: string;
  priority?: boolean;
  /** Stand-in only: short label shown instead of the full alt text. */
  pendingLabel?: string;
  /** Stand-in only: which side the label sits on, so paired images never overlap. */
  placement?: "center" | "start" | "end";
};

const placements = {
  center: "m-auto items-center text-center",
  start: "my-auto mr-auto ml-[12%] items-start text-left",
  end: "my-auto ml-auto mr-[12%] items-end text-right",
} as const;

const toneStyles = {
  dusty: "bg-stone-300 text-stone-700",
  clean: "bg-surface text-brand",
  brand: "bg-brand text-white",
} as const;

/**
 * Renders a Cloudflare-hosted image, or a clearly marked stand-in while the
 * client's link is still pending (src is null in data/images.ts).
 */
export function SiteImage({
  image,
  className,
  sizes = "100vw",
  priority,
  pendingLabel,
  placement = "center",
}: SiteImageProps) {
  if (image.src) {
    return (
      <div className={cn("relative overflow-hidden", className)}>
        <Image
          src={image.src}
          alt={image.alt}
          fill
          sizes={sizes}
          priority={priority}
          className="object-cover"
        />
      </div>
    );
  }

  const tone = toneStyles[image.tone ?? "clean"];

  return (
    <div
      role="img"
      aria-label={image.alt}
      className={cn("relative flex overflow-hidden", tone, className)}
    >
      {image.tone === "dusty" && (
        <div
          aria-hidden="true"
          className="absolute inset-0 opacity-40 [background-image:radial-gradient(currentColor_1px,transparent_1px)] [background-size:14px_14px]"
        />
      )}
      <div className={cn("relative flex max-w-xs flex-col gap-2 p-6", placements[placement])}>
        <ImageIcon className="size-8 opacity-60" aria-hidden="true" />
        <span className="text-xs font-semibold tracking-wider uppercase opacity-70">
          Photo pending
        </span>
        <span className="text-sm opacity-80">{pendingLabel ?? image.alt}</span>
      </div>
    </div>
  );
}
