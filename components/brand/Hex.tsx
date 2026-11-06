import * as React from "react";

/**
 * The hexagon is LegionOne's structural gene.
 *
 * Every brand-owned shape on the site is derived from the same pointy-top
 * hexagon as the logo mark: section indices, icon containers, avatars, spine
 * nodes, decorative fields. Ratio 1.1547 keeps it a true regular hexagon
 * (w × w·2/√3) rather than a stretched one.
 */

const HEX_RATIO = 1.1547;

export type HexTone =
  | "ink"
  | "legion"
  | "onLegion"
  | "onDark"
  | "tint"
  | "legionTint";

const TONE_BG: Record<HexTone, string> = {
  ink: "bg-ink text-white",
  legion: "bg-accent text-white",
  onLegion: "bg-white text-accent",
  onDark: "bg-white text-ink",
  tint: "bg-white text-accent",
  legionTint: "bg-accent-tint text-accent",
};

/** Filled hexagon container. */
function HexBox({
  children,
  size,
  tone,
  className = "",
  style,
}: {
  children: React.ReactNode;
  size: number;
  tone: HexTone;
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <span
      className={`clip-hex inline-flex items-center justify-center leading-none ${TONE_BG[tone]} ${className}`}
      style={{
        width: size,
        height: Math.round(size * HEX_RATIO),
        ...style,
      }}
    >
      {children}
    </span>
  );
}

/**
 * Section index marker — the number of the block, reversed out of a hexagon.
 * Replaces the plain "01" text so every section carries the brand shape.
 */
export function HexBadge({
  children,
  size = 32,
  tone = "ink",
  className = "",
}: {
  children?: React.ReactNode;
  size?: number;
  tone?: HexTone;
  className?: string;
}) {
  return (
    <HexBox size={size} tone={tone} className={className}>
      <span
        className="font-semibold tabular-nums tracking-tight"
        style={{ fontSize: Math.max(9, Math.round(size * 0.33)) }}
      >
        {children}
      </span>
    </HexBox>
  );
}

/** Icon container — capability, module and industry markers. */
export function HexIcon({
  children,
  size = 56,
  tone = "legionTint",
  className = "",
}: {
  children?: React.ReactNode;
  size?: number;
  tone?: HexTone;
  className?: string;
}) {
  return (
    <HexBox size={size} tone={tone} className={className}>
      {children}
    </HexBox>
  );
}

/** Team avatar — initials reversed out of the brand shape. */
export function HexAvatar({
  initials,
  size = 64,
  tone = "legionTint",
  className = "",
}: {
  initials: string;
  size?: number;
  tone?: HexTone;
  className?: string;
}) {
  return (
    <HexBox size={size} tone={tone} className={className}>
      <span
        className="font-semibold tracking-tight"
        style={{ fontSize: Math.max(11, Math.round(size * 0.28)) }}
      >
        {initials}
      </span>
    </HexBox>
  );
}

/**
 * Outlined hexagon as a decorative device. `strokePx` is expressed in real
 * pixels so hairlines stay hairlines whatever size the shape is drawn at.
 */
export function HexOutline({
  size = 120,
  strokePx = 1.5,
  className = "",
  style,
}: {
  size?: number;
  strokePx?: number;
  className?: string;
  style?: React.CSSProperties;
}) {
  const sw = (strokePx * 24) / size;
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={style}
      aria-hidden
    >
      <polygon
        points="12,2 21,7 21,17 12,22 3,17 3,7"
        stroke="currentColor"
        strokeWidth={sw}
        strokeLinejoin="round"
      />
    </svg>
  );
}

/**
 * Decorative hexagon field — a tiled outline pattern used behind blue and
 * ink sections so large flat areas carry the brand shape instead of plain
 * colour.
 */
export function HexField({
  className = "",
  tile = 64,
  strokePx = 1,
  style,
}: {
  className?: string;
  tile?: number;
  strokePx?: number;
  style?: React.CSSProperties;
}) {
  const id = React.useId().replace(/:/g, "");
  const h = tile * HEX_RATIO;
  const sw = (strokePx * tile) / 48;
  return (
    <svg
      className={className}
      style={style}
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <pattern
          id={`legion-hex-${id}`}
          width={tile}
          height={h}
          patternUnits="userSpaceOnUse"
        >
          <polygon
            points={`${tile / 2},0 ${tile},${h * 0.25} ${tile},${h * 0.75} ${tile / 2},${h} 0,${h * 0.75} 0,${h * 0.25}`}
            fill="none"
            stroke="currentColor"
            strokeWidth={sw}
            strokeLinejoin="round"
          />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#legion-hex-${id})`} />
    </svg>
  );
}
