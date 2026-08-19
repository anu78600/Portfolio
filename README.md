# Personal résumé & portfolio site

A statically prerendered personal site positioned around **Business × AI ×
Analytics** — built to make an early-career profile read as directed rather than
assorted.

**Start here → [SETUP.md](SETUP.md)** for the fill-in checklist.
**Then → [DESIGN.md](DESIGN.md)** for why the site is shaped the way it is.

## How this was built

Designed and built with AI assistance (Claude Code), directed by me.

I supplied the content and made the editorial calls: the positioning, what leads
the page, what gets cut, and what stays off it entirely. There are no invented
metrics anywhere on this site — where a write-up isn't finished, the page says
so rather than filling the gap. Two claims from my own résumé were removed for
exactly that reason.

"AI-assisted development" is a skill listed on the site itself. This repository
is the evidence for that claim rather than a footnote to it.

```bash
npm install
npm run dev        # http://localhost:3000
```

## Stack

Next.js 16 (App Router) · React 19 · TypeScript (strict) · Tailwind CSS v4.

Type is self-hosted and subset by hand: **Source Serif 4** (variable, real
small caps) for body and prose, **Instrument Sans** for headings and UI chrome,
**IBM Plex Mono** for folios, dates and stamps — x-height-normalised so the
three families sit on one optical size.

Three runtime dependencies in total. No animation library, no 3D engine, no
icon package, no UI kit — see
[DESIGN.md §4](DESIGN.md#4-engineering-decisions-worth-knowing). All motion is
native: CSS scroll-driven animations (`animation-timeline: view()`) for
reveals, the settle and the count-up band, one IntersectionObserver fallback,
and `prefers-reduced-motion` gated explicitly — including in print, where a
paginated page has no scrollport and an unguarded scroll-driven animation
renders at progress zero.

## Layout

```
app/
  layout.tsx              Shell, metadata, JSON-LD, theme script
  page.tsx                Homepage composition — section order lives here
  resume/page.tsx         Printable résumé, same data source
  work/[slug]/page.tsx    Case studies, statically generated per project
  not-found.tsx           404
  icon.tsx                Favicon generated from your initials
  opengraph-image.tsx     Social card generated from your profile
  globals.css             THE DESIGN SYSTEM — all tokens live here
content/                  Your facts. Edit these, never the components.
  profile.ts  projects.ts  experience.ts  skills.ts  education.ts  types.ts
components/
  sections/               One file per homepage section
  work/                   Project cards, plates, research diagram
  site/                   Header, menu, palette, theme, footer
  ui/                     Button, Icon, Tag, Reveal, SectionHeading…
lib/                      Placeholder handling, scroll hooks, SEO, nav registry
```

**The rule that keeps this maintainable:** components never hard-code a fact
about you. To change what the site says, edit `content/`. To change how it looks,
edit `globals.css` tokens or a component. The two don't mix.

## Content model

Everything renders from typed objects in `content/`. Adding a project means
appending to `content/projects.ts` — the card, the case-study route, the sitemap
entry, the résumé listing and the command palette all pick it up with no other
changes.

Facts that weren't supplied are `[ADD …]` placeholders. The UI degrades around
them deliberately rather than printing scaffolding: disabled links instead of
dead ones, omitted lines instead of empty ones, a designed typographic plate
instead of a broken image. In `npm run dev` they're outlined in amber; in
production they're invisible.

## Features

- Dark and light themes, each designed rather than inverted, resolved before
  first paint with no flash
- Command palette (`⌘K` / `Ctrl K`) — sections, case studies, résumé, contact,
  theme
- Scroll-spy navigation and reading progress from one rAF-throttled listener
- Printable `/resume` route with dedicated print CSS
- Per-project case-study pages, statically generated
- Generated favicon and Open Graph card, both driven by your profile data
- `Person` / `WebSite` / `ProfilePage` JSON-LD, sitemap, robots

## Verification

```bash
powershell -ExecutionPolicy Bypass -File scripts/serve.ps1   # build + serve + headless Chrome
npm run verify                                               # 186 checks against the RUNNING site
npm run copy-metrics                                         # prose tics: em-dash rate, flat runs…
```

The harness grades the compiled CSS, not the source: contrast for every
(text × surface) pair in both themes, overflow in both directions at nine
widths, print legibility against a white ground, placeholder leakage into
visible text and JSON-LD, and that every scroll-driven animation actually
resolves to the root scroller (an `overflow: hidden` ancestor silently
re-parents the timeline and the animation becomes a no-op that still reports
"running"). Every check exists because something real once got through.

## Accessibility

Targets WCAG 2.2 AA. Semantic landmarks, a single `h1` with a clean heading
outline, skip link, visible focus on everything, platform-native modal semantics,
`prefers-reduced-motion` honoured, and no meaning carried by colour alone.
Contrast was verified against the compiled CSS — see the table in
[DESIGN.md §3](DESIGN.md#3-design-system).

## Deploy

Push to GitHub, import at [vercel.com/new](https://vercel.com/new), add your
domain, then set `siteUrl` in `content/profile.ts`. Every route is static; there
is nothing to configure and no environment variables.
