import type { ComponentProps } from "react";

import { cn } from "@/lib/utils";

const tones = {
  white: "bg-white",
  surface: "bg-surface",
  brand: "bg-brand text-white",
  ink: "bg-ink text-white",
} as const;

type SectionProps = ComponentProps<"section"> & {
  tone?: keyof typeof tones;
  /** Tighter vertical rhythm for slim bands such as banners. */
  compact?: boolean;
  containerClassName?: string;
};

/**
 * Plain structural wrapper so every section shares one container width,
 * gutter and vertical rhythm. Structural only, so not a shadcn component.
 */
export function Section({
  tone = "white",
  compact = false,
  className,
  containerClassName,
  children,
  ...props
}: SectionProps) {
  return (
    <section
      className={cn(tones[tone], compact ? "py-12 sm:py-16" : "py-16 sm:py-24", className)}
      {...props}
    >
      <div className={cn("mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8", containerClassName)}>
        {children}
      </div>
    </section>
  );
}
