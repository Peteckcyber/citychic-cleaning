import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Home, Phone, Sparkles } from "lucide-react";

import { primaryPhone } from "@/data/company";
import { services } from "@/data/services";
import { Section } from "@/components/layout/section";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Page Not Found",
  description: "The page you are looking for has moved or does not exist.",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  const flagship = services.filter((service) => service.flagship);

  return (
    <Section tone="surface" containerClassName="max-w-3xl">
      <div className="flex flex-col items-center text-center">
        <Badge variant="secondary">
          <Sparkles aria-hidden="true" />
          Error 404
        </Badge>
        <h1 className="mt-6 text-4xl font-extrabold sm:text-5xl">
          This Page Has Been Swept Away
        </h1>
        <p className="mt-5 max-w-xl text-lg leading-relaxed text-muted-foreground">
          The page you are looking for has moved or no longer exists. Everything else is
          exactly where it should be.
        </p>
        <div className="mt-10 flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
          <Link href="/" className={buttonVariants({ size: "lg" })}>
            <Home aria-hidden="true" />
            Back to Home
          </Link>
          <Link href="/contact" className={buttonVariants({ variant: "outline", size: "lg" })}>
            Contact Us
          </Link>
        </div>

        <Card className="mt-14 w-full gap-0 py-2 text-left">
          <CardContent className="px-6">
            <p className="py-4 text-sm font-semibold tracking-wider text-muted-foreground uppercase">
              Popular pages
            </p>
            <ul className="divide-y border-t">
              {[
                ...flagship.map((service) => ({
                  href: `/services/${service.slug}`,
                  label: service.name,
                })),
                { href: "/services", label: "All Services" },
                { href: "/gallery", label: "Our Work" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="group flex items-center justify-between py-4 font-semibold text-ink hover:text-brand"
                  >
                    {link.label}
                    <ArrowRight
                      className="size-4 text-brand transition-transform group-hover:translate-x-1"
                      aria-hidden="true"
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <a
          href={`tel:${primaryPhone.tel}`}
          className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-brand hover:underline"
        >
          <Phone className="size-4" aria-hidden="true" />
          Need help now? Call {primaryPhone.display}
        </a>
      </div>
    </Section>
  );
}
