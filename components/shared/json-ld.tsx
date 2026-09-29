import { serializeJsonLd } from "@/lib/seo";

/** Renders one structured-data block as a safe JSON-LD script tag. */
export function JsonLd({ data }: { data: unknown }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: serializeJsonLd(data) }}
    />
  );
}
