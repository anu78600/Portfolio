import localFont from "next/font/local";
import { GeistSans } from "geist/font/sans";

/**
 * Typeface loading.
 *
 * Geist Sans is the reading face and carries the LCP element, so it stays a
 * preloaded variable font — worth the request and the ~68 kB.
 *
 * Geist Mono is a different case. It is only used for small uppercase labels,
 * section numbers, metadata and the brand mark; none of that is on the critical
 * path. Loading it the default way cost 71 kB of *preloaded* variable font
 * competing with the hero for bandwidth, to style text that is decorative.
 *
 * So it is vendored as a single static weight — the only weight the design
 * uses — and explicitly not preloaded. That trims 20 kB and, more importantly,
 * moves the whole request off the critical path. `swap` plus a matched fallback
 * stack means the labels render immediately in a system mono and settle without
 * a layout jump.
 */
export const geistSans = GeistSans;

export const geistMono = localFont({
  src: "./fonts/GeistMono-Medium.woff2",
  variable: "--font-geist-mono",
  weight: "500",
  style: "normal",
  display: "swap",
  preload: false,
  fallback: [
    "ui-monospace",
    "SFMono-Regular",
    "Menlo",
    "Consolas",
    "Liberation Mono",
    "monospace",
  ],
});
