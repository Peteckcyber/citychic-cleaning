import { MapPin, Navigation } from "lucide-react";

import { company } from "@/data/company";
import { Section } from "@/components/layout/section";
import { ExternalLink } from "@/components/shared/external-link";
import { buttonVariants } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

/** Embedded Google map of the office with an overlay card for directions. */
export function ContactMap() {
  return (
    <Section compact aria-label="Office location map">
      <Card className="relative gap-0 overflow-hidden py-0">
        <iframe
          src={company.mapEmbedUrl}
          title={`Map showing ${company.fullAddress}`}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="block h-[26rem] w-full border-0 sm:h-[30rem]"
          allowFullScreen
        />
        <div className="absolute inset-x-4 bottom-4 sm:inset-x-auto sm:bottom-6 sm:left-6 sm:max-w-sm">
          <Card className="gap-3 p-5 shadow-xl">
            <p className="flex items-start gap-3 text-sm leading-relaxed text-ink">
              <MapPin className="mt-0.5 size-5 shrink-0 text-brand" aria-hidden="true" />
              {company.fullAddress}
            </p>
            <ExternalLink
              href={company.mapUrl}
              showIcon={false}
              className={buttonVariants({ className: "w-full" })}
            >
              <Navigation aria-hidden="true" />
              Get Directions in Google Maps
            </ExternalLink>
          </Card>
        </div>
      </Card>
    </Section>
  );
}
