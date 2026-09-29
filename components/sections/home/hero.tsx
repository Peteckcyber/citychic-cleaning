import Link from "next/link";
import { ArrowRight, CalendarCheck, Clock, ShieldCheck, UserCheck } from "lucide-react";

import { company } from "@/data/company";
import { HeroTileWall } from "@/components/sections/home/hero-tile-wall";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const trustItems = [
  { icon: ShieldCheck, title: "CAC Registered", text: company.rcNumber },
  { icon: CalendarCheck, title: `Since ${company.foundingYear}`, text: "Serving Lagos" },
  { icon: UserCheck, title: "Vetted Crews", text: "Trained and supervised" },
  { icon: Clock, title: "Monday to Saturday", text: "8am to 6pm" },
];

export function Hero() {
  return (
    <section
      aria-labelledby="hero-heading"
      className="relative isolate overflow-hidden bg-brand text-white"
    >
      {/* Subtle dot grid that fades out towards the edges. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 [background-image:radial-gradient(rgba(255,255,255,0.14)_1px,transparent_1px)] [background-size:26px_26px] [mask-image:radial-gradient(ellipse_at_30%_40%,black_15%,transparent_70%)]"
      />
      {/* Soft light behind the headline, and a deeper tone at the bottom. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_55%_60%_at_20%_30%,rgba(255,255,255,0.12),transparent)]"
      />
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 -z-10 h-48 bg-gradient-to-t from-brand-hover to-transparent"
      />

      <div className="mx-auto grid w-full max-w-7xl items-center gap-12 px-4 pt-16 sm:px-6 sm:pt-20 lg:grid-cols-12 lg:gap-8 lg:px-8 lg:pt-0">
        <div className="flex flex-col items-center text-center lg:col-span-6 lg:items-start lg:py-28 lg:text-left">
          <h1
            id="hero-heading"
            className="text-5xl leading-[1.05] font-extrabold text-white sm:text-6xl xl:text-7xl"
          >
            Cleaning You Can <span className="whitespace-nowrap text-white/65">Count On.</span>
          </h1>

          <p className="mt-7 max-w-xl text-lg leading-relaxed text-balance text-white/80 sm:text-xl">
            Reliable cleaning for homes, offices, and spaces that deserve to feel fresh.
          </p>

          <Link
            href="#quote"
            className={buttonVariants({ variant: "inverse", size: "lg", className: "mt-10 w-full sm:w-auto" })}
          >
            Get a Free Quote
            <ArrowRight aria-hidden="true" />
          </Link>
        </div>

        <HeroTileWall className="-mx-4 h-[26rem] sm:mx-0 sm:h-[32rem] lg:col-span-6 lg:h-[44rem]" />
      </div>

      <div className="border-t border-white/10 bg-brand-hover/60 backdrop-blur-sm">
        <ul className="mx-auto grid w-full max-w-7xl grid-cols-2 px-4 sm:px-6 lg:grid-cols-4 lg:px-8">
          {trustItems.map(({ icon: Icon, title, text }, index) => (
            <li
              key={title}
              className={cn(
                "flex flex-col items-center gap-2 border-white/10 px-3 py-6 text-center sm:flex-row sm:justify-center sm:gap-3 sm:text-left",
                index % 2 === 1 && "border-l",
                index >= 2 && "border-t lg:border-t-0",
                index === 2 && "lg:border-l",
              )}
            >
              <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-white/10 ring-1 ring-white/15">
                <Icon className="size-5 text-white" aria-hidden="true" />
              </span>
              <span className="flex flex-col">
                <span className="text-sm font-semibold text-white">{title}</span>
                <span className="text-sm text-white/65">{text}</span>
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
