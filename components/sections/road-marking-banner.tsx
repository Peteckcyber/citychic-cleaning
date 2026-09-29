import Image from "next/image";
import { Route } from "lucide-react";

import { company } from "@/data/company";
import { workPhotos } from "@/data/images";
import { Section } from "@/components/layout/section";
import { ExternalLink } from "@/components/shared/external-link";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

/** Sister company promotion. The photo and button both link out to the live road marking website. */
export function RoadMarkingBanner() {
  const photo = workPhotos.roadMarkingSurvey;

  return (
    <Section compact aria-labelledby="road-marking-heading">
      <Card className="gap-0 overflow-hidden bg-surface py-0">
        <CardContent className="grid p-0 md:grid-cols-12">
          <ExternalLink
            href={company.roadMarking.url}
            showIcon={false}
            aria-label={`Visit ${company.roadMarking.name}`}
            className="group relative block h-56 overflow-hidden md:col-span-4 md:h-auto md:min-h-72"
          >
            <Image
              src={photo.src}
              alt={photo.alt}
              fill
              sizes="(min-width: 768px) 33vw, 100vw"
              className="object-cover object-[center_30%] transition-transform duration-700 group-hover:scale-105"
            />
          </ExternalLink>

          <div className="flex flex-col justify-center gap-6 p-7 sm:p-9 md:col-span-8">
            <div className="flex flex-col gap-5 sm:flex-row">
              <span className="flex size-12 shrink-0 items-center justify-center rounded-lg bg-ink text-white">
                <Route className="size-6" aria-hidden="true" />
              </span>
              <div>
                <Badge variant="outline">Road marking service</Badge>
                <h2 id="road-marking-heading" className="mt-3 text-xl font-bold">
                  Need Road, Highway or Airfield Marking?
                </h2>
                <p className="mt-2 max-w-2xl leading-relaxed text-muted-foreground">
                  {company.roadMarking.name} delivers precise surface marking for roads,
                  highways and airfields. Visit their dedicated website to see their work and
                  request a quote.
                </p>
              </div>
            </div>
            <ExternalLink
              href={company.roadMarking.url}
              className={buttonVariants({ size: "lg", className: "w-full sm:w-fit sm:self-start" })}
            >
              Visit CityChic Road Marking
            </ExternalLink>
          </div>
        </CardContent>
      </Card>
    </Section>
  );
}
