/**
 * Shared drawing helpers for the product mockups.
 * The hexagon geometry and the Legion palette live here so every module
 * render looks like the same product.
 */

export const BLUE = "#0166e6";
export const BLUE_DEEP = "#014a99";
export const BLUE_BRIGHT = "#3d9bff";
export const BLUE_SOFT = "#e8f1fd";
export const INK = "#1d1d1f";
export const MUTED = "#87868b";
export const LINE = "#e0e0e0";
export const LINE_SOFT = "#f0f0f0";
export const PAPER = "#fafafc";
export const GREEN = "#1f8a4c";

/** Regular pointy-top hexagon centred at (cx, cy) with circumradius r. */
export function hexPoints(cx: number, cy: number, r: number): string {
  const k = r * 0.866;
  return [
    `${cx},${cy - r}`,
    `${cx + k},${cy - r / 2}`,
    `${cx + k},${cy + r / 2}`,
    `${cx},${cy + r}`,
    `${cx - k},${cy + r / 2}`,
    `${cx - k},${cy - r / 2}`,
  ].join(" ");
}

/** The Legion mark, drawn inside a module sidebar. */
export function MarkGlyph({ x, y, size }: { x: number; y: number; size: number }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <polygon
        points={hexPoints(size / 2, size / 2, size / 2)}
        fill="none"
        stroke={BLUE_BRIGHT}
        strokeWidth={size / 13}
        strokeLinejoin="round"
      />
      <polygon
        points={hexPoints(size / 2, size / 2, size / 3.4)}
        fill="none"
        stroke={BLUE_BRIGHT}
        strokeWidth={size / 13}
        strokeLinejoin="round"
        opacity="0.5"
      />
      <circle cx={size * 0.66} cy={size * 0.34} r={size / 9} fill={BLUE_BRIGHT} />
    </g>
  );
}

/**
 * The module navigation shared by every mockup: deep-blue rail with
 * hexagon module icons.
 */
export function ModuleRail({ active }: { active: number }) {
  return (
    <>
      <rect x="0" y="0" width="220" height="800" fill={BLUE_DEEP} />
      <MarkGlyph x={22} y={26} size={22} />
      <rect x="50" y="31" width="92" height="13" rx="3" fill="#ffffff" opacity="0.92" />
      {[0, 1, 2, 3, 4, 5].map((_, i) => (
        <g key={i}>
          <polygon
            points={hexPoints(33, 92 + i * 48, 9)}
            fill={i === active ? BLUE_BRIGHT : "#ffffff"}
            opacity={i === active ? 1 : 0.18}
          />
          <rect
            x="52"
            y={86 + i * 48}
            width={120 - i * 8}
            height="10"
            rx="2"
            fill="#ffffff"
            opacity={i === active ? 0.92 : 0.38}
          />
        </g>
      ))}
    </>
  );
}
