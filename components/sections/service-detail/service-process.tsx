import { CalendarCheck, ClipboardList, Sparkles, Wrench } from "lucide-react";

import { Section } from "@/components/layout/section";
import { SectionHeading } from "@/components/shared/section-heading";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

/** Four-step booking and delivery process. Step three is specific to the service. */
export function ServiceProcess({ serviceName, onTheDay }: { serviceName: string; onTheDay: string }) {
  const steps = [
    {
      icon: ClipboardList,
      title: "Share the Details",
      text: "Tell us about your space through the quote form or WhatsApp: the property, the location and what needs doing.",
    },
    {
      icon: CalendarCheck,
      title: "Get Your Quote",
      text: "We reply with a quote tailored to your space and agree the scope and a date that suits you.",
    },
    { icon: Wrench, title: "We Get to Work", text: onTheDay },
    {
      icon: Sparkles,
      title: "Enjoy the Result",
      text: "Step into a space that is clean, fresh and ready for whatever comes next.",
    },
  ];

  return (
    <Section tone="surface" aria-labelledby="process-heading">
      <SectionHeading
        id="process-heading"
        align="center"
        eyebrow="How it works"
        title={`Booking ${serviceName} Is Simple`}
      />
      <ol className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {steps.map(({ icon: Icon, title, text }, index) => (
          <li key={title}>
            <Card className="h-full">
              <CardHeader className="gap-4">
                <div className="flex items-center justify-between">
                  <span className="flex size-12 items-center justify-center rounded-xl bg-brand text-white">
                    <Icon className="size-6" aria-hidden="true" />
                  </span>
                  <Badge variant="secondary">Step {index + 1}</Badge>
                </div>
                <CardTitle className="mt-2 text-lg">
                  <h3>{title}</h3>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">{text}</CardDescription>
              </CardContent>
            </Card>
          </li>
        ))}
      </ol>
    </Section>
  );
}
