import { Eye, Target } from "lucide-react";

import { company } from "@/data/company";
import { Section } from "@/components/layout/section";
import { SectionHeading } from "@/components/shared/section-heading";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const statements = [
  { icon: Target, label: "Our Mission", text: company.mission, featured: true },
  { icon: Eye, label: "Our Vision", text: company.vision, featured: false },
];

export function MissionVision() {
  return (
    <Section tone="surface" aria-labelledby="mission-heading">
      <SectionHeading
        id="mission-heading"
        align="center"
        eyebrow="What drives us"
        title="Our Mission and Vision"
      />
      <div className="mt-12 grid gap-6 md:grid-cols-2">
        {statements.map(({ icon: Icon, label, text, featured }) => (
          <Card
            key={label}
            className={cn("gap-0 py-0 shadow-xl", featured && "border-0 bg-brand text-white")}
          >
            <CardContent className="flex h-full flex-col p-8 sm:p-10">
              <span
                className={cn(
                  "flex size-14 items-center justify-center rounded-xl",
                  featured ? "bg-white text-brand" : "bg-brand text-white",
                )}
              >
                <Icon className="size-7" aria-hidden="true" />
              </span>
              <h3
                className={cn(
                  "mt-8 text-sm font-semibold tracking-wider uppercase",
                  featured ? "text-white/70" : "text-brand",
                )}
              >
                {label}
              </h3>
              <p
                className={cn(
                  "mt-3 text-2xl leading-snug font-bold sm:text-3xl",
                  featured ? "text-white" : "text-ink",
                )}
              >
                {text}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </Section>
  );
}
