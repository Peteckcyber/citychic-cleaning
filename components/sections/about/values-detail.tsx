import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { coreValues } from "@/data/values";
import { Section } from "@/components/layout/section";
import { SectionHeading } from "@/components/shared/section-heading";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export function ValuesDetail() {
  return (
    <Section aria-labelledby="values-detail-heading">
      <SectionHeading
        id="values-detail-heading"
        eyebrow="Our core values"
        title="Five Values, Practised on Every Job"
        description="These are not words on a wall. They shape how we quote, how we clean and how we treat your property."
      />

      <ul className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {coreValues.map(({ name, icon: Icon, detail }, index) => (
          <li key={name}>
            <Card className="h-full">
              <CardHeader className="gap-4">
                <div className="flex items-center justify-between">
                  <span className="flex size-12 items-center justify-center rounded-xl bg-brand text-white">
                    <Icon className="size-6" aria-hidden="true" />
                  </span>
                  <Badge variant="secondary">0{index + 1}</Badge>
                </div>
                <CardTitle className="mt-2 text-xl">
                  <h3>{name}</h3>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">{detail}</CardDescription>
              </CardContent>
            </Card>
          </li>
        ))}
        <li>
          <Card className="h-full justify-center border-0 bg-surface ring-1 ring-brand/10">
            <CardContent className="flex flex-col items-start gap-5">
              <p className="text-xl leading-snug font-bold text-ink">
                See these values at work in your own space.
              </p>
              <Link href="/#quote" className={buttonVariants()}>
                Get a Free Quote
                <ArrowRight aria-hidden="true" />
              </Link>
            </CardContent>
          </Card>
        </li>
      </ul>
    </Section>
  );
}
