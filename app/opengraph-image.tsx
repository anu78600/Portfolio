import { ImageResponse } from "next/og";
import { profile } from "@/content/profile";
import { initialsFrom } from "@/lib/content";
import { siteName } from "@/lib/seo";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = `${siteName} — ${profile.jobTitle}`;

/**
 * Social preview card.
 *
 * Generated at build time from the profile data, in the site's own dark palette
 * — so a link shared into LinkedIn or Slack looks like the site it points at
 * rather than a generic screenshot. Type only; no photograph is assumed to
 * exist.
 */
export default function OpengraphImage() {
  const initials = initialsFrom(profile.name, profile.initials);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#16181d",
          padding: "72px 80px",
          color: "#f4f4f7",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 46,
              height: 46,
              borderRadius: 8,
              border: "1px solid #45464f",
              color: "#a5a0f5",
              fontSize: 16,
              fontWeight: 600,
            }}
          >
            {initials}
          </div>
          <div
            style={{
              fontSize: 19,
              letterSpacing: "0.16em",
              textTransform: "uppercase",
              color: "#a5a0f5",
            }}
          >
            {profile.eyebrow}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontSize: 76,
              fontWeight: 600,
              letterSpacing: "-0.035em",
              lineHeight: 1.05,
            }}
          >
            {siteName}
          </div>
          <div
            style={{
              marginTop: 24,
              fontSize: 34,
              lineHeight: 1.35,
              letterSpacing: "-0.02em",
              color: "#b8b9c4",
              maxWidth: 900,
            }}
          >
            {profile.headline}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            paddingTop: 28,
            borderTop: "1px solid #33343d",
            fontSize: 21,
            color: "#8b8c98",
          }}
        >
          MBA — HR &amp; International Business
          <span style={{ color: "#45464f" }}>·</span>
          BCA
          <span style={{ color: "#45464f" }}>·</span>
          Agentic AI research
        </div>
      </div>
    ),
    size,
  );
}
