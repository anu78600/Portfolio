# Counterfoil — redesign decision document

Prepared for Anupam Mishra · 16 August 2026

---

## 1. Why the current site reads generic

Nothing on the site is wrong. That is the problem. The root cause is not the gold, not the charcoal, not the glow — it is that **the site has no production model**. Every decision on it was inherited from a default rather than made against an idea: Geist Sans and Geist Mono are what `create-next-app` installs, so on a Next.js site deployed to Vercel they are not a typeface choice but the visible absence of one; the 6% gold radial behind the fold is the single most reproduced gesture in current starter kits and simultaneously the house signature of trading-signal funnels; the 11px uppercase mono eyebrow at 0.085em tracking is the fingerprint of every design-engineer portfolio since 2023. Each of those is individually defensible. Together they are a fingerprint.

The second half of the diagnosis is structural, and it is the more expensive one. The site gives **equal visual weight to unequal things**. Quiet Compound — a live, shipped, solo-built product — occupies roughly the same card, the same word count and the same register as a coursework concept. A layout that ranks nothing looks like a template, because ranking is the one thing a template cannot do for you. And because the layout does no ranking, the copy is forced to do it, which is where the third failure lives: the prose runs 17.53 em dashes per 1,000 words against a published human mean of 3.23 — above the top of the entire human sample range — uses "rather than" thirteen times in 1,540 words, and contains exactly one sentence under eight words in seventy-seven. A recruiter cannot name any of that. They feel it as sameness within about eight seconds, which is roughly when they decide whether to scroll.

So: not a colour problem. A *governance* problem. The redesign below is chosen for one reason above all others — it installs a production model that decides things, and the first thing it decides is what matters most on the page.

---

## 2. The three directions

### A. Recto — a site set as a two-ink press

**What it is.** The page is treated as a printed leaf: a masthead, a double rule, one measured text column with a rag, folio numerals in the margin, real small-caps section marks, a colophon at the foot. Two inks — black and red — govern everything, and exactly one object on the site is printed on different stock: a tipped-in plate carrying Quiet Compound, black card with brass on it, glued into an otherwise all-type page.

**What it feels like to use.** Like reading one page of a very well-set annual report on your phone. No cards. Nothing floats, nothing glows. The eye lands on the name, drops through a red-and-black double rule into a deck set at 600 weight, and then hits — abruptly — a black rectangle that is obviously a different object from everything around it. You scroll past three sections of pure ruled type and there is no second black rectangle. That absence does more positioning work than any adjective.

**Strongest argument.** It makes the ranking argument physically, with no metric. Quiet Compound is on different stock; ReminderPro is three lines of type. Constraint 1 stops being a tax and becomes the layout.

**Biggest risk.** Academic drift. His weakest available framing is "MBA student with a dissertation," and a big serif in a measured column is precisely how a university department page looks. The mitigations (nothing centred, sans headings, a metadata layer of folios and stamps) are all load-bearing — remove any one and it tips.

**Right for:** someone whose readers are document readers and whose content is thin but true. Which is him. This is the closest of the three to correct.

---

### B. DATUM — the instrument that shows its own readings

**What it is.** The site as a calibrated instrument. A 36px measurement rail runs down the left edge at every breakpoint with a tick beside every row; content is dense, flush and machined; every claim carries a small mono provenance tag stating its source and confidence — including the tags that read `NOT MEASURED` and `FINDINGS EMBARGOED`. Graphite ground, index red, no gold anywhere in the stylesheet.

**What it feels like to use.** Like reading a spec sheet written by someone honest. Scanning is fast because everything is a ruled row with three columns of substance. The memorable moment is the IFFCO row, where a résumé would have printed "20% improvement in morale" and this prints `NOT MEASURED` instead — which is a stronger claim than the number was, and reads instantly as judgement rather than as a gap.

**Strongest argument.** The provenance tag is the single best conversion of his weakness into his signature. One shipped product, no metrics, an unfinished dissertation — in a card grid those are holes; in a calibrated index they are simply fields, and the field that says "not measured" is the most confident-looking object on the page.

