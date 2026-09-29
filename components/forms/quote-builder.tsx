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

const quoteSchema = z.object({
  service: leadFields.service,
  propertyType: leadFields.propertyType,
  location: leadFields.location,
  preferredDate: leadFields.preferredDate,
  details: leadFields.details,
  name: leadFields.name,
});

type QuoteValues = z.infer<typeof quoteSchema>;

const defaultValues: QuoteValues = {
  service: "",
  propertyType: "",
  location: "",
  preferredDate: "",
  details: "",
  name: "",
};

function buildQuoteMessage(values: QuoteValues) {
  return formatLeadMessage("Hello CityChic, I would like a quote.", [
    ["Name", values.name],
    ["Service", serviceNameFor(values.service)],
    ["Property", values.propertyType],
    ["Location", values.location],
    ["Preferred date", values.preferredDate ? formatIsoDate(values.preferredDate) : undefined],
    ["Details", values.details],
  ]);
}

export function QuoteBuilder() {
  const [sentUrl, setSentUrl] = useState<string | null>(null);

  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<QuoteValues>({
    resolver: zodResolver(quoteSchema),
    defaultValues,
  });

  function onValid(values: QuoteValues) {
    const url = buildWhatsAppUrl(buildQuoteMessage(values));
    // Opened straight away while the click still counts as a user action.
    // The success panel keeps a direct link in case a popup blocker steps in.
    window.open(url, "_blank", "noopener,noreferrer");
    setSentUrl(url);
  }

  function startOver() {
    reset(defaultValues);
    setSentUrl(null);
  }

  if (sentUrl) {
    return (
      <SentPanel
        url={sentUrl}
        title="Your Quote Request Is Ready"
        text="WhatsApp has opened with your details filled in. Tap send, and our team will reply with a quote tailored to your space."
        onReset={startOver}
      />
    );
  }

  return (
    <form onSubmit={handleSubmit(onValid)} noValidate className="grid grid-cols-2 gap-x-4 gap-y-5">
      <FormField
        className="col-span-2 sm:col-span-1"
        id="quote-service"
        label="Service needed"
        required
        error={errors.service?.message}
      >
        <Controller
          control={control}
          name="service"
          render={({ field }) => (
            <ServiceSelect
              id="quote-service"
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
        id="quote-property"
        className="col-span-2 sm:col-span-1"
        label="Property type"
        required
        error={errors.propertyType?.message}
      >
        <Controller
          control={control}
          name="propertyType"
          render={({ field }) => (
            <PropertySelect
              id="quote-property"
              ref={field.ref}
              value={field.value}
              onChange={field.onChange}
              onBlur={field.onBlur}
              invalid={!!errors.propertyType}
            />
          )}
        />
      </FormField>

      <FormField
        className="col-span-2 sm:col-span-1"
        id="quote-location"
        label="Location in Lagos"
        required
        error={errors.location?.message}
      >
        <Input
          id="quote-location"
          placeholder="e.g. Lekki Phase 1"
          autoComplete="address-level2"
          aria-invalid={!!errors.location}
          aria-describedby={errors.location ? "quote-location-error" : undefined}
          {...register("location")}
        />
      </FormField>

      <FormField
        id="quote-date"
        className="col-span-2 sm:col-span-1"
        label="Preferred date"
        hint="Optional. We will confirm availability."
        error={errors.preferredDate?.message}
      >
        <Input
          id="quote-date"
          type="date"
          aria-invalid={!!errors.preferredDate}
          aria-describedby={errors.preferredDate ? "quote-date-error" : "quote-date-hint"}
          {...register("preferredDate")}
        />
      </FormField>

      <FormField
        id="quote-details"
        label="Describe your request"
        required
        hint="The more we know, the more accurate your quote."
        error={errors.details?.message}
        className="col-span-2"
      >
        <Textarea
          id="quote-details"
          rows={5}
          maxLength={1000}
          placeholder="For example: 4-bedroom duplex, builders finished last week. Paint splatter on the tiles and dust everywhere. We need it ready for handover."
          aria-invalid={!!errors.details}
          aria-describedby={errors.details ? "quote-details-error" : "quote-details-hint"}
          {...register("details")}
        />
      </FormField>

      <FormField
        id="quote-name"
        label="Your name"
        required
        error={errors.name?.message}
        className="col-span-2"
      >
        <Input
          id="quote-name"
          placeholder="Full name"
          autoComplete="name"
          aria-invalid={!!errors.name}
          aria-describedby={errors.name ? "quote-name-error" : undefined}
          {...register("name")}
        />
      </FormField>

      <div className="col-span-2 flex flex-col gap-3">
        <Button type="submit" size="lg" className="w-full">
          <MessageCircle aria-hidden="true" />
          Get My Quote on WhatsApp
        </Button>
        <p className="text-center text-xs text-muted-foreground">
          Opens WhatsApp with your details filled in. Nothing is sent until you tap send.
        </p>
      </div>
    </form>
  );
}
