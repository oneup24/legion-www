import * as React from "react";

/**
 * Brand motifs — the abstract cover art for the feature cards and the
 * function tiles.
 *
 * These are deliberately not product screenshots. Each motif is a piece of
 * brand geometry (hexagon lattice, brand blue, one geometric gesture per
 * subject) so a card never implies a screen capture that does not exist.
 *
 * Everything is drawn on a 100 × 100 grid and scaled into place.
 */

export type MotifKind =
  | "dashboard"
  | "finance"
  | "crm"
  | "inventory"
  | "quote"
  | "hr"
  | "flow"
  | "plug"
  | "device"
  | "template";

const BLUE = "#0166e6";
const DEEP = "#0a52b8";

function Motif({ kind }: { kind: MotifKind }) {
  switch (kind) {
    case "dashboard":
      return (
        <g fill="none" stroke={BLUE} strokeWidth={2.4} strokeLinecap="round">
          <rect x="10" y="16" width="26" height="20" rx="4" fill={BLUE} opacity={0.14} stroke="none" />
          <rect x="42" y="16" width="26" height="20" rx="4" fill="none" opacity={0.5} />
          <rect x="74" y="16" width="16" height="20" rx="4" fill="none" opacity={0.5} />
          <polyline points="12,72 30,58 46,64 62,42 88,32" />
          <circle cx="62" cy="42" r="3.6" fill={BLUE} stroke="none" />
        </g>
      );
    case "finance":
      return (
        <g fill="none" stroke={BLUE} strokeWidth={2.4} strokeLinecap="round">
          <rect x="12" y="54" width="16" height="30" rx="3" fill={BLUE} opacity={0.16} stroke="none" />
          <rect x="36" y="38" width="16" height="46" rx="3" fill="none" />
          <rect x="60" y="24" width="16" height="60" rx="3" fill="none" />
          <path d="M12 90 H88" opacity={0.55} />
          <circle cx="80" cy="20" r="9" fill="none" stroke={DEEP} />
        </g>
      );
    case "crm":
      return (
        <g fill="none" stroke={BLUE} strokeWidth={2.4} strokeLinecap="round">
          <rect x="8" y="20" width="24" height="60" rx="4" fill="none" opacity={0.45} />
          <rect x="38" y="20" width="24" height="60" rx="4" fill={BLUE} opacity={0.14} stroke="none" />
          <rect x="68" y="20" width="24" height="60" rx="4" fill="none" opacity={0.45} />
          <circle cx="20" cy="34" r="4" fill={BLUE} stroke="none" />
          <circle cx="50" cy="34" r="4" fill={BLUE} stroke="none" />
          <circle cx="80" cy="34" r="4" fill={BLUE} stroke="none" />
          <path d="M16 54 H24 M16 62 H24 M46 54 H54 M46 62 H54 M76 54 H84 M76 62 H84" opacity={0.55} />
        </g>
      );
    case "inventory":
      return (
        <g fill="none" stroke={BLUE} strokeWidth={2.4} strokeLinecap="round">
          <rect x="12" y="48" width="36" height="32" rx="4" fill={BLUE} opacity={0.14} stroke="none" />
          <rect x="52" y="48" width="36" height="32" rx="4" fill="none" opacity={0.55} />
          <rect x="32" y="20" width="36" height="32" rx="4" fill="none" />
          <path d="M12 64 H48 M52 64 H88 M50 36 H68" opacity={0.55} />
        </g>
      );
    case "quote":
      return (
        <g fill="none" stroke={BLUE} strokeWidth={2.4} strokeLinecap="round">
          <rect x="16" y="12" width="52" height="68" rx="5" fill="none" />
          <path d="M28 32 H56 M28 44 H56 M28 56 H44" opacity={0.6} />
          <circle cx="74" cy="68" r="14" fill="#ffffff" />
          <path d="M68 68 L73 73 L81 63" stroke={DEEP} />
        </g>
      );
    case "hr":
      return (
        <g fill="none" stroke={BLUE} strokeWidth={2.4} strokeLinecap="round">
          <circle cx="30" cy="30" r="11" fill={BLUE} opacity={0.16} stroke="none" />
          <path d="M12 66 C12 52 48 52 48 66" />
          <circle cx="68" cy="34" r="9" fill="none" opacity={0.55} />
          <path d="M54 66 C54 55 82 55 82 66" opacity={0.55} />
          <path d="M56 14 H88 M56 22 H80" opacity={0.45} />
        </g>
      );
    case "flow":
      return (
        <g fill="none" stroke={BLUE} strokeWidth={2.4} strokeLinecap="round">
          <rect x="6" y="38" width="24" height="24" rx="5" fill={BLUE} opacity={0.14} stroke="none" />
          <rect x="70" y="12" width="24" height="24" rx="5" fill="none" opacity={0.55} />
          <rect x="70" y="64" width="24" height="24" rx="5" fill="none" opacity={0.55} />
          <path d="M30 50 H52 L64 30" />
          <path d="M30 50 H52 L64 76" opacity={0.55} />
        </g>
      );
    case "plug":
      return (
        <g fill="none" stroke={BLUE} strokeWidth={2.4} strokeLinecap="round">
          <rect x="10" y="30" width="34" height="40" rx="9" fill={BLUE} opacity={0.14} stroke="none" />
          <rect x="56" y="30" width="34" height="40" rx="9" fill="none" />
          <path d="M44 44 H56 M44 56 H56" />
        </g>
      );
    case "device":
      return (
        <g fill="none" stroke={BLUE} strokeWidth={2.4} strokeLinecap="round">
          <rect x="8" y="22" width="58" height="40" rx="5" fill="none" opacity={0.55} />
          <path d="M26 70 H48" opacity={0.55} />
          <rect x="68" y="32" width="24" height="44" rx="5" fill={BLUE} opacity={0.14} stroke="none" />
          <path d="M74 40 H86" opacity={0.45} />
        </g>
      );
    case "template":
      return (
        <g fill="none" stroke={BLUE} strokeWidth={2.4} strokeLinecap="round">
          <rect x="12" y="12" width="34" height="34" rx="5" fill="none" opacity={0.5} />
          <rect x="54" y="12" width="34" height="34" rx="5" fill={BLUE} opacity={0.14} stroke="none" />
          <rect x="12" y="54" width="34" height="34" rx="5" fill={BLUE} opacity={0.14} stroke="none" />
          <rect x="54" y="54" width="34" height="34" rx="5" fill="none" opacity={0.5} />
        </g>
      );
    default:
      return null;
  }
}

