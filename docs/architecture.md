# Architecture

## Stack

- Next.js (App Router), TypeScript strict mode
- Tailwind CSS, with the brand tokens from docs/rules.md in the theme
- shadcn/ui primitives (Dialog, Sheet, Tabs, Accordion, Button, Input, Textarea, Select, Label)
- lucide-react for every icon
- react-hook-form and zod for form state and validation

## Hosting: Cloudflare Pages, static export

- `next.config.ts` sets `output: 'export'`. The build writes plain files to `out/`, and Cloudflare Pages serves them.
- There is no server at runtime. That rules out ISR, `revalidate`, route handlers that run per request, server actions, middleware, cookies and headers(). Content changes mean editing `data/` and redeploying.
- `app/sitemap.ts`, `app/robots.ts`, `app/opengraph-image.tsx` and `app/twitter-image.tsx` must export `export const dynamic = 'force-static'`, or they return a 500 under `output: 'export'`.
- The share image is generated at build time from `lib/og-image.tsx`. Both image routes use it.
- `app/services/[slug]/page.tsx` uses `generateStaticParams` from `data/services.ts` and sets `export const dynamicParams = false`.
- Images are hosted on Cloudflare. If they are on Cloudflare Images, use a custom `next/image` loader that builds the variant URL. If they are plain R2 files, set `images.unoptimized = true`. Always pass `width` and `height` (or `fill` with a sized parent) and a descriptive `alt`.

## Folder structure

```
app/
  layout.tsx              root layout, fonts, Header, Footer, JSON-LD
  page.tsx                home
  services/page.tsx
  services/[slug]/page.tsx
  about/page.tsx
  gallery/page.tsx
  contact/page.tsx
  not-found.tsx
  sitemap.ts
  robots.ts
components/
  ui/                     shadcn primitives only (generated)
  layout/                 Header, MobileNav (Sheet), Footer
  sections/               page sections (Hero, ServicesGrid, ValuesGrid, CtaBanner, RoadMarkingBanner...)
  shared/                 BeforeAfterSlider, ExternalLink, WhatsAppButton, SectionHeading, TrustBadges
  forms/                  QuoteBuilder, ContactForm
data/
  company.ts              NAP, hours, mission, vision, values, whatsappNumber, siteUrl
  services.ts             nine services with slug, name, icon, summary, included checklist, idealFor, faqs, seo
  gallery.ts              gallery items with category, image refs, caption, before/after pairs
  images.ts               every image URL in one place (Cloudflare links)
  navigation.ts           header and footer links
lib/
  whatsapp.ts             buildWhatsAppUrl(), message formatters
  seo.ts                  buildMetadata() helper, JSON-LD builders
  utils.ts                cn() and small helpers
scripts/
  check-copy.mjs          banned character scanner
```

Components never hard-code company facts, service names, image URLs or links. They import from `data/`.

## Server and client components

Pages and sections are server components by default. Mark `'use client'` only on the interactive parts: MobileNav, BeforeAfterSlider, Gallery filter, QuoteBuilder, ContactForm. Keep client components small and pass data in as props.

## WhatsApp lead flow

`lib/whatsapp.ts` is the only place that builds WhatsApp links.

```ts
buildWhatsAppUrl(message: string): string
// returns `https://wa.me/${company.whatsappNumber}?text=${encodeURIComponent(message)}`
```

Form behaviour (QuoteBuilder and ContactForm):

1. Real form UX: labelled fields, inline zod validation messages, required markers, a disabled submit button while invalid.
2. On submit, build a structured message and call `window.open(url, '_blank', 'noopener,noreferrer')` as the first thing in the react-hook-form valid handler. Do not add any other awaits before it, or popup blockers may stop it. The success state's "Reopen WhatsApp" anchor is the fallback if the popup is blocked.
3. Switch the form to a success state: a confirmation heading, a short summary of what was sent, a "Reopen WhatsApp" button (same URL, as a real anchor), and a "Start a new request" reset.
4. Works on mobile (opens the app) and desktop (opens WhatsApp Web).

Message format, plain text, no emojis, WhatsApp bold with asterisks is fine:

```
Hello CityChic, I would like a quote.

*Name:* Adaeze Okafor
*Phone:* 0803 000 0000
*Service:* Post-Construction Cleaning
*Property:* 4-bedroom duplex, 5 bathrooms
*Location:* Lekki Phase 1
*Preferred date:* 12 October 2026
*Details:* Builders finished last week, need it move-in ready.

Sent from citychic website
```

Leave out empty optional fields, not "N/A". Phone validation accepts Nigerian formats: `0XXXXXXXXXX`, `+234XXXXXXXXXX`, `234XXXXXXXXXX`, spaces allowed.

Plain "Chat on WhatsApp" buttons elsewhere use a short default message, for example "Hello CityChic, I would like to ask about your cleaning services."

## SEO

- `lib/seo.ts` exports `buildMetadata({ title, description, path, image })`, which returns a Next `Metadata` object with a title, a description, `alternates.canonical`, `openGraph` (type website, locale en_NG, siteName, image) and a Twitter card.
- The root layout sets `metadataBase` from `company.siteUrl` and a title template `%s | CityChic Cleaning Services`.
- Every route exports `metadata` or `generateMetadata`. Titles stay under about 60 characters, descriptions between 140 and 160, and both include "Lagos" where it reads naturally.
- JSON-LD in `app/layout.tsx`: `@type: "CleaningService"` with name, legalName, url, logo, image, telephone (the single company number), email, full `PostalAddress` (addressLocality Lagos, addressRegion Lagos, addressCountry NG), `openingHoursSpecification` (Monday to Saturday, 08:00 to 18:00), `foundingDate` 2019, `areaServed` Lagos, `hasOfferCatalog` listing the nine services, and `logo`/`image` only once real image URLs exist. No `priceRange`, per the no-pricing rule. `sameAs` lists the company's own Instagram profile. Do not put citychicroadmarking.com in `sameAs`: it is a sister company, not the same entity. Built in `lib/seo.ts` as `siteJsonLd()`.
- Each service page adds a `Service` JSON-LD (provider linked to the CleaningService) and a `FAQPage` block if it has FAQs. Add a `BreadcrumbList` too.
- The sitemap lists every static route plus all nine service slugs.
- robots allows everything and points to the sitemap.

## Accessibility and performance

- Semantic landmarks, one `h1` per page, logical heading order.
- Everything works by keyboard. The before/after slider supports arrow keys and has `role="slider"` with aria values.
- Visible focus rings in brand colour. Colour contrast meets AA.
- Icons that only decorate get `aria-hidden`. Icon-only buttons get an `aria-label`.
- Only the hero image uses `priority`. Everything else lazy loads.
- Use a single font family via `next/font` (for example Inter or Plus Jakarta Sans), self-hosted at build time.
