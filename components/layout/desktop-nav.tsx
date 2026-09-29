"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { mainNav } from "@/data/navigation";
import { cn } from "@/lib/utils";

export function isActivePath(pathname: string, href: string) {
  return href === "/" ? pathname === "/" : pathname.startsWith(href);
}

export function DesktopNav() {
  const pathname = usePathname();

  return (
    <nav aria-label="Main" className="hidden lg:block">
      <ul className="flex items-center gap-1">
        {mainNav.map((link) => {
          const active = isActivePath(pathname, link.href);
          return (
            <li key={link.href}>
              <Link
                href={link.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "rounded-md px-3.5 py-2 text-sm font-medium transition-colors hover:bg-surface hover:text-brand",
                  active ? "text-brand" : "text-ink/80",
                )}
              >
                {link.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
