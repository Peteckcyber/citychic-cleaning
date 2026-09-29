# Page Specifications

Every page ends with a conversion path: a WhatsApp quote button, a phone link, or the contact form. Every page shares the Header and Footer.

## Global: Header and Footer

**Header** (sticky, white with a subtle bottom border when scrolled)
- Logo linking to `/`
- Nav: Home, Services, About, Gallery, Contact
- Right side: click-to-call link (primary number) and a "Get a Quote" button (brand blue, goes to `/contact`)
- Mobile: a menu button opens a shadcn Sheet with the same links, the phone number, and a full-width WhatsApp quote button

**Floating WhatsApp button** (every page, rendered in the root layout): a bold green circle fixed bottom-right with the official WhatsApp glyph and a soft pulse. It opens the WhatsApp chat directly with the general greeting. On desktop, a "Chat with us on WhatsApp" label slides out on hover. It replaced the hero's "Chat on WhatsApp" button on 2026-09-29.

**Footer** (ink background, white text)
- Short brand statement and RC 7312822G
- Services column (all nine, linked)
- Company column (About, Gallery, Contact)
- Contact column: address, phone, email, opening hours
- Road marking link (external, ArrowUpRight icon)
- Bottom bar: "© {year} CityChic Nigeria Ltd. All rights reserved."

## 1. Home `/`

In this order (the user asked for the animated photo wall on 2026-09-29; do not put the quote form back in the hero without asking):
1. **Hero** (brand blue, split): text on the left (centred on mobile), and on the right `HeroTileWall`, a tilted wall of three photo columns using the client's real job photos from `workPhotos` in `data/images.ts`. The middle column is wider, so its tiles are bigger. Every column rises endlessly at its own speed, and the tilt makes the tiles drift sideways as they climb. All four edges fade into the blue, and the wall pauses on hover and stops for reduced-motion users. Faded dot-grid texture, no label above the headline (the user removed it), big white h1 "Cleaning You Can Count On." (the user's wording) with "Count On." in a lighter white, the subtext "Reliable cleaning for homes, offices, and spaces that deserve to feel fresh." (the user's wording, keep it exact), a single "Get a Free Quote" button (inverse, anchors to `#quote`). WhatsApp is handled by the site-wide floating button, not a hero button. A full-width translucent trust band along the bottom of the hero: CAC RC, since 2019, vetted crews, hours (2x2 on mobile, 4 across on desktop).
2. **Quote** (surface, `id="quote"`): left has the heading, a three-step "how it works" timeline and the phone number. Right has the **Quick Quote Builder inside a Card**: service, property type, location, preferred date (optional), "Describe your request" (required Textarea, 10 to 1,000 characters, sent as *Details* in the WhatsApp message) and name. The user replaced the bedroom and bathroom steppers with the request box on 2026-09-29; do not bring them back. Submit opens WhatsApp. No prices.
3. **See us at work** (white): heading plus a Card list of what gets removed on the left, and on the right the `WorkVideo` of the crew scrubbing a marble floor, in a tall rounded Card with a "Real CityChic job" Badge. The user replaced the before/after slider with this video on 2026-09-29. The video autoplays muted and loops, loads only near the viewport, shows a blurred poster and spinner while loading or buffering, pauses off screen, has a pause button, and never autoplays for reduced-motion users.
4. **Values** (surface): heading plus a brand Card with mission and vision on the left, and one Card listing the five values divided by Separators on the right.
5. **Corporate CTA** (brand): heading and buttons on the left, a translucent Card with three offers on the right.
6. **Road Marking** (white, compact): the sister company's survey photo on the left (it links out too; road marking photos appear only here, never in the gallery), and one Card with a "Road marking service" Badge (the user's wording, replacing "Sister company") linking externally to citychicroadmarking.com.

Below the blue hero, section backgrounds alternate surface and white, and the corporate CTA is brand blue.

The user removed the home page services section ("What we do") on 2026-09-29. Do not add a services grid back to the home page without asking. Services are reached through the header nav, the footer and `/services`.

## Shared inner-page building blocks (built 2026-09-29)

- `PageHero` (`components/sections/page-hero.tsx`): brand-blue hero with breadcrumb, h1, description, optional actions and an optional desktop-only visual. Every inner page uses it.
- `HeroCollage`: two overlapping job photos for the hero visual.
- `CtaBanner`: brand-blue closing section with "Build Your Quote Request" (to `/#quote`) and a call button. Pass page-specific eyebrow, title and description.
- `JsonLd` plus `breadcrumbJsonLd()` in `lib/seo.ts` for BreadcrumbList on every inner page.

## 2. Services `/services`

Built 2026-09-29: PageHero with group jump links and a collage, one Section per group with a `ServiceCard` per service (pitch, Ideal for, What is included, "Get a Quote" on WhatsApp prefilled with the service, "Learn More"), `FoggingProtocol` with the two disinfection photos, `ServicesCta`, then `RoadMarkingBanner`. JSON-LD: BreadcrumbList and an ItemList of Service entries.

