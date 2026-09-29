/**
 * Single source of truth for verified company facts.
 * Never retype any of these values inside a component. Import them from here.
 */

/**
 * PENDING: replace with the production domain once the client confirms it.
 * The reserved .example TLD makes it obvious this is not live.
 */
const PLACEHOLDER_SITE_URL = "https://www.citychic.example";

/** The company's only published line, which also receives WhatsApp leads. Digits only, no plus sign. */
const WHATSAPP_NUMBER = "2347046983893";

const address = {
  area: "Magodo Phase 2, G.R.A",
  landmark: "By Secretariat Alausa Area",
  city: "Lagos",
  region: "Lagos",
  country: "Nigeria",
  countryCode: "NG",
} as const;

/** The client's confirmed public address (2026-09-29). Use this everywhere, with no street line. */
const fullAddress = `${address.area}, ${address.landmark}, ${address.city}, ${address.country}`;

export const company = {
  name: "CityChic Cleaning Services Ltd",
  shortName: "CityChic",
  legalName: "CityChic Nigeria Ltd",
  rcNumber: "RC 7312822G",
  foundingYear: 2019,
  siteUrl: PLACEHOLDER_SITE_URL,
  mission:
    "To surpass our clients' expectations by providing post-construction and deep cleaning services.",
  vision: "To become the best cleaning company in Nigeria.",
  email: "abikeajiboye15@gmail.com",
  // One number only. The client removed the second line on 2026-09-29; do not add it back.
  phones: [{ display: "+234 704 698 3893", tel: "+2347046983893" }],
  whatsappNumber: WHATSAPP_NUMBER,
  address,
  fullAddress,
  mapUrl: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(fullAddress)}`,
  /** Keyless Google Maps embed for the contact page. */
  mapEmbedUrl: `https://maps.google.com/maps?q=${encodeURIComponent(fullAddress)}&z=15&output=embed`,
  hours: {
    days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
    opens: "08:00",
    closes: "18:00",
    summary: "Monday to Saturday, 8am to 6pm",
    closedNote: "Closed on Sundays",
  },
  instagram: {
    handle: "@citychic_cleaning",
    url: "https://www.instagram.com/citychic_cleaning/",
  },
  roadMarking: {
    name: "CityChic Road Marking Services Limited",
    url: "https://citychicroadmarking.com",
  },
} as const;

export const primaryPhone = company.phones[0];
