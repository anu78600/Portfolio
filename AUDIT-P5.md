# Post-Phase-5 Report

## 1. VERDICT

The site is in good shape. The parts you deliberately designed — the colour system, the type system, the three-act structure, the counterfoil grid — are correct and hold up under measurement: every text/surface pair passes contrast in both themes, the margin rule and stub align exactly at every screen size, and there is zero horizontal overflow anywhere. Twenty defects were found, but eighteen of them are at the *edges* of the design, not in it.

The two that matter: **the primary "View selected work" button is broken on small phones** — its label spills out of the box and about a third of it is printed in paper-colour on paper, i.e. invisible — and **phase 4's margin grid costs you 86 of 390 pixels on a phone**, which is where essentially all your traffic comes from. That second one is the honest bad news: on mobile, the grid you added in phase 4 made the site worse than what it replaced. It is a half-hour fix, not a rethink.

---

## 2. ERRORS TO FIX

Ordered by severity. Everything here is genuinely wrong, not a matter of taste.

### 2.1 The main call-to-action button is broken below ~375px — **fix first**

**What it is.** On a 320–375px phone, the two hero buttons are forced into a fixed two-column grid, giving each one about 102px of width. The label "View selected work" needs 137px and is set to never wrap. So it spills 21px out the left of the red button and 13px out the right. Because the label is coloured `--accent-contrast` (#f8f5f0) and the page background is also #f8f5f0, the part that spills is white text on white paper — roughly 35px of your primary call to action is literally invisible. The right-hand spill also collides with the second button.

**Why it matters.** This is the single most important control on the page, it is above the fold, and it is broken on exactly the devices your LinkedIn traffic uses. A visitor on an iPhone SE or a 360px Android sees a red pill with a word sticking out of it and a fragment missing. It reads as a bug, not as design — and it is the first thing they see.

**File.** `components/sections/Hero.tsx:96`, with `components/ui/Button.tsx:10`.

**Fix.** Stop forcing two columns on narrow screens. Change line 96 from:

```
grid grid-cols-2 gap-3 xs:flex xs:flex-wrap xs:items-center
```
to:
```
flex flex-col items-stretch gap-3 xs:flex-row xs:flex-wrap xs:items-center
```

The buttons stack full-width below 480px, which is the correct mobile pattern anyway. Do **not** try to fix it with `min-w-0` — the overflow is the un-wrappable label, not the column. Note that fix 2.4 below also widens this area; do both, but this one is the actual repair.

### 2.2 Printing the homepage makes the Quiet Compound block vanish entirely

**What it is.** The product plate is a black object with its own private colour world — that is the phase 5 idea and it is a good one. But it sets its text colour on itself, and the print stylesheet only resets colours at the page level. So when the page prints, everything outside the plate correctly flattens to black-on-white, and everything *inside* the plate keeps its near-white text — on white paper. Measured contrast: 1.16:1. Printers do not print background colours by default, so the black ground disappears and the title, the thesis line, the category, the year, the tags and both buttons all print as blank space.

**Why it matters.** Someone prints your portfolio or saves it as a PDF, and the section about the only product you have actually shipped comes out as a white hole. It is also the failure mode you would never catch yourself, because it looks perfect on screen.

**File.** `app/globals.css` — the `folio-product` utility at 599–639 and the print block at 866–885.

**Fix.** Add the plate to the print reset, inside `@media print`:

```css
.folio-product {
  --bg: #fff; --surface: #fff; --surface-sunken: #fff;
  --text-primary: #000; --text-secondary: #27272a; --text-muted: #52525b;
  --accent: #5a1f15;
  color: #000; background: none; box-shadow: none; border-color: #a1a1aa;
}
```

### 2.3 The Contact section still carries folio "07"

**What it is.** In the left margin the folios read 01, 02, 03 … 07. Contact is passing an index left over from the eight-section site you deleted in phase 4.

**Why it matters.** The whole argument of the three-act structure is that a number means "one of three movements". A stray 07 sitting under 03 tells the reader there are four more sections they cannot find. It is small, it is in the margin, and it is the most legible surviving fingerprint of the structure you removed — which makes it the detail that undoes the restructure's credibility.

**File.** `components/sections/Contact.tsx:31`.

**Fix.** Contact is not an act. Make `index` optional on `SectionHeading` and omit it here, or render Contact with `SubHeading`. **Do not renumber it to 04** — that reintroduces exactly the "a number means a heading" problem PROJECT-MEMORY §4b warns against.

### 2.4 Mobile prose is 25.5 characters per line — the source says 40–44

**What it is.** The comment at `app/globals.css:392` claims the stub is sized so the text column lands at 40–44 characters on a 390px screen. Measured, it lands at 25.5 (and 19.1 at 320px). The left padding resolves to 86px against an 18px right gutter, so 22% of a phone screen is given to a margin strip whose entire payload on mobile is four two-digit numbers.

**Why it matters.** 25 characters per line is newspaper-column narrow. Paragraphs become tall ragged stacks, the eye returns to the left edge constantly, and reading feels effortful — the opposite of "premium". This is the one place where phase 4 shipped something worse than what it replaced, and it is worse on the only platform that matters here. It is also the underlying cause of 2.1.

**File.** `app/globals.css:388–395`.

**Fix.** Below the 40rem breakpoint, drop the stub out of the column padding — set `padding-inline-start` to just `var(--page-gutter)` and let the folio sit inline above the heading (or overlay it at low opacity). Prose gets the full 354px on a 390px screen and the measure lands around 38–40 characters. The rule/stub geometry is exact at every larger size; this is purely the mobile budget. Keep the stub from 640px up, where it earns its place.

### 2.5 The command palette is invisible to screen readers

**What it is.** The palette announces itself as a list of selectable commands, but an accessibility-tree dump of the open palette returns **zero** selectable options. The reason: each command button is wrapped in an `<li>`, and a list item is not a valid child of a listbox, so the browser silently discards the "option" role on everything inside. The keyboard highlight also points at an element that has no role. The component's own docstring claims the combobox pattern is layered on so the filtered list is announced correctly; as built, it is not.

**Why it matters.** Lower priority than the above because this is a power-user feature most visitors never open — but the claim in the code is false, and if a recruiter's accessibility tooling ever looks at the site, this is what it finds.

**File.** `components/site/CommandPalette.tsx:278–330`.

**Fix.** Remove the `<li>` wrappers so the option elements are direct children of the listbox, and move the group headings into `<div role="group" aria-label="…">` wrappers rather than bare `<p>` tags inside the list.

### 2.6 One border colour fails contrast on one surface

**What it is.** `--border-strong` is the token that informational borders are required to use (§3 exempts `--border` and `--accent-line`, not this one). On the sunken/recessed surface in light theme it measures 2.90:1 against a 3:1 floor. It ships in exactly one place: the outline drawn around the ReminderPro figure on the project plate. Every other pairing passes; dark theme passes.

**Why it matters.** It is a genuine AA failure against your own stated contract, on a real shipped element. Visually it is a slightly-too-faint hairline, so nobody will notice — but you have committed to verified AA and this is the one that slipped.

**File.** Token at `app/globals.css:42`, used at `components/work/ProjectPlate.tsx:24`.

**Fix.** Darken the light-theme token to about `oklch(0.58 0.016 80)`, which measures 3.2:1 on sunken and still passes everywhere else. Do not move the figure onto `bg-surface` instead — the recessed reading is what stops the plate looking like a generic card.

### 2.7 Four surfaces still carry pre-Counterfoil colours

These are four separate one-line drifts with a single common cause, so I have grouped them. **Every one is a file that was generated once and never revisited when the palette changed in phase 2.**

| What | File | Now | Should be |
|---|---|---|---|
| Print accent | `app/globals.css:880` | `#1e1b4b` indigo | a dark vermilion (`#5a1f15`) or plain `#000` |
| Favicon | `app/icon.tsx:26` | brass `#d8b346` on `#191714` | vermilion or ink |
| Open Graph card | `app/opengraph-image.tsx:45,57` | brass `#d8b346` | vermilion or ink |
| Mobile browser chrome | `app/layout.tsx:61–62` | `#f9f7f3` / `#191714` | `#f8f5f0` / `#181511` |

Two of these are more than cosmetic drift:

- **The printed résumé is branded navy.** Every heading on `/resume` prints in `#1e1b4b`, a colour that appears nowhere on the site. The printed résumé is the artefact most likely to end up in a human being's hand. The print block also leaves `--accent-line` unset, so the vermilion margin rule prints as a salmon stripe down every page.
- **The Open Graph card is gold on near-black — which is precisely the trading-signals look the entire palette exercise exists to avoid.** It is also the *first* thing anyone sees, because it is what LinkedIn renders when you share the link. §3 says brass never appears in the favicon; both the favicon and the OG card use it, and `#d8b346` is a fourth gold that matches neither `--brass` nor either Quiet Compound measurement.

**Fix.** Change the four values. Then add the lint rule §3 already asks for: fail the build on any brass-family hex outside `.folio-product`. That rule is what stops this class of drift recurring — it is the same failure four times.

### 2.8 Two typographic declarations that do nothing

Both are harmless to render but both are false statements in a system whose value is that it is deliberate.

- `app/globals.css:282` — `font-feature-settings: "ss01"`. Source Serif 4 does not ship a stylistic set. This sits *directly underneath* a comment explaining that the previous `cv11` was "the literal fingerprint of an Inter-based starter" because the old font had no such axis. It is the same error, one line lower. **Delete the declaration.**
- `app/globals.css:478` — `font-feature-settings: "opsz" 9` on the small-caps label. `opsz` (optical size) is a *variation axis*, not a feature tag; written this way it does nothing, and because the body has automatic optical sizing on, the labels actually render at optical size ~14 — the opposite of the intent. **Either write it as `font-variation-settings: "opsz" 9` plus `font-optical-sizing: none`, or delete it and let automatic sizing do its job.**

### 2.9 Two pages draw a margin rule with nothing hanging off it

The case-study pages (`app/work/[slug]/page.tsx:70`) apply the counterfoil grid, which draws the vermilion rule down the page — but those pages contain zero stub items. `/resume` and the 404 page (`app/resume/page.tsx:45`, `app/not-found.tsx:19`) inherit the 86px left padding with neither a rule nor a stub, so at 390px they read 86px left against 18px right and simply look misaligned.

Your own comment in `globals.css` says "a rule only earns its place when content hangs off it." On three routes, nothing does.

**Fix.** Split the utility in two — `container-page` with symmetric gutters, `container-counterfoil` with the stub padding. Use the plain one on `/resume`, the 404 and in the print stylesheet. On case-study pages, either hang the project year and status in the stub (better — see §3.5) or drop the rule and run them as a plain reading column.

---

## 3. WHERE IT COULD BE MORE PREMIUM

**These are not defects.** Everything above is something that is wrong; everything below is something that is fine and could be better. Ordered by visible improvement per unit of effort.

### 3.1 Redesign the Open Graph card properly — 20 minutes, highest visibility on the list

Fixing the colour (2.7) is the defect repair. The *premium* move is to recognise what this image is: it is the only piece of your design that most people will ever see, because it renders in the LinkedIn feed whether or not anyone clicks. Right now it is a dark card with gold initials and an uppercase eyebrow — the visual language of a fintech landing page.

Make it the same object the site is: warm paper `#f8f5f0`, ink `#281e17`, one vermilion element, your name at display size in Source Serif, and one line of positioning copy. Add the vermilion margin rule and a single folio in the stub, so the card is visibly a page torn out of the site. That is a distinctive, recognisable, non-generic share image, and it is thirty lines in `app/opengraph-image.tsx`.

### 3.2 Wire up the italic — 20 minutes, and it costs nothing

`app/fonts/SourceSerif4-Italic.woff2` is already committed and already paid for in repo weight, but is not declared in `app/fonts.ts`, so it does not exist as far as the browser is concerned. Separately: there is not a single `<em>`, `<i>` or italic class anywhere in the codebase.

That absence is itself a tell. Properly set prose uses italic for the titles of works — *Quiet Compound*, *ReminderPro*, the title of your dissertation — and for the one word in a sentence that carries the emphasis. A page with no italic anywhere reads as generated rather than written. Add `style: "italic"` to the serif declaration in `app/fonts.ts`, then use it in about six places in `content/`. This is the cheapest real upgrade in typographic quality available to you, and it adds zero kilobytes because the file already ships.

### 3.3 Finish the mobile column properly — 30 minutes

2.4 is the repair: give the prose its width back. The premium version goes one step further and asks what the margin should *do* on a phone. The answer is probably: the folio sits inline as a small vermilion number immediately above the act heading, the rule disappears below 640px, and the counterfoil grid re-enters at tablet size where there is room for it to be a grid rather than a tax. That reads as a design that knows what device it is on, rather than a desktop design squeezed.

### 3.4 Make the printed résumé a designed artefact — 15 minutes

Beyond fixing the navy (2.7), print is worth ten more minutes because it is the one output that reaches a human's desk. Set the print accent to a dark vermilion so headings are recognisably yours in a colour that survives a monochrome laser printer; set `--accent-line: transparent` and `--focus: none` so the rule and focus rings do not print; use the symmetric container from 2.9 so the printed page has even margins.

### 3.5 Give the case-study pages a stub — 20 minutes

Rather than deleting the rule from `/work/[slug]` (the cheap fix in 2.9), hang the project year, the status and the live URL in the margin. The case study then becomes visibly a longer sibling of the homepage act rather than a page that lost its structure, and it gives that margin an actual job on the page where you most want the reader to believe the work is real.

### 3.6 The Fraunces wordmark — hold, do not delete yet

`app/fonts/Fraunces-Wordmark.woff2` is on disk and unused. It was reserved for a wordmark, and a real wordmark set in a display serif is a genuine premium signal. But the header's fate is undecided (the report recommends deleting the nav entirely), and a wordmark belongs to that decision. Keep the file, decide the header, then either use it in the header and the OG card, or delete it with the nav. Do not delete it as dead weight in the meantime.

---

## 4. WHAT I WOULD DO NEXT, AND WHY

**Spend the next hour on mobile and the four colour one-liners. Then stop building and go collect content. Do not start phase 6.**

The argument:

**Phase 6 is the wrong next hour.** It replaces one scroll-observer with scroll-driven CSS animation. It pays back some JavaScript weight, and it is the right thing to do eventually — but nobody has ever chosen a candidate because their reveal animation was driven by CSS rather than an observer. It is invisible to your audience. Meanwhile the primary button on that same page is broken on the devices your audience actually holds. Fixing a rendering bug on the main call to action beats an architectural improvement to something that already works.

**Phase 7 is close, but not yet.** Structured data and `llms.txt` are cheap and worth having. But structured data requires a real `siteUrl` and the site is not deployed, so it cannot be validated — you would be writing metadata for an address that does not exist. It also can't include placeholders, per your own integrity rule. Phase 7 becomes correct the moment you deploy; it is premature today.

**Phase 8 is the one worth partially pulling forward, and it is the real lesson of this round.** Five of these twenty defects — the print blow-out, the border contrast miss, the theme-colour drift, the brass in the favicon and OG, the mobile measure claim — are all things a script could have caught the moment they shipped. You already own the pieces: `shoot.mjs` does device-accurate screenshots and overflow detection, `gold.py` does contrast maths. What is missing is a single command that runs both across the eight widths, both themes, **and print emulation**, and fails loudly. Note especially that three of these bugs were in print and share-image code — the surfaces nobody ever looks at while developing. Add print emulation and an OG-image render to the harness and that whole class disappears permanently. That is maybe an hour and it is the highest-value engineering left in the project.

**But the real blocker is not engineering at all.** The design is done to a standard well past what the content currently supports. You cannot deploy because `siteUrl` is a placeholder. There is no `resume.pdf`, no portrait, no ReminderPro deployment status, three case-study sections render an honest "not yet published" note, and — most importantly — `content/goals.ts` holds two statements of intent that are the entire third act of the narrative and have never been signed off in your own voice.

Act 3 is one third of the story you decided to tell, and it is currently written by someone else. No amount of phase 6 makes up for that.

**So, concretely, in order:**

1. **~40 minutes, engineering.** The hero button (2.1), the print plate (2.2), the folio 07 (2.3), the mobile column (2.4), the four colour values (2.7), the two dead font declarations (2.8). Typecheck, build, verify, commit, push — per §4d.
2. **~20 minutes, engineering.** Redesign the OG card (3.1). It is the highest-visibility surface you own and it is currently the least like the rest of the site.
3. **Then stop, and spend the time on content.** Read the two goals aloud and rewrite them until they sound like you — that unblocks Act 3. Supply `resume.pdf`, a portrait, and the ReminderPro deployment status. Decide `siteUrl` and deploy.
4. **Phases 6, 7 and 8 after deploy**, in the order 8, 7, 6 — the harness first, because it protects everything the other two touch.

If you only have one hour, do step 1 and nothing else. If you have two, add step 2. Phase 6 can wait indefinitely; the broken button cannot.

---

## 5. DO NOT BOTHER

- **The sticky header and its blur.** The recommendation to delete the nav entirely is still your open decision, not a defect. Nothing needs doing until you decide.
- **`[ADD …]` placeholders, the "not yet published" case-study notes, the placeholder `siteUrl`, ReminderPro having no screenshot.** All deliberate, all documented, all blocked on you rather than on code.
- **`--border` and `--accent-line` not meeting contrast minimums.** Decorative by contract. Nothing informational depends on them. (This does *not* extend to `--border-strong` — see 2.6, which is a real failure.)
- **The dead code list — `learning`, `ProjectCard`, `HEADER_OFFSET`, `prettyUrl`, `showSpy`, `imageMobile`, `meta-mono`, `wash`, the `geist` dependency.** All confirmed unreferenced, all completely harmless. They do not ship to the browser, they do not slow anything, they do not affect a single pixel. Sweep them in five minutes when you next touch those files; do not spend a dedicated session on them, and do not let a cleanup pass displace step 1 above.
- **The stale comments** in `lib/nav.ts`, `content/types.ts`, `app/fonts.ts` and `About.tsx` that describe deleted structure. Worth correcting because the next agent will believe them — `nav.ts:8–10` in particular asserts an ordering rationale that is now false — but this is housekeeping, not a defect, and it changes nothing a visitor sees.
- **The first-load size increase** (~304 kB → ~377 kB from the font work). Real, known, and already accounted for: phase 6 is where it comes back. Not a problem to solve now.

One genuinely positive result worth recording, because it is what was actually tested: keyboard navigation, focus-visible rings, the mobile menu, the résumé density toggle and reduced-motion all behave correctly under test; the margin rule and stub align exactly at all eight widths with a constant gap; nothing but the plate crosses the rule; there is zero horizontal overflow anywhere; the real small caps genuinely resolve rather than being faked; and every text-on-surface pair in both themes and inside the plate passes 4.5:1. The system underneath is sound. What failed is the edges around it.