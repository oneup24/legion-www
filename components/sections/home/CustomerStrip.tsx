"use client";

import * as React from "react";
import { useTranslations } from "next-intl";

/**
 * Customer strip — the industries and names, set as a quiet reference
 * rather than a wall of logos. Hairline separated, uppercase, small.
 */
export function CustomerStrip() {
  const t = useTranslations("home.customerLogos");
  const items = t.raw("items") as { name: string; industry: string }[];

  return (
    <section className="border-b border-line bg-canvas">
      <div className="shell py-12">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-baseline sm:gap-8">
          <span className="t-label text-ink-faint shrink-0">{t("eyebrow")}</span>
          <span className="t-label text-ink-faint">{t("subtitle")}</span>
        </div>

        <ul className="mt-8 grid grid-cols-2 gap-x-6 gap-y-6 sm:grid-cols-4">
          {items.map((item) => (
            <li key={item.name} className="border-t border-line pt-4">
              <p className="t-body text-ink-muted">{item.name}</p>
              <p className="t-micro text-ink-faint mt-1">{item.industry}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