**Biggest risk.** Terminal drift, and it is not hypothetical. Mono plus graphite plus red index is three steps from a trading terminal; one more step arrives. His audience is HR and consulting, and the cool near-black ground (#13181d) reads corporate-clinical on a cheap Android LCD with a native blue cast. Constraint 5 is the one that most directly threatens this direction.

**Right for:** an analyst-only target, or a designer/engineer audience. For four simultaneous targets weighted toward HR, it fights its own brief.

---

### C. Counterfoil — the stub you keep

**What it is.** A counterfoil is the half of a receipt that stays in the book — evidence the thing happened. The whole system reduces to one structural device: a vermilion margin rule running the full height of the page, with all metadata (folio numerals, dates, status stamps, and one handwritten line) hanging in the stub *outside* it, and all prose inside. Three inks with sources you can name in a sentence: black is what was printed, red is what a person added by hand, brass is what the product looks like and appears nowhere except inside the product's own block.

**What it feels like to use.** On a phone: a narrow warm-paper column with a red hairline down the left, numbers and years and small stamps sitting to the left of the line, prose to the right. It scans in about twenty seconds because the stub is a fixed place your eye returns to. One black card interrupts the red line entirely — you can see that it was laid over the ruling — and one section further down has four words written by hand at a two-degree tilt, in the margin, admitting something.

**Strongest argument.** It is the only one of the three whose visual grammar originates in his own shipped work. Quiet Compound already has ruled paper, a folio number, a REVIEWED stamp and a handwritten entry in Caveat. Promoting those to the site's structure makes the connection between site and product *true* rather than asserted — which matters, because asserted brand coherence is a claim he has not earned and this one he has. It is also a defensible answer to "it looks generic" that no template and no prompt can reproduce.

**Biggest risk.** Skeuomorphic ageing, and preciousness. The direction lives entirely on the distinction between a material's *texture* (dates fast — torn edges, page curl, coffee rings) and a material's *information grammar* (does not date — folio, margin rule, stamp). Hold that line by ban-list, not by taste. Secondary risk: the brass containment is fragile. One gold hover in the footer and this becomes a gold-on-dark trading site wearing a paper skin, which is worse than never quoting the product at all.

**Right for:** exactly this subject. A thin-but-true record, an HR/consulting-weighted audience, mobile-first traffic, and one strong product that already invented the aesthetic.

---

## 3. The recommendation

**Build Counterfoil, with two specific grafts and one deliberate deviation.**

**Graft 1, from Recto: the plate is a genuinely different stock, and it crosses the margin rule.** Counterfoil's original spec made the Quiet Compound block a raised white panel. That is a card, and this site has a rule against cards. Replace it with Recto's tipped-in plate — a near-black container-scoped colour world, the only place brass exists — and give it the one privilege nothing else on the site has: **it is the single element that crosses the vermilion margin rule and covers it.** Everything else on the page respects the rule absolutely. The plate is laid over the ruling, the way a plate is glued over the ruling of a bound ledger. That one exception carries the entire hierarchy argument, and it costs one `z-index`.

**Graft 2, from DATUM: one provenance tag type, budgeted.** Not tags on everything — that becomes a tic within three rows. One tag, `NOT MEASURED`, on the IFFCO row, where the résumé previously carried a morale percentage that a two-month intern cannot have measured. Maximum three tags site-wide. It is the clearest single demonstration on the page of the judgement he is actually selling.

**Deviation: the plate's stock differs by theme.** Recto specified an identical near-black plate in both themes. On a near-black *page* that gives ΔL 0.005 — below the just-noticeable difference, so the plate would stop being an object. In dark mode the plate ground rises instead (see §4). The plate's job is to be unmistakably a different object; the token that serves that job is not the same token in both themes.

**Why not Recto.** Recto is very close to right and I nearly recommended it. What loses it is that its structural device — a measured column with a double rule and marginal folios — is a *composition*, and compositions can be approximated. Counterfoil's device is a single continuous hairline with content hanging outside it, which is a *rule about where things go*, and rules are harder to fake and much easier to hold across a codebase. Recto's mobile story is also weaker: its margin column collapses inline below 60rem, so the phone — where most of his traffic is — gets a different, quieter layout than the desktop design was authored against. Counterfoil's stub exists at 320px and at 1440px, unchanged in kind. **What I am giving up:** Recto's small-caps-and-colophon register is marginally more authoritative to a consulting reader, and its "printed in two inks" story is cleaner to explain than three. I am taking the plate, the small caps, the figure routing and the tracking curve from it, and leaving the conceit vocabulary behind.

**Why not DATUM.** Because constraint 5 is a real constraint and DATUM walks toward it. Cool graphite plus index red plus a dense mono readout above the fold on a 390px screen is, to a non-designer HR reader arriving from LinkedIn, indistinguishable in register from a trading dashboard — and DATUM's own risk register says so first and most honestly. It also spends its most confident element, the readout panel, in the position where a warm human sentence would do more. **What I am giving up:** the measurement rail with its lighting tick is a genuinely lovely interaction and the tag vocabulary is the sharpest integrity device of the three. I am taking one tag and leaving the rail — Counterfoil's stub already occupies that column, and two systems cannot share it.

---

## 4. The design system

### 4.1 Colour

Light is the default and is the design. Dark is a derived variant, warm — **not** a cool petrol ground, because cool near-black plus any metallic is the trading-terminal signature and constraint 5 outranks the extra chroma headroom. `:root { color-scheme: light }`, `[data-theme="dark"]` plus a `prefers-color-scheme` mirror.

**Light (`:root`) — laid paper, hue 84; iron-gall ink, hue 62; hand-red, hue 32**

| Token | OKLCH | Hex | Job |
|---|---|---|---|
| `--paper` | `oklch(0.972 0.008 84)` | `#f8f5f0` | page ground |
| `--paper-tint` | `oklch(0.945 0.012 84)` | `#f1ece4` | wash blocks |
| `--paper-sunk` | `oklch(0.918 0.014 84)` | `#e8e3da` | wells |
| `--ink` | `oklch(0.245 0.020 62)` | `#281e17` | body, headings |
| `--ink-2` | `oklch(0.415 0.018 62)` | `#534a42` | descriptors |
| `--ink-3` | `oklch(0.490 0.016 64)` | `#675f57` | labels, folios, meta |
| `--rule-hair` | `oklch(0.880 0.013 84)` | `#dbd7ce` | decorative only |
| `--rule-row` | `oklch(0.845 0.013 84)` | `#d0ccc3` | row separators |
| `--rule-strong` | `oklch(0.615 0.016 80)` | `#8a847a` | every interactive edge |
| `--red` | `oklch(0.435 0.125 32)` | `#892f20` | links, focus, the hand |
| `--red-hover` | `oklch(0.375 0.115 30)` | `#722118` | link hover |
| `--red-mark` | `oklch(0.575 0.145 33)` | `#bf523c` | stamp rings, meaningful marks |
| `--red-margin` | `oklch(0.740 0.100 33)` | `#e39382` | **the margin rule** (decorative by contract) |
| `--red-wash` | `oklch(0.955 0.020 33)` | `#fdece8` | the dissertation wash |
| `--focus` | `= --red` | `#892f20` | focus ring |

**Dark (`[data-theme="dark"]`) — warm ink, hue 72; coral hand-red, hue 34–42**

| Token | OKLCH | Hex |
|---|---|---|
| `--paper-sunk` | `oklch(0.162 0.009 72)` | `#100d09` |
| `--paper` | `oklch(0.198 0.010 72)` | `#181511` |
| `--paper-tint` | `oklch(0.238 0.012 72)` | `#221e19` |
| `--ink` | `oklch(0.945 0.008 88)` | `#efede7` |
| `--ink-2` | `oklch(0.840 0.011 88)` | `#cdcac3` |
| `--ink-3` | `oklch(0.772 0.013 88)` | `#b8b5ac` |
| `--rule-hair` | `oklch(0.348 0.014 74)` | `#3e3932` |
| `--rule-row` | `oklch(0.400 0.015 74)` | `#4c4740` |
| `--rule-strong` | `oklch(0.560 0.017 76)` | `#7a736a` |
| `--red` | `oklch(0.775 0.098 38)` | `#eda088` |
| `--red-hover` | `oklch(0.840 0.078 42)` | `#f7baa3` |
| `--red-mark` | `oklch(0.610 0.110 35)` | `#bb6955` |
| `--red-margin` | `oklch(0.500 0.095 34)` | `#914d3e` |
| `--red-wash` | `oklch(0.290 0.045 32)` | `#3f231d` |

**The plate (`.folio-product`) — container-scoped, the only place brass resolves**

| Token | Light stock | Dark stock |
|---|---|---|
| `--plate-ground` | `oklch(0.200 0.018 80)` `#1a150d` | `oklch(0.262 0.020 80)` `#2a241a` |
| `--plate-ink` | `oklch(0.950 0.008 90)` `#f0eee9` | same |
| `--plate-ink-2` | `oklch(0.800 0.012 90)` `#c1bdb5` | same |
| `--brass` | `oklch(0.800 0.132 92)` `#dcbb4d` | same |
| `--brass-mark` | `oklch(0.640 0.115 90)` `#a7882a` | same |

**Contrast table.** Light/dark values below are from the palette harness (validated by reproducing `oklch(0.78 0.132 90)` → `#d8b346` and `oklch(0.205 0.006 75)` → `#191714` exactly). Plate values are computed here for the two stock variants and must be re-asserted post-build.

| Pair | Ratio | Requirement |
|---|---|---|
| **Light** | | |
| `--ink` / `--paper` | 15.01:1 | AAA |
| `--ink-2` / `--paper` | 8.00:1 | AAA |
| `--ink-3` / `--paper` | 5.79:1 | AA |
| `--ink-3` / `--paper-sunk` | 4.93:1 | AA (the pair source review misses) |
| `--rule-strong` / `--paper` | 3.43:1 | SC 1.4.11 |
| `--rule-strong` / `--paper-tint` | 3.17:1 | SC 1.4.11 |
| `--red` / `--paper` | 7.78:1 | AA |
| `--red-mark` / `--paper` | 4.31:1 | SC 1.4.11 |
| `--red-margin` / `--paper` | 2.21:1 | decorative by contract |
| `--ink` / `--red-wash` | 14.19:1 | AAA |
| **Dark** | | |
| `--ink` / `--paper` | 15.49:1 | AAA |
| `--ink-2` / `--paper` | 11.14:1 | AAA |
| `--ink-3` / `--paper` | 8.84:1 | AA |
| `--ink-3` / `--paper-tint` | 8.05:1 | AA |
| `--rule-strong` / `--paper` | 3.90:1 | SC 1.4.11 |
| `--red` / `--paper` | 8.63:1 | AA |
| `--red-mark` / `--paper` | 4.58:1 | SC 1.4.11 |
| **Plate, light stock `#1a150d`** | | |
| `--plate-ground` / `--paper` | **16.69:1** | the card reads as a different object |
| `--plate-ink` / ground | 15.65:1 | AAA |
| `--brass` / ground | 9.73:1 | AAA |
| `--brass-mark` / ground | 5.37:1 | AA |
| **Plate, dark stock `#2a241a`** | | |
| `--plate-ground` / `--paper` | ΔL 0.064 (≈2 JND) | reads as raised |
| `--plate-ink` / ground | 13.27:1 | AAA |
| `--brass` / ground | 8.25:1 | AAA |
| `--brass-mark` / ground | 4.54:1 | SC 1.4.11 |

**Hard rules, into `DESIGN.md`:**

1. Light-on-dark body text sits at L ≥ 0.77. Dark-on-light body text sits at L ≤ 0.51. Non-negotiable. (This is the APCA correction: dark mode needs ~55% more lightness separation than light for the same perceived contrast, and WCAG 2 does not know that.)
2. `--red-margin` and `--rule-hair` are decorative *by contract*. If anything informational ever depends on seeing them, it uses `--red-mark` or `--rule-strong` instead.
3. No red on a fill. No red on or beside a number. No red adjacent to green. Red is a hairline, a link, a ring, a stamp border, and one handwritten phrase. Ceiling ~3% of painted pixels — measure it once by screenshotting and counting.
4. **Brass resolves only inside `.folio-product`.** Not in the header, not the footer, not a hover, not the favicon. This needs a lint rule, not a convention.
5. `--glow` and the `body::before` radial are deleted outright. There is no light source in a printed page, and that glow is simultaneously the crypto tell and the template tell. Net deletion of CSS.
6. Two verified defects in the shipped tokens are fixed in the same pass: dark muted text on the overlay plane at **4.40:1** (a hard AA failure on the mobile path) and the dark accent line at **2.98:1**.
7. Verify against **compiled** CSS: `npx @tailwindcss/cli -i app/globals.css -o out.css`, parse resolved custom properties, assert the full Cartesian product of (text token × surface token that can co-occur) at 4.5:1 and every `--rule-strong` / `--red-mark` / `--brass-mark` / `--focus` pair at 3:1. Tailwind v4's `@theme inline` aliasing means the source token name is not what ships.

---

### 4.2 Typography

Five faces, five jobs, one concept: **a printed form has printed parts and written parts.** The grotesk is what the form printer set. The serif is what the record says. The mono is what a machine stamped. Fraunces is the signature. Caveat is what one person added afterwards.

All self-hosted with `next/font/local`. **Never `next/font/google`** — I verified the files its CDN actually serves: Source Serif 4 arrives with `['ccmp','dnom','frac','liga','locl','numr','pnum','tnum']`. `smcp`, `c2sc`, `onum`, `lnum`, `zero`, `case` are all stripped. Instrument Sans arrives with all twelve stylistic sets deleted. The entire small-caps layer this system is built on would silently render as fake squashed capitals — which is exactly the "almost right but cheap" texture being escaped. Vendor the upstream OFL `.ttf`, subset with `pyftsubset`, commit the `.woff2`, ship the OFL.txt files in `/public/fonts` (a visible font licence is a small credibility asset on an integrity-first site), and verify the compiled `GSUB` the same way the CSS is verified against compiled output.

| # | Face | Job | Size |
|---|---|---|---|
| 1 | **Source Serif 4** VF, opsz 10–34, wght 370–650, features `kern liga calt case smcp onum lnum pnum tnum zero` | all reading matter: lede, body, prose, labels | 82 kB |
| 2 | Source Serif 4 **Italic** static, opsz 12 / wght 400 | product titles, one-word status admissions | 12.9 kB |
| 3 | **Instrument Sans** VF, wdth pinned 100, wght 400–700, `ss01` on | headings h1–h3, row titles, buttons, the looking-for line | 21.5 kB |
| 4 | **IBM Plex Mono** 400/500, subset to caps + digits + punctuation | folios, dates, stamps, the live URL | 7.5 kB |
| 5 | **Fraunces** static, opsz 144 / wght 500 / SOFT 0 / **WONK 1**, subset to the letters of his name | the wordmark, one string, ever | 3.1 kB |
| 6 | **Caveat** static, subset to **one fixed build-time string** | the single handwritten admission | ≤8 kB budget |

**Total ≈ 127–135 kB across 6 files**, against ~91 kB for the Geist pair being dropped. Net +40 kB of font, against a net *deletion* of the IntersectionObserver hook, the sticky header, the animated `backdrop-filter`, the mobile menu, the gold radial and the `.no-js` rescue. First load goes down.

*Loading:* inline Fraunces's 3.1 kB as a base64 data URI in the critical CSS so the wordmark never swaps. Preload exactly one file — the Source Serif roman that carries LCP text. `font-display: swap` on serif roman, sans and mono, each with a metric-matched fallback. `font-display: optional` on the italic, Fraunces (fallback path) and Caveat. `font-synthesis: none` globally.

*Metric-matched fallback* (Source Serif 4: upm 1000, typoAsc 1036, typoDesc −335, lineGap 0, sxHeight 475, capHeight 670):

```css
@font-face{font-family:"Serif Fallback";
  src:local("Noto Serif"),local("Times New Roman");
  ascent-override:103.6%;descent-override:33.5%;
  line-gap-override:0%;size-adjust:112%}
```

Assume **Noto Serif**, not Georgia — Georgia is not installed on Android.

**X-height normalisation.** This is the step that decides whether a multi-family system looks designed or assembled, and skipping it turns this redesign into an accessibility regression. Measured x-height/upm: Source Serif 4 **0.4750** · Instrument Sans 0.5100 · IBM Plex Mono 0.5160 · Fraunces 0.4820 · Caveat 0.4000 · **Geist 0.5300**.

Source Serif 4 is the reference. Set on `@font-face`: **Instrument Sans `size-adjust: 93.1%`**, **IBM Plex Mono `size-adjust: 92.1%`**, Fraunces 100% (display only, near-identical), Caveat 100% (it is handwriting; do not normalise handwriting).

And because Source Serif 4 is **11.6% smaller than Geist at the same px**, the body token moves from 17px to **19px**. I am choosing this over the alternative (`size-adjust: 111.6%` on the serif, keeping the old tokens) because the whole scale is being rewritten anyway, and this leaves a stylesheet where `1.1875rem` actually means nineteen pixels of apparent letter height.

**The scale.** Authored at 390px; desktop widens the measure and almost nothing else. Tracking is a curve, expressed as `--text-*--letter-spacing` next to each size token so the pairing is enforced by the token.

| Role | Face / weight | Size | Line-height | Tracking |
|---|---|---|---|---|
| wordmark | Fraunces 500, opsz 144, WONK 1 | `clamp(2.75rem, 11vw, 4.25rem)` | 0.94 | −0.015em |
| h1 (positioning) | Instrument Sans 600 | `clamp(1.5rem, 5.2vw, 2.125rem)` | 1.20 | −0.018em |
| h2 (section) | Instrument Sans 600 | 1.25 → 1.5rem | 1.25 | −0.012em |
| h3 (row) | Instrument Sans 600 | 1.0625 → 1.125rem | 1.30 | −0.008em |
| lede | Source Serif 400, opsz 21 | 1.25 → 1.3125rem | 1.50 | −0.005em |
| **body** | Source Serif 400 / **380 dark** | **1.1875rem (19px)** | 1.62 mob / 1.55 desk | **0** |
| small | Source Serif 400 | 1rem | 1.55 | +0.005em |
| **LABEL** | Source Serif 600, `all-small-caps`, opsz 9 | 0.875rem (14px) | 1.30 | **+0.060em** |
| meta | Plex Mono 400, uppercase | 0.75rem | 1.40 | +0.040em |
| stamp | Plex Mono 500, uppercase | 0.6875rem | 1.00 | +0.100em |
| folio | Plex Mono 400, tabular | 0.8125rem | 1.20 | +0.020em |
| hand | Caveat 400 | 1.125rem | 1.30 | 0, `rotate(−2deg)` |

Body tracking is exactly zero. A text serif at text size is already correctly spaced; a −0.003em that nobody can see is a tell that the number was chosen to look like typography.

**Retire the letterspaced uppercase mono label.** `font-variant-caps: all-small-caps` (not `small-caps`), never `text-transform: uppercase`, source text left in normal case so copy-paste, screen readers and search snippets stay clean. Small caps sit at x-height, so they read as part of the text column rather than as UI chrome bolted on top — which is the difference an HR reader registers as "typeset" without being able to name it. Hold them at `--ink-3` (5.79:1 light / 8.84:1 dark); small caps carry less ink per glyph than lowercase, so target ≥ 5.5:1 for this layer specifically.

**Figure routing — three sets, deliberately.**

```css
:root, body           { font-variant-numeric: proportional-nums lining-nums }
p, li                 { font-variant-numeric: oldstyle-nums proportional-nums }
.meta,.folio,.stamp,
time, .row__date      { font-variant-numeric: tabular-nums lining-nums slashed-zero }
```

Years align down the stub in the ledger; "2020–2023" inside a sentence stops looking like a spreadsheet leaked into the prose. Yes, the same year renders in two shapes on one page. That is correct, and the boundary is legible as intent: inside a column versus inside a sentence.

**Micro-setting** (all zero bytes): `font-optical-sizing: auto` globally, manual `'opsz' 144` on the wordmark and `'opsz' 9` on the 14px small caps; `text-box: trim-both cap alphabetic` on the wordmark and h1–h3 **only**, never body (Chrome 133+/Safari 18.2+, no Firefox — retune every heading margin in one pass after enabling, then lock); `text-wrap: balance` on headings, `text-wrap: pretty` on paragraphs; `hanging-punctuation: first last` (Safari-only, silent elsewhere); `text-underline-offset: 0.18em` with `text-decoration-thickness: from-font`; curly quotes and en dashes authored in the content files; `-webkit-font-smoothing: antialiased` **scoped to dark only** — it helps on dark and thins glyphs harmfully on paper.

**Per-theme weight.** `--w-body: 400 / 380`, `--w-heading: 600 / 570`. Light text on a dark ground optically thickens; this is a one-token fix no static-font site can make, and it is why the dark theme will not look mushy. WCAG measures colour, not stroke, so check it by eye at 40% brightness on a real phone, not with the harness.

**SC 1.4.12 gate before shipping:** force letter-spacing 0.12em, word-spacing 0.16em, line-height 1.5, paragraph spacing 2em. Nothing may clip. No fixed heights on rows or stamps, no `overflow: hidden` on a heading. Check the small-caps labels specifically — they expand more than lowercase does.

---

### 4.3 Depth and elevation

Depth is **stratification, not blur**. The physics forces two mechanisms: a pure-black shadow at α0.30 moves the light paper by ΔL 0.229 in OKLab and the dark ground by only ΔL 0.031 — a 7.4× asymmetry no alpha increase can close. On dark, shadow is a contact cue worth about one JND no matter what you spend; elevation must be carried upward in tone.

**Four separation strategies, each encoding a different claim.** A component picks a claim, never a look.

| Strategy | Claim | Used for |
|---|---|---|
| **rule** | adjacent regions of the same sheet | row separators, section boundaries, the margin rule |
| **wash** | a different *kind* of content | the dissertation block |
| **well** | recessed into the sheet | metadata, the plate's definition list |
| **plate** | an object laid *on* the sheet | Quiet Compound. Once. |

```css
:root{
  --sh: oklch(0.42 0.045 84);              /* hue-matched to the paper, never neutral grey */
  --plate-shadow:
    0 1px 0 var(--rule-hair),              /* three-sheet edge: no blur, no compositing */
    0 2px 0 var(--paper),
    0 3px 0 var(--rule-row),
    0 6px 12px -6px  oklch(from var(--sh) l c h / .10),
    0 18px 28px -14px oklch(from var(--sh) l c h / .07);
  --well-shadow: inset 0 1px 2px oklch(from var(--sh) l c h / .10),
                 inset 0 -1px 0 oklch(1 0 0 / .70);
}
[data-theme="dark"]{
  --plate-shadow:                          /* two shadows max: further layers buy ΔL < 0.005 */
    inset 0 1px 0 0 oklch(1 0 0 / .065),
    0 2px 4px -2px    oklch(0.04 0.015 60 / .60),
    0 14px 30px -16px oklch(0.04 0.015 60 / .55);
  --well-shadow: inset 0 1px 2px oklch(0 0 0 / .35),
                 inset 0 -1px 0 oklch(1 0 0 / .03);
}

/* THE PLATE — its own colour world, a directional single-light edge,
   and the only element permitted to cross the margin rule.            */
.folio-product{
  position: relative; z-index: 1;          /* paints OVER .page::before  */
  container-type: inline-size;
  --paper:     oklch(0.200 0.018 80);      /* light stock: a black card  */
  --ink:       oklch(0.950 0.008 90);
  --ink-2:     oklch(0.800 0.012 90);
  --brass:     oklch(0.800 0.132 92);
  --brass-mark:oklch(0.640 0.115 90);
  color: var(--ink);
  border: 1px solid transparent;           /* border-box gradient, NOT a symmetric ring */
  border-radius: 3px;                      /* paper does not have a 16px radius */
  background:
    linear-gradient(var(--paper),var(--paper)) padding-box,
    linear-gradient(180deg,
      oklch(0.640 0.115 90 / .55) 0%,      /* brass catches the light on top */
      oklch(1 0 0 / .06)         26%,
      oklch(1 0 0 / .02)         72%,
      oklch(0 0 0 / .18)        100%) border-box;   /* bottom falls into its own shadow */
  box-shadow: var(--plate-shadow);
  padding: clamp(1.25rem, 5cqi, 2.25rem);  /* cqi: scales to itself, not the viewport */
}
[data-theme="dark"] .folio-product{ --paper: oklch(0.262 0.020 80) }
@media (forced-colors: active){ .folio-product{ border-color: CanvasText } }

.well { background: var(--paper-sunk); box-shadow: var(--well-shadow);
        border-radius: 2px; padding: .625rem .875rem }
.wash { background: var(--red-wash); padding: 1rem 1.125rem;
        box-decoration-break: clone }     /* no border, no shadow, ever */
```

A symmetric 1px ring is what flattens a raised object into a sticker; the directional border-box gradient is the fix, and it costs one extra paint layer with no pseudo-element and no compositing promotion.

**The ruled baseline grid**, scoped to the employment ledger only (section 03), light theme only. The rules pass *behind* the text at the baseline, which is the difference between notebook clipart and a designed page — and it only works because the interval is derived from the type token, never eyeballed.

```css
.ledger{ --lead: 1.62; --rule-step: calc(1.1875rem * var(--lead)) }  /* 1.924rem */
:root:not([data-theme="dark"]) .ledger{
  background-image: repeating-linear-gradient(to bottom,
    transparent 0 calc(var(--rule-step) - 1px),
    color-mix(in oklab, var(--rule-hair) 55%, transparent)
      calc(var(--rule-step) - 1px) var(--rule-step));
  background-position: 0 .39rem;   /* park the rule on the baseline; tune once, then lock */
}
```

Dark does **not** invert the rules to white — white ruling on near-black is the fastest way to make this look like a novelty theme. In dark, the ledger read comes from the margin rule and the row hairlines alone.

**Grain.** Keep it, demote it, move it off the fixed overlay. A `body::after` at z-index 9999 forces a permanent viewport-sized composited layer above all content; bake the alpha into the SVG instead and make it a `background-image` layer on the element already painting the ground, so no extra layer exists. `background-image: url(<svg with feTurbulence>)` rasterises once at 128×128 and tiles — it costs nothing per frame. `filter: url(#noise)` on a live element is a per-frame SVG filter pass. Do not confuse them. **Dark 0.022** (it genuinely dithers 8-bit banding on cheap 6-bit+FRC Android panels; below ~0.008 the amplitude drops under one quantisation level and it is pure decoration). **Light 0.012.** Never over text. `@media (prefers-reduced-transparency: reduce){ display:none }`.

**No `backdrop-filter` anywhere.** There is no sticky glass header in this system, which deletes the most expensive paint on the current site outright rather than fixing it. Also explicitly not used: letterpress text-shadow (reads 2011 and cheapens an editorial page), `corner-shape: squircle` (Chromium-only, sub-pixel at 2–3px radii), `filter: drop-shadow` on anything rectangular.

---

### 4.4 Spacing, radii, borders

- **Base unit 4px.** Scale: 4 / 8 / 12 / 16 / 24 / 32 / 48 / 64 / 96. Nothing off-scale, ever.
- Section gap 64px mobile / 96px desktop. 96px before Reach.
- Row padding-block `.875rem`, minimum row height **48px** (SC 2.5.8 asks 24px; 44px is the working floor; 48 exceeds both).
- **Radii: 0 by default. 2px on wells. 3px on the plate and stamps. Nothing above 3px on the entire site.** Paper does not have a 16px radius, and rounded-2xl is the shadcn default tell.
- **Three border tokens, three jobs.** `--rule-hair` (decorative), `--rule-row` (adjacency), `--rule-strong` (affordance, ≥3:1). Review rule: if removing the border would make it unclear that something is operable, it is `--rule-strong`. If removing it would only make the layout look looser, it is `--rule-hair`.

---

### 4.5 Motion

One pattern, zero JavaScript, and a **net deletion** from the bundle.

Delete the IntersectionObserver hook, the `[data-revealed]` rules and the `.no-js` rescue. The current ordering is inverted and fragile: content is `opacity: 0` by default and made visible by script, so any hydration error, CSP problem or script failure blanks the page. Scroll-driven animation inverts it correctly — visible in CSS, hidden start state existing only inside a support guard that also guarantees the animation will run.

```css
@keyframes lift{ from{ opacity:0; translate:0 8px } }
@supports (animation-timeline: view()){
  @media (prefers-reduced-motion: no-preference){
    [data-reveal]{ animation: lift both linear;
                   animation-timeline: view();
                   animation-range: entry 8% cover 26% }
  }
}
```

8px, under 260ms of scroll travel, applied to **sections only** — never paragraphs, never individual rows. Scroll-linked opacity on body copy is a readability tax. Audit for `overflow: hidden` / `overflow-x: clip` ancestors first: `view()` resolves against the nearest scroll container and a clipping ancestor silently re-parents the timeline. Above-fold elements resolve as already-passed and appear instantly, which is correct — so the masthead must not depend on it.

Everything else is static. Stamps use `rotate(-1.5deg)` — a static transform, not an animation. The margin rule does not draw itself in. The wordmark does not animate letter by letter. The only interactive motion is a row hover tint, 180ms `cubic-bezier(.22,1,.36,1)`, gated behind `@media (hover:hover) and (pointer:fine)` so it never runs on the phone traffic that dominates — interpolating a registered property forces a style recalc and repaint per frame, which is free under a desktop cursor and not free on Android touch-hover sticky states. Focus rings appear instantly; a focus ring that fades in is a focus ring that is missed. No View Transitions (Next's App Router intercepts internal navigation, so cross-document transitions will not fire anyway).

---

### 4.6 The signature element

**The vermilion margin rule, with the record hanging outside it.**

A visitor describes it as: *"his site looks like a page out of a ledger — there's a red line down the left, and the section numbers and the dates and the little stamps all sit outside the line, in the margin."* One continuous hairline, present at every viewport from 320px, doing four jobs at once: it is the layout grid, it is the brand mark, it is the mobile metadata column, and it is the direct, honest inheritance from Quiet Compound's paper folio.

Two things break it, and both are deliberate.

**The plate crosses it.** Quiet Compound's block is the one element on the site that spans both tracks and paints over the ruling. Everything else respects the line absolutely. That single exception is the entire hierarchy argument, made physically, with no metric and no adjective — and it is why ReminderPro having no plate reads as calibration rather than as a gap.

**The hand crosses it once.** There is exactly one handwritten phrase on the whole site. It sits in the stub beside ReminderPro, in Caveat, rotated two degrees, and it reads *built it, never shipped it*. It is not a flourish and not a signature — it is an admission, in the one voice on the page that can only belong to a person. Handwriting used once, and used to concede something, cannot read as decoration.

> **Rule, into `DESIGN.md`, never relaxed: the hand appears once, and what it says is always a limit.** A second handwritten string stops the first one working.

---

## 5. Layout and page architecture

### 5.1 The counterfoil grid

Two columns, always, at every viewport, from 320px up. **There is no second layout, because the archetype was already the mobile layout.**

```css
.page{
  --stub: 3.25rem; --gutter: 1rem; --pad: 1.125rem;
  position: relative;
  display: grid;
  grid-template-columns: var(--stub) minmax(0,1fr);
  column-gap: var(--gutter);
  max-width: 46rem;
  padding-inline: var(--pad);
  margin-inline: auto;
}
@media (min-width: 56rem){
  .page{ --stub: 9rem; --gutter: 2.25rem; --pad: 2rem; max-width: 64rem }
}
.page::before{                    /* THE MARGIN RULE */
  content:""; position:absolute; inset-block:0; width:1px; pointer-events:none;
  left: calc(var(--pad) + var(--stub) + (var(--gutter)/2) - .5px);
  background: var(--red-margin);
}
```

The rule alone is meaningless — a red vertical line is just a divider. What earns it is the *content* in the stub: folio numerals, years, status stamps, section labels. Prose never crosses. That is the composition.

**Desktop (≥56rem)** widens the stub to 9rem and caps prose at `66ch`. Rows become `1fr auto` with dates right-ranged in tabular figures, `align-items: baseline`. Nothing else changes structurally. The `[rest]` space to the right of the measure stays empty — the asymmetry is the composition, and the eye finds the column immediately because it is not where the centre is.

**Navigation: there is none.** A one-page record with seven numbered sections does not need a nav bar, and removing it deletes the sticky header, the `backdrop-filter`, the scroll listener and the mobile menu in one move. The header is a single line at the top — the name in small caps, one text link to the résumé PDF — and it does not stick.

### 5.2 Section order

| # | Section | Why it is here |
|---|---|---|
| 00 | **Masthead** | wordmark, positioning line, two paragraphs, the looking-for line. No hero block, no buttons, no availability pill. |
| 01 | **Shipped** | Quiet Compound as the plate. First, because it is the strongest thing and everything after it is calibrated against it. |
| 02 | **Also built** | ReminderPro. Three lines and the stamp. **Adjacent to 01 on purpose** — the absence of a plate immediately after the plate is the hierarchy statement, and it needs no words. The handwritten line lives here. |
| 03 | **In the record** | Outlier, freelance prompt work, IFFCO. Ruled rows, reverse chronological. Third because it is what a recruiter scans for after the work. The one section with the ruled baseline grid behind it — texture that carries meaning, because this is the part that is literally a record. |
| 04 | **Open question** | the dissertation, as a wash block. Question, method, embargo stamp. After the record so it reads as current work, not as identity. |
| 05 | **Qualification** | AKTU, APS University, certifications. Ruled rows, tabular years. |
| 06 | **Reach** | email and LinkedIn as full visible URLs, spot underlines. Two rows. No form. No "let's work together". |
| — | **Colophon** | typefaces named with designers, the build (Next.js, static, no analytics), and one line of integrity: *"Every number on this page is a date or an academic standing. There are no others."* The colophon is the perfect legal home for that sentence and it is at the bottom, where only interested people arrive. |

**Section head, one component:**

```
[stub]                    [body]
 01   ────────────────    Shipped
```

Folio in Plex Mono tabular in the stub; label in Source Serif 14px `all-small-caps` in the body; a `--rule-row` hairline filling the space via `grid-template-columns: auto 1fr` and an `::after` — which aligns to the cap line correctly only because of `text-box: trim-both cap alphabetic`.

**The dossier (01).** Stub carries the folio `01` and the `LIVE` stamp beneath it. Body carries the project name at h2, then a `.well` holding a two-column `<dl>` with dotted leaders — Status / Stack / Scope / Data / Live at — tabular figures throughout; then 140–170 words on **one** decision and its trade-off; then the URL. Beneath the plate, on the page itself, a caption in Instrument Sans 14px in `--ink-2`: *"Plate I. Quiet Compound, entry view. Live at quiet-compound.vercel.app."* Plate captions are the most credible-looking text object in publishing and cost nothing.

### 5.3 Mobile as its own design

Authored at **390px**; checked at **360px**. Desktop is the adaptation.

- **The stub is 3.25rem** — wide enough for `01`, a four-digit year, and a two-line stamp at 11px; narrow enough that the prose measure lands at 40–44 characters, which is right for 19px serif on a phone. If 360px fails on a real device, the fallback is `--stub: 2.5rem` below 380px with stamps moving inline above their row — **not** dropping the margin, which would delete the direction.
- **Rows stack** to a single column: title (Instrument Sans 600), one real descriptor (Source Serif — never one word and whitespace; that is how a ledger reads as lazy minimalism), date below in tabular mono. Minimum 48px. The whole row is the `<a>` where it links; `:focus-visible` outlines the **row**, not the text: `outline: 2px solid var(--focus); outline-offset: 3px` — verified against both the ground and the row's own hover tint that the 3px offset crosses onto.
- **The plate goes full-bleed** from the page's left padding edge to the right, crossing and covering the margin rule. This is the one moment the phone layout is *more* dramatic than the desktop one, and it is the right place to spend it.
- **The plate's `<dl>` collapses** from two columns to stacked `dt`/`dd` pairs below 30rem, and the dotted leaders are dropped rather than wrapped.
- `hyphens: auto` with `lang="en-IN"` below 30rem. Prose sentences capped at **30 words** on mobile-visible surfaces — a 44-word sentence is eight lines on a handset and that is where scanners leave.
- `padding-block-end: max(4rem, env(safe-area-inset-bottom))` on the footer. No horizontal scroll on body, ever.
- **Test inside the LinkedIn in-app webview specifically** — shorter viewport, its own safe-area behaviour — not just Chrome device mode. That is where the traffic actually arrives.

### 5.4 Routes and the machine layer

Static, prerendered `/analyst` and `/people-analytics`: identical page, one different lead paragraph, linked from a specific LinkedIn application and **not** from the site's own navigation. Discoverable variants read as A/B-tested insincerity; unlinked ones read as a tailored application.

JSON-LD `Person` + `hasCredential` (both degrees) + `WorkExample` (Quiet Compound with its live URL), and a static `/llms.txt` stating plainly what is shipped, what is built and not deployed, and what is in progress with findings unpublished. Zero runtime. Recruiters increasingly triage through assistants, so this is distribution, not SEO garnish — and it can only contain verified facts, which is the same discipline as everything else. A machine-readable false claim is a durable, quotable one.

---

## 6. Copy rewrite

The mechanical budget everything below is written against — checkable with a script over `content/`:

| Metric | Current | Target |
|---|---|---|
| em dashes per 1,000 prose words | **17.53** (human published mean: 3.23; full human range tops out at 17.12) | ≤ 4, ≤ 1 per rendered surface |
| "rather than" / "not just X but Y" / "isn't just" | **13** | ≤ 2 site-wide, on different sections |
| tricolons | 4 + a four-beat run | 1 per page, and it must be the line worth quoting |
| sentences under 8 words | **1.3%** (1 of 77) | ≥ 15% |
| three consecutive sentences within ±25% of each other's length | frequent | zero |
| paragraphs with no proper noun, date, figure or named artefact | several | zero, or cut to one sentence |

Never substitute a semicolon for a deleted em dash — that is the known compensating tic. British/Indian spelling throughout, 100% consistent. Sentence case on every heading; Title Case Is The Template Signature.

---

### 6.1 The hero

**OLD** (eyebrow + headline as shipped)

> `BUSINESS × AI × ANALYTICS`
> …a candidate who can help you hire, decide and move.

**NEW**

```
[ stub ]                      [ body ]

 00                           Anupam Mishra
 UTTAR
 PRADESH                      Most AI work stops at the demo. I want
                              the part after — where a model meets an
                              HR process, a balance sheet, a shipping
                              schedule that does not care about it.

                              MBA in HR and international business, on
                              top of a computer applications degree.
                              Top ten per cent, then top three. I
                              evaluate model output at Outlier and take
                              freelance prompt work. Versioned and
                              logged, so a change is something I can
                              point at.

                              Quiet Compound is the thing I would show
                              you first. It is live, and I built it
                              alone. The sign-in screen carries the NSE
                              market status, so the app knows whether
                              the market is open before you do.

 ─────────────────────────────────────────────────────────────────────
 LOOKING FOR                  Analyst work, people analytics, or a
                              graduate consulting scheme. Also happy to
                              be the person in the room who actually
                              knows what the model is doing.
```

**What changed, line by line**

| Old | New | Why |
|---|---|---|
| `BUSINESS × AI × ANALYTICS` (eyebrow) | deleted; replaced by `00` / `UTTAR PRADESH` in the stub | The eyebrow was a tricolon stacked directly above another tricolon in the headline. Two identical rhythmic shapes are the first two things a scanner reads. The stub carries location and folio instead — facts, not a slogan. |
| "…hire, decide and move" | "Most AI work stops at the demo. I want the part after — where a model meets an HR process, a balance sheet, a shipping schedule that does not care about it." | 6 words then 22. The tricolon survives but is **deliberately broken** — the third item carries a relative clause the other two do not, so the ascending cadence collapses on the last beat. That collapse is the effect. It also names all four target tracks implicitly (HR-tech, analyst/finance, consulting judgement, the model itself) without listing any, which is what stops four targets from arguing for none. This is the hero's one em dash, and the site's budget is spent here. |
| — | "Top ten per cent, then top three." | A six-word sentence in the highest-attention block. Both figures are checkable academic standings. The ordering inverts expectation — the *older* degree ranked higher — which is a wrinkle a model does not write. |
| — | "It is live, and I built it alone." | Eight words, flat, no adjective. Entirely verifiable at a URL, which is the only kind of claim this site is allowed to make. |
| — | "…so the app knows whether the market is open before you do." | **The irrelevant true detail.** It proves nothing rhetorically and could not be derived from a brief. It is the sentence a reader registers, usually without noticing, as evidence that someone was actually in the room. It is already his own line. |
| — | "Also happy to be the person in the room who actually knows what the model is doing." | "AI generalist" in plain words, in a different grammatical shape, arriving as a separate sentence so the four targets do not resolve into a neat list. Mildly arguable, defensible from Outlier in two minutes. |

Sentence lengths across the hero: 6 / 22 / 12 / 6 / 12 / 11 / 11 / 8 / 24 / 10 / 17. Bimodal, not the single 13–40 word hump. Em dashes: 1. Negative parallelisms: 0. Self-praise adjectives: 0. Every fact traces to the supplied inventory.

What is **not** here: no "Hi, I'm". No emoji. No availability pill. No job title. No adjective he chose about himself. No number he cannot show you.

---

### 6.2 About block — "How I work"

**OLD**

> I start with the question rather than the tool: define the problem precisely, find the data or the literature that speaks to it, analyse it, then reduce the result to something a decision-maker can act on in a page. AI has changed the speed of that loop, not the discipline of it.

**NEW**

> The order matters more than the tools do. Define the problem, then go looking for what speaks to it — the other way round gets you a confident answer to a question nobody asked. One page at the end. That last part takes the longest.

**What changed**

| Defect in the old line | Repair |
|---|---|
| "rather than" in the opening clause — the site's single loudest tic, used 13 times | Deleted. The negation was carrying no information anyway; nobody claims to start with the tool, so it was a non-claim dressed as an insight. |
| Four-beat parallel imperative run after a colon (define / find / analyse / reduce), ascending in length | Cut to two beats, and the parallelism broken by putting the consequence inline instead of another verb. |
| "precisely" | Deleted. Hollow intensifier — nobody defines a problem imprecisely on purpose. |
| Sentence lengths 47 / 12 | 8 / 26 / 4 / 5. A four-word sentence and a five-word sentence in a row, both fragments of a kind, is the burstiness fix and it costs nothing but splitting. |
| Closing on "AI has changed the speed of that loop, not the discipline of it" — a resolving abstraction, itself another not-X-but-Y | Deleted entirely and replaced with a **stated limit**. Models do not concede. For an HR or consulting reader, calibrated confidence is the trait actually being assessed. |
| Zero proper nouns, dates or artefacts in 59 words | Still light, which is acceptable in an About block — but the concrete consequence clause ("a confident answer to a question nobody asked") does the anchoring work an abstraction was doing. |

> ⚠️ "That last part takes the longest" is a self-assessment, not a fact about the world. **It must be true of him or it is invention of a different kind.** If he says no, end on "One page at the end. That is the whole job." — see §9.

---

### 6.3 Project summary — Quiet Compound

**OLD**

> A trading journal only works if you are honest in it, and people are not honest in tools they do not trust.

**NEW**

> A journal is only worth keeping if you are honest in it. I can't make anyone honest. What I can do is remove the reason not to be: entries write to your own device, and sync only if you choose to sign in.

**What changed**

| Defect | Repair |
|---|---|
| **Isocolon** — two clauses of near-identical length hinged on "and", sharing the stem word "honest", resolving into an aphorism. A very well-made sentence, made well in the specific way a model makes sentences. | Broken into 12 / 5 / 27. The five-word admission in the middle is the whole repair. |
| "people are not honest in tools they do not trust" is a **universal claim about human behaviour with no evidence and no source** — under this site's own integrity rules that is a stated finding he did not measure. A soft integrity breach as well as a style problem. | Narrowed to a claim about himself, which he can defend and nobody can dispute. |
| The aphorism was decoration: the actual local-first architecture lived in the *following* sentence, doing the real work. | Mechanism attached directly. The claim and its evidence are now in one breath. |
| Complete resolution — nothing left for the reader to do. | "I can't make anyone honest" is an admitted inability. No model volunteers one. |

Both versions use only facts already in `content/projects.ts`: local-first by default, private sync on sign-in. Nothing new is asserted about users in general.

> **Layout dependency:** "I can't make anyone honest" is a fragment of self-deprecation inside the flagship block. Keep the colon-and-mechanism in the same visual unit — do not let a section break fall between them on mobile, or it reads as a shrug.

---

### 6.4 The two integrity objects, in full

**02 · Also built**

```
[ stub ]                          [ body ]

 02                               ReminderPro
 ⟨BUILT · NOT DEPLOYED⟩
                                  Built. Not deployed anywhere.
 built it,
 never shipped it   ← Caveat, −2°
```

Four words and a stamp. Flat, no apology, no "coming soon", and the stamp is the most confident-looking object in the section.

**04 · Open question**

```
 04                               Open question
 ⟨IN PROGRESS ·
  FINDINGS EMBARGOED⟩             Can an agentic system be trusted with a
                                  decision in global shipping, and which
                                  decisions?

                                  MBA dissertation, AKTU, 2026. The analysis
                                  is not written up yet, and nothing on this
                                  page is a finding of mine. Happy to talk
                                  through the method in an interview.
```

Stating the question precisely and withholding the answer is more credible than gesturing at conclusions, because it demonstrates he knows the difference between a finding and a claim — which is the single trait a consulting or analyst interviewer is actually assessing. The withholding is converted into an invitation.

---

## 7. What we are deliberately not doing

**Template signals, cut outright.** Bento grid of equal-weight rounded cards. Geist Sans / Geist Mono (and Inter, SF Pro). The 6% gold radial glow. Any noise/mesh gradient behind a hero. Glassmorphism and systemic `backdrop-filter`. The sticky-left-bio / scrolling-right-ledger layout. "Selected Works ↗" and "Let's work together". The availability pill with a pulsing dot. The four-pointed sparkle as an AI signifier. Giant outline-stroke name in the hero. Marquee logo/skill strips. Rotating "scroll ↓" badge. Stat rows of unverifiable round numbers. Testimonial carousels. Vertical timelines with a centre line and alternating dots. Emoji section markers and "👋 Hi, I'm —". Gradient text on any number. Three or four feature cards under a centred hero. Neubrutalist hard shadows. Space Grotesk / Archivo Black at 900. Text-scramble hovers, custom cursors, magnetic buttons, loading screens, animated counters. WebGL of any kind — it wins Awwwards right now precisely because those are creative-developer portfolios for creative-developer audiences, and it fails the mid-range-Android-on-4G test twice over.

**Ideas from the three directions that were considered and cut.**

- **DATUM's cool graphite ground** (`#13181d`). Rejected: cool near-black plus any metallic is the trading-terminal signature. The warm ground at hue 72 keeps brass alive inside the plate without it. This is constraint 5 winning over extra chroma headroom, deliberately.
- **DATUM's readout panel above the fold.** Six dense mono rows on a 390px screen is a wall, and the position it occupies is where a warm human sentence does more. The same facts are distributed across the ledger sections, where they are also scannable.
- **DATUM's measurement rail and lighting tick.** Genuinely good, and it cannot coexist with the stub — two systems fighting for the same 36–52px column. The stub wins because it carries content, not decoration.
- **Provenance tags on everything.** Reduced to one tag type, ≤3 site-wide. A tag on every line is a gimmick; on the line where a reader would otherwise wonder, it is judgement. If a tag would read `SRC: OBVIOUS`, delete it.
- **Recto's conceit vocabulary in the copy** — "recto", "issue", "plate", "colophon" as metaphors the reader is told about. The conceit lives in the CSS and the structure or it dies. The colophon is the single permitted wink, and it is at the very bottom.
- **Recto's identical-in-both-themes plate.** ΔL 0.005 against the dark ground is below JND; the plate would stop being an object in dark mode. Split by theme instead.
- **Recto's plate breaking *left* into the gutter.** It would cross the margin rule and violate the site's most important structural law. Inverted into the graft: the plate crosses the rule *and covers it*, which is a better move and is the only permitted exception.
- **The ruled baseline grid behind all prose.** Kept, but scoped to the employment ledger only, light theme only. Grain plus ruling over 19px dark-on-light serif measurably erodes edge contrast, and texture everywhere is texture that means nothing.
- **`--paper-raised` as a token.** Deleted from both themes. Once the plate has its own colour world, nothing else on the site is raised, so a "raised" surface token would only invite cards back in. Four planes: sunk, paper, tint, plate.
- **A second handwritten string.** Banned by rule. One admission, or none.
- **`corner-shape: squircle`, cross-document View Transitions, letterpress text-shadow, five-layer shadows on dark.** All either Chromium-only at sub-pixel benefit, non-firing under the App Router, actively cheapening, or measurably below JND.

---

## 8. Implementation plan

Ordered by impact ÷ effort. Each phase is shippable on its own.

| # | Phase | Effort | Visual change | Risk | Reversible? |
|---|---|---|---|---|---|
| **0** | **Delete and repair.** Remove `--glow` and the `body::before` radial. Remove the `transition-[…,backdrop-filter]` on the header. Fix dark muted-on-overlay (**4.40:1 → AA**) and the 2.98:1 accent line. Audit `content/education.ts` for the "two apps live" claim against ReminderPro's actual deployment status. | 2 hours | The fold loses its glow and looks flatter — correct, and phase 3 replaces it. Scroll on Android gets visibly smoother. | Very low. The page will look *quieter*, not better, until phase 3. Do not judge it in isolation. | Yes (git) |
| **1** | **Copy pass.** Apply §6 budgets section by section. No code. | 1–2 days, not in one sitting | None visually. The largest single change in how the site *feels*. | The invention trap: every technique here improves humanity by demanding specificity, and specificity is what a writer under deadline fabricates. Every noun, number and date traced to the inventory before it ships; empty slots stay `pending`. | Yes |
| **2** | **Colour tokens.** Light-first inversion, three inks, brass containment, the four-plane model. Token swap only — no component changes. | 1 day | Very large. The site stops being a dark site with a gold accent and becomes a warm paper document with a red hairline. | The red is the one genuinely contestable choice. It must be seen on a real mid-range Android in daylight before commitment. Fallback with identical architecture: iron-gall indigo, hue ~272, chroma capped 0.09 — you lose the teacher's-red-pen logic and the site gets quieter. | Yes |
| **3** | **Type system.** Six subset faces, `size-adjust`, the scale, small caps, figure routing, tracking curve, per-theme weight. | 2–3 days | Very large, and this is the direct answer to "generic". | Two real failure modes. (a) Swapping Geist → Source Serif 4 at the same px is an **11.6% legibility regression** — the 19px body token is not optional. (b) `next/font/google` would silently ship fake small caps; verify the compiled `GSUB` before merging. Also: five swap events. Preload one, inline the wordmark, `optional` on the rest. | Yes, but the merge is large |
| **4** | **Layout — the counterfoil grid.** `.page` two-column, the margin rule, the stub, the section reorder, the row component, delete the nav / sticky header / mobile menu. | 3–4 days | Total. This is the architecture. | **The one phase that is not cheaply reversible** — it rewrites component structure and the content-to-slot mapping. Branch it. Specific check: 360px, where the stub plus gutter leaves ~40 characters of 19px serif. On a real device, not device mode. | **No** — branch and review before merge |
| **5** | **Depth.** The plate (with its z-index crossing), wells, wash, the scoped ruled grid, grain moved to the ground layer. | 1–2 days | The plate becomes the loudest object on the page and the hierarchy argument lands. | The plate is a single point of failure: if Quiet Compound goes down, the site's most confident object links to a 404. Ship the `LIVE` stamp as a one-line content-file flag he can flip to `OFFLINE`. `@supports` guards for relative colour syntax (~91%); literal fallbacks stay outside the block. | Mostly |
| **6** | **Motion.** Delete the IntersectionObserver hook, `[data-revealed]`, `.no-js`. Add the scroll-driven reveal. | 4 hours | Almost none, which is the point. Net bundle reduction and one fewer client-component boundary. | Audit for `overflow: hidden` / `overflow-x: clip` ancestors first — they silently re-parent the `view()` timeline. ~84% support; the other 16% see content, which is the desired fallback. | Yes |
| **7** | **Machine layer.** JSON-LD, `/llms.txt`, the two unlinked role routes. | 4 hours | None. | A machine-readable false claim is durable and quotable. Every field traced. | Yes |
| **8** | **Verification harness.** Compiled-CSS contrast assertions over the full (foreground × surface) product; `GSUB` feature check on every shipped woff2; the copy-metrics script over `content/`; SC 1.4.12 forced-spacing pass; a real mid-range Android in daylight; the LinkedIn in-app webview. | 1 day, then continuous in CI | None. | Gate CI on WCAG only. Report APCA as advisory and use it to *raise* values, never to justify shipping under 4.5:1. Do not put the copy metrics in a commit hook — a hook optimises the metric rather than the prose. | n/a |

**Suggested cut points if time is short.** Phases 0 + 1 + 2 alone fix most of "generic" and are all reversible within a day. Phases 0–3 are a genuinely different site. Phase 4 is what makes it *his*.

---

## 9. Open questions for him

1. **The handwritten line.** Does *"built it, never shipped it"* sound like something you'd write? And is it accurate — was ReminderPro never deployed at all, or deployed and taken down? The exact wording matters more than usual here, because it is the one sentence on the site in a voice that can only be yours.
2. **`content/education.ts` says "Two apps live so far."** Only Quiet Compound is live. Either that string is stale or ReminderPro has a deployment I don't know about. This is a live integrity defect and it blocks phase 0.
3. **One concrete detail from IFFCO.** Not a metric — a texture. What were the onboarding records actually like to work with? What surprised you? Without one, that row stays honest but thin, and the slot stays `pending`. I will not fill it.
4. **"That last part takes the longest"** — in the About rewrite. Is that true of you? If not, say so and I'll end on the flat version instead. Self-assessments are the one category I cannot verify from the inventory.
5. **Outlier's dates.** The brief says "Jun 2026". Is that a start date with the role ongoing, or did it end? The ledger's date column needs the honest form (`2026-06 →` versus `2026-06`).
6. **The red, on your actual phone.** Before phase 2 merges, look at `#892f20` on `#f8f5f0` on a real mid-range Android in daylight, next to `#eda088` on `#181511`. Does it read as a printer's red, or as a validation error? The numbers say it is safe; the numbers cannot settle this one. The indigo fallback is drawn and ready.
7. **`/analyst` and `/people-analytics`.** Worth building only if you will keep them genuinely unlinked and use them per application. Linked from the site, they read as A/B-tested insincerity. Your call, and it is a discipline question, not a design one.