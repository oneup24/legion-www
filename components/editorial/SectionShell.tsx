import * as React from "react";
import { HexField } from "@/components/brand/Hex";

/**
 * Section surfaces.
 *
 * The rhythm of the site is carried by which surface a block sits on, so the
 * surface choice lives in one place instead of being re-declared per block.
 * Black is the default; light surfaces are the deliberate exception.
 */
export type SectionTone = "void" | "surface" | "accent" | "paper" | "paperSoft";

const TONE_CLASS: Record<SectionTone, string> = {
  void: "bg-void text-white",
  surface: "bg-surface-1 text-white",
  accent: "bg-accent text-white",
  paper: "bg-paper text-ink",
  paperSoft: "bg-paper-2 text-ink",
};

const FIELD_CLASS: Record<SectionTone, string> = {
  void: "text-white",
  surface: "text-white",
  accent: "text-white",
  paper: "text-ink",
  paperSoft: "text-ink",
};

export function SectionShell({
  tone = "void",
  children,
  className = "",
  hexField = false,
  fieldOpacity = 0.05,
  contentClassName = "",
}: {
  tone?: SectionTone;
  children: React.ReactNode;
  className?: string;
  hexField?: boolean;
  fieldOpacity?: number;
  contentClassName?: string;
}) {
  return (
    <section
      className={`relative overflow-hidden ${TONE_CLASS[tone]} ${className}`}
    >
      {hexField ? (
        <HexField
          className={`pointer-events-none absolute inset-0 h-full w-full ${FIELD_CLASS[tone]}`}
          style={{ opacity: fieldOpacity }}
        />
      ) : null}
      <div className={`relative ${contentClassName}`}>{children}</div>
    </section>
  );
}
