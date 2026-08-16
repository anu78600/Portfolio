import { ImageResponse } from "next/og";
import { profile } from "@/content/profile";
import { initialsFrom } from "@/lib/content";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

/**
 * Favicon: the same initials mark used in the header, so the browser tab, the
 * site and the résumé all carry one identity. Generated from the profile data
 * rather than a checked-in binary, which means renaming updates every surface.
 */
export default function Icon() {
  const initials = initialsFrom(profile.name, profile.initials);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#191714",
          color: "#d8b346",
          fontSize: initials.length > 2 ? 13 : 15,
          fontWeight: 600,
          letterSpacing: "-0.02em",
          borderRadius: 6,
        }}
      >
        {initials}
      </div>
    ),
    size,
  );
}
