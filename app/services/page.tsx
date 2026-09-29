import Link from "next/link";
import { ArrowRight, ChevronDown } from "lucide-react";

import { workPhotos } from "@/data/images";
import { serviceGroups, services, type ServiceGroup } from "@/data/services";
import { Section } from "@/components/layout/section";
import { HeroCollage } from "@/components/sections/hero-collage";
import { PageHero } from "@/components/sections/page-hero";
import { RoadMarkingBanner } from "@/components/sections/road-marking-banner";
import { FoggingProtocol } from "@/components/sections/services/fogging-protocol";
import { ServiceCard } from "@/components/sections/services/service-card";
import { ServicesCta } from "@/components/sections/services/services-cta";
import { JsonLd } from "@/components/shared/json-ld";
import { SectionHeading } from "@/components/shared/section-heading";
import { buttonVariants } from "@/components/ui/button";
import { breadcrumbJsonLd, buildMetadata, servicesListJsonLd, type Crumb } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Cleaning Services in Lagos",
  description:
    "Post-construction, deep cleaning, fogging disinfection, home cleaning plans and facility maintenance in Lagos. See what is included and get a free quote.",
  path: "/services",
});

const crumbs: Crumb[] = [
  { name: "Home", path: "/" },
  { name: "Services", path: "/services" },
];

const groupCopy: Record<
  ServiceGroup,
  { title: string; description: string; tone: "white" | "surface" }
> = {
  "construction-deep": {
    title: "Our Specialty: Spaces That Need More Than a Wipe Down",
    description:
      "Post-construction and deep cleaning are what CityChic was built for. These are intensive, detail-first cleans that take a space from dusty or neglected to genuinely ready.",
    tone: "white",
  },
  "home-plans": {
    title: "A Consistently Clean Home, on Your Schedule",
    description:
      "Whether you need a single refresh, a move-day clean or a standing booking, our home services keep your space fresh without adding to your to-do list.",
    tone: "surface",
  },
  commercial: {
    title: "Clean, Safe and Presentable Workplaces",
    description:
      "Offices, schools, clinics, estates and retail spaces need cleaning that fits around operations. Our facility and disinfection services are planned around how your building is used.",
    tone: "white",
  },
};

const groupOrder: ServiceGroup[] = ["construction-deep", "home-plans", "commercial"];

export default function ServicesPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd(crumbs)} />
      <JsonLd data={servicesListJsonLd()} />

      <PageHero
        crumbs={crumbs}
        title={
          <>
            Cleaning Services <span className="text-white/65">in Lagos</span>
          </>
        }
        description="From post-construction handovers to monthly home care and whole-space disinfection, every CityChic service is delivered by vetted crews to the same exacting standard."
        actions={
          <div className="flex flex-col gap-6">
            <Link
              href="/#quote"
              className={buttonVariants({ variant: "inverse", size: "lg", className: "w-full sm:w-fit" })}
            >
              Get a Free Quote
              <ArrowRight aria-hidden="true" />
            </Link>
            <nav aria-label="Service groups">
              <ul className="flex flex-wrap gap-2">
                {groupOrder.map((group) => (
                  <li key={group}>
                    <a
                      href={`#${group}`}
                      className={buttonVariants({ variant: "outline-inverse", size: "sm" })}
                    >
                      {serviceGroups[group]}
                      <ChevronDown aria-hidden="true" />
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        }
        aside={<HeroCollage main={workPhotos.industrialFloor} inset={workPhotos.floorScrubbing} />}
      />

      {groupOrder.map((group) => {
        const copy = groupCopy[group];
        const groupServices = services.filter((service) => service.group === group);
        return (
          <Section
            key={group}
            id={group}
            tone={copy.tone}
            aria-labelledby={`${group}-heading`}
            className="scroll-mt-28"
          >
            <SectionHeading
              id={`${group}-heading`}
              eyebrow={serviceGroups[group]}
              title={copy.title}
              description={copy.description}
            />
            <div className="mt-12 space-y-6">
              {groupServices.map((service) => (
                <ServiceCard key={service.slug} service={service} />
              ))}
            </div>
          </Section>
        );
      })}

      <FoggingProtocol />
      <ServicesCta />
      <RoadMarkingBanner />
    </>
  );
}
