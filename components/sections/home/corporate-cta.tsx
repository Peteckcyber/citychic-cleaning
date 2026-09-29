import { Building2, CalendarRange, Phone, SprayCan } from "lucide-react";

import { primaryPhone } from "@/data/company";
import { Section } from "@/components/layout/section";
import { SectionHeading } from "@/components/shared/section-heading";
import { WhatsAppLink } from "@/components/shared/whatsapp-link";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { whatsappMessages } from "@/lib/whatsapp";

const offers = [
  {
    icon: CalendarRange,
    title: "Phased Post-Construction Cleans",
    text: "Scheduled to follow your build programme, floor by floor or block by block.",
  },
  {
    icon: Building2,
    title: "Facility Maintenance Plans",
    text: "Recurring care for offices, estates and retail spaces, built around your hours.",
  },
  {
    icon: SprayCan,
    title: "Fogging and Disinfection",
    text: "Whole-space sanitising for workplaces, schools, clinics and shared areas.",
  },
];

export function CorporateCta() {
  return (
    <Section tone="brand" aria-labelledby="corporate-heading">
      <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <div>
          <SectionHeading
            id="corporate-heading"
            tone="dark"
            eyebrow="For developers and facility managers"
            title="Handover Day Should Never Be Delayed by Dust"
            description="We work with construction firms, estate managers and businesses across Lagos to deliver post-construction cleans and ongoing facility care on your schedule. One conversation, one accountable team."
          />
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <WhatsAppLink
              message={whatsappMessages.corporate}
              className={buttonVariants({ variant: "inverse", size: "lg" })}
            >
              Discuss a Project
            </WhatsAppLink>
            <a
              href={`tel:${primaryPhone.tel}`}
              className={buttonVariants({ variant: "outline-inverse", size: "lg" })}
            >
              <Phone aria-hidden="true" />
              Call {primaryPhone.display}
            </a>
          </div>
        </div>

        <Card className="gap-0 border-white/15 bg-white/[0.06] py-2 text-white shadow-none">
          <CardContent className="px-6 sm:px-8">
            <ul>
              {offers.map(({ icon: Icon, title, text }, index) => (
                <li key={title}>
                  {index > 0 && <Separator className="bg-white/15" />}
                  <div className="flex gap-5 py-6">
                    <span className="flex size-12 shrink-0 items-center justify-center rounded-lg bg-white text-brand">
                      <Icon className="size-6" aria-hidden="true" />
                    </span>
                    <div>
                      <h3 className="text-lg font-bold text-white">{title}</h3>
                      <p className="mt-1 leading-relaxed text-white/75">{text}</p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
    </Section>
  );
}
