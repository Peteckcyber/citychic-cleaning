import type { ReactNode } from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

import type { Crumb } from "@/lib/seo";
import { cn } from "@/lib/utils";

type PageHeroProps = {
  /** Breadcrumb trail. The last crumb is the current page. */
  crumbs: Crumb[];
  title: ReactNode;
  description: ReactNode;
  /** Buttons or links under the description. */
  actions?: ReactNode;
  /** Optional visual on the right from desktop width up. */
  aside?: ReactNode;
};

/** Brand-blue hero shared by every inner page, in the same style as the home hero. */
export function PageHero({ crumbs, title, description, actions, aside }: PageHeroProps) {
  return (
    <section
      aria-labelledby="page-heading"
      className="relative isolate overflow-hidden bg-brand text-white"
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 [background-image:radial-gradient(rgba(255,255,255,0.14)_1px,transparent_1px)] [background-size:26px_26px] [mask-image:radial-gradient(ellipse_at_30%_40%,black_15%,transparent_70%)]"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_55%_60%_at_20%_30%,rgba(255,255,255,0.12),transparent)]"
      />
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 -z-10 h-40 bg-gradient-to-t from-brand-hover to-transparent"
      />

      <div
        className={cn(
          "mx-auto grid w-full max-w-7xl items-center gap-12 px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24",
          aside && "lg:grid-cols-12",
        )}
      >
        <div className={cn(aside && "lg:col-span-7")}>
          <nav aria-label="Breadcrumb">
            <ol className="flex flex-wrap items-center gap-1.5 text-sm text-white/65">
              {crumbs.map((crumb, index) => {
                const current = index === crumbs.length - 1;
                return (
                  <li key={crumb.path} className="flex items-center gap-1.5">
                    {index > 0 && <ChevronRight className="size-3.5" aria-hidden="true" />}
                    {current ? (
                      <span aria-current="page" className="font-medium text-white">
                        {crumb.name}
                      </span>
                    ) : (
                      <Link href={crumb.path} className="transition-colors hover:text-white">
                        {crumb.name}
                      </Link>
                    )}
                  </li>
                );
              })}
            </ol>
          </nav>

          <h1
            id="page-heading"
            className="mt-6 text-4xl leading-[1.08] font-extrabold text-white sm:text-5xl xl:text-6xl"
          >
            {title}
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-pretty text-white/80 sm:text-xl">
            {description}
          </p>
          {actions && <div className="mt-10">{actions}</div>}
        </div>

        {aside && <div className="hidden lg:col-span-5 lg:block">{aside}</div>}
      </div>
    </section>
  );
}
