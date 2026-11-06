"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { SectionShell } from "@/components/editorial/SectionShell";
import { SectionLabel } from "@/components/editorial/SectionLabel";
import { Link } from "@/lib/i18n/navigation";

/**
 * Security badges.
 *
 * Four certifications, set as a quiet band of hairlines. The block leads
 * with the claim and then points at the page that carries the detail.
 */
export function SecurityBadges() {
  const t = useTranslations("home.security");
  const items = t.raw("items") as { label: string; desc: string }[];

  return (
    <SectionShell tone="surface" hexField fieldOpacity={0.04}>
      <div className="shell section-y">
        <div className="split-grid">
          <div>
            <SectionLabel tone="surface">{t("label")}</SectionLabel>
          </div>

          <div>
            <h2 className="t-display-1 t-balance text-white max-w-3xl">
              {t("headline")}
            </h2>

            <ul className="mt-12 grid gap-px bg-white/12 sm:grid-cols-2">
              {items.map((item, i) => (
                <motion.li
                  key={item.label}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-6%" }}
                  transition={{ duration: 0.4, delay: i * 0.05 }}
                  className="bg-surface-1 p-7"
                >
                  <p className="t-display-3 text-white">{item.label}</p>
                  <p className="mt-3 t-body text-ash">{item.desc}</p>
                </motion.li>
              ))}
            </ul>

            <Link href="/security" className="link-arrow mt-10 text-white">
              {t("label")}
            </Link>
          </div>
        </div>
      </div>
    </SectionShell>
  );
}
