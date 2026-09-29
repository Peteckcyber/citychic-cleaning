import Link from "next/link";
import { Clock, Mail, MapPin, Phone } from "lucide-react";

import { company } from "@/data/company";
import { companyNav } from "@/data/navigation";
import { services } from "@/data/services";
import { ExternalLink } from "@/components/shared/external-link";
import { InstagramIcon } from "@/components/shared/instagram-icon";
import { Logo } from "@/components/shared/logo";
import { buttonVariants } from "@/components/ui/button";

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-ink text-white/75">
      <div className="mx-auto grid max-w-7xl gap-12 px-4 py-16 sm:px-6 md:grid-cols-2 lg:px-8 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <Link href="/" aria-label="CityChic Cleaning Services home" className="inline-block">
            <Logo className="h-12" />
          </Link>
          <p className="mt-5 max-w-sm leading-relaxed">
            Post-construction, deep cleaning and disinfection specialists serving Lagos
            homes, developers and businesses since {company.foundingYear}.
          </p>
          <p className="mt-4 text-sm text-white/60">
            {company.legalName}, {company.rcNumber}
          </p>
          <ExternalLink
            href={company.instagram.url}
            showIcon={false}
            className={buttonVariants({
              variant: "outline-inverse",
              className: "mt-6 gap-2.5",
            })}
          >
            <InstagramIcon className="size-4" />
            Visit Our Instagram Page
            <span className="font-normal text-white/60">{company.instagram.handle}</span>
          </ExternalLink>
        </div>

        <nav aria-labelledby="footer-services" className="lg:col-span-3">
          <h2 id="footer-services" className="text-sm font-semibold tracking-wider text-white uppercase">
            Services
          </h2>
          <ul className="mt-5 space-y-2.5 text-sm">
            {services.map((service) => (
              <li key={service.slug}>
                <Link
                  href={`/services/${service.slug}`}
                  className="transition-colors hover:text-white"
                >
                  {service.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-labelledby="footer-company" className="lg:col-span-2">
          <h2 id="footer-company" className="text-sm font-semibold tracking-wider text-white uppercase">
            Company
          </h2>
          <ul className="mt-5 space-y-2.5 text-sm">
            {companyNav.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="transition-colors hover:text-white">
                  {link.label}
                </Link>
              </li>
            ))}
            <li>
              <ExternalLink
                href={company.roadMarking.url}
                className="transition-colors hover:text-white"
              >
                Road Marking Services
              </ExternalLink>
            </li>
          </ul>
        </nav>

        <div className="lg:col-span-3">
          <h2 className="text-sm font-semibold tracking-wider text-white uppercase">
            Get in Touch
          </h2>
          <address className="mt-5 space-y-4 text-sm not-italic">
            <p className="flex gap-3">
              <MapPin className="mt-0.5 size-4 shrink-0 text-white" aria-hidden="true" />
              <span>{company.fullAddress}</span>
            </p>
            {company.phones.map((phone) => (
              <p key={phone.tel}>
                <a
                  href={`tel:${phone.tel}`}
                  className="flex items-center gap-3 transition-colors hover:text-white"
                >
                  <Phone className="size-4 shrink-0 text-white" aria-hidden="true" />
                  {phone.display}
                </a>
              </p>
            ))}
            <p>
              <a
                href={`mailto:${company.email}`}
                className="flex items-center gap-3 break-all transition-colors hover:text-white"
              >
                <Mail className="size-4 shrink-0 text-white" aria-hidden="true" />
                {company.email}
              </a>
            </p>
            <p className="flex gap-3">
              <Clock className="mt-0.5 size-4 shrink-0 text-white" aria-hidden="true" />
              <span>
                {company.hours.summary}
                <br />
                {company.hours.closedNote}
              </span>
            </p>
          </address>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-4 py-6 text-xs text-white/55 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
          <p>
            &copy; {year} {company.legalName}. All rights reserved.
          </p>
          <p>Professional cleaning services in Lagos, Nigeria.</p>
        </div>
      </div>
    </footer>
  );
}
