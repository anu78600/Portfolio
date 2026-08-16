import localFont from "next/font/local";

/**
 * The type system.
 *
 * Five faces, five jobs, one idea: a printed form has printed parts and written
 * parts. The grotesk is what the form printer set. The serif is what the record
 * says. The mono is what a machine stamped.
 *
 * ─────────────────────────────────────────────────────────────────────────────
 * WHY THESE ARE VENDORED AND NOT `next/font/google`
 *
 * Google's CDN re-subsets these families and strips their OpenType layout
 * tables. Source Serif 4 arrives from it without `smcp` / `c2sc` / `onum` /
 * `lnum` / `zero` / `case`. Every small-caps label in this design would then
 * silently render as fake squashed capitals — which is exactly the
 * almost-right-but-cheap texture the redesign exists to escape.
 *
 * So the upstream OFL files are fetched, axis-clipped, subset with pyftsubset
 * and committed. `scratchpad/fonts3.py` rebuilds them and prints the surviving
 * GSUB features; the shipped roman carries `c2sc case ccmp liga lnum onum pnum
 * smcp tnum zero`, verified against the compiled woff2 rather than assumed.
 *
 * ─────────────────────────────────────────────────────────────────────────────
 * X-HEIGHT NORMALISATION
 *
 * This is the step that decides whether a multi-family system looks designed or
 * assembled. Measured from the shipped files (x-height / upm):
 *
 *   Source Serif 4   0.4910   <- reference
 *   Instrument Sans  0.5100   -> size-adjust 96.3%
 *   IBM Plex Mono    0.5160   -> size-adjust 95.2%
 *   Fraunces         0.4365   -> display only, left alone
 *
 * Without this, the sans and mono sit visibly larger than the serif at the same
 * declared size and the page reads as three fonts rather than one system.
 */

/** Reading matter: lede, body, prose, and the small-caps label layer. */
export const serif = localFont({
  src: [
    {
      path: "./fonts/SourceSerif4-Roman.woff2",
      weight: "370 650",
      style: "normal",
    },
  ],
  variable: "--font-serif",
  display: "swap",
  preload: true, // the only preloaded file; it carries the LCP text
  // Noto Serif, not Georgia — Georgia is not installed on Android.
  fallback: ["Noto Serif", "Times New Roman", "serif"],
  adjustFontFallback: false,
  declarations: [
    { prop: "ascent-override", value: "103.6%" },
    { prop: "descent-override", value: "33.5%" },
    { prop: "line-gap-override", value: "0%" },
  ],
});

/** Headings, row titles, buttons. A grotesk with actual character. */
export const sans = localFont({
  src: [
    { path: "./fonts/InstrumentSans-Medium.woff2", weight: "500", style: "normal" },
    { path: "./fonts/InstrumentSans-SemiBold.woff2", weight: "600", style: "normal" },
  ],
  variable: "--font-sans",
  display: "swap",
  preload: false,
  fallback: ["Helvetica Neue", "Arial", "sans-serif"],
  adjustFontFallback: false,
  declarations: [{ prop: "size-adjust", value: "96.3%" }],
});

/** Folios, dates, stamps, the live URL. What a machine stamped. */
export const mono = localFont({
  src: [{ path: "./fonts/IBMPlexMono-Regular.woff2", weight: "400", style: "normal" }],
  variable: "--font-mono",
  display: "swap",
  preload: false,
  fallback: ["ui-monospace", "SFMono-Regular", "Menlo", "monospace"],
  adjustFontFallback: false,
  declarations: [{ prop: "size-adjust", value: "95.2%" }],
});
