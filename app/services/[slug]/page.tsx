import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowRight } from "lucide-react";

import { getServiceDetail } from "@/data/service-details";
import { getService, services } from "@/data/services";
import { HeroPhoto } from "@/components/sections/hero-collage";
import { PageHero } from "@/components/sections/page-hero";
import { RelatedServices } from "@/components/sections/service-detail/related-services";
import { ServiceEnquiry } from "@/components/sections/service-detail/service-enquiry";
import { ServiceFaqs } from "@/components/sections/service-detail/service-faqs";
import { ServiceOverview } from "@/components/sections/service-detail/service-overview";
import { ServiceProcess } from "@/components/sections/service-detail/service-process";
import { JsonLd } from "@/components/shared/json-ld";
import { WhatsAppLink } from "@/components/shared/whatsapp-link";
import { buttonVariants } from "@/components/ui/button";
import {
  breadcrumbJsonLd,
  buildMetadata,
  faqJsonLd,
  serviceJsonLd,
  type Crumb,
} from "@/lib/seo";
import { serviceQuoteMessage } from "@/lib/whatsapp";

// Static export: every service page is built ahead of time, and unknown slugs 404.
export const dynamicParams = false;

export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/services/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) return {};
  return buildMetadata({
    title: `${service.name} in Lagos | CityChic`,
    description: getServiceDetail(slug).seoDescription,
    path: `/services/${slug}`,
    absoluteTitle: true,
    shareImage: `service-${slug}`,
  });
}

export default async function ServicePage({ params }: PageProps<"/services/[slug]">) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();
  const detail = getServiceDetail(slug);

  const crumbs: Crumb[] = [
    { name: "Home", path: "/" },
    { name: "Services", path: "/services" },
    { name: service.name, path: `/services/${slug}` },
  ];

  return (
    <>
      <JsonLd data={breadcrumbJsonLd(crumbs)} />
      <JsonLd data={serviceJsonLd(service, detail.photo.src)} />
      <JsonLd data={faqJsonLd(detail.faqs)} />

      <PageHero
        crumbs={crumbs}
        title={
          <>
            {service.name} <span className="text-white/65">in Lagos</span>
          </>
        }
        description={detail.seoDescription}
        actions={
          <div className="flex flex-col gap-3 sm:flex-row">
            <WhatsAppLink
              message={serviceQuoteMessage(service.name)}
              className={buttonVariants({ variant: "inverse", size: "lg" })}
            >
              Get a Quote on WhatsApp
            </WhatsAppLink>
            <a
              href="#enquiry-heading"
              className={buttonVariants({ variant: "outline-inverse", size: "lg" })}
            >
              Send Your Details
              <ArrowRight aria-hidden="true" />
            </a>
          </div>
        }
        aside={<HeroPhoto photo={detail.photo} caption="Real CityChic job" />}
      />

      <ServiceOverview service={service} />
      <ServiceProcess serviceName={service.name} onTheDay={detail.onTheDay} />
      <ServiceFaqs serviceName={service.name} faqs={detail.faqs} />
      <RelatedServices slugs={detail.related} />
      <ServiceEnquiry slug={slug} serviceName={service.name} />
    </>
  );
}
