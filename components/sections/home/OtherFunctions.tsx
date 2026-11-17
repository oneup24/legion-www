"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { SectionShell } from "@/components/editorial/SectionShell";
import { SectionLabel } from "@/components/editorial/SectionLabel";
import { FunctionTile, type MotifKind } from "@/components/brand/BrandMotif";
import { Link } from "@/lib/i18n/navigation";

/**
 * Other functions — everything beyond the four core modules.
 *
 * Built on the reference site's two-column function list: a shallow card per
 * entry, the title on the left, a square brand tile on the right, and a
 * meta line along the bottom. The block closes with the "View All" pill
 * that leads to the full product page.
 */
const MOTIF: Record<string, MotifKind> = {
  sales: "quote",
  hr: "hr",
  automation: "flow",
  integrations: "plug",
  sync: "device",
  templates: "template",
};

const HREF: Record<string, string> = {
  sales: "/product#module-sales",
  hr: "/product#module-hr",
  automation: "/product#module-automation",
  integrations: "/product#integrations",
  sync: "/product",
  templates: "/use-cases",
};

export function OtherFunctions() {
  const t = useTranslations("home.otherFunctions");
  const tCommon = useTranslations("common");
  const items = t.raw("items") as {
    key: string;
    meta: string;
    title: string;
  }[];

  return (
    <SectionShell tone="surface" hexField fieldOpacity={0.014}>
      <div className="shell section-y">
        <div className="mx-auto max-w-[760px] text-center">
          <SectionLabel tone="surface" className="justify-center">
            {t("label")}
          </SectionLabel>
          <h2 className="mt-5 t-display-1 t-balance text-ink">{t("headline")}</h2>
          <p className="mt-5 t-lead text-ink-muted">{t("sub")}</p>
        </div>

        <ul className="mt-14 grid gap-y-4 md:grid-cols-2 md:gap-x-4 md:gap-y-5">
          {items.map((item, i) => (
            <motion.li
              key={item.key}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-6%" }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
            >
              <Link
                href={HREF[item.key] as never}
                className="group relative flex h-[136px] items-stretch overflow-hidden rounded-card border border-line bg-white transition-colors hover:bg-canvas-soft"
              >
                <div className="absolute bottom-[30px] left-4 right-[136px] top-3 z-10 flex flex-col justify-center">
                  <h3 className="line-clamp-2 t-display-3 text-ink">{item.title}</h3>
                </div>

                <div className="absolute bottom-3 left-4 right-[124px] z-10 flex items-center gap-2 md:right-[136px]">
                  <span className="whitespace-nowrap text-[14px] text-ink-faint">
                    {item.meta}
                  </span>
                  <span className="whitespace-nowrap text-[14px] font-medium text-ink-muted transition-colors group-hover:text-accent">
                    {tCommon("learnMore")} &rarr;
                  </span>
                </div>

                <div className="absolute right-3 top-1/2 h-[96px] w-[96px] -translate-y-1/2 overflow-hidden rounded-tile transition-transform duration-300 group-hover:scale-[1.06] md:h-[104px] md:w-[104px]">
                  <FunctionTile motif={MOTIF[item.key] ?? "plug"} className="h-full w-full" />
                </div>
              </Link>
            </motion.li>
          ))}
        </ul>

        <div className="mt-10 flex justify-center md:mt-[72px]">
          <Link href="/product" className="pill-link">
            {tCommon("viewAll")}
            <span aria-hidden>&rarr;</span>
          </Link>
        </div>
      </div>
    </SectionShell>
  );
}
