import { ClipboardList, Clock, MessageCircle, Phone, Send } from "lucide-react";

import { company } from "@/data/company";
import { QuoteBuilder } from "@/components/forms/quote-builder";
import { Section } from "@/components/layout/section";
import { SectionHeading } from "@/components/shared/section-heading";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const steps = [
  {
    icon: ClipboardList,
    title: "Tell us about your space",
    text: "Choose a service and describe the job in your own words. It only takes a minute or two.",
  },
  {
    icon: Send,
    title: "Send it on WhatsApp",
    text: "Your answers arrive as one tidy message, so nothing gets lost in back and forth.",
  },
  {
    icon: MessageCircle,
    title: "Receive your quote",
    text: "We reply with a quote tailored to your property and lock in your preferred date.",
  },
];

export function QuoteSection() {
  return (
    <Section id="quote" tone="surface" aria-labelledby="quote-heading">
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <SectionHeading
            id="quote-heading"
            eyebrow="Free quote"
            title="Get a Tailored Quote Without the Back and Forth"
            description="Every space is different, so we quote every job on its own terms. Here is how it works."
          />

          <ol className="relative mt-10 space-y-8">
            <span
              aria-hidden="true"
              className="absolute top-2 bottom-2 left-[1.375rem] w-px bg-brand/15"
            />
            {steps.map(({ icon: Icon, title, text }, index) => (
              <li key={title} className="relative flex gap-5">
                <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-brand text-white ring-4 ring-surface">
                  <Icon className="size-5" aria-hidden="true" />
                </span>
                <div className="pt-1">
                  <p className="font-semibold text-ink">
                    <span className="sr-only">Step {index + 1}: </span>
                    {title}
                  </p>
                  <p className="mt-1 leading-relaxed text-muted-foreground">{text}</p>
                </div>
              </li>
            ))}
          </ol>

          <Separator className="my-10" />

          <div className="space-y-3">
            <p className="font-semibold text-ink">Prefer to talk to someone?</p>
            <div className="flex flex-col gap-2 sm:flex-row sm:gap-6">
              {company.phones.map((phone) => (
                <a
                  key={phone.tel}
                  href={`tel:${phone.tel}`}
                  className="inline-flex items-center gap-2 font-semibold text-brand hover:underline"
                >
                  <Phone className="size-4" aria-hidden="true" />
                  {phone.display}
                </a>
              ))}
            </div>
            <p className="flex items-center gap-2 text-sm text-muted-foreground">
              <Clock className="size-4 text-brand" aria-hidden="true" />
              {company.hours.summary}
            </p>
          </div>
        </div>

        <div className="lg:col-span-7">
          <Card className="gap-0 py-0 shadow-xl">
            <CardHeader className="border-b px-6 py-6 sm:px-8">
              <CardTitle className="text-xl">
                <h3>Build Your Quote Request</h3>
              </CardTitle>
              <CardDescription>
                Fields marked <span className="text-destructive">*</span> are required. We
                reply on WhatsApp within opening hours.
              </CardDescription>
            </CardHeader>
            <CardContent className="px-6 py-6 sm:px-8 sm:py-8">
              <QuoteBuilder />
            </CardContent>
          </Card>
        </div>
      </div>
    </Section>
  );
}
