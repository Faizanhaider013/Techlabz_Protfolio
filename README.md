# Tech Labz — Portfolio Website

A premium, dark-mode software house portfolio built with Next.js (App Router), React 19, TypeScript, Tailwind CSS v4, Framer Motion, GSAP, Lenis, and React Three Fiber.

## Quick start

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build (all pages statically generated)
npm start
```

## Design system

| Token | Value | Usage |
|---|---|---|
| `brand-cyan` | `#33C6FF` | Primary accent, links, icons |
| `brand-purple` | `#B13EFF` | Secondary accent, glows |
| `night` | `#071321` | Page background |
| `night-800/700/600` | lighter navy steps | Surfaces |
| `foreground` | `#E8F1FA` | Body text |
| `muted` | `#8FA3B8` | Secondary text |

- **Fonts:** Space Grotesk (`font-display`, headings) + Inter (`font-sans`, body) via `next/font`.
- **Signature gradient:** cyan → purple (`.bg-gradient-brand`, `.text-gradient`).
- **Custom utilities** (defined in `app/globals.css`): `.glass` (frosted card), `.gradient-border` (masked 1px gradient ring), `.glow-blob` (ambient radial glow), `.bg-grid` (faded grid backdrop), `.section-pad` (section rhythm).
- **Motion language:** `cubic-bezier(0.16,1,0.3,1)` ease, scroll reveals (`<Reveal>`/`<RevealStagger>`), magnetic buttons, 3D tilt cards, counters, marquee.

## Structure

```
app/                    Routes (App Router, all static/SSG)
  page.tsx              Home (hero + 7 sections)
  about/  services/  services/[slug]/  contact/
  blog/ careers/ case-studies/ pricing/   ← placeholder pages
  sitemap.ts  robots.ts  not-found.tsx
components/
  layout/               navbar, footer, scroll-progress
  providers/            smooth-scroll (Lenis+GSAP), cursor-glow, loading-screen
  sections/             page sections (hero, testimonials, timeline, …)
  three/hero-scene.tsx  R3F particle globe (client-only, DPR-capped)
  ui/                   button, reveal, magnetic, tilt-card, counter, section-heading
lib/
  site.ts               all site copy & config (nav, stats, testimonials, team…)
  services.ts           services dataset → drives /services and /services/[slug]
  utils.ts              cn() helper
```

## Editing content

All copy lives in `lib/site.ts` and `lib/services.ts` — no component changes needed to update text, add a service, testimonial, or team member. New services automatically get a detail page, sitemap entry, and footer link.

## To wire up before launch

- **Logo:** replace the SVG mark in `components/logo.tsx` / `public/favicon.svg` with the production asset.
- **Contact form:** connect `components/contact-form.tsx` `handleSubmit` to an API route or CRM.
- **Newsletter:** connect `components/newsletter-form.tsx` to your ESP.
- **OG image:** add `public/og.png` (1200×630) referenced in `app/layout.tsx`.
- **Domain:** update `siteConfig.url` in `lib/site.ts` (used by sitemap, robots, OpenGraph, JSON-LD).
- **Placeholders:** map embed on Contact, team photos, awards, case studies, blog, pricing, careers.

## SEO & accessibility

Per-page metadata + OpenGraph/Twitter cards, Schema.org `Organization` and `Service` JSON-LD, `sitemap.xml`, `robots.txt`, semantic landmarks, ARIA labels on all interactive elements, keyboard-focusable controls, and `prefers-reduced-motion` support.
