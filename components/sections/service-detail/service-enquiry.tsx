import { Clock, Phone } from "lucide-react";

import { company, primaryPhone } from "@/data/company";
import { ContactForm } from "@/components/forms/contact-form";
import { Section } from "@/components/layout/section";
import { SectionHeading } from "@/components/shared/section-heading";
import { Card, CardContent } from "@/components/ui/card";

/** Contact form with this service already selected. */
export function ServiceEnquiry({ slug, serviceName }: { slug: string; serviceName: string }) {
  return (
    <Section aria-labelledby="enquiry-heading">
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <SectionHeading
            id="enquiry-heading"
            eyebrow="Free quote"
            title={`Get a Quote for ${serviceName}`}
            description="Tell us about your space and we will reply on WhatsApp with a quote tailored to you."
          />
          <div className="mt-8 space-y-3 text-sm">
            <a
              href={`tel:${primaryPhone.tel}`}
              className="flex items-center gap-2 font-semibold text-brand hover:underline"
            >
              <Phone className="size-4" aria-hidden="true" />
              Prefer to talk? Call {primaryPhone.display}
            </a>
            <p className="flex items-center gap-2 text-muted-foreground">
              <Clock className="size-4 text-brand" aria-hidden="true" />
              {company.hours.summary}
            </p>
          </div>
        </div>

        <div className="lg:col-span-7">
          <Card className="gap-0 py-0 shadow-xl">
            <CardContent className="px-6 py-6 sm:px-8 sm:py-8">
              <ContactForm defaultService={slug} />
            </CardContent>
          </Card>
        </div>
      </div>
    </Section>
  );
}
