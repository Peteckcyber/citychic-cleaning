import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { company } from "@/data/company";
import { workPhotos } from "@/data/images";
import { MissionVision } from "@/components/sections/about/mission-vision";
import { QualityControl } from "@/components/sections/about/quality-control";
import { SafetyTrust } from "@/components/sections/about/safety-trust";
import { Story } from "@/components/sections/about/story";
import { ValuesDetail } from "@/components/sections/about/values-detail";
import { CtaBanner } from "@/components/sections/cta-banner";
import { HeroCollage } from "@/components/sections/hero-collage";
import { PageHero } from "@/components/sections/page-hero";
import { JsonLd } from "@/components/shared/json-ld";
import { buttonVariants } from "@/components/ui/button";
import { aboutPageJsonLd, breadcrumbJsonLd, buildMetadata, type Crumb } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "About CityChic | Lagos Cleaning Company Since 2019",
  description:
    "Meet CityChic Cleaning Services, a Lagos cleaning company since 2019. Our mission, core values, quality checks and how we vet and train every crew.",
  path: "/about",
  absoluteTitle: true,
});

const crumbs: Crumb[] = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
];

export default function AboutPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd(crumbs)} />
      <JsonLd data={aboutPageJsonLd()} />

      <PageHero
        crumbs={crumbs}
        title={
          <>
            Built on Detail. <span className="text-white/65">Trusted Since {company.foundingYear}.</span>
          </>
        }
        description="CityChic is a Lagos cleaning company specialising in post-construction and deep cleaning. We exist to surpass expectations, one spotless space at a time."
        actions={
          <Link
            href="/#quote"
            className={buttonVariants({ variant: "inverse", size: "lg", className: "w-full sm:w-fit" })}
          >
            Get a Free Quote
            <ArrowRight aria-hidden="true" />
          </Link>
        }
        aside={<HeroCollage main={workPhotos.crewTeam} inset={workPhotos.thankYouSign} />}
      />

      <Story />
      <MissionVision />
      <ValuesDetail />
      <QualityControl />
      <SafetyTrust />
      <CtaBanner
        id="about-cta-heading"
        eyebrow="Work with CityChic"
        title="Ready to See the CityChic Standard for Yourself?"
        description={`Tell us about your space and we will reply on WhatsApp with a quote tailored to you. ${company.hours.summary}.`}
      />
    </>
  );
}
