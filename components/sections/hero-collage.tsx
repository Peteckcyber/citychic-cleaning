import Image from "next/image";

import type { WorkPhoto } from "@/data/images";

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
