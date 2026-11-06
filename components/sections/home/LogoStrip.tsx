"use client";

import * as React from "react";
import { useTranslations } from "next-intl";

/**
 * Ticker — the brand blue band that runs under the hero.
 *
 * It is the only full-bleed colour block on the page, so it carries the
 * accent on its own: one line of shared nouns, moving.
 */
export function LogoStrip() {
  const t = useTranslations("home.hero");
  const items = t.raw("ticker") as string[];

  return (
    <section className="relative overflow-hidden bg-accent">
      <div className="shell flex items-center gap-6 py-4">
        <span className="t-label text-white/80 hidden sm:inline shrink-0">
          {t("tickerLabel")}
        </span>
        <div className="marquee flex-1">
          <div className="marquee-track">
            {[0, 1].map((copy) => (
              <div key={copy} className="flex shrink-0" aria-hidden={copy === 1}>
                {items.map((item) => (
                  <span
                    key={`${copy}-${item}`}
                    className="t-display-3 text-white/95 px-6 whitespace-nowrap"
                  >
                    {item}
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
