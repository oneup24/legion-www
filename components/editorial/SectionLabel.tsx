import * as React from "react";

export type SectionTone = "void" | "surface" | "accent" | "paper" | "paperSoft";

/**
 * Section label — the small uppercase index that announces a block.
 *
 * A short rule, then the label. On the reference site every block opens
 * with a letter-spaced uppercase tag, and that repetition is what makes the
 * page read as one system rather than a pile of sections.
 */
export function SectionLabel({
  index,
  children,
  tone = "void",
  className = "",
}: {
  index?: string;
  children: React.ReactNode;
  tone?: SectionTone;
  className?: string;
}) {
  const muted =
    tone === "void" || tone === "surface"
      ? "text-ash"
      : tone === "accent"
        ? "text-white/70"
        : "text-graphite";

  return (
    <div className={`sec-label ${muted} ${className}`}>
      {index ? <span className="t-index text-accent">{index}</span> : null}
      <span>{children}</span>
    </div>
  );
}
