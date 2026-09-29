import type { ComponentProps } from "react";
import { ArrowUpRight } from "lucide-react";

import { cn } from "@/lib/utils";

type ExternalLinkProps = Omit<ComponentProps<"a">, "target" | "rel"> & {
  href: string;
  /** Hide the trailing icon when the child already includes one. */
  showIcon?: boolean;
};

/**
 * Every link that leaves the site, including all road marking references.
 * Always opens in a new tab with a safe rel attribute.
 */
export function ExternalLink({
  href,
  children,
  className,
  showIcon = true,
  ...props
}: ExternalLinkProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={cn("inline-flex items-center gap-1", className)}
      {...props}
    >
      {children}
      {showIcon && <ArrowUpRight className="size-4 shrink-0" aria-hidden="true" />}
      <span className="sr-only"> (opens in a new tab)</span>
    </a>
  );
}
