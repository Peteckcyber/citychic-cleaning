import { Suspense } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { company } from "@/data/company";
import { galleryItems } from "@/data/gallery";
import { GalleryBrowser } from "@/components/gallery/gallery-browser";
import { GalleryView } from "@/components/gallery/gallery-view";
import { Section } from "@/components/layout/section";
import { CtaBanner } from "@/components/sections/cta-banner";
import { PageHero } from "@/components/sections/page-hero";
import { JsonLd } from "@/components/shared/json-ld";
import { buttonVariants } from "@/components/ui/button";
import { breadcrumbJsonLd, buildMetadata, galleryJsonLd, type Crumb } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Our Work in Photos and Videos",
  description:
    "Real photos and videos from CityChic jobs: post-construction cleans, deep cleaning and fogging disinfection by our Lagos crews. See the work, then get a quote.",
  path: "/gallery",
  shareImage: "gallery",
});

const crumbs: Crumb[] = [
  { name: "Home", path: "/" },
  { name: "Gallery", path: "/gallery" },
];

const photos = galleryItems.flatMap((item) =>
  item.type === "photo" ? [{ src: item.photo.src, alt: item.photo.alt, title: item.title }] : [],
);

export default function GalleryPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd(crumbs)} />
      <JsonLd data={galleryJsonLd(photos)} />

      <PageHero
        crumbs={crumbs}
        title={
          <>
            Our Work, <span className="text-white/65">Up Close.</span>
          </>
        }
        description="Real photos and videos from CityChic jobs. No stock images, just our crews at work on post-construction cleans, deep cleans and disinfection."
        actions={
          <Link
            href="/#quote"
            className={buttonVariants({ variant: "inverse", size: "lg", className: "w-full sm:w-fit" })}
          >
            Get a Free Quote
            <ArrowRight aria-hidden="true" />
          </Link>
        }
      />

      <Section tone="surface" aria-label="Photo and video gallery" className="sm:pt-16">
        {/* The fallback is the full "All Work" gallery, so it is in the static HTML. */}
        <Suspense fallback={<GalleryView filter="all" />}>
          <GalleryBrowser />
        </Suspense>
      </Section>

      <CtaBanner
        id="gallery-cta-heading"
        eyebrow="Your space could be next"
        title="Want Results Like These?"
        description={`Tell us about your space and we will reply on WhatsApp with a quote tailored to you. ${company.hours.summary}.`}
      />
    </>
  );
}
