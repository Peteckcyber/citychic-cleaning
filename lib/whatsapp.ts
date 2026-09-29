import { company } from "@/data/company";

/** The only place in the codebase that builds WhatsApp click-to-chat links. */
export function buildWhatsAppUrl(message: string): string {
  return `https://wa.me/${company.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

export const whatsappMessages = {
  general: "Hello CityChic, I would like to ask about your cleaning services.",
  quote: "Hello CityChic, I would like a free quote for a cleaning job.",
  corporate:
    "Hello CityChic, I would like to discuss cleaning for a commercial or construction project.",
} as const;

/** Short prefilled message for a quote on one specific service. */
export function serviceQuoteMessage(serviceName: string): string {
  return `Hello CityChic, I would like a quote for ${serviceName}.`;
}

export type LeadField = [label: string, value: string | undefined | null];

/**
 * Formats form answers into a tidy WhatsApp message.
 * Empty optional fields are left out entirely rather than shown as blanks.
 */
export function formatLeadMessage(intro: string, fields: LeadField[]): string {
  const lines = fields
    .filter(([, value]) => value !== undefined && value !== null && value.trim() !== "")
    .map(([label, value]) => `*${label}:* ${value!.trim()}`);

  return [intro, "", ...lines, "", "Sent from the CityChic website"].join("\n");
}
