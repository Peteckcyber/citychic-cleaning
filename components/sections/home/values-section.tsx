import { Eye, Target } from "lucide-react";

import { company } from "@/data/company";
import { coreValues } from "@/data/values";
import { Section } from "@/components/layout/section";
import { SectionHeading } from "@/components/shared/section-heading";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export function ValuesSection() {
  return (
    <Section tone="surface" aria-labelledby="values-heading">
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <SectionHeading
            id="values-heading"
            eyebrow="Why CityChic"
            title="The Standards Behind Every Clean"
            description="Five values guide every crew, every visit and every decision we make on your property."
          />

          <Card className="mt-10 gap-0 border-0 bg-brand py-0 text-white shadow-lg">
            <CardContent className="space-y-6 p-7">
              <div className="flex gap-4">
                <Target className="mt-0.5 size-5 shrink-0 text-white/80" aria-hidden="true" />
                <div>
                  <p className="text-sm font-semibold tracking-wider text-white/70 uppercase">
                    Our mission
                  </p>
                  <p className="mt-1.5 leading-relaxed">{company.mission}</p>
                </div>
              </div>
              <Separator className="bg-white/15" />
              <div className="flex gap-4">
                <Eye className="mt-0.5 size-5 shrink-0 text-white/80" aria-hidden="true" />
                <div>
                  <p className="text-sm font-semibold tracking-wider text-white/70 uppercase">
                    Our vision
                  </p>
                  <p className="mt-1.5 leading-relaxed">{company.vision}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-7">
          <Card className="gap-0 py-2">
            <CardContent className="px-6 sm:px-8">
              <ul>
                {coreValues.map(({ name, icon: Icon, promise }, index) => (
                  <li key={name}>
                    {index > 0 && <Separator />}
                    <div className="flex gap-5 py-6">
                      <span className="flex size-12 shrink-0 items-center justify-center rounded-lg bg-brand/10 text-brand">
                        <Icon className="size-6" aria-hidden="true" />
                      </span>
                      <div>
                        <h3 className="text-lg font-bold">{name}</h3>
                        <p className="mt-1 leading-relaxed text-muted-foreground">{promise}</p>
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
