import type { ReactNode } from "react";

import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  eyebrow: string;
  title: ReactNode;
  description?: ReactNode;
  align?: "left" | "center";
  tone?: "light" | "dark";
  /** Heading id, so the parent section can use aria-labelledby. */
  id?: string;
  className?: string;
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  tone = "light",
  id,
  className,
}: SectionHeadingProps) {
  const dark = tone === "dark";

  return (
    <div
      className={cn(
        "flex max-w-2xl flex-col items-start",
        align === "center" && "mx-auto items-center text-center",
        className,
      )}
    >
      <Badge variant={dark ? "inverse" : "secondary"}>{eyebrow}</Badge>
      <h2
        id={id}
        className={cn("mt-4 text-3xl leading-tight font-bold sm:text-4xl", dark && "text-white")}
      >
        {title}
      </h2>
      {description && (
        <p
          className={cn(
            "mt-4 text-lg leading-relaxed text-pretty",
            dark ? "text-white/80" : "text-muted-foreground",
          )}
        >
          {description}
        </p>
      )}
    </div>
  );
}
