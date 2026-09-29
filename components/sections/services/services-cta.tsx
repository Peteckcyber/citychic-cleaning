import { company } from "@/data/company";
import { CtaBanner } from "@/components/sections/cta-banner";

/** Closing call to action for visitors who have not chosen a service yet. */
export function ServicesCta() {
  return (
    <CtaBanner
      id="services-cta-heading"
      eyebrow="Not sure where to start?"
      title="Tell Us About Your Space. We Will Recommend the Right Clean."
      description={`Describe the job in your own words and our team will reply on WhatsApp with the right service and a quote tailored to you. ${company.hours.summary}.`}
    />
  );
}
