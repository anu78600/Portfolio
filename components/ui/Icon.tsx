import type { SVGProps } from "react";

/**
 * Icons are hand-authored inline SVG rather than an icon package.
 *
 * The site needs fourteen glyphs. Pulling in an icon library to get them would
 * add a dependency and a runtime for no benefit — these ship as part of the
 * server-rendered HTML and cost nothing on the client.
 *
 * All paths are drawn on a 24×24 grid with a 1.5 stroke so they optically match
 * the text weight beside them.
 */

export type IconName =
  | "linkedin"
  | "github"
  | "mail"
  | "arrow-up-right"
  | "arrow-right"
  | "arrow-up"
  | "arrow-down"
  | "sun"
  | "moon"
  | "menu"
  | "close"
  | "search"
  | "copy"
  | "check"
  | "download"
  | "file-text"
  | "sparkles"
  | "briefcase"
  | "trending-up"
  | "layers"
  | "award"
  | "graduation-cap"
  | "compass"
  | "map-pin"
  | "minus"
  | "plus";

const paths: Record<IconName, React.ReactNode> = {
  // Brand marks are filled shapes; drawn to the same optical weight as the
  // stroked icons so a row of social links reads evenly.
  linkedin: (
    <path
      fill="currentColor"
      stroke="none"
      d="M6.94 5.5a1.94 1.94 0 1 1-3.88 0 1.94 1.94 0 0 1 3.88 0ZM3.4 8.93h3.2V20H3.4V8.93Zm5.24 0h3.07v1.52h.04c.43-.8 1.47-1.65 3.03-1.65 3.24 0 3.84 2.1 3.84 4.84V20h-3.2v-5.5c0-1.31-.02-3-1.85-3-1.86 0-2.14 1.43-2.14 2.9V20h-3.2V8.93Z"
    />
  ),
  github: (
    <path
      fill="currentColor"
      stroke="none"
      d="M12 2.2a9.8 9.8 0 0 0-3.1 19.1c.49.09.67-.21.67-.47l-.01-1.84c-2.5.46-3.14-.6-3.34-1.16-.11-.29-.6-1.16-1.02-1.4-.35-.18-.85-.64-.02-.65.79-.01 1.35.72 1.53 1.02.9 1.5 2.33 1.08 2.9.82.09-.65.35-1.09.63-1.34-2.21-.25-4.53-1.11-4.53-4.92 0-1.09.39-1.98 1.02-2.68-.1-.25-.44-1.27.1-2.64 0 0 .84-.26 2.75 1.02a9.3 9.3 0 0 1 5 0c1.9-1.29 2.74-1.02 2.74-1.02.55 1.37.2 2.39.1 2.64.64.7 1.02 1.58 1.02 2.68 0 3.83-2.33 4.67-4.54 4.92.36.31.67.91.67 1.85l-.01 2.74c0 .26.18.57.68.47A9.8 9.8 0 0 0 12 2.2Z"
    />
  ),
  mail: (
    <>
      <rect x="2.75" y="4.75" width="18.5" height="14.5" rx="2" />
      <path d="m3.5 6.5 7.4 5.3a2 2 0 0 0 2.2 0l7.4-5.3" />
    </>
  ),
  "arrow-up-right": <path d="M7 17 17 7m0 0H8m9 0v9" />,
  "arrow-right": <path d="M4 12h15m0 0-6-6m6 6-6 6" />,
  "arrow-up": <path d="M12 20V4m0 0-6 6m6-6 6 6" />,
  "arrow-down": <path d="M12 4v16m0 0 6-6m-6 6-6-6" />,
  sun: (
    <>
      <circle cx="12" cy="12" r="4.25" />
      <path d="M12 2.5v2M12 19.5v2M2.5 12h2M19.5 12h2M5.3 5.3l1.4 1.4M17.3 17.3l1.4 1.4M18.7 5.3l-1.4 1.4M6.7 17.3l-1.4 1.4" />
    </>
  ),
  moon: <path d="M20.5 14.3A8.5 8.5 0 0 1 9.7 3.5a8.5 8.5 0 1 0 10.8 10.8Z" />,
  menu: <path d="M3.5 7.5h17M3.5 16.5h17" />,
  close: <path d="M5.5 5.5l13 13M18.5 5.5l-13 13" />,
  search: (
    <>
      <circle cx="10.5" cy="10.5" r="6.75" />
      <path d="m15.5 15.5 4.75 4.75" />
    </>
  ),
  copy: (
    <>
      <rect x="8.75" y="8.75" width="11.5" height="11.5" rx="2" />
      <path d="M15.25 5.75a2 2 0 0 0-2-2h-7.5a2 2 0 0 0-2 2v7.5a2 2 0 0 0 2 2" />
    </>
  ),
  check: <path d="m4.5 12.5 5 5 10-11" />,
  download: <path d="M12 3.5v11m0 0 4.5-4.5M12 14.5 7.5 10M4 16.5v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2" />,
  "file-text": (
    <>
      <path d="M13.5 3.5H7a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V9l-5.5-5.5Z" />
      <path d="M13.5 3.5V9H19M8.5 13.5h7M8.5 17h4.5" />
    </>
  ),

  // Domain glyphs — one per capability group, plus credential and place marks.
  sparkles: (
    <>
      <path d="m12 3.5 1.7 4.3 4.3 1.7-4.3 1.7L12 15.5l-1.7-4.3L6 9.5l4.3-1.7L12 3.5Z" />
      <path d="m18 15.5.85 2.15L21 18.5l-2.15.85L18 21.5l-.85-2.15L15 18.5l2.15-.85L18 15.5Z" />
    </>
  ),
  briefcase: (
    <>
      <rect x="3" y="7.5" width="18" height="12.5" rx="2" />
      <path d="M8.75 7.5V6a2 2 0 0 1 2-2h2.5a2 2 0 0 1 2 2v1.5M3 12.75h18" />
    </>
  ),
  "trending-up": <path d="m3.5 16.5 5.5-5.5 3.5 3.5 8-8m0 0h-5.5m5.5 0V12" />,
  layers: (
    <>
      <path d="m12 3.5 8.5 4.5-8.5 4.5L3.5 8 12 3.5Z" />
      <path d="m3.5 13.5 8.5 4.5 8.5-4.5" />
    </>
  ),
  award: (
    <>
      <circle cx="12" cy="9" r="5.5" />
      <path d="m8.6 13.4-1.6 6.6 5-2.6 5 2.6-1.6-6.6" />
    </>
  ),
  "graduation-cap": (
    <>
      <path d="M12 4 2.5 9 12 14l9.5-5L12 4Z" />
      <path d="M6.75 11.4V16c0 1.7 2.35 3 5.25 3s5.25-1.3 5.25-3v-4.6" />
    </>
  ),
  compass: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="m15.6 8.4-2.1 5.1-5.1 2.1 2.1-5.1 5.1-2.1Z" />
    </>
  ),
  "map-pin": (
    <>
      <path d="M12 21s6.5-5.4 6.5-10.5a6.5 6.5 0 1 0-13 0C5.5 15.6 12 21 12 21Z" />
      <circle cx="12" cy="10.5" r="2.5" />
    </>
  ),
  minus: <path d="M5 12h14" />,
  plus: <path d="M12 5v14M5 12h14" />,
};

interface IconProps extends Omit<SVGProps<SVGSVGElement>, "name"> {
  name: IconName;
  size?: number;
}

export function Icon({ name, size = 20, ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      {paths[name]}
    </svg>
  );
}
