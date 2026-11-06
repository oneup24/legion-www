import * as React from "react";
import { SectionLabel, type SectionTone } from "@/components/editorial/SectionLabel";
import { HexField, HexOutline } from "@/components/brand/Hex";

const SURFACE: Record<SectionTone, string> = {
  void: "bg-void",
  surface: "bg-surface-1",
  accent: "bg-accent",
  paper: "bg-paper",
  paperSoft: "bg-paper-2",
};

/**
 * Inner-page hero.
 *
 * Oversized uppercase type on the shared shell grid, sitting under the fixed
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
  const onDark = tone === "void" || tone === "surface" || tone === "accent";

  return (
    <section className={`relative overflow-hidden ${SURFACE[tone]}`}>
      {tone === "void" || tone === "surface" || tone === "accent" ? (
        <HexField
          className="pointer-events-none absolute inset-0 h-full w-full text-white"
          style={{ opacity: 0.05 }}
        />
      ) : null}
      <HexOutline
        size={520}
        strokePx={1}
        className={`pointer-events-none absolute -right-40 -top-32 ${
          onDark ? "text-white" : "text-accent"
        }`}
        style={{ opacity: onDark ? 0.14 : 0.12 }}
      />

      <div className="shell relative pt-[120px] pb-14 sm:pb-20 lg:pt-[168px] lg:pb-24">
        <SectionLabel index={index} tone={tone}>
          {kicker}
        </SectionLabel>
        <h1
          className={`mt-7 t-display-hero t-balance ${
            onDark ? "text-white" : "text-ink"
          }`}
        >
          {title}
        </h1>
        {lead ? (
          <p
            className={`mt-7 t-lead max-w-2xl ${
              onDark ? "text-smoke/70" : "text-graphite"
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
