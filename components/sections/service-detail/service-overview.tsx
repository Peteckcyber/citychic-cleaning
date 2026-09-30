import { CircleCheck, Star, Users } from "lucide-react";

import type { Service } from "@/data/services";
import { Section } from "@/components/layout/section";
import { SectionHeading } from "@/components/shared/section-heading";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

/** The pitch, who it is for, and the full "What is included" checklist. */
export function ServiceOverview({ service }: { service: Service }) {
  const Icon = service.icon;

  return (
    <Section aria-labelledby="overview-heading">
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-6">
          <div className="flex items-center gap-3">
            <span className="flex size-12 items-center justify-center rounded-xl bg-brand text-white">
              <Icon className="size-6" aria-hidden="true" />
            </span>
            {service.flagship && (
              <Badge>
                <Star aria-hidden="true" />
                Our specialty
              </Badge>
            )}
          </div>
          <SectionHeading
            id="overview-heading"
            eyebrow="The service"
            title={service.tagline}
            className="mt-8"
          />
          <p className="mt-5 text-lg leading-relaxed text-muted-foreground">{service.summary}</p>

          <Card className="mt-8 gap-0 border-0 bg-surface py-0 ring-1 ring-brand/10">
            <CardContent className="flex items-start gap-4 p-6">
              <Users className="mt-0.5 size-5 shrink-0 text-brand" aria-hidden="true" />
              <p className="text-ink">
                <span className="font-semibold">Ideal for: </span>
                {service.idealFor}
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-6">
          <Card className="gap-0 py-0 shadow-lg">
            <CardHeader className="border-b py-6">
              <CardTitle className="text-lg">
                <h2>What Is Included</h2>
              </CardTitle>
            </CardHeader>
            <CardContent className="py-2">
              <ul>
                {service.included.map((item, index) => (
                  <li key={item}>
                    {index > 0 && <Separator />}
                    <div className="flex gap-3 py-4">
                      <CircleCheck className="mt-0.5 size-5 shrink-0 text-brand" aria-hidden="true" />
                      <span className="leading-relaxed text-ink">{item}</span>
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
