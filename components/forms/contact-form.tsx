"use client";

import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { MessageCircle } from "lucide-react";

import { FormField } from "@/components/forms/form-field";
import {
  leadFields,
  PropertySelect,
  SentPanel,
  ServiceSelect,
  serviceNameFor,
} from "@/components/forms/lead-fields";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { buildWhatsAppUrl, formatLeadMessage } from "@/lib/whatsapp";
import { formatIsoDate } from "@/lib/utils";

/** Only the essentials are required, so general enquiries are as easy as full quote requests. */
const contactSchema = z.object({
  name: leadFields.name,
  phone: leadFields.phone,
  email: leadFields.email,
  service: leadFields.service,
  propertyType: z.string(),
  location: z.string().trim(),
  preferredDate: leadFields.preferredDate,
  message: leadFields.details,
});

type ContactValues = z.infer<typeof contactSchema>;

function emptyValues(service = ""): ContactValues {
  return {
    name: "",
    phone: "",
    email: "",
    service,
    propertyType: "",
    location: "",
    preferredDate: "",
    message: "",
  };
}

function buildContactMessage(values: ContactValues) {
  return formatLeadMessage("Hello CityChic, I have an enquiry from your website.", [
    ["Name", values.name],
    ["Phone", values.phone],
    ["Email", values.email],
    ["Service", serviceNameFor(values.service)],
    ["Property", values.propertyType],
    ["Location", values.location],
    ["Preferred date", values.preferredDate ? formatIsoDate(values.preferredDate) : undefined],
    ["Message", values.message],
  ]);
}

export function ContactForm({ defaultService }: { defaultService?: string }) {
  const [sentUrl, setSentUrl] = useState<string | null>(null);

  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: emptyValues(defaultService),
  });

  function onValid(values: ContactValues) {
    const url = buildWhatsAppUrl(buildContactMessage(values));
    // Opened straight away while the click still counts as a user action.
    // The success panel keeps a direct link in case a popup blocker steps in.
    window.open(url, "_blank", "noopener,noreferrer");
    setSentUrl(url);
  }

  function startOver() {
    reset(emptyValues(defaultService));
    setSentUrl(null);
  }

  if (sentUrl) {
    return (
      <SentPanel
        url={sentUrl}
        title="Your Message Is Ready to Send"
        text="WhatsApp has opened with your message filled in. Tap send, and our team will get back to you within opening hours."
        onReset={startOver}
      />
    );
  }

  return (
    <form onSubmit={handleSubmit(onValid)} noValidate className="grid grid-cols-2 gap-x-4 gap-y-5">
      <FormField
        id="contact-name"
        label="Full name"
        required
        error={errors.name?.message}
        className="col-span-2"
      >
        <Input
          id="contact-name"
          placeholder="Your full name"
          autoComplete="name"
          aria-invalid={!!errors.name}
          aria-describedby={errors.name ? "contact-name-error" : undefined}
          {...register("name")}
        />
      </FormField>

      <FormField
        id="contact-phone"
        label="Phone number"
        required
        error={errors.phone?.message}
        className="col-span-2 sm:col-span-1"
      >
        <Input
          id="contact-phone"
          type="tel"
          inputMode="tel"
          placeholder="0803 000 0000"
          autoComplete="tel"
          aria-invalid={!!errors.phone}
          aria-describedby={errors.phone ? "contact-phone-error" : undefined}
          {...register("phone")}
        />
      </FormField>

      <FormField
        id="contact-email"
        label="Email"
        hint="Optional."
        error={errors.email?.message}
        className="col-span-2 sm:col-span-1"
      >
        <Input
          id="contact-email"
          type="email"
          inputMode="email"
          placeholder="you@example.com"
          autoComplete="email"
          aria-invalid={!!errors.email}
          aria-describedby={errors.email ? "contact-email-error" : "contact-email-hint"}
          {...register("email")}
        />
      </FormField>

      <FormField
        id="contact-service"
        label="Service"
        required
        error={errors.service?.message}
        className="col-span-2 sm:col-span-1"
      >
        <Controller
          control={control}
          name="service"
          render={({ field }) => (
            <ServiceSelect
              id="contact-service"
              ref={field.ref}
              value={field.value}
              onChange={field.onChange}
              onBlur={field.onBlur}
              invalid={!!errors.service}
            />
          )}
        />
      </FormField>

      <FormField
        id="contact-property"
        label="Property type"
        hint="Optional."
        className="col-span-2 sm:col-span-1"
      >
        <Controller
          control={control}
          name="propertyType"
          render={({ field }) => (
            <PropertySelect
              id="contact-property"
              ref={field.ref}
              value={field.value}
              onChange={field.onChange}
              onBlur={field.onBlur}
              invalid={false}
            />
          )}
        />
      </FormField>

      <FormField
        id="contact-location"
        label="Location in Lagos"
        hint="Optional."
        className="col-span-2 sm:col-span-1"
      >
        <Input
          id="contact-location"
          placeholder="e.g. Magodo Phase 2"
          autoComplete="address-level2"
          aria-describedby="contact-location-hint"
          {...register("location")}
        />
      </FormField>

      <FormField
        id="contact-date"
        label="Preferred date"
        hint="Optional. We will confirm availability."
        error={errors.preferredDate?.message}
        className="col-span-2 sm:col-span-1"
      >
        <Input
          id="contact-date"
          type="date"
          aria-invalid={!!errors.preferredDate}
          aria-describedby={errors.preferredDate ? "contact-date-error" : "contact-date-hint"}
          {...register("preferredDate")}
        />
      </FormField>

      <FormField
        id="contact-message"
        label="How can we help?"
        required
        hint="Tell us about the space, the job or your question."
        error={errors.message?.message}
        className="col-span-2"
      >
        <Textarea
          id="contact-message"
          rows={5}
          maxLength={1000}
          placeholder="For example: We are moving out of a 3-bedroom flat at the end of the month and need it spotless for the landlord inspection."
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? "contact-message-error" : "contact-message-hint"}
          {...register("message")}
        />
      </FormField>

      <div className="col-span-2 flex flex-col gap-3">
        <Button type="submit" size="lg" className="w-full">
          <MessageCircle aria-hidden="true" />
          Send My Message on WhatsApp
        </Button>
        <p className="text-center text-xs text-muted-foreground">
          Opens WhatsApp with your message filled in. Nothing is sent until you tap send.
        </p>
      </div>
    </form>
  );
}
