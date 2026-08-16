# Design notes

Why the site is the way it is. Read this before changing structural things —
most of the decisions here are trade-offs rather than preferences, and the
reasoning is worth having before it gets undone.

---

## 1. Positioning

**The problem.** The raw profile reads as "MBA student with varied interests":
an HR internship, a mixed set of academic projects, a long tool list, and a
dissertation. Presented flatly, that's indistinguishable from thousands of other
early-career profiles, and the AI interest reads as enthusiasm rather than
capability.

**The differentiator** isn't any single credential. It's the combination: someone
with business and HR training who genuinely works with AI and can read a
financial statement. That intersection is rare at entry level and is exactly what
the emerging class of "AI-adjacent business analyst" roles wants.

**The strongest single asset** is the dissertation — *Analysing the role of
agentic AI in global logistics with special reference to the shipping sector*.
It's original, current, technically credible and commercially relevant. Most
MBA portfolios have nothing comparable.

**The weak points**, addressed rather than hidden:

| Weakness | How the site handles it |
|---|---|
| One internship, junior scope | Kept short and factual. The page moves quickly past it to project evidence. Inflating it would be the most detectable lie on the site. |
| Projects are academic, not shipped | Framed by the *question each one asked*, which is the transferable skill, rather than by outcomes that don't exist. |
| No published research findings | Stated openly. See §5. |
| Long tool list risks looking padded | Grouped by purpose, with context only where it's real. No proficiency bars. |

**Resulting headline:** *"Applying AI and analytics to the way organisations
hire, decide and move."*

Three verbs, three real domains — HR (hire), finance and strategy (decide),
international business and shipping (move). It states a direction rather than a
status, which is the point: "MBA Student" describes where someone is, not where
they're going.

---

## 2. Information architecture

```
Hero            Who, what, two things to do, and the live product
Snapshot        Five capability domains — the 5-second scan
01 About        Background · method · working with AI · direction
02 Experience   Outlier AI, freelance prompt engineering, IFFCO
03 Work         Lead product → two featured → five academic
04 Capabilities Skills grouped by purpose
05 Credentials  Education + certifications
06 Exploring    Trajectory
07 Contact      Email and LinkedIn
```

**Work leads with shipped products, not research.** The dissertation was
originally given its own chapter ahead of everything else. It lost that slot to
Quiet Compound for one reason: a live URL a recruiter can open in a single click
outranks an unpublished paper, however good the paper is. The research keeps a
wide card, a full case study and its framing diagram — it just no longer opens
the argument.

**Three tiers in Work, and the tiering is the argument.** One lead block, two
wide cards, five grid cards. Inter-tier spacing (48/64px) is deliberately twice
the intra-tier gap (24px); when every boundary was 24px there were no tiers, just
a uniform stack of eight cards, and the visitor was left to rank the work
themselves. They won't.

**Experience sits high** because it's the question every recruiter asks first,
and it now carries three roles — two of them AI work — so it earns the position.

**Recruiter path** (the 40-second visit): hero → snapshot → résumé button in the
header → contact. All four are reachable without scrolling past the fold, and
`⌘K` reaches any of them from anywhere.

**Curious-visitor path:** hero → about → research chapter → a case study → back
→ contact.

---

## 3. Design system

All tokens live in `app/globals.css`. Nothing else in the codebase should hold a
raw colour, radius or duration.

**Colour.** Authored in OKLCH so lightness steps are perceptually even and the
accent keeps its chroma as it moves between themes. Lightning CSS emits hex
fallbacks plus `lab()` at build time, so support is universal.

Two themes designed separately, not inverted:

- **Dark** — `#161719`. Deep charcoal, never black: black crushes shadow detail
  and pushes text contrast to a level that's tiring to read for long. Chroma
  *rises* with lightness (0.004 → 0.016) rather than staying flat — perceived
  saturation is roughly C/L, so flat chroma makes the darkest and largest field
  the most visibly tinted thing on the page, which is what produces the dated
  blue-black cast.
- **Light** — `#f6f8fa`. The ground is deliberately dropped off pure white so
  that white cards read as raised sheets. At `#fcfdfe` the elevated surface sat
  on the background at 1.018:1 — every card was white on white with a hairline
  outline, which is the default Bootstrap card.

One accent: a periwinkle indigo (`#2e49c1` light, `#83a4ff` dark). It appears on
links, the active nav underline, section numbers, primary buttons and exactly one
element in each project plate. Nothing else.

Contrast was verified against the *compiled* output, not the source:

| Pair | Light | Dark |
|---|---|---|
| Body text on background | 16.4:1 | 16.2:1 |
| Secondary text on background | 9.2:1 | 9.6:1 |
| Muted text on background | 6.5:1 | 6.0:1 |
| Muted text on elevated surface | 6.9:1 | 4.9:1 |
| Accent on background | 7.0:1 | 7.4:1 |
| Text on accent fill | 7.3:1 | 8.0:1 |
| Control borders (`--border-strong`) | 3.4:1 | 3.7:1 |
| Focus ring on background | 7.0:1 | 8.3:1 |

