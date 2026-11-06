"use client";

import * as React from "react";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { SectionHeader } from "@/components/editorial/SectionHeader";
import { SectionShell } from "@/components/editorial/SectionShell";

type Integration = { name: string; group: string };

const GROUP_ORDER = ["comms", "finance", "commerce", "automation"] as const;

export function ProductIntegrations() {
  const t = useTranslations("product.integrations");
  const items = t.raw("items") as Integration[];

  const grouped = React.useMemo(() => {
    const map = new Map<string, Integration[]>();
    for (const g of GROUP_ORDER) map.set(g, []);
    for (const it of items) {
      const list = map.get(it.group) ?? [];
      list.push(it);
      map.set(it.group, list);
    }
    return map;
  }, [items]);

  return (
    <SectionShell tone="surface" hexField fieldOpacity={0.04}>
      <div className="shell section-y">
        <SectionHeader
          index="03"
          kicker={t("eyebrow")}
          title={t("headline")}
          lead={t("sub")}
          tone="surface"
        />

        <div className="mt-14 border-t border-white/12">
          {GROUP_ORDER.map((g, gi) => {
            const list = grouped.get(g) ?? [];
            if (list.length === 0) return null;
            return (
              <motion.div
                key={g}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-8%" }}
                transition={{ duration: 0.45, delay: gi * 0.05 }}
                className="grid grid-cols-1 gap-4 border-b border-white/12 py-8 lg:grid-cols-12 lg:gap-8"
              >
                <div className="lg:col-span-3">
                  <h3 className="t-label text-accent">{t(`groups.${g}`)}</h3>
                </div>
                <div className="lg:col-span-9 flex flex-wrap gap-2">
                  {list.map((it) => (
                    <div
                      key={it.name}
                      className="flex h-12 items-center justify-center border border-white/14 px-4 transition-colors hover:border-accent hover:bg-accent/10"
                    >
                      <span className="t-caption text-white/85 text-center">
                        {it.name}
                      </span>
                    </div>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>

        <a
          href="#"
          data-cta-id="integrations_view_all"
          className="link-arrow mt-10 text-white"
        >
          {t("cta")}
        </a>
      </div>
    </SectionShell>
  );
}
