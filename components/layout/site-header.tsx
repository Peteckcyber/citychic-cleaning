import Link from "next/link";
import { Clock, Mail, MapPin, Phone } from "lucide-react";

import { company, primaryPhone } from "@/data/company";
import { DesktopNav } from "@/components/layout/desktop-nav";
import { MobileNav } from "@/components/layout/mobile-nav";
import { ExternalLink } from "@/components/shared/external-link";
import { InstagramIcon } from "@/components/shared/instagram-icon";
import { Logo } from "@/components/shared/logo";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40">
      <div className="hidden bg-ink text-white/80 md:block">
        <div className="mx-auto flex h-10 max-w-7xl items-center justify-between px-6 text-xs lg:px-8">
          <p className="hidden items-center gap-2 lg:flex">
            <MapPin className="size-3.5 shrink-0" aria-hidden="true" />
            {company.fullAddress}
          </p>
          <div className="ml-auto flex items-center gap-6">
            <p className="flex items-center gap-2">
              <Clock className="size-3.5" aria-hidden="true" />
              {company.hours.summary}
            </p>
            <a
              href={`mailto:${company.email}`}
              className="flex items-center gap-2 transition-colors hover:text-white"
            >
              <Mail className="size-3.5" aria-hidden="true" />
              {company.email}
            </a>
            <ExternalLink
              href={company.instagram.url}
              showIcon={false}
              className="gap-2 transition-colors hover:text-white"
            >
              <InstagramIcon className="size-3.5" />
              Instagram
            </ExternalLink>
          </div>
        </div>
      </div>

      <div className="border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/85">
        <div className="mx-auto flex h-18 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
          <Link href="/" aria-label="CityChic Cleaning Services home" className="shrink-0">
            <Logo priority />
          </Link>

          <DesktopNav />

          <div className="flex items-center gap-2">
            <a
              href={`tel:${primaryPhone.tel}`}
              className="hidden items-center gap-2 px-2 text-sm font-semibold text-ink transition-colors hover:text-brand xl:flex"
            >
              <Phone className="size-4 text-brand" aria-hidden="true" />
              {primaryPhone.display}
            </a>
            <Link
              href="/contact"
              className={cn(buttonVariants(), "hidden sm:inline-flex")}
            >
              Get a Quote
            </Link>
            <MobileNav />
          </div>
        </div>
      </div>
    </header>
  );
}
