import { BadgeCheck, Building2, CalendarCheck, Clock, MapPin } from "lucide-react";

import { company } from "@/data/company";
import { Section } from "@/components/layout/section";
import { ExternalLink } from "@/components/shared/external-link";
import { SectionHeading } from "@/components/shared/section-heading";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const facts = [
  { icon: CalendarCheck, label: "Founded", value: String(company.foundingYear) },
  { icon: Building2, label: "Registered name", value: company.legalName },
  { icon: BadgeCheck, label: "CAC registration", value: company.rcNumber },
  { icon: MapPin, label: "Based in", value: `${company.address.area}, ${company.address.city}` },
  { icon: Clock, label: "Open", value: company.hours.summary },
];

export function Story() {
  return (
    <Section aria-labelledby="story-heading">
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-7">
          <SectionHeading
            id="story-heading"
            eyebrow="Our story"
            title="A Lagos Cleaning Company Built Around One Standard"
          />
          <div className="mt-6 space-y-5 text-lg leading-relaxed text-muted-foreground">
            <p>
              CityChic was founded in {company.foundingYear} with one clear focus:
              post-construction and deep cleaning done properly. The kind of cleaning that
              takes a dusty new build or a tired home and makes it genuinely ready to live
              in, work in or hand over.
            </p>
            <p>
              That focus still drives everything we do. Today our crews serve homeowners,
              developers, estate managers and businesses across Lagos, from one-off
              transformations to recurring home plans, facility maintenance and fogging
              disinfection, all held to the same detail-first standard.
            </p>
            <p>
              We operate as {company.legalName}, registered with the Corporate Affairs
              Commission under {company.rcNumber}. Our sister company,{" "}
              <ExternalLink
                href={company.roadMarking.url}
                className="font-semibold text-brand underline-offset-4 hover:underline"
              >
                {company.roadMarking.name}
              </ExternalLink>
              , handles road, highway and airfield marking.
            </p>
          </div>
        </div>

        <div className="lg:col-span-5">
          <Card className="gap-0 py-0 lg:sticky lg:top-32">
            <CardHeader className="border-b py-6">
              <CardTitle className="text-lg">
                <h3>CityChic at a Glance</h3>
              </CardTitle>
            </CardHeader>
            <CardContent className="py-2">
              <dl>
                {facts.map(({ icon: Icon, label, value }, index) => (
                  <div key={label}>
                    {index > 0 && <Separator />}
                    <div className="flex items-center gap-4 py-4">
                      <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-brand/10 text-brand">
                        <Icon className="size-5" aria-hidden="true" />
                      </span>
                      <div>
                        <dt className="text-xs font-semibold tracking-wider text-muted-foreground uppercase">
                          {label}
                        </dt>
                        <dd className="mt-0.5 font-semibold text-ink">{value}</dd>
                      </div>
                    </div>
                  </div>
                ))}
              </dl>
            </CardContent>
          </Card>
        </div>
      </div>
    </Section>
  );
}
