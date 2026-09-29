import Image from "next/image";
import { ClipboardCheck, DoorOpen, PackageCheck, SprayCan, Timer } from "lucide-react";

import { workPhotos } from "@/data/images";
import { Section } from "@/components/layout/section";
import { SectionHeading } from "@/components/shared/section-heading";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const steps = [
  {
    icon: ClipboardCheck,
    title: "Site Assessment",
    text: "We walk the space with you, identify high-risk and high-traffic areas, and agree the treatment plan.",
  },
  {
    icon: PackageCheck,
    title: "Surface Preparation",
    text: "Food, personal items and sensitive equipment are covered or removed, and occupants step out.",
  },
  {
    icon: SprayCan,
    title: "Fogging Application",
    text: "A fine disinfecting mist is dispersed room by room, reaching corners, fabrics and high-touch points.",
  },
  {
    icon: Timer,
    title: "Dwell Time and Ventilation",
    text: "The disinfectant is left to work for the recommended time, then the space is thoroughly aired out.",
  },
  {
    icon: DoorOpen,
    title: "Safe Re-Entry",
    text: "We confirm when it is safe to return and leave you with simple aftercare guidance.",
  },
];

/** Step-by-step disinfection protocol, shown alongside real fogging photos. */
export function FoggingProtocol() {
  const photos = [workPhotos.disinfectionWalk, workPhotos.disinfectionSpray];

  return (
    <Section id="fogging-protocol" tone="surface" aria-labelledby="protocol-heading">
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <SectionHeading
            id="protocol-heading"
            eyebrow="Fogging and disinfection"
            title="A Clear, Safe Protocol From Start to Finish"
            description="Disinfection only works when it is done properly. Every fogging job follows the same five steps, so you always know what is happening in your space and when it is safe to return."
          />
          <div className="mt-10 grid grid-cols-2 gap-4">
            {photos.map((photo, index) => (
              <div
                key={photo.src}
                className={cn(
                  "relative aspect-[9/16] overflow-hidden rounded-2xl shadow-lg ring-1 ring-brand/10",
                  index === 1 && "mt-10",
                )}
              >
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  sizes="(min-width: 1024px) 18vw, 45vw"
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </div>

        <ol className="space-y-4 lg:col-span-7">
          {steps.map(({ icon: Icon, title, text }, index) => (
            <li key={title}>
              <Card className="gap-0 py-0">
                <CardContent className="flex gap-5 p-6">
                  <span className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-brand text-white">
                    <Icon className="size-6" aria-hidden="true" />
                  </span>
                  <div>
                    <Badge variant="secondary">Step {index + 1}</Badge>
                    <h3 className="mt-2 text-lg font-bold">{title}</h3>
                    <p className="mt-1 leading-relaxed text-muted-foreground">{text}</p>
                  </div>
                </CardContent>
              </Card>
            </li>
          ))}
        </ol>
      </div>
    </Section>
  );
}
