import {
  Building2,
  CalendarCheck,
  CalendarClock,
  CalendarDays,
  HardHat,
  House,
  Sparkles,
  SprayCan,
  Truck,
  type LucideIcon,
} from "lucide-react";

export type ServiceGroup = "construction-deep" | "home-plans" | "commercial";

export type Service = {
  slug: string;
  name: string;
  icon: LucideIcon;
  group: ServiceGroup;
  /** Flagship services lead every listing. They are the company mission. */
  flagship: boolean;
  /** One-line benefit used on cards. */
  tagline: string;
  /** Two or three sentence pitch used on the services page and detail pages. */
  summary: string;
  included: string[];
  idealFor: string;
};

export const serviceGroups: Record<ServiceGroup, string> = {
  "construction-deep": "Construction and Deep Cleans",
  "home-plans": "Home Cleaning Plans",
  commercial: "Commercial and Disinfection",
};

export const services: Service[] = [
  {
    slug: "post-construction-cleaning",
    name: "Post-Construction Cleaning",
    icon: HardHat,
    group: "construction-deep",
    flagship: true,
    tagline: "From dusty shell to handover ready, without the stress.",
    summary:
      "Builders leave. We make it liveable. Our post-construction crews clear cement haze, paint splatter, sawdust and sticker residue from every surface, so your new build or renovation is ready for handover, inspection or move-in.",
    included: [
      "Removal of construction dust from walls, ceilings, vents and light fittings",
      "Cement haze, grout film and paint splatter lifted from floors and tiles",
      "Stickers, film and residue cleared from windows, frames and fittings",
      "Window tracks, sockets, switches and skirting boards detailed by hand",
      "Kitchens and bathrooms scrubbed and polished to a showroom finish",
      "Debris bagged and removed so the property is ready to show",
    ],
    idealFor:
      "Developers, contractors and homeowners completing new builds or renovations",
  },
  {
    slug: "deep-cleaning",
    name: "Deep Cleaning",
    icon: Sparkles,
    group: "construction-deep",
    flagship: true,
    tagline: "The top-to-bottom reset your home has been waiting for.",
    summary:
      "A deep clean reaches the places routine cleaning never touches. We work room by room, from ceiling fans to grout lines, removing built-up grime, grease and dust so your space feels genuinely fresh again.",
    included: [
      "Ceiling fans, light fittings and high surfaces dusted and wiped",
      "Kitchen degreasing, including cabinet fronts, splashbacks and appliance exteriors",
      "Bathroom descaling of tiles, taps, showers and sanitary ware",
      "Behind and under movable furniture cleaned thoroughly",
      "Doors, frames, handles, switches and skirting boards wiped down",
      "Floors vacuumed and mopped edge to edge",
    ],
    idealFor:
      "Homes that need a full reset, pre-event preparation and seasonal refreshes",
  },
  {
    slug: "fogging-disinfection",
    name: "Fogging & Fumigation Disinfection",
    icon: SprayCan,
    group: "commercial",
    flagship: false,
    tagline: "Reach every corner that a cloth and spray bottle cannot.",
    summary:
      "Our fogging and fumigation service disperses a fine disinfecting mist that settles on surfaces, fabrics and hard-to-reach corners. It is the fastest way to sanitise an entire home, office or facility, and it is carried out to a clear safety protocol from start to finish.",
    included: [
      "Pre-treatment walkthrough and preparation guidance",
      "Fogging application across every room and shared area",
      "Targeted disinfection of high-touch points such as handles, rails and switches",
      "Fumigation treatment for common crawling pests on request",
      "Controlled dwell time followed by ventilation",
      "Clear safe re-entry guidance before you return",
    ],
    idealFor:
      "Offices, schools, clinics, estates and homes after illness or pest activity",
  },
  {
    slug: "residential-cleaning",
    name: "Residential Cleaning",
    icon: House,
    group: "home-plans",
    flagship: false,
    tagline: "A consistently clean home, handled by people you can rely on.",
    summary:
      "Come home to a space that is clean, calm and cared for. Our residential cleans cover every living area to a consistent standard, so you spend your evenings and weekends on what matters to you.",
    included: [
      "Dusting and wiping of all reachable surfaces and furniture",
      "Kitchen counters, sink and appliance exteriors cleaned",
      "Bathrooms cleaned and sanitised",
      "Beds made and living areas tidied",
      "Floors vacuumed and mopped throughout",
      "Waste bins emptied and relined",
    ],
    idealFor: "Busy families, professionals and landlords managing homes",
  },
  {
    slug: "move-in-move-out-cleaning",
    name: "Move-In / Move-Out Cleaning",
    icon: Truck,
    group: "home-plans",
    flagship: false,
    tagline: "Hand back the keys or start fresh with a spotless property.",
    summary:
      "Moving is stressful enough. We prepare empty properties to a standard that satisfies landlords and delights new occupants, cleaning inside cupboards, wardrobes and appliances before a single box comes through the door.",
    included: [
      "Inside cabinets, wardrobes and drawers wiped clean",
      "Kitchen appliances cleaned inside and out",
      "Bathrooms descaled and sanitised",
      "Walls spot cleaned and skirting boards wiped",
      "Windows, sills and tracks cleaned",
      "Floors deep cleaned throughout",
    ],
    idealFor: "Tenants, landlords, estate agents and new homeowners",
  },
  {
    slug: "one-time-cleaning",
    name: "One-Time Cleaning",
    icon: CalendarCheck,
    group: "home-plans",
    flagship: false,
    tagline: "A single, thorough clean exactly when you need it.",
    summary:
      "Hosting guests, preparing for an inspection or simply catching up? Book a one-time clean scoped to your priorities, with no subscription and no commitment.",
    included: [
      "A cleaning scope agreed around your priorities",
      "Kitchen and bathroom cleaning and sanitising",
      "Dusting and wiping of surfaces and fittings",
      "Floors vacuumed and mopped",
      "Living areas tidied and refreshed",
      "Rubbish gathered and bins emptied",
    ],
    idealFor: "Special occasions, visitors, inspections and catch-up cleans",
  },
  {
    slug: "bi-weekly-cleaning",
    name: "Bi-Weekly Cleaning",
    icon: CalendarClock,
    group: "home-plans",
    flagship: false,
    tagline: "Every two weeks, your home reset to a standard you can count on.",
    summary:
      "A fortnightly visit keeps dust, grease and clutter from ever building up. You get the same trusted standard on a steady rhythm, planned around your calendar.",
    included: [
      "Scheduled visits every two weeks on a day that suits you",
      "Full kitchen and bathroom clean on every visit",
      "Dusting of surfaces, fittings and furniture",
      "Floors vacuumed and mopped throughout",
      "Rotating focus areas so nothing is overlooked",
      "Easy rescheduling through WhatsApp",
    ],
    idealFor: "Households that want lasting cleanliness without weekly visits",
  },
  {
    slug: "monthly-cleaning",
    name: "Monthly Cleaning Subscriptions",
    icon: CalendarDays,
    group: "home-plans",
    flagship: false,
    tagline: "A dependable monthly clean that keeps your space in shape.",
    summary:
      "Our monthly subscription gives your home or office a thorough, planned clean every month. It is the simplest way to protect your property and keep standards high without thinking about it.",
    included: [
      "A fixed monthly visit booked in advance",
      "Thorough kitchen, bathroom and living area cleaning",
      "Detail work on switches, handles, skirting and frames",
      "Floors cleaned edge to edge",
      "Priority booking for additional cleans",
      "A consistent scope you agree once and never repeat",
    ],
    idealFor: "Homes, short-let apartments and small offices",
  },
  {
    slug: "facility-maintenance",
    name: "Facility Maintenance",
    icon: Building2,
    group: "commercial",
    flagship: false,
    tagline: "Keep your workplace clean, safe and presentable every day.",
    summary:
      "First impressions happen at your front door. Our facility maintenance plans keep offices, retail spaces and estates consistently clean, with a schedule and scope built around how your building is used.",
    included: [
      "Scheduled cleaning of offices, receptions and shared areas",
      "Washroom cleaning, sanitising and restocking checks",
      "Kitchenette and break area cleaning",
      "High-touch point disinfection",
      "Floor care across tiles, rugs and hard surfaces",
      "A scope and schedule built around your operating hours",
    ],
    idealFor: "Offices, retail outlets, estates, schools and clinics",
  },
];

export function getService(slug: string): Service | undefined {
  return services.find((service) => service.slug === slug);
}
