"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { SectionShell } from "@/components/editorial/SectionShell";
import { SectionLabel } from "@/components/editorial/SectionLabel";
import { FeatureCover, type MotifKind } from "@/components/brand/BrandMotif";
import { Link } from "@/lib/i18n/navigation";

/**
 * Key LegionOne features — the four core modules.
 *
 * Built on the reference site's "Flagship Models" block: one centred
 * heading, then a row of white rounded cards, each with a coloured panel on
 * top, the module name, a one-line promise and a learn-more link.
 */
const MOTIF: Record<string, MotifKind> = {
  dashboard: "dashboard",
  finance: "finance",
  crm: "crm",
  inventory: "inventory",
};

export function KeyFeatures() {
  const t = useTranslations("home.keyFeatures");
  const tCommon = useTranslations("common");
  const items = t.raw("items") as {
    key: string;
    title: string;
    summary: string;
  }[];

  return (
    <SectionShell tone="void" hexField fieldOpacity={0.014}>
      <div className="shell section-y">
        <div className="mx-auto max-w-[760px] text-center">
          <SectionLabel tone="void" className="justify-center">
            {t("label")}
          </SectionLabel>
          <h2 className="mt-5 t-display-1 t-balance text-ink">{t("headline")}</h2>
          <p className="mt-5 t-lead text-ink-muted">{t("sub")}</p>
        </div>

        <ul className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((item, i) => (
            <motion.li
              key={item.key}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-6%" }}
              transition={{ duration: 0.45, delay: i * 0.06 }}
            >
              <Link
                href={`/product#module-${item.key}` as never}
                className="card card-hover group block h-full"
              >
                <FeatureCover motif={MOTIF[item.key] ?? "dashboard"} className="aspect-[4/3]" />

                <div className="card-body flex h-full flex-col">
                  <span className="t-micro text-accent">{t("tag")}</span>
                  <h3 className="mt-3 t-display-3 text-ink">{item.title}</h3>
                  <p className="mt-2 t-body text-ink-muted">{item.summary}</p>

                  <span className="mt-auto pt-5 inline-flex items-center gap-1.5 t-caption font-medium text-ink-muted transition-colors group-hover:text-accent">
                    {tCommon("learnMore")}
                    <span aria-hidden>&rarr;</span>
                  </span>
                </div>
              </Link>
            </motion.li>
          ))}
        </ul>
      </div>
    </SectionShell>
  );
}
