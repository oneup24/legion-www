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
    <section className="border-b border-white/10 bg-void">
      <div className="shell py-12">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-baseline sm:gap-8">
          <span className="t-label text-ash shrink-0">{t("eyebrow")}</span>
          <span className="t-label text-white/45">{t("subtitle")}</span>
        </div>

        <ul className="mt-8 grid grid-cols-2 gap-x-6 gap-y-6 sm:grid-cols-4">
          {items.map((item) => (
            <li key={item.name} className="border-t border-white/12 pt-4">
              <p className="t-body text-white/85">{item.name}</p>
              <p className="t-micro text-ash mt-1">{item.industry}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