1. Page hero: h1 plus a summary.
2. Service sections, one per service (anchor id = slug): icon, name, pitch paragraph, "What is included" checklist (Lucide `Check` or `CircleCheck`), "Ideal for" line, and two actions: "Get a Quote" (WhatsApp, prefilled with this service) and "Learn more" (links to `/services/[slug]`). Tabs or an anchor sub-nav may group them: Construction and Deep Cleans, Home Cleaning Plans, Commercial and Disinfection.
3. Fogging & Disinfection gets its own protocol block: assessment, surface prep, fogging application, dwell time and ventilation, safe re-entry guidance.
4. Road marking card (external link).
5. Closing CTA.

## 3. Service detail `/services/[slug]` (nine static pages)

Built from `data/services.ts`. Each page has:
- h1 with the service name and Lagos (for example "Post-Construction Cleaning in Lagos")
- Breadcrumb: Home / Services / {name}
- Intro pitch, the "What is included" checklist, a "How it works" section with 3 or 4 steps, and "Ideal for"
- FAQ in a shadcn Accordion (3 to 5 questions, never about price; answers point to a quote instead)
- Related services (2 or 3 cards)
- A contact form with the service preselected
- Unique metadata and the Service, FAQPage and BreadcrumbList JSON-LD

## 4. About `/about`

1. Hero: the story, established 2019, operating as CityChic Nigeria Ltd, RC 7312822G.
2. Mission and Vision, side by side.
3. The five core values, each expanded into a short paragraph.
4. Quality control: pre-job walkthrough, a room-by-room checklist, supervisor inspection, and a client walkthrough before sign-off.
5. Safety and trust: staff vetting (identity and guarantor checks), training, uniformed crews, safe handling of chemicals, and respect for property. State these as processes, not as certifications.
6. CTA.

Before publishing specific vetting or QC claims, confirm with the client that they are accurate.

Built 2026-09-29 in this order: PageHero ("Built on Detail. Trusted Since 2019.") with a collage, Story with a "CityChic at a Glance" facts Card, Mission and Vision Cards, the five values with their `detail` text plus a quote Card, four Quality Control checkpoints, Safety and Trust (four commitments beside the disinfection photo; the user removed the "Vetted Staff" identity and guarantor check item on 2026-09-29, do not add it back), then a CtaBanner. **Still to confirm with the client:** crew training, the four quality checkpoints, and safe chemical handling as described.

## 5. Gallery `/gallery`

Built 2026-09-29, with the user's instruction that user experience comes first. It holds 15 items (13 photos, 2 videos) from two client batches; a duplicate photo in the second batch was skipped. Data lives in `data/gallery.ts` (photos and videos, each with a title, caption and optional category; add new media there). Behaviour:
- Filter pills with counts; categories with no items are hidden (Residential stays hidden until it has media). The filter bar sticks under the header, and on mobile it scrolls sideways with a fade hint.
- The active filter lives in the URL (`?category=fogging`) via `history.replaceState`, so it is instant, shareable and survives refresh. `GalleryBrowser` reads it inside a Suspense boundary whose fallback is the full "All Work" grid, so every item is in the static HTML.
- Masonry grid (CSS columns), natural aspect ratios, shimmer until each image loads (with a check for images that load before hydration), the first three tiles load eagerly, video tiles show a play button.
- Lightbox (shadcn Dialog): large view, title, caption, "n of total", previous and next buttons, arrow keys, swipe, thumbnail strip, neighbour preloading, native video controls, and a "Get a Quote for [service]" WhatsApp button mapped from the category.
- No before/after pairs exist yet, so there are no sliders on this page; `BeforeAfterSlider` is kept for when pairs arrive.

Original spec:

1. Hero.
2. Filter bar: All, Post-Construction, Residential, Deep Clean, Fogging. Use shadcn Tabs or buttons. Filtering happens on the client from `data/gallery.ts`.
3. Grid of work photos. Clicking one opens a shadcn Dialog with a larger view and caption.
4. Featured before/after sliders (2 or 3) per category where pairs exist.
5. CTA: "Want results like these? Get a quote on WhatsApp."

## 6. Contact `/contact`

1. Hero: fast response promise, worded around the opening hours rather than an unverified response time.
2. Two columns:
   - **ContactForm** (client): full name, phone, email (optional), service (select with all nine plus "Other / Not sure"), property type, location, preferred date, message. Reads a `?service=slug` query parameter to preselect the service. Submit opens WhatsApp. Then the success state from docs/architecture.md.
   - **Details:** address, phone (tel link), email (mailto), WhatsApp button, opening hours table.
3. Map: a Google Maps embed iframe for the Magodo Phase 2 address (no API key needed; `loading="lazy"`, with a title attribute) and a "Get directions" link.
4. Road marking note with the external link.

Built 2026-09-29: PageHero with Call, WhatsApp and Email buttons; `ContactForm` in a Card (required: name, Nigerian phone, service, message; optional: email, property type, location, date) beside `ContactDetails` (tappable call, WhatsApp, email and Instagram rows, office address with Get Directions, and a seven-day hours table formatted from `company.hours`); `ContactMap` (keyless Google Maps embed plus an overlay directions card); then `RoadMarkingBanner`. `/contact?service=<slug>` preselects the service. Shared form pieces (options, validation, selects, the sent panel) live in `components/forms/lead-fields.tsx` and are used by both the contact form and the home quote builder.

Note: static export cannot read query parameters on the server. Read `?service=` on the client with `useSearchParams` inside a `Suspense` boundary.

## 7. Not found

A branded 404 with links to Home, Services and Contact.
