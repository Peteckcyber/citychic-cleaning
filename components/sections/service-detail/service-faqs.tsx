import { MessageCircle } from "lucide-react";

import type { ServiceFaq } from "@/data/service-details";
import { Section } from "@/components/layout/section";
import { SectionHeading } from "@/components/shared/section-heading";
import { WhatsAppLink } from "@/components/shared/whatsapp-link";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { serviceQuoteMessage } from "@/lib/whatsapp";

export function ServiceFaqs({ serviceName, faqs }: { serviceName: string; faqs: ServiceFaq[] }) {
  return (
    <Section aria-labelledby="faq-heading">
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <SectionHeading
            id="faq-heading"
            eyebrow="Questions"
            title="Frequently Asked Questions"
            description={`The questions we hear most about ${serviceName.toLowerCase()}. Still unsure? Ask us directly.`}
          />
          <WhatsAppLink
            message={serviceQuoteMessage(serviceName)}
            showIcon={false}
            className={buttonVariants({ size: "lg", className: "mt-8" })}
          >
            <MessageCircle aria-hidden="true" />
            Ask Us on WhatsApp
          </WhatsAppLink>
        </div>

        <div className="lg:col-span-7">
          <Card className="gap-0 py-2">
            <CardContent className="px-6 sm:px-8">
              <Accordion type="single" collapsible defaultValue="faq-0">
                {faqs.map((faq, index) => (
                  <AccordionItem key={faq.question} value={`faq-${index}`}>
                    <AccordionTrigger>{faq.question}</AccordionTrigger>
                    {/* forceMount keeps every answer in the static HTML for search engines. */}
                    <AccordionContent forceMount className="group-data-[state=closed]:hidden">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>
        </div>
      </div>
    </Section>
  );
}
