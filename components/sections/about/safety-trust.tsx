import Image from "next/image";
import { FlaskConical, GraduationCap, HandHeart, Shirt } from "lucide-react";

import { workPhotos } from "@/data/images";
import { Section } from "@/components/layout/section";
import { SectionHeading } from "@/components/shared/section-heading";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const commitments = [
  {
    icon: GraduationCap,
    title: "Trained Crews",
    text: "Crews are trained on surfaces, equipment and the right method for each type of clean.",
  },
  {
    icon: Shirt,
    title: "Uniformed and Equipped",
    text: "Our teams arrive in uniform, with protective gear such as gloves, masks and hair covers where the job calls for it.",
  },
  {
    icon: FlaskConical,
    title: "Safe Chemical Handling",
    text: "Cleaning and disinfection products are used as directed, stored safely and kept away from children, pets and food.",
  },
  {
    icon: HandHeart,
    title: "Respect for Your Property",
    text: "We protect floors and furnishings and work carefully around your belongings, as if the space were our own.",
  },
];

export function SafetyTrust() {
  const photo = workPhotos.disinfectionSpray;

  return (
    <Section aria-labelledby="safety-heading">
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <SectionHeading
            id="safety-heading"
            eyebrow="Safety and trust"
            title="People You Can Welcome Into Your Space"
            description="Letting a cleaning crew into your home or workplace takes trust. These are the standards every CityChic team member works to."
          />
          <div className="relative mt-10 hidden aspect-[4/5] overflow-hidden rounded-2xl shadow-xl ring-1 ring-brand/10 lg:block">
            <Image
              src={photo.src}
              alt={photo.alt}
              fill
              sizes="35vw"
              className="object-cover object-top"
            />
          </div>
        </div>

        <div className="lg:col-span-7">
          <Card className="gap-0 py-2">
            <CardContent className="px-6 sm:px-8">
              <ul>
                {commitments.map(({ icon: Icon, title, text }, index) => (
                  <li key={title}>
                    {index > 0 && <Separator />}
                    <div className="flex gap-5 py-7">
                      <span className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-brand text-white">
                        <Icon className="size-6" aria-hidden="true" />
                      </span>
                      <div>
                        <h3 className="text-lg font-bold">{title}</h3>
                        <p className="mt-1 leading-relaxed text-muted-foreground">{text}</p>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </Section>
  );
}
