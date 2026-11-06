import * as React from "react";
import { SectionLabel, type SectionTone } from "@/components/editorial/SectionLabel";

/**
 * Section header — a label, then a large uppercase statement, then a lead.
 *
 * Headings are set on the grid rather than centred: the reference site puts
 * a huge statement on the left with the supporting text in a narrow column
 * on the right, and that asymmetry is what gives the page its character.
 */
export function SectionHeader({
  index,
  kicker,
  title,
  lead,
  tone = "void",
  className = "",
  titleClassName = "",
}: {
  index?: string;
  kicker: string;
  title: React.ReactNode;
  lead?: React.ReactNode;
  tone?: SectionTone;
  className?: string;
  titleClassName?: string;
}) {
  const onDark = tone === "void" || tone === "surface" || tone === "accent";

  return (
    <div className={className}>
      <SectionLabel index={index} tone={tone}>
        {kicker}
      </SectionLabel>
      <h2
        className={`mt-6 t-display-1 t-balance ${
          onDark ? "text-white" : "text-ink"
        } ${titleClassName}`}
      >
        {title}
      </h2>
      {lead ? (
        <p
          className={`mt-6 t-lead max-w-2xl ${
            onDark ? "text-smoke/70" : "text-graphite"
          }`}
        >
          {lead}
        </p>
      ) : null}
    </div>
  );
}
