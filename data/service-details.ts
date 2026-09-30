import { workPhotos, type WorkPhoto } from "@/data/images";

export type ServiceFaq = { question: string; answer: string };

export type ServiceDetail = {
  /** 140 to 160 characters, used for the meta description. */
  seoDescription: string;
  /** Real job photo for the page hero and its share image. */
  photo: WorkPhoto;
  /** What happens on the day, used in step three of "How it works". */
  onTheDay: string;
  faqs: ServiceFaq[];
  /** Two or three related service slugs. */
  related: string[];
};

const quoteFaq = (service: string): ServiceFaq => ({
  question: `How do I get a quote for ${service.toLowerCase()}?`,
  answer:
    "Every space is different, so we quote every job on its own terms. Send us the property type, location and a short description through the quote form or WhatsApp, and we will reply with a quote tailored to you.",
});

export const serviceDetails: Record<string, ServiceDetail> = {
  "post-construction-cleaning": {
    seoDescription:
      "Post-construction cleaning in Lagos. We clear cement haze, paint splatter and construction dust so new builds and renovations are handover ready. Get a quote.",
    photo: workPhotos.industrialFloor,
    onTheDay:
      "Our crew works room by room, from ceilings and vents down to floors and window tracks, clearing every trace of the build.",
    faqs: [
      {
        question: "When should I book a post-construction clean?",
        answer:
          "Once the builders, painters and fitters have finished and the heavy debris is out. Booking a little ahead of your handover or move-in date leaves room for a final touch-up if any trades need to return.",
      },
      {
        question: "Can you clean a large site in phases?",
        answer:
          "Yes. For larger developments we can clean floor by floor or block by block, following your construction programme so finished areas are ready while work continues elsewhere.",
      },
      {
        question: "Do you clean commercial and industrial buildings as well as homes?",
        answer:
          "Yes. We handle new homes and renovations as well as offices, warehouses, factories and other commercial buildings. Our gallery shows recent work on industrial sites.",
      },
      quoteFaq("Post-construction cleaning"),
    ],
    related: ["deep-cleaning", "facility-maintenance", "move-in-move-out-cleaning"],
  },
  "deep-cleaning": {
    seoDescription:
      "Deep cleaning in Lagos for homes and workplaces. Grease, grime and built-up dust removed from kitchens, bathrooms, floors and fittings. Request a free quote today.",
    photo: workPhotos.floorScrubbing,
    onTheDay:
      "We work top to bottom, from ceiling fans and high surfaces down to grout lines and skirting, so the whole space is genuinely reset.",
    faqs: [
      {
        question: "What is the difference between a deep clean and a regular clean?",
        answer:
          "A regular clean keeps a space tidy. A deep clean goes further, reaching behind and under furniture, degreasing kitchens, descaling bathrooms and detailing the fittings that routine cleaning skips.",
      },
      {
        question: "How often should I book a deep clean?",
        answer:
          "Many homes benefit from a deep clean a few times a year, before an event, or after a busy season. Pairing it with a bi-weekly or monthly plan keeps the result going for longer.",
      },
      quoteFaq("Deep cleaning"),
    ],
    related: ["post-construction-cleaning", "bi-weekly-cleaning", "monthly-cleaning"],
  },
  "fogging-disinfection": {
    seoDescription:
      "Fogging and fumigation disinfection in Lagos for homes, offices, schools and clinics. A clear safety protocol from preparation to safe re-entry. Get a quote.",
    photo: workPhotos.disinfectionSpray,
    onTheDay:
      "We prepare the space, apply the treatment room by room, allow the right dwell time and ventilation, then confirm when it is safe to return.",
    faqs: [
      {
        question: "Do we need to leave the building during fogging?",
        answer:
          "Yes. Occupants step out while the treatment is applied and during the dwell time. We confirm when it is safe to return and share simple aftercare guidance.",
      },
      {
        question: "How should we prepare before the treatment?",
        answer:
          "We walk you through it before the day. Typically, food, personal items and sensitive equipment are covered or removed so the treatment can reach every surface safely.",
      },
      {
        question: "Can fogging be arranged around our working hours?",
        answer:
          "Yes. For offices, schools and clinics we plan the treatment around your operating hours so it causes as little disruption as possible.",
      },
      quoteFaq("Fogging and disinfection"),
    ],
    related: ["facility-maintenance", "deep-cleaning", "residential-cleaning"],
  },
  "residential-cleaning": {
    seoDescription:
      "Residential cleaning in Lagos. Kitchens, bathrooms, bedrooms and living areas cleaned to a consistent standard by the CityChic crew. Get your free quote today.",
    photo: workPhotos.crewTeam,
    onTheDay:
      "Our crew cleans every living area to the scope we agreed, from kitchen counters and bathrooms to floors and furniture.",
    faqs: [
      {
        question: "Do I need to be at home during the clean?",
        answer:
          "That is up to you. Many clients are home for the first visit to agree the priorities, and we can work around your schedule after that.",
      },
      {
        question: "Can I choose which rooms are cleaned?",
        answer:
          "Yes. Tell us your priorities when you request a quote and we will agree a scope that covers the rooms and tasks that matter most to you.",
      },
      quoteFaq("Residential cleaning"),
    ],
    related: ["bi-weekly-cleaning", "monthly-cleaning", "deep-cleaning"],
  },
  "move-in-move-out-cleaning": {
    seoDescription:
      "Move-in and move-out cleaning in Lagos. Cupboards, appliances, bathrooms and floors cleaned so you can hand back the keys or move in fresh. Request a quote.",
    photo: workPhotos.wallTileDetailing,
    onTheDay:
      "We clean the empty property inside and out, including cupboards, wardrobes and appliances, before a single box comes through the door.",
    faqs: [
      {
        question: "Should the property be empty for a move-out clean?",
        answer:
          "It works best when furniture and belongings are out, so we can reach inside cupboards, behind appliances and along every wall and floor.",
      },
      {
        question: "Can you clean before I move into a new home?",
        answer:
          "Yes. A move-in clean means you start fresh, with kitchens, bathrooms and storage spaces cleaned before you unpack.",
      },
      quoteFaq("Move-in or move-out cleaning"),
    ],
    related: ["deep-cleaning", "post-construction-cleaning", "one-time-cleaning"],
  },
  "one-time-cleaning": {
    seoDescription:
      "One-time cleaning in Lagos with no subscription. A thorough clean for guests, events, inspections or catching up, scoped to your priorities. Get a free quote.",
    photo: workPhotos.tileResidueScraping,
    onTheDay:
      "Our crew focuses on the priorities we agreed, so the areas that matter most to you get the attention they need.",
    faqs: [
      {
        question: "Do I have to sign up for a plan?",
        answer:
          "No. A one-time clean is a single booking with no subscription and no commitment. If you like the result, you can move to a bi-weekly or monthly plan later.",
      },
      {
        question: "Can you clean before a party or visitors arrive?",
        answer:
          "Yes. Tell us the date and what matters most, and we will scope the clean so your space is ready when your guests arrive.",
      },
      quoteFaq("A one-time clean"),
    ],
    related: ["deep-cleaning", "residential-cleaning", "bi-weekly-cleaning"],
  },
  "bi-weekly-cleaning": {
    seoDescription:
      "Bi-weekly cleaning in Lagos. A thorough clean every two weeks on a day that suits you, so dust and grime never build up. Get your free quote on WhatsApp.",
    photo: workPhotos.crewTeam,
    onTheDay:
      "Every two weeks, our crew cleans kitchens, bathrooms and living areas, rotating focus areas so nothing is overlooked.",
    faqs: [
      {
        question: "Can I change or reschedule a visit?",
        answer:
          "Yes. Message us on WhatsApp and we will do our best to move the visit to a day that works for you.",
      },
      {
        question: "Is bi-weekly or monthly cleaning better for me?",
        answer:
          "Busy households and homes with children or pets usually prefer bi-weekly visits. Smaller or quieter homes often find a monthly plan is enough. We can help you choose when you request a quote.",
      },
      quoteFaq("Bi-weekly cleaning"),
    ],
    related: ["monthly-cleaning", "residential-cleaning", "deep-cleaning"],
  },
  "monthly-cleaning": {
    seoDescription:
      "Monthly cleaning subscriptions in Lagos for homes, short-let apartments and small offices. A planned, thorough clean every month. Request your free quote.",
    photo: workPhotos.facilityFloorMopping,
    onTheDay:
      "Once a month, our crew carries out a thorough clean of kitchens, bathrooms and living spaces to the scope you agreed once.",
    faqs: [
      {
        question: "Is a monthly plan suitable for short-let apartments?",
        answer:
          "Yes. A monthly plan keeps short-let apartments consistently presentable, and additional cleans can be booked between guests.",
      },
      {
        question: "Can I add an extra clean between monthly visits?",
        answer:
          "Yes. Subscription clients get priority booking for additional cleans. Just message us on WhatsApp.",
      },
      quoteFaq("A monthly cleaning plan"),
    ],
    related: ["bi-weekly-cleaning", "residential-cleaning", "facility-maintenance"],
  },
  "facility-maintenance": {
    seoDescription:
      "Facility maintenance cleaning in Lagos for offices, retail, estates, schools and clinics. Scheduled around your operating hours. Get a quote from CityChic.",
    photo: workPhotos.warehouseFloorClean,
    onTheDay:
      "Our crew follows the agreed schedule and scope, covering receptions, shared areas, washrooms and high-touch points around your hours.",
    faqs: [
      {
        question: "Can cleaning happen outside our working hours?",
        answer:
          "Yes. We build the schedule around how your building is used, so cleaning causes as little disruption as possible.",
      },
      {
        question: "Do you work with estates and multi-tenant buildings?",
        answer:
          "Yes. We maintain shared areas, receptions and washrooms for estates and multi-tenant buildings, as well as single offices and retail outlets.",
      },
      quoteFaq("Facility maintenance"),
    ],
    related: ["fogging-disinfection", "post-construction-cleaning", "monthly-cleaning"],
  },
};

export function getServiceDetail(slug: string): ServiceDetail {
  const detail = serviceDetails[slug];
  if (!detail) throw new Error(`Missing service detail for "${slug}"`);
  return detail;
}
