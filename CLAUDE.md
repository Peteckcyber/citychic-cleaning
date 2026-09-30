# CityChic Cleaning Services - Project Guide

Marketing website for CityChic Cleaning Services Ltd (Lagos, Nigeria). Next.js App Router, static export, hosted on Cloudflare Pages. No backend, no database, no prices. Every lead goes to WhatsApp through a prefilled click-to-chat link.

Read the imported docs below before building or editing any page. They are the source of truth. If the code and a doc disagree, follow the doc and flag the mismatch.

@AGENTS.md
@docs/rules.md
@docs/company.md
@docs/architecture.md
@docs/pages.md
@docs/copywriting.md

## Open items (check before shipping)

| Item | Status | Where it plugs in |
|---|---|---|
| WhatsApp number that receives leads | Resolved: +234 704 698 3893, the only published number | `data/company.ts` `whatsappNumber` |
| Production domain | Resolved: https://citychiccleaning.com | `data/company.ts` `siteUrl` |
| Image URLs (hero, before/after pairs, gallery, logo, OG image) | Client will supply Cloudflare links | `data/images.ts` only |
| Image host type (Cloudflare Images or R2) | Waiting on client | `next.config.ts` loader choice |

Until an item is supplied, use a clearly named placeholder constant (for example `PLACEHOLDER_SITE_URL`) in one place only. Never scatter guesses through components.

## Commands

- `npm run dev` - local dev server
- `npm run build` - static export to `out/`
- `npm run lint` - ESLint
- `npm run check:copy` - scans for banned characters (see docs/rules.md)
