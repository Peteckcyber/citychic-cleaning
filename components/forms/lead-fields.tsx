"use client";

import type { Ref } from "react";
import { z } from "zod";
import { CircleCheck, MessageCircle, RotateCcw } from "lucide-react";

import { services } from "@/data/services";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { todayIso } from "@/lib/utils";

/** Shared building blocks for every lead form (quote builder, contact form). */

export const NOT_SURE = "not-sure";

export const propertyTypes = [
  "Apartment or Flat",
  "Duplex",
  "Terrace",
  "Bungalow",
  "Office",
  "Shop or Retail Space",
  "Warehouse or Factory",
  "Construction Site",
  "Other",
] as const;

export function serviceNameFor(slug: string): string {
  return services.find((service) => service.slug === slug)?.name ?? "Not sure yet, please advise";
}

export function isServiceSlug(value: string | null): value is string {
  return value !== null && services.some((service) => service.slug === value);
}

/** Accepts 0XXXXXXXXXX, +234XXXXXXXXXX and 234XXXXXXXXXX, with spaces or dashes. */
const NIGERIAN_PHONE = /^(?:\+?234|0)\d{10}$/;

export const leadFields = {
  service: z.string().min(1, "Choose the service you need."),
  propertyType: z.string().min(1, "Tell us what type of property it is."),
  location: z.string().trim().min(2, "Enter the area, for example Lekki Phase 1."),
  preferredDate: z
    .string()
    .refine((value) => value === "" || value >= todayIso(), "Choose today or a future date."),
  details: z
    .string()
    .trim()
    .min(10, "Tell us a little about the job so we can help properly.")
    .max(1000, "Keep it under 1,000 characters. You can share more on WhatsApp."),
  name: z.string().trim().min(2, "Enter your name so we know who to reply to."),
  phone: z
    .string()
    .trim()
    .refine(
      (value) => NIGERIAN_PHONE.test(value.replace(/[\s-]/g, "")),
      "Enter a Nigerian phone number, for example 0803 000 0000.",
    ),
  email: z.union([z.literal(""), z.email("Enter a valid email address, or leave it blank.")]),
};

type SelectFieldProps = {
  id: string;
  value: string;
  onChange: (value: string) => void;
  onBlur: () => void;
  invalid: boolean;
  ref?: Ref<HTMLButtonElement>;
};

export function ServiceSelect({ id, value, onChange, onBlur, invalid, ref }: SelectFieldProps) {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger
        id={id}
        ref={ref}
        onBlur={onBlur}
        aria-invalid={invalid}
        aria-describedby={invalid ? `${id}-error` : undefined}
      >
        <SelectValue placeholder="Choose a service" />
      </SelectTrigger>
      <SelectContent>
        {services.map((service) => (
          <SelectItem key={service.slug} value={service.slug}>
            {service.name}
          </SelectItem>
        ))}
        <SelectItem value={NOT_SURE}>Not sure yet, please advise</SelectItem>
      </SelectContent>
    </Select>
  );
}

export function PropertySelect({ id, value, onChange, onBlur, invalid, ref }: SelectFieldProps) {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger
        id={id}
        ref={ref}
        onBlur={onBlur}
        aria-invalid={invalid}
        aria-describedby={invalid ? `${id}-error` : undefined}
      >
        <SelectValue placeholder="Choose a property type" />
      </SelectTrigger>
      <SelectContent>
        {propertyTypes.map((type) => (
          <SelectItem key={type} value={type}>
            {type}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

type SentPanelProps = {
  url: string;
  title: string;
  text: string;
  onReset: () => void;
};

/** Confirmation shown after a form opens WhatsApp, with a fallback link if a popup was blocked. */
export function SentPanel({ url, title, text, onReset }: SentPanelProps) {
  return (
    <div className="flex flex-col items-center px-2 py-10 text-center" aria-live="polite">
      <span className="flex size-14 items-center justify-center rounded-full bg-brand/10 text-brand">
        <CircleCheck className="size-7" aria-hidden="true" />
      </span>
      <h3 className="mt-5 text-2xl font-bold">{title}</h3>
      <p className="mt-3 max-w-md text-muted-foreground">{text}</p>
      <div className="mt-8 flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className={buttonVariants({ size: "lg" })}
        >
          <MessageCircle aria-hidden="true" />
          Reopen WhatsApp
        </a>
        <Button type="button" variant="outline" size="lg" onClick={onReset}>
          <RotateCcw aria-hidden="true" />
          Start a New Request
        </Button>
      </div>
    </div>
  );
}
