"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { SectionShell } from "@/components/editorial/SectionShell";
import { SectionLabel } from "@/components/editorial/SectionLabel";

/**
 * The six daily pains.
 *
 * Each row is a full-width band carrying an oversized numeral — the one
 * chromatic gesture on the page, the numeral doing the counting that the
 * reference site does with its big red figures. Today sits on the left in
 * grey; the LegionOne version sits on the right in white.
 */
export function Comparison() {
  const t = useTranslations("home.pains");
  const rows = t.raw("rows") as {
    number: string;
    title: string;
    pain: string;
    solution: string;
  }[];

  return (
    <SectionShell tone="void">
      <div className="shell section-y">
        <div className="split-grid">
          <div>
            <SectionLabel tone="void">{t("label")}</SectionLabel>
          </div>

          <div>
            <h2 className="t-display-1 t-balance text-white max-w-3xl">
              {t("headline")}
            </h2>
            <p className="mt-6 t-lead max-w-2xl text-smoke/70">{t("lead")}</p>
          </div>
        </div>

        <ul className="mt-16 border-t border-white/12">
          {rows.map((row, i) => (
            <motion.li
              key={row.number}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-6%" }}
              transition={{ duration: 0.45, delay: i * 0.05 }}
              className="grid gap-6 border-b border-white/12 py-10 lg:grid-cols-12 lg:gap-8"
            >
              <div className="lg:col-span-3">
                <span className="t-giant-index block text-accent">
                  {row.number}
                </span>
                <h3 className="mt-4 t-display-3 text-white">{row.title}</h3>
              </div>

              <div className="lg:col-span-4">
                <span className="t-label text-ash">{t("painLabel")}</span>
                <p className="mt-3 t-body text-smoke/55">{row.pain}</p>
              </div>

              <div className="lg:col-span-5">
                <span className="t-label text-accent">{t("solutionLabel")}</span>
                <p className="mt-3 t-body text-white/90">{row.solution}</p>
              </div>
            </motion.li>
          ))}
        </ul>
      </div>
    </SectionShell>
  );
}
