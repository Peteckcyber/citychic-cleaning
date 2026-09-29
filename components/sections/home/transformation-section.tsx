import Link from "next/link";
import { ArrowRight, Check, Video } from "lucide-react";

import { workVideos } from "@/data/images";
import { Section } from "@/components/layout/section";
import { SectionHeading } from "@/components/shared/section-heading";
import { WorkVideo } from "@/components/shared/work-video";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const removedItems = [
  "Cement haze and paint splatter lifted from floors and tiles",
  "Fine dust cleared from vents, sockets, frames and window tracks",
  "Stickers, film and residue removed from glass and fittings",
  "Kitchens and bathrooms polished to a showroom finish",
];

export function TransformationSection() {
  return (
    <Section aria-labelledby="transformation-heading">
      <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-7">
          <SectionHeading
            id="transformation-heading"
            eyebrow="See us at work"
            title="From Building Site to Handover Ready"
            description="Construction leaves a layer of dust and residue that ordinary cleaning cannot shift. Here is what our post-construction crews take care of before you walk in."
          />

          <Card className="mt-8 gap-0 py-2">
            <CardContent className="px-5">
              <ul>
                {removedItems.map((item, index) => (
                  <li key={item}>
                    {index > 0 && <Separator />}
                    <div className="flex items-start gap-3 py-3.5">
                      <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-brand text-white">
                        <Check className="size-3" aria-hidden="true" />
                      </span>
                      <span className="text-sm font-medium text-ink">{item}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Link
            href="/gallery"
            className={buttonVariants({ variant: "outline", size: "lg", className: "mt-8" })}
          >
            Browse Our Work
            <ArrowRight aria-hidden="true" />
          </Link>
        </div>

        <div className="lg:col-span-5">
          <Card className="relative mx-auto w-full max-w-sm gap-0 rounded-[2rem] p-2.5 shadow-2xl">
            <WorkVideo
              video={workVideos.crewFloorScrub}
              className="aspect-[9/16] rounded-[1.5rem]"
            />
            <Badge
              variant="inverse"
              className="absolute top-6 left-6 border-white/30 bg-ink/40 backdrop-blur-sm"
            >
              <Video aria-hidden="true" />
              Real CityChic job
            </Badge>
          </Card>
        </div>
      </div>
    </Section>
  );
}
