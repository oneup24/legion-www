import * as React from "react";

export type SectionTone = "void" | "surface" | "accent" | "paper" | "paperSoft";

/**
 * Section label — the small index that announces a block.
 *
 * Every block opens with a short rule and a quiet label, and that repetition
 * is what makes the page read as one system rather than a pile of sections.
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
  const muted = tone === "accent" ? "text-white/75" : "text-ink-faint";

  return (
    <div className={`sec-label ${muted} ${className}`}>
      {index ? <span className="t-index text-accent">{index}</span> : null}
      <span>{children}</span>
    </div>
  );
}
