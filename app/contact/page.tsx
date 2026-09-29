import { Suspense } from "react";
import { Mail, Phone } from "lucide-react";

import { company, primaryPhone } from "@/data/company";
import { ContactForm } from "@/components/forms/contact-form";
import { ContactFormFromUrl } from "@/components/forms/contact-form-from-url";
import { Section } from "@/components/layout/section";
import { ContactDetails } from "@/components/sections/contact/contact-details";
import { ContactMap } from "@/components/sections/contact/contact-map";
import { PageHero } from "@/components/sections/page-hero";
import { RoadMarkingBanner } from "@/components/sections/road-marking-banner";
import { JsonLd } from "@/components/shared/json-ld";
import { WhatsAppIcon } from "@/components/shared/whatsapp-icon";
import { WhatsAppLink } from "@/components/shared/whatsapp-link";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { breadcrumbJsonLd, buildMetadata, contactPageJsonLd, type Crumb } from "@/lib/seo";
import { whatsappMessages } from "@/lib/whatsapp";

export const metadata = buildMetadata({
  title: "Contact CityChic | Free Cleaning Quote in Lagos",
  description:
    "Call, WhatsApp or email CityChic Cleaning Services in Magodo Phase 2, Lagos. Open Monday to Saturday, 8am to 6pm. Send us your job and get a free quote.",
  path: "/contact",
  absoluteTitle: true,
});

const crumbs: Crumb[] = [
  { name: "Home", path: "/" },
  { name: "Contact", path: "/contact" },
];

export default function ContactPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd(crumbs)} />
      <JsonLd data={contactPageJsonLd()} />

      <PageHero
        crumbs={crumbs}
        title={
          <>
            Get in Touch. <span className="text-white/65">We Are Ready When You Are.</span>
          </>
        }
        description={`Call, message or email us and our team will get back to you ${company.hours.summary}. Or send the details below and we will reply with a quote on WhatsApp.`}
        actions={
          <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <a
              href={`tel:${primaryPhone.tel}`}
              className={buttonVariants({ variant: "inverse", size: "lg" })}
            >
              <Phone aria-hidden="true" />
              Call {primaryPhone.display}
            </a>
            <WhatsAppLink
              message={whatsappMessages.general}
              showIcon={false}
              className={buttonVariants({ variant: "outline-inverse", size: "lg" })}
            >
              <WhatsAppIcon className="size-4" />
              Chat on WhatsApp
            </WhatsAppLink>
            <a
              href={`mailto:${company.email}`}
              className={buttonVariants({ variant: "outline-inverse", size: "lg" })}
            >
              <Mail aria-hidden="true" />
              Send an Email
            </a>
          </div>
        }
      />

      <Section tone="surface" aria-labelledby="contact-form-heading">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-7">
            <Card className="gap-0 py-0 shadow-xl">
              <CardHeader className="border-b px-6 py-6 sm:px-8">
                <CardTitle className="text-xl">
                  <h2 id="contact-form-heading">Send Us Your Request</h2>
                </CardTitle>
                <CardDescription>
                  Fields marked <span className="text-destructive">*</span> are required. Your
                  message opens in WhatsApp so you can check it before sending.
                </CardDescription>
              </CardHeader>
              <CardContent className="px-6 py-6 sm:px-8 sm:py-8">
                {/* The fallback is the same form with no preselected service, so it is in the static HTML. */}
                <Suspense fallback={<ContactForm />}>
                  <ContactFormFromUrl />
                </Suspense>
              </CardContent>
            </Card>
          </div>

          <aside aria-label="Contact details" className="lg:col-span-5">
            <ContactDetails />
          </aside>
        </div>
      </Section>

      <ContactMap />
      <RoadMarkingBanner />
    </>
  );
}
