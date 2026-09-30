import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { getService, type Service } from "@/data/services";
import { Section } from "@/components/layout/section";
import { SectionHeading } from "@/components/shared/section-heading";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

/** Internal links to related services, which also helps search engines crawl the site. */
export function RelatedServices({ slugs }: { slugs: string[] }) {
  const related = slugs.map(getService).filter((service): service is Service => Boolean(service));

  return (
    <Section tone="surface" aria-labelledby="related-heading">
      <SectionHeading
        id="related-heading"
        eyebrow="You may also need"
        title="Related Services"
      />
      <ul className="mt-12 grid gap-5 md:grid-cols-3">
        {related.map((service) => {
          const Icon = service.icon;
          return (
            <li key={service.slug}>
              <Card className="group relative h-full transition-all hover:-translate-y-0.5 hover:border-brand/30 hover:shadow-lg">
                <CardHeader className="gap-4">
                  <span className="flex size-12 items-center justify-center rounded-xl bg-brand/10 text-brand transition-colors group-hover:bg-brand group-hover:text-white">
                    <Icon className="size-6" aria-hidden="true" />
                  </span>
                  <CardTitle className="mt-2 text-lg">
                    <h3>{service.name}</h3>
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex-1">
                  <CardDescription className="text-base">{service.tagline}</CardDescription>
                </CardContent>
                <CardFooter>
                  <Link
                    href={`/services/${service.slug}`}
                    className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand after:absolute after:inset-0 focus-visible:underline focus-visible:outline-none"
                  >
                    Explore {service.name}
                    <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                  </Link>
                </CardFooter>
              </Card>
            </li>
          );
        })}
      </ul>
    </Section>
  );
}
