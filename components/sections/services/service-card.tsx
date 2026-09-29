import Link from "next/link";
import { ArrowRight, CircleCheck, Star, Users } from "lucide-react";

import type { Service } from "@/data/services";
import { WhatsAppLink } from "@/components/shared/whatsapp-link";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { serviceQuoteMessage } from "@/lib/whatsapp";

/** Full breakdown of one service: pitch, who it suits, what is included and how to book. */
export function ServiceCard({ service }: { service: Service }) {
  const Icon = service.icon;

  return (
    <Card id={service.slug} className="scroll-mt-32 gap-0 overflow-hidden py-0">
      <CardContent className="grid p-0 lg:grid-cols-12">
        <div className="flex flex-col p-6 sm:p-8 lg:col-span-7 lg:p-10">
          <div className="flex items-start justify-between gap-4">
            <span className="flex size-14 shrink-0 items-center justify-center rounded-xl bg-brand text-white">
              <Icon className="size-7" aria-hidden="true" />
            </span>
            {service.flagship && (
              <Badge>
                <Star aria-hidden="true" />
                Specialty
              </Badge>
            )}
          </div>

          <h3 className="mt-6 text-2xl font-bold sm:text-3xl">{service.name}</h3>
          <p className="mt-2 text-lg font-medium text-brand">{service.tagline}</p>
          <p className="mt-4 leading-relaxed text-muted-foreground">{service.summary}</p>

          <p className="mt-6 flex items-start gap-3 rounded-lg bg-surface p-4 text-sm text-ink ring-1 ring-brand/10">
            <Users className="mt-0.5 size-4 shrink-0 text-brand" aria-hidden="true" />
            <span>
              <span className="font-semibold">Ideal for: </span>
              {service.idealFor}
            </span>
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row lg:mt-auto lg:pt-8">
            <WhatsAppLink
              message={serviceQuoteMessage(service.name)}
              className={buttonVariants({ size: "lg" })}
            >
              Get a Quote
            </WhatsAppLink>
            <Link
              href={`/services/${service.slug}`}
              className={buttonVariants({ variant: "outline", size: "lg" })}
            >
              Learn More
              <span className="sr-only"> about {service.name}</span>
              <ArrowRight aria-hidden="true" />
            </Link>
          </div>
        </div>

        <div className="border-t bg-surface p-6 sm:p-8 lg:col-span-5 lg:border-t-0 lg:border-l lg:p-10">
          <h4 className="text-sm font-semibold tracking-wider text-brand uppercase">
            What is included
          </h4>
          <ul className="mt-4">
            {service.included.map((item, index) => (
              <li key={item}>
                {index > 0 && <Separator />}
                <div className="flex gap-3 py-3.5">
                  <CircleCheck className="mt-0.5 size-5 shrink-0 text-brand" aria-hidden="true" />
                  <span className="text-sm leading-relaxed text-ink">{item}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}
