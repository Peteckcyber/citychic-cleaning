import { CorporateCta } from "@/components/sections/home/corporate-cta";
import { Hero } from "@/components/sections/home/hero";
import { QuoteSection } from "@/components/sections/home/quote-section";
import { TransformationSection } from "@/components/sections/home/transformation-section";
import { ValuesSection } from "@/components/sections/home/values-section";
import { RoadMarkingBanner } from "@/components/sections/road-marking-banner";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Post-Construction & Deep Cleaning in Lagos | CityChic",
  description:
    "Post-construction, deep cleaning and fogging disinfection for Lagos homes, offices and new builds. Vetted crews since 2019. Get a free quote on WhatsApp.",
  path: "/",
  absoluteTitle: true,
});

export default function HomePage() {
  return (
    <>
      <Hero />
      <QuoteSection />
      <TransformationSection />
      <ValuesSection />
      <CorporateCta />
      <RoadMarkingBanner />
    </>
  );
}
