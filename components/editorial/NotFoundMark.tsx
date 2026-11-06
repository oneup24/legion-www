import * as React from "react";

/**
 * The brand mark blown up into a set of concentric hexagons.
 * Used as the 404 graphic — it is the one piece of "art" on the site, so it
 * stays strictly geometric: no photography, no illustration, no invented assets.
 */
export function NotFoundMark({
  className = "",
  dotColor = "#0166e6",
}: {
  className?: string;
  dotColor?: string;
}) {
  return (
    <svg
      viewBox="0 0 320 320"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden
    >
      <polygon
        points="160,16 288,88 288,232 160,304 32,232 32,88"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinejoin="round"
        opacity="0.18"
      />
      <polygon
        points="160,48 258,106 258,214 160,272 62,214 62,106"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinejoin="round"
        opacity="0.35"
      />
      <polygon
        points="160,82 226,120 226,200 160,238 94,200 94,120"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinejoin="round"
        opacity="0.6"
      />
      <polygon
        points="160,112 198,134 198,186 160,208 122,186 122,134"
        stroke="currentColor"
        strokeWidth="2.25"
        strokeLinejoin="round"
      />
      <circle cx="198" cy="134" r="6" fill={dotColor} />
    </svg>
  );
}
