"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { HexIcon } from "@/components/brand/Hex";

export type LegionValue = {
  letter: string;
  title: string;
  desc: string;
};

export type LegionValuesTone = "dark" | "light" | "legion";

const LETTER_TONE: Record<
  LegionValuesTone,
  { box: "onDark" | "onLegion" | "legionTint"; text: string }
> = {
  dark: { box: "onDark", text: "text-legion-bright" },
  light: { box: "legionTint", text: "text-legion" },
  legion: { box: "onLegion", text: "text-legion" },
};

/**
 * L.E.G.I.O.N. letter grid — the brand's own vocabulary, not a borrowed
 * design pattern. Six hexagons, one per value, in the order the acronym
 * spells.
 *
 * `compact` renders just the letter row (for the footer, where it acts as a
 * permanent mark on every page); `showTitles` adds the value name beside
 * each letter.
 */
export function LegionValues({
  values,
  tone = "dark",
  compact = false,
  showTitles = false,
  className = "",
}: {
  values: LegionValue[];
  tone?: LegionValuesTone;
  compact?: boolean;
  showTitles?: boolean;
  className?: string;
}) {
  const t = LETTER_TONE[tone];

  return (
    <ul
      className={`flex flex-wrap items-center gap-x-2 gap-y-2 ${className}`}
      aria-label="L.E.G.I.O.N."
    >
      {values.map((v, i) => (
        <motion.li
          key={v.letter}
          initial={compact ? false : { opacity: 0, y: 14 }}
          whileInView={compact ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-8%" }}
          transition={{ duration: 0.4, delay: i * 0.05 }}
          className="flex items-center gap-2"
        >
          <HexIcon size={compact ? 26 : 44} tone={t.box}>
            <span
              className={`${t.text} font-bold leading-none ${
                compact ? "text-[12px]" : "text-[17px]"
              }`}
            >
              {v.letter}
            </span>
          </HexIcon>
          {showTitles ? (
            <span
              className={
                compact
                  ? "text-caption text-white/70"
                  : "text-body text-on-dark"
              }
            >
              {v.title}
            </span>
          ) : null}
          {!showTitles && !compact ? (
            <span className="sr-only">
              {v.title} — {v.desc}
            </span>
          ) : null}
        </motion.li>
      ))}
    </ul>
  );
}
