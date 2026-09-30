import type { Metadata } from "next";
import { company } from "@/data/company";
import { images, workPhotos } from "@/data/images";
import { services } from "@/data/services";
import { getOgPage } from "@/lib/og-pages";

export const siteName = "CityChic Cleaning Services";

type BuildMetadataInput = {
  title: string;
  description: string;
  /** Route path starting with a slash, for example "/services". */
  path: string;
  /** Skip the "| CityChic Cleaning Services" suffix, used on the home page. */
  absoluteTitle?: boolean;
  /** Share card key from lib/og-pages.ts, served at /og/<key>.jpg. */
  shareImage: string;
};

/** Open Graph image descriptor for a share card, reused by the root layout as the default. */
export function shareImageFor(key: string) {
  const page = getOgPage(key);
  return { url: `/og/${page.key}.jpg`, width: 1200, height: 630, alt: page.alt, type: "image/jpeg" };
}

/** Per-route metadata with canonical URL, Open Graph and Twitter tags, and the page's share card. */
export function buildMetadata({
  title,
  description,
  path,
  absoluteTitle = false,
  shareImage,
}: BuildMetadataInput): Metadata {
  const fullTitle = absoluteTitle ? title : `${title} | ${siteName}`;
  const image = shareImageFor(shareImage);

  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      locale: "en_NG",
      siteName,
      url: path,
      title: fullTitle,
      description,
      images: [image],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [image.url],
    },
  };
}

export function absoluteUrl(path: string): string {
  return new URL(path, company.siteUrl).toString();
}

/** Safe serialisation for JSON-LD script tags, per the Next.js JSON-LD guide. */
export function serializeJsonLd(data: unknown): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

const businessId = absoluteUrl("/#business");

export type Crumb = { name: string; path: string };

/** BreadcrumbList schema for inner pages. */
export function breadcrumbJsonLd(crumbs: Crumb[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((crumb, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: crumb.name,
      item: absoluteUrl(crumb.path),
    })),
  };
}

/** CollectionPage schema listing the gallery photos as ImageObjects. */
export function galleryJsonLd(photos: { src: string; alt: string; title: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    url: absoluteUrl("/gallery"),
    name: `${company.shortName} Cleaning Gallery`,
    about: { "@id": businessId },
    hasPart: photos.map((photo) => ({
      "@type": "ImageObject",
      contentUrl: absoluteUrl(photo.src),
      name: photo.title,
      description: photo.alt,
      creator: { "@id": businessId },
    })),
  };
}

/** ContactPage schema pointing at the business entity, which carries the NAP details. */
export function contactPageJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    url: absoluteUrl("/contact"),
    name: `Contact ${company.shortName}`,
    about: { "@id": businessId },
  };
}

/** AboutPage schema pointing at the business entity. */
export function aboutPageJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    url: absoluteUrl("/about"),
    name: `About ${company.shortName}`,
    about: { "@id": businessId },
  };
}

/** Service schema for one detail page, provided by the CleaningService. No price, by design. */
export function serviceJsonLd(
  service: { slug: string; name: string; summary: string },
  imageSrc: string,
) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": absoluteUrl(`/services/${service.slug}#service`),
    name: service.name,
    serviceType: service.name,
    description: service.summary,
    url: absoluteUrl(`/services/${service.slug}`),
    image: absoluteUrl(imageSrc),
    areaServed: { "@type": "City", name: "Lagos" },
    provider: { "@id": businessId },
  };
}

/** FAQPage schema from question and answer pairs. */
export function faqJsonLd(faqs: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };
}

/** ItemList of every service, each linked to its detail page and to the business. */
export function servicesListJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "CityChic Cleaning Services",
    itemListElement: services.map((service, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "Service",
        name: service.name,
        description: service.summary,
        url: absoluteUrl(`/services/${service.slug}`),
        areaServed: { "@type": "City", name: "Lagos" },
        provider: { "@id": businessId },
      },
    })),
  };
}

/** CleaningService and WebSite schema, rendered once in the root layout. No priceRange by design. */
export function siteJsonLd() {
  const business: Record<string, unknown> = {
    "@type": "CleaningService",
    "@id": businessId,
    name: company.name,
    legalName: company.legalName,
    url: company.siteUrl,
    description: company.mission,
    slogan: company.vision,
    foundingDate: String(company.foundingYear),
    telephone: company.phones[0].tel,
    email: company.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: `${company.address.area}, ${company.address.landmark}`,
      addressLocality: company.address.city,
      addressRegion: company.address.region,
      addressCountry: company.address.countryCode,
    },
    hasMap: company.mapUrl,
    sameAs: [company.instagram.url],
    areaServed: { "@type": "City", name: "Lagos" },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: company.hours.days,
        opens: company.hours.opens,
        closes: company.hours.closes,
      },
    ],
    contactPoint: company.phones.map((phone) => ({
      "@type": "ContactPoint",
      telephone: phone.tel,
      contactType: "customer service",
      areaServed: "NG",
      availableLanguage: ["English"],
    })),
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Cleaning Services",
      itemListElement: services.map((service) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: service.name,
          url: absoluteUrl(`/services/${service.slug}`),
        },
      })),
    },
  };

  if (images.logo.src) business.logo = absoluteUrl(images.logo.src);
  // Real job photos, so search results can show the crew and their work.
  business.image = [workPhotos.crewTeam, workPhotos.industrialFloor, workPhotos.facilityFloorMopping].map(
    (photo) => absoluteUrl(photo.src),
  );

  return {
    "@context": "https://schema.org",
    "@graph": [
      business,
      {
        "@type": "WebSite",
        "@id": absoluteUrl("/#website"),
        url: company.siteUrl,
        name: siteName,
        publisher: { "@id": businessId },
        inLanguage: "en-NG",
      },
    ],
  };
}
