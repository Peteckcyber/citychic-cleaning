"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight, Clock, Menu, Phone } from "lucide-react";

import { company } from "@/data/company";
import { mainNav } from "@/data/navigation";
import { isActivePath } from "@/components/layout/desktop-nav";
import { ExternalLink } from "@/components/shared/external-link";
import { InstagramIcon } from "@/components/shared/instagram-icon";
import { WhatsAppLink } from "@/components/shared/whatsapp-link";
import { Logo } from "@/components/shared/logo";
import { buttonVariants } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { whatsappMessages } from "@/lib/whatsapp";
import { cn } from "@/lib/utils";

export function MobileNav() {
  const pathname = usePathname();

  return (
    <Sheet>
      <SheetTrigger
        className={cn(buttonVariants({ variant: "ghost", size: "icon" }), "lg:hidden")}
        aria-label="Open menu"
      >
        <Menu className="size-6" aria-hidden="true" />
      </SheetTrigger>
      <SheetContent side="right" className="gap-0">
        <SheetHeader className="border-b">
          <SheetTitle asChild>
            <div>
              <Logo className="h-10" />
            </div>
          </SheetTitle>
          <SheetDescription className="sr-only">
            Site navigation and contact options
          </SheetDescription>
        </SheetHeader>

        <nav aria-label="Mobile" className="p-3">
          <ul className="flex flex-col">
            {mainNav.map((link) => {
              const active = isActivePath(pathname, link.href);
              return (
                <li key={link.href}>
                  <SheetClose asChild>
                    <Link
                      href={link.href}
                      aria-current={active ? "page" : undefined}
                      className={cn(
                        "flex items-center justify-between rounded-md px-3 py-3.5 text-base font-medium transition-colors hover:bg-surface",
                        active ? "text-brand" : "text-ink",
                      )}
                    >
                      {link.label}
                      <ChevronRight className="size-4 text-muted-foreground" aria-hidden="true" />
                    </Link>
                  </SheetClose>
                </li>
              );
            })}
          </ul>
        </nav>

        <SheetFooter className="border-t bg-surface">
          <ul className="flex flex-col gap-2.5 text-sm">
            {company.phones.map((phone) => (
              <li key={phone.tel}>
                <a
                  href={`tel:${phone.tel}`}
                  className="flex items-center gap-2.5 font-medium text-ink hover:text-brand"
                >
                  <Phone className="size-4 text-brand" aria-hidden="true" />
                  {phone.display}
                </a>
              </li>
            ))}
            <li className="flex items-center gap-2.5 text-muted-foreground">
              <Clock className="size-4 text-brand" aria-hidden="true" />
              {company.hours.summary}
            </li>
            <li>
              <ExternalLink
                href={company.instagram.url}
                showIcon={false}
                className="gap-2.5 font-medium text-ink hover:text-brand"
              >
                <InstagramIcon className="size-4 text-brand" />
                Visit our Instagram page
              </ExternalLink>
            </li>
          </ul>
          <WhatsAppLink
            message={whatsappMessages.quote}
            className={cn(buttonVariants({ size: "lg" }), "mt-3 w-full")}
          >
            Get a Free Quote on WhatsApp
          </WhatsAppLink>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
