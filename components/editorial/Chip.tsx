import * as React from "react";

type Tone = "light" | "dark" | "brand";

/**
 * Capability / industry tag.
 *
 * Square, hairline, uppercase micro type — the small counterpart to the
 * hexagon. Tags let a visitor scan a list by industry instead of reading
 * every entry.
 */
export function Chip({
  children,
  tone = "light",
}: {
  children: React.ReactNode;
  tone?: Tone;
}) {
  const tones: Record<Tone, string> = {
    light: "border-line-strong text-ink-faint",
    dark: "border-line text-ink-muted",
    brand: "border-accent/40 text-accent",
  };
  return (
    <span
      className={`inline-flex items-center border px-2.5 py-1 t-micro ${tones[tone]}`}
    >
      {children}
    </span>
  );
}
