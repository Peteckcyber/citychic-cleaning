import { ClipboardList, Footprints, ListChecks, SearchCheck } from "lucide-react";

import { Section } from "@/components/layout/section";
import { SectionHeading } from "@/components/shared/section-heading";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const checks = [
  {
    icon: ClipboardList,
    title: "Pre-Job Walkthrough",
    text: "We confirm the scope with you, note problem areas and agree what done looks like before any work starts.",
  },
  {
    icon: ListChecks,
    title: "Room-by-Room Checklist",
    text: "Crews work to a checklist for every room, so nothing depends on memory and nothing is missed.",
  },
  {
    icon: SearchCheck,
    title: "Supervisor Inspection",
    text: "A supervisor inspects the finished work and sends the crew back to anything that falls short.",
  },
  {
    icon: Footprints,
    title: "Client Walkthrough",
    text: "We walk the space with you before sign-off, so you see the result first-hand and any touch-ups happen on the spot.",
  },
];

export function QualityControl() {
  return (
    <Section tone="surface" aria-labelledby="quality-heading">
      <SectionHeading
        id="quality-heading"
        align="center"
        eyebrow="Quality control"
        title="How We Make Sure It Is Done Right"
        description="Consistency does not happen by accident. Every job passes through the same four checkpoints."
      />
      <ol className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {checks.map(({ icon: Icon, title, text }, index) => (
          <li key={title}>
            <Card className="h-full">
              <CardHeader className="gap-4">
                <div className="flex items-center justify-between">
                  <span className="flex size-12 items-center justify-center rounded-xl bg-brand/10 text-brand">
                    <Icon className="size-6" aria-hidden="true" />
                  </span>
                  <Badge variant="outline">Check {index + 1}</Badge>
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
