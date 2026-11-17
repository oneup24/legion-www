import * as React from "react";
import { HexField } from "@/components/brand/Hex";

/**
 * Section surfaces.
 *
 * The rhythm of the site is carried by which surface a block sits on, so the
 * surface choice lives in one place instead of being re-declared per block.
 *
 * v4: white is the default canvas, soft grey is the band, brand blue is the
 * one deliberate exception.
 */
export type SectionTone = "void" | "surface" | "accent" | "paper" | "paperSoft";

const TONE_CLASS: Record<SectionTone, string> = {
  void: "bg-canvas text-ink",
  surface: "bg-canvas-soft text-ink",
  accent: "bg-accent text-white",
  paper: "bg-white text-ink",
  paperSoft: "bg-canvas-deep text-ink",
};

const FIELD_CLASS: Record<SectionTone, string> = {
  void: "text-ink",
  surface: "text-ink",
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