All five accent-family tokens sit inside the sRGB gamut at hue 268. Three of
them previously did not — `--focus` was authored 67% over the chroma ceiling
and was silently clipped, which dragged the hue from 268 to 261 and made the
accent render as a different colour on P3 panels than on sRGB.

`--border` is the decorative hairline and carries no contrast requirement;
`--border-strong` outlines actual controls and is held at ≥3:1 for WCAG 2.2
non-text contrast.

**Type.** Geist Sans and Geist Mono, self-hosted via the `geist` package — no
Google Fonts request, no render-blocking third-party connection. Two families,
five roles: `display`, `title`, `heading`, `subheading`, `lede`, plus a
`label-mono` for numbers, eyebrows and metadata. Every heading size is a `clamp()`
so type scales continuously instead of jumping at breakpoints.

**Structure.** The `page-rails` utility draws two vertical hairlines marking the
content column, running the full height of the document. It is the single motif
that makes the page read as one document rather than a stack of cards — worth
protecting.

The rails are positioned with `calc(max(0px, (100% - var(--page-max)) / 2) +
var(--page-gutter) - var(--rail-inset))`, i.e. against the *centred column*, not
the viewport. Pinned to the viewport they missed the text by ~90px at 1440px and
~330px at 1920px, so the page ran two competing vertical grids — the rails on
one, and the section-heading rules and Snapshot cell dividers on the other. The
geometry now lives in `--page-max` / `--page-gutter` / `--rail-inset` so the
container and the rails cannot drift apart again.

Section headers repeat one structure everywhere: accent number, mono label,
hairline to the edge, then the heading. That repetition is what creates the
vertical rhythm.

---

## 4. Engineering decisions worth knowing

**No animation library.** The brief suggested Framer Motion and also asked for
low JavaScript. Those conflict, and the second requirement is the one that shows
up on a mid-range Android phone. Reveals are one `IntersectionObserver`
(`components/site/ScrollReveal.tsx`) stamping `data-revealed` onto elements
marked server-side, with the transition in CSS. Roughly 40 lines instead of
~35 kB of runtime.

**No icon package.** Fourteen hand-authored inline SVGs in
`components/ui/Icon.tsx`, drawn on one 24×24 grid at a 1.5 stroke so they match
the text weight beside them.

**Native `<dialog>`** for the mobile menu and command palette. Focus trapping,
Escape-to-close and background inertness come from the platform rather than from
hand-written key handlers — which is where bolted-on modals usually leak.

**Theme resolved before first paint.** A blocking inline script in `<head>` sets
`data-theme` from `localStorage` or `prefers-color-scheme`, so there's no flash
of the wrong theme. The toggle renders both icons and lets CSS choose, so it's
correct on first paint and cannot cause a hydration mismatch. The global colour
transition is applied *only* during a switch — leaving it on permanently is what
makes themed sites feel sluggish on every hover.

**Total dependencies: four** — `next`, `react`, `react-dom`, `geist`.

---

## 5. The integrity model

This is the part most worth preserving.

Nothing on this site is invented. No metrics, no outcomes, no dates, no client
names, no research findings. Where a write-up exists offline but wasn't supplied,
the case study renders an explicit note saying so.

That costs a little polish and buys the only thing a research portfolio actually
trades on. A recruiter who checks one fabricated claim discounts everything else
on the page; a page that openly says "the findings aren't published here yet"
survives the check.

Practically:

- `[ADD …]` placeholders are detected at runtime by `lib/content.ts`.
- Placeholders **never** enter JSON-LD — a fabricated `sameAs` URL in structured
  data is where a wrong fact does the most damage.
- Case-study sections marked `pending: true` render `PendingNote`.
- The one public statistic on the site (four-fifths of world merchandise trade by
  volume moves by sea) is attributed to UNCTAD and is about the shipping
  industry, not about the person.

---

## 6. Things deliberately not built

| Not built | Why |
|---|---|
| Project category filter | Five projects across five categories. Every filter would reveal one or two cards; scanning five is faster than filtering five. |
| Certification filter | Same arithmetic, five items. The category tag on each row does the job with no interaction cost. |
| Contact form | Needs a backend to be real. A form that silently fails loses the message *and* the trust. Direct email plus a copy button can't break. If you want one later, use a hosted endpoint with genuine success and error states. |
| Homepage "resume mode" toggle | Built as `/resume` instead — shareable, linkable, printable, and unambiguous about which version you're looking at. Renders from the same content files, so the two can't drift. |
| Skill proficiency bars | "Excel — 90%" is unverifiable and reads as padding. The certifications section carries the claims that can be checked. |
| Hero portrait as the focal point | A recruiter's first question is what you're for, not what you look like. The portrait sits inside a metadata panel instead. |
| Analytics | None added. If you want it, prefer a privacy-respecting, script-light option (Vercel Analytics, Plausible). |
