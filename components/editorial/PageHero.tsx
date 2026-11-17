import * as React from "react";
import { SectionLabel, type SectionTone } from "@/components/editorial/SectionLabel";
import { HexField, HexOutline } from "@/components/brand/Hex";

const SURFACE: Record<SectionTone, string> = {
  void: "bg-canvas",
  surface: "bg-canvas-soft",
  accent: "bg-accent",
  paper: "bg-white",
  paperSoft: "bg-canvas-deep",
};

/**
 * Inner-page hero.
 *
 * Calmer display type on the shared shell grid, sitting under the fixed
 * header. Every route opens the same way so the site reads as one thing;
 * only the surface tone changes, so no two routes look identical.
 */
export function PageHero({
  kicker,
  title,
  lead,
  tone = "void",
  index,
  children,
}: {
  kicker: string;
  title: React.ReactNode;
  lead?: React.ReactNode;
  tone?: SectionTone;
  index?: string;
  children?: React.ReactNode;
}) {
  const onAccent = tone === "accent";

  return (
    <section className={`relative overflow-hidden ${SURFACE[tone]}`}>
      {tone !== "paper" && tone !== "paperSoft" ? (
        <HexField
          className={`pointer-events-none absolute inset-0 h-full w-full ${
            onAccent ? "text-white" : "text-ink"
          }`}
          style={{ opacity: 0.02 }}
        />
      ) : null}
      <HexOutline
        size={520}
        strokePx={1}
        className={`pointer-events-none absolute -right-40 -top-32 ${
          onAccent ? "text-white" : "text-accent"
        }`}
        style={{ opacity: onAccent ? 0.16 : 0.07 }}
      />

      <div className="shell relative pt-[120px] pb-14 sm:pb-20 lg:pt-[168px] lg:pb-24">
        <SectionLabel index={index} tone={tone}>
          {kicker}
        </SectionLabel>
        <h1
          className={`mt-6 t-display-hero t-balance ${
            onAccent ? "text-white" : "text-ink"
          }`}
        >
          {title}
        </h1>
        {lead ? (
          <p
            className={`mt-6 t-lead max-w-2xl ${
              onAccent ? "text-white/85" : "text-ink-muted"
            }`}
          >
            {lead}
          </p>
        ) : null}
        {children}
      </div>
    </section>
  );
}
