import { readFileSync } from "node:fs";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { profile } from "@/content/profile";
import { siteName } from "@/lib/seo";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = `${siteName} — ${profile.jobTitle}`;

/**
 * The share card.
 *
 * This is the only piece of the design most people will ever see, because it
 * renders in the LinkedIn feed whether or not anyone clicks. It previously
 * carried gold initials on near-black — the visual language of a fintech
 * landing page, and precisely the look the whole palette exercise exists to
 * avoid, on the highest-visibility surface of the lot.
 *
 * It is now the same object the site is: warm paper, iron-gall ink, one
 * vermilion margin rule with a folio hanging in the stub. A page torn out of
 * the site rather than a banner about it.
 *
 * Fonts are read from disk as TTF because satori cannot parse woff2, and are
 * subset to exactly the characters this card renders.
 */
const fontDir = join(process.cwd(), "app", "og");
const serif = readFileSync(join(fontDir, "SourceSerif-OG.ttf"));
const sans = readFileSync(join(fontDir, "InstrumentSans-OG.ttf"));

const PAPER = "#f8f5f0";
const INK = "#281e17";
const INK_2 = "#534a42";
const INK_3 = "#675f57";
const RED = "#892f20";
const RULE = "#dbd7ce";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          background: PAPER,
          color: INK,
          fontFamily: "Source Serif",
        }}
      >
        {/* The stub: folio only, right-ranged against the rule. */}
        <div
          style={{
            width: 128,
            display: "flex",
            justifyContent: "flex-end",
            paddingTop: 96,
            paddingRight: 20,
            fontSize: 22,
            letterSpacing: "0.06em",
            color: RED,
          }}
        >
          01
        </div>

        {/* The margin rule. */}
        <div style={{ width: 1, height: "100%", background: RED, opacity: 0.5 }} />

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            paddingTop: 88,
            paddingBottom: 76,
            paddingLeft: 40,
            paddingRight: 84,
            flex: 1,
          }}
        >
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div
              style={{
                fontFamily: "Instrument Sans",
                fontSize: 20,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                color: INK_3,
                marginBottom: 30,
              }}
            >
              {profile.eyebrow}
            </div>

            <div
              style={{
                fontSize: 92,
                lineHeight: 1.02,
                letterSpacing: "-0.022em",
                color: INK,
              }}
            >
              {siteName}
            </div>

            <div
              style={{
                marginTop: 26,
                fontSize: 36,
                lineHeight: 1.32,
                color: INK_2,
                maxWidth: 800,
              }}
            >
              {profile.headline}
            </div>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 14,
              paddingTop: 26,
              borderTop: `1px solid ${RULE}`,
              fontSize: 22,
              color: INK_3,
            }}
          >
            MBA — HR &amp; International Business
            <span style={{ color: RULE }}>·</span>
            BCA
            <span style={{ color: RULE }}>·</span>
            Uttar Pradesh
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Source Serif", data: serif, weight: 400, style: "normal" },
        { name: "Instrument Sans", data: sans, weight: 600, style: "normal" },
      ],
    },
  );
}
