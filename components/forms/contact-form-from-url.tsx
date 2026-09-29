"use client";

import { useSearchParams } from "next/navigation";

import { ContactForm } from "@/components/forms/contact-form";
import { isServiceSlug } from "@/components/forms/lead-fields";

/** Preselects the service from ?service=slug, so any page can link straight into the form. */
export function ContactFormFromUrl() {
  const service = useSearchParams().get("service");
  return <ContactForm key={service ?? "none"} defaultService={isServiceSlug(service) ? service : ""} />;
}
