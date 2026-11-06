"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { SectionShell } from "@/components/editorial/SectionShell";
import { SectionLabel } from "@/components/editorial/SectionLabel";
import { Link } from "@/lib/i18n/navigation";

/**
 * Services — the module list.
 *
 * Built on the monopo pattern: a small label on the left, a large
 * statement and the full list on the right, closed with a single arrow
 * link. The list is the argument, so it is set as a list and not as cards.
 */
export function Capabilities() {
  const t = useTranslations("home.services");
  const items = t.raw("items") as {
    index: string;
    title: string;
    desc: string;
  }[];

  return (
    <SectionShell tone="void" hexField fieldOpacity={0.03}>
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

            <ul className="mt-14 border-t border-white/12">
              {items.map((item, i) => (
                <motion.li
                  key={item.index}
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-6%" }}
                  transition={{ duration: 0.4, delay: i * 0.04 }}
                  className="group grid gap-3 border-b border-white/12 py-7 sm:grid-cols-[88px_220px_minmax(0,1fr)] sm:items-baseline sm:gap-6"
                >
                  <span className="t-index text-accent">{item.index}</span>
                  <span className="t-display-3 text-white">{item.title}</span>
                  <span className="t-body text-smoke/65">{item.desc}</span>
                </motion.li>
              ))}
            </ul>

            <Link href="/product" className="link-arrow mt-10 text-white">
              {t("cta")}
            </Link>
          </div>
        </div>
      </div>
    </SectionShell>
  );
}
