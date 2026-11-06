"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { SectionShell } from "@/components/editorial/SectionShell";
import { SectionLabel } from "@/components/editorial/SectionLabel";
import { HexOutline } from "@/components/brand/Hex";
import { Link } from "@/lib/i18n/navigation";

/**
 * Partner call to action.
 *
 * A dark band with a single statement and one arrow link. The hexagon
 * outline carries the brand shape without adding any more colour.
 */
export function PartnerCTA() {
  const t = useTranslations("home.partner");

  return (
    <SectionShell tone="void">
      <HexOutline
        size={420}
        strokePx={1}
        className="pointer-events-none absolute -right-28 top-[-40%] text-accent"
        style={{ opacity: 0.28 }}
      />

      <div className="shell relative section-y">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-8"
          >
            <SectionLabel tone="void">{t("label")}</SectionLabel>
            <h2 className="mt-6 t-display-1 t-balance text-white">
              {t("headline")}
            </h2>
            <p className="mt-6 t-lead max-w-2xl text-smoke/70">{t("sub")}</p>
          </motion.div>

          <div className="lg:col-span-4 lg:justify-self-end">
            <Link href="/partners" className="btn btn-accent">
              {t("cta")}
            </Link>
          </div>
        </div>
      </div>
    </SectionShell>
  );
}
