# Setup checklist

Nothing about you was invented. Every fact that wasn't supplied is written as a
`[ADD …]` placeholder, and the UI adapts around each one — links become disabled
controls, optional lines disappear, and the portrait falls back to a designed
typographic plate.

Run `npm run dev` and every unfilled placeholder is outlined in amber, so you can
see the gaps on the page instead of hunting through files. In a production build
those outlines vanish.

Work top to bottom. The first section is the only one that's genuinely blocking.

---

## Already done

Taken from `Anupam_Resume_Updated 1.1.pdf` — name, initials, email, LinkedIn,
location, all three roles, both degrees with dates and standings, the three
dated certificates, and both shipped products. Nothing below is blocking a
deploy except `siteUrl`.

## 1. Required before deploying

**`siteUrl` in `content/profile.ts`** — your production URL. It drives canonical
tags, the sitemap and the Open Graph card, and is currently
`https://your-domain.com`. If you deploy to Vercel without a custom domain, use
the `.vercel.app` URL it gives you.

There is intentionally no GitHub entry — see the commented block in
`content/profile.ts` if you ever want to add one back.

**Résumé PDF** — save your PDF as `public/resume.pdf`, then set
`resumePdf: "/resume.pdf"`. Until you do, the hero's second button points at the
built-in `/resume` page instead of a download, which is a working fallback, not
a broken one.

---

## 2. Strongly recommended

**Portrait** — save a 4:5 crop (roughly 1000 × 1250) at `public/portrait.jpg`,
then set `portrait: "/portrait.jpg"`. Editorial and understated works best here;
the panel is designed to frame it, not to be a profile picture.

**`location`** — a city or region. Recruiters filter on it.

**`availability`** — a short line like `"Open to analyst and AI roles"`. Leave it
as a placeholder and the status dot simply doesn't render; there is no empty
space where it would have been.

**Dates** — `content/experience.ts` (`period`, `location`),
`content/education.ts` (both `period` fields), and `year` on each project in
`content/projects.ts`. Undated work reads as unverifiable.

---

## 3. Fills out the substance

**Certification links** — `content/education.ts`. Each entry has a
`credentialUrl`. Supply it and the row becomes a link to the credential; leave it
and the row stays plain text. A verifiable certificate is worth several
unverifiable ones.

**Case-study write-ups** — `content/projects.ts`. Sections marked
`pending: true` currently render an honest "not yet published" note. Replace the
`[ADD …]` string with real `body` paragraphs or `points`, then delete the
`pending: true` line.

The one that matters most is `agentic-ai-global-logistics` — its Methodology,
Findings and Implications sections are the whole reason the research section
exists. Everything else on the site is set up to send people there.

---

## 4. Optional

- **Sector/discipline labels** — the research panel in
  `components/sections/Research.tsx` states "MBA dissertation — International
  Business". Correct it if the framing is different.
- **Contact copy** — `components/sections/Contact.tsx` says you're interested in
  analyst, research and AI-adjacent roles. Make it match what you actually want.
- **Hero metadata rows** — `components/sections/IdentityPanel.tsx`, the `rows`
  array.

---

## Running it

```bash
npm run dev        # http://localhost:3000, placeholders outlined
npm run build      # production build
npm start          # serve the production build
npm run typecheck  # tsc --noEmit
```

## Deploying to Vercel

1. Push the repository to GitHub.
2. Import it at [vercel.com/new](https://vercel.com/new) — Next.js is detected,
   no configuration needed.
3. Add your custom domain, then set `siteUrl` in `content/profile.ts` to match.

Every page is statically prerendered, so there is nothing to configure at
runtime and no environment variables to set.
