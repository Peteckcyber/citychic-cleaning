import { workPhotos } from "@/data/images";
import { getServiceDetail } from "@/data/service-details";
import { services } from "@/data/services";

export type OgPage = {
  /** File name without extension, served at /og/<key>.jpg. */
  key: string;
  alt: string;
  eyebrow: string;
  title: string;
  subtitle: string;
  photoSrc: string;
};

/** Every share card on the site. Each page's metadata points at its own card. */
export const ogPages: OgPage[] = [
  {
    key: "home",
    alt: "CityChic Cleaning Services, cleaning you can count on in Lagos",
    eyebrow: "CityChic Cleaning Services",
    title: "Cleaning You Can Count On.",
    subtitle: "Post-construction, deep cleaning and disinfection across Lagos.",
    photoSrc: workPhotos.industrialFloor.src,
  },
  {
    key: "services",
    alt: "CityChic cleaning services in Lagos",
    eyebrow: "Our Services",
    title: "Cleaning Services in Lagos",
    subtitle: "Nine services, delivered to one exacting standard.",
    photoSrc: workPhotos.facilityFloorMopping.src,
  },
  {
    key: "about",
    alt: "The CityChic Cleaning Services crew",
    eyebrow: "About CityChic",
    title: "Built on Detail. Trusted Since 2019.",
    subtitle: "A Lagos cleaning company, CAC registered RC 7312822G.",
    photoSrc: workPhotos.crewTeam.src,
  },
  {
    key: "gallery",
    alt: "Real photos of CityChic cleaning jobs",
    eyebrow: "Our Work",
    title: "Our Work, Up Close.",
    subtitle: "Real photos and videos from CityChic jobs.",
    photoSrc: workPhotos.warehouseFloorClean.src,
  },
  {
    key: "contact",
    alt: "Contact CityChic Cleaning Services for a free quote",
    eyebrow: "Contact Us",
    title: "Get Your Free Quote",
    subtitle: "Call or WhatsApp us, Monday to Saturday, 8am to 6pm.",
    photoSrc: workPhotos.wallTileDetailing.src,
  },
  ...services.map((service) => ({
    key: `service-${service.slug}`,
    alt: `${service.name} in Lagos by CityChic Cleaning Services`,
    eyebrow: "CityChic Cleaning Services",
    title: `${service.name} in Lagos`,
    subtitle: service.tagline,
    photoSrc: getServiceDetail(service.slug).photo.src,
  })),
];

export function getOgPage(key: string): OgPage {
  const page = ogPages.find((candidate) => candidate.key === key);
  if (!page) throw new Error(`Missing share card "${key}"`);
  return page;
}
