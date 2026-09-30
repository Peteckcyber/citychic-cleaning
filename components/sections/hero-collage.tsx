import Image from "next/image";

import type { WorkPhoto } from "@/data/images";

/** One large job photo for an inner-page hero, with an optional caption badge. */
export function HeroPhoto({ photo, caption }: { photo: WorkPhoto; caption?: string }) {
  return (
    <div className="relative mx-auto aspect-[4/5] w-full max-w-md overflow-hidden rounded-2xl shadow-2xl ring-1 ring-white/20">
      <Image src={photo.src} alt={photo.alt} fill priority sizes="36vw" className="object-cover" />
      {caption && (
        <span className="absolute bottom-4 left-4 rounded-full border border-white/30 bg-ink/50 px-3 py-1 text-xs font-semibold text-white backdrop-blur-sm">
          {caption}
        </span>
      )}
    </div>
  );
}

/** Two overlapping job photos for an inner-page hero. Shown from desktop width up. */
export function HeroCollage({ main, inset }: { main: WorkPhoto; inset: WorkPhoto }) {
  return (
    <div className="relative h-[30rem]">
      <div className="absolute top-0 left-0 aspect-[3/4] w-[68%] overflow-hidden rounded-2xl shadow-2xl ring-1 ring-white/20">
        <Image src={main.src} alt={main.alt} fill priority sizes="28vw" className="object-cover" />
      </div>
      <div className="absolute right-0 bottom-0 aspect-[9/16] w-[42%] overflow-hidden rounded-2xl shadow-2xl ring-4 ring-brand">
        <Image src={inset.src} alt={inset.alt} fill sizes="18vw" className="object-cover" />
      </div>
    </div>
  );
}
