# Hard Rules

These rules are non-negotiable. A page that breaks any of them is not done.

## Characters and symbols

1. **No emojis** anywhere: copy, UI, alt text, metadata, comments, commit messages.
2. **No text arrows**: no `->`, `-->`, `<-`, `>>`, `→`, `»` or similar in copy, UI or comments. Use Lucide icons (`ArrowRight`, `ChevronRight`, `ArrowUpRight`) for any visual direction cue. The `=>` in TypeScript arrow functions is code syntax and is allowed; it must never appear in rendered text.
3. **No em dashes (—)** anywhere, including comments and docs. Also avoid en dashes (–). Use a hyphen, a comma, a colon, or rewrite the sentence. Ranges use words: "8:00 to 18:00", "Monday to Saturday".
4. **Lucide React icons only** for checks, arrows, badges, bullets and indicators. No unicode ticks, bullets or star characters, no inline SVGs copied from elsewhere, no icon fonts.
   - **Approved exceptions (brand icons Lucide does not ship):** the official WhatsApp glyph in `components/shared/whatsapp-icon.tsx` (floating WhatsApp button and WhatsApp contact links on the contact page), and the Instagram glyph in `components/shared/instagram-icon.tsx` (Instagram links). The user asked for both on 2026-09-29. Do not add other brand SVGs without asking.

`npm run check:copy` must pass before any page is considered finished. It scans `app/`, `components/`, `data/` and `lib/` for em dashes, en dashes, `->`, `-->`, `→`, `»` and emoji code points. It skips `docs/` on purpose, because this file lists the banned characters.

## Content

5. **No placeholder copy.** No lorem ipsum, "Your text here", "Service description", "Feature 1". Every string reads like a senior conversion copywriter wrote it. See docs/copywriting.md.
6. **No prices.** No estimates, "from" prices, price ranges, currency amounts or calculators that output money. The call to action is always a quote request or a contact action.
7. **No invented facts.** Do not make up client counts, project counts, years of experience beyond "since 2019", star ratings, reviews, testimonials, awards, certifications, insurance claims or client logos. Only use facts from docs/company.md. If a section would need one of these, ask the user first.
8. **No Interior Design & Decor.** It is out of scope for now. Do not mention it anywhere.

## Brand

9. **Colour palette** (defined once as Tailwind theme tokens, never hard-coded hex in components):
   - `brand` Logo Blue `#232D84` (primary buttons, heading accents, hero). Measured from the official logo on 2026-09-29; the client asked for the site blue to match the logo exactly, replacing the original #1B365D.
   - `brand-hover` `#1D256C` (hover and active states, the logo blue about 18% darker)
   - `ink` Slate Black `#0F172A` (body text, dark sections)
   - `surface` Soft Off-White `#F8FAFC` (alternating section backgrounds)
   - `white` Crisp White `#FFFFFF`
   - `whatsapp` `#25D366` (WhatsApp brand green). Approved only for the floating WhatsApp button, nowhere else.
   - Neutral greys from Tailwind `slate` are allowed for borders and muted text. No other accent colours unless the user approves one.

## Components

10. **shadcn/ui builds every content block; plain HTML builds the page structure.**
    - Use shadcn for interactive primitives (Dialog, Sheet, Tabs, Accordion), form controls (Button, Input, Textarea, Select, Label) and content blocks (Card, Badge, Separator). Anything that looks like a card, pill, tag or divider must be the shadcn component, never a hand-styled div. This keeps the pages consistent.
    - Sections and containers use the plain `Section` component (`components/layout/section.tsx`), which gives every section the same width, gutters and vertical spacing. Never use a Card as a section wrapper.
    - Section eyebrows are a `Badge` via `SectionHeading`. Lists inside cards are divided with `Separator`.

## Links

11. **Road marking is external.** Any mention of road marking, highways, airfields, car parks or surface marking links to `https://citychicroadmarking.com` with `target="_blank"` and `rel="noopener noreferrer"`, and shows an `ArrowUpRight` icon so the visitor knows they are leaving. Always use the shared `ExternalLink` component, never a raw anchor.
12. **Leads go to WhatsApp only.** No Web3Forms, no Resend, no WhatsApp Business API. Forms build a `https://wa.me/<digits>?text=<encoded>` link. See docs/architecture.md.