/** The hexagon lattice that sits behind every motif. */
function Lattice({ opacity = 0.16 }: { opacity?: number }) {
  return (
    <g stroke={BLUE} strokeWidth={0.7} fill="none" opacity={opacity}>
      {Array.from({ length: 24 }, (_, i) => {
        const col = i % 6;
        const row = Math.floor(i / 6);
        const x = col * 20 + (row % 2 ? 10 : 0);
        const y = row * 17.32;
        return (
          <polygon
            key={i}
            points={`${x + 10},${y} ${x + 20},${y + 8.66} ${x + 20},${y + 17.32} ${x + 10},${y + 26} ${x},${y + 17.32} ${x},${y + 8.66}`}
          />
        );
      })}
    </g>
  );
}

/**
 * Feature cover — the 4:3 panel on top of a key feature card.
 *
 * A soft blue field, the hexagon lattice, and one geometric motif.
 */
export function FeatureCover({
  motif,
  className = "",
}: {
  motif: MotifKind;
  className?: string;
}) {
  return (
    <div
      className={`relative overflow-hidden bg-gradient-to-b from-[#f4f8fe] to-[#dbe9fc] ${className}`}
      aria-hidden
    >
      <svg
        viewBox="0 0 120 120"
        preserveAspectRatio="xMidYMid slice"
        className="absolute inset-0 h-full w-full"
      >
        <Lattice opacity={0.22} />
      </svg>
      <svg
        viewBox="0 0 100 100"
        className="absolute inset-0 h-full w-full p-[14%]"
      >
        <Motif kind={motif} />
      </svg>
    </div>
  );
}

/**
 * Function tile — the square thumbnail beside a function in the list.
 */
export function FunctionTile({
  motif,
  className = "",
}: {
  motif: MotifKind;
  className?: string;
}) {
  return (
    <div
      className={`relative overflow-hidden bg-gradient-to-b from-[#f4f8fe] to-[#dbe9fc] ${className}`}
      aria-hidden
    >
      <svg
        viewBox="0 0 120 120"
        preserveAspectRatio="xMidYMid slice"
        className="absolute inset-0 h-full w-full"
      >
        <Lattice opacity={0.2} />
      </svg>
      <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full p-[15%]">
        <Motif kind={motif} />
      </svg>
    </div>
  );
}
