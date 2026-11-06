import * as React from "react";

/**
 * The LegionOne cube mark.
 *
 * The geometry is the vector trace of the supplied brand sheet
 * (scripts/trace-logo.mjs) rather than a redrawn approximation, so the
 * seams between the three facets and the white halo around the centre
 * hexagon are exactly as they were drawn.
 *
 * Three colourways:
 *   dark  — machine black facets, brand blue centre  (light backgrounds)
 *   light — white facets, brand blue centre           (dark backgrounds)
 *   mono  — a single colour, taken from `currentColor`
 */

type Tone = "dark" | "light" | "mono";

/* Traced from the 1920px brand sheet; viewBox is 512 × 512. */
const FACET_A =
  "M249.19 8.00 L258.73 8.00 L272.35 14.81 L441.32 108.84 L460.40 119.74 L461.76 127.91 L363.65 186.51 L260.09 129.27 L251.91 129.27 L235.56 137.45 L156.53 183.78 L145.63 193.32 L144.26 314.59 L52.97 369.10 L40.70 371.82 L37.98 367.74 L37.98 138.81 L42.07 129.27 Z";
const FACET_B =
  "M465.85 140.18 L474.02 142.90 L474.02 375.91 L463.12 388.18 L264.18 504.00 L253.27 504.00 L239.65 497.19 L51.60 390.90 L50.24 386.81 L54.33 381.36 L149.71 325.49 L164.70 330.95 L249.19 380.00 L261.45 380.00 L359.56 322.77 L367.74 310.51 L366.37 198.77 Z";
const CENTRE =
  "M156.53 200.13 L157.89 197.41 L250.55 142.90 L254.64 141.54 L260.09 142.90 L347.30 191.96 L354.11 197.41 L355.47 302.33 L354.11 311.87 L352.75 313.23 L258.73 367.74 L249.19 366.37 L157.89 314.59 L156.53 311.87 Z";

export function LogoMark({
  size = 28,
  tone = "dark",
  className = "",
}: {
  size?: number;
  tone?: Tone;
  className?: string;
}) {
  const facetFill =
    tone === "dark" ? "#1d1d1f" : tone === "light" ? "#ffffff" : "currentColor";
  const centreFill = tone === "mono" ? "currentColor" : "#0166e6";

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 512 512"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden
      role="presentation"
    >
      <g fill-rule="evenodd">
        <g fill={facetFill}>
          <path d={FACET_A} />
          <path d={FACET_B} />
        </g>
        <g fill={centreFill}>
          <path d={CENTRE} />
        </g>
      </g>
    </svg>
  );
}

/**
 * The cube mark with the brand blue filled field behind it — used where the
 * mark needs to sit on its own colour block (favicons, social cards).
 */
export function LogoMarkOnBrand({
  size = 28,
  className = "",
}: {
  size?: number;
  className?: string;
}) {
  return (
    <span
      className={`inline-flex items-center justify-center bg-accent ${className}`}
      style={{ width: size, height: size }}
    >
      <LogoMark size={size} tone="light" />
    </span>
  );
}
