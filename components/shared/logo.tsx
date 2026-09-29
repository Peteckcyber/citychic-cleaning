import Image from "next/image";

import { images } from "@/data/images";
import { cn } from "@/lib/utils";

/** The official CityChic logo. Height is set by className, width follows the aspect ratio. */
export function Logo({ className, priority }: { className?: string; priority?: boolean }) {
  const { logo } = images;

  return (
    <Image
      src={logo.src}
      alt={logo.alt}
      width={logo.width}
      height={logo.height}
      priority={priority}
      className={cn("h-11 w-auto", className)}
    />
  );
}
