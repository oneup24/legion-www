"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { SectionShell } from "@/components/editorial/SectionShell";
import { SectionLabel } from "@/components/editorial/SectionLabel";
import { HexIcon } from "@/components/brand/Hex";

/**
 * The numbers.
 *
 * Four figures on a black field, each reversed out of a hexagon. The
 * figures are the only thing on the page that is allowed to be enormous.
 */
export function SocialProof() {
  const t = useTranslations("home.numbers");
  const stats = t.raw("stats") as {
    value: string;
    suffix: string;
    label: string;
  }[];

  return (
    <SectionShell tone="void" hexField fieldOpacity={0.035}>
      <div className="shell section-y">
        <div className="split-grid">
          <div>
            <SectionLabel tone="void">{t("label")}</SectionLabel>
          </div>

          <div>
            <h2 className="t-display-1 t-balance text-white max-w-3xl">
              {t("headline")}
            </h2>

            <ul className="mt-14 grid gap-px bg-white/12 sm:grid-cols-2 lg:grid-cols-4">
              {stats.map((stat, i) => (
                <motion.li
                  key={stat.label}
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-6%" }}
                  transition={{ duration: 0.4, delay: i * 0.06 }}
                  className="bg-void px-6 py-9"
                >
                  <HexIcon size={34} tone="legion">
                    <span className="t-micro text-white">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </HexIcon>
                  <p className="mt-6 t-display-1 text-white leading-none">
                    {stat.value}
                    <span className="text-accent">{stat.suffix}</span>
                  </p>
                  <p className="mt-3 t-body text-ash">{stat.label}</p>
                </motion.li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </SectionShell>
  );
}
