import Link from "next/link";
import { ArrowRight, Phone } from "lucide-react";

import { primaryPhone } from "@/data/company";
import { Section } from "@/components/layout/section";
import { SectionHeading } from "@/components/shared/section-heading";
import { buttonVariants } from "@/components/ui/button";

type CtaBannerProps = {
  id: string;
  eyebrow: string;
  title: string;
  description: string;
};

/** Brand-blue closing call to action shared by inner pages: quote form plus a call button. */
export function CtaBanner({ id, eyebrow, title, description }: CtaBannerProps) {
  return (
    <Section tone="brand" aria-labelledby={id}>
      <div className="flex flex-col items-center text-center">
        <SectionHeading
          id={id}
          tone="dark"
          align="center"
          eyebrow={eyebrow}
          title={title}
          description={description}
          className="max-w-3xl"
        />
        <div className="mt-10 flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
          <Link href="/#quote" className={buttonVariants({ variant: "inverse", size: "lg" })}>
            Build Your Quote Request
            <ArrowRight aria-hidden="true" />
          </Link>
          <a
            href={`tel:${primaryPhone.tel}`}
            className={buttonVariants({ variant: "outline-inverse", size: "lg" })}
          >
            <Phone aria-hidden="true" />
            Call {primaryPhone.display}
          </a>
        </div>
      </div>
    </Section>
  );
}
