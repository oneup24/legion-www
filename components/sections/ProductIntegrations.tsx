"use client";

import * as React from "react";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";

type Integration = { name: string; group: string };

const GROUP_ORDER = ["comms", "finance", "commerce", "automation"] as const;

const GROUP_COLORS: Record<string, string> = {
  comms: "bg-canvas-parchment text-ink",
  finance: "bg-canvas-parchment text-ink",
  commerce: "bg-canvas-parchment text-ink",
  automation: "bg-canvas-parchment text-ink",
};

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
    <section className="bg-canvas">
      <div className="mx-auto max-w-[1024px] px-4 sm:px-6 py-16 sm:py-20">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="text-center mb-10"
        >
          <p className="text-caption text-ink-muted-48 mb-3 tracking-wide">
            {t("eyebrow")}
          </p>
          <h2 className="text-display-lg text-ink">{t("headline")}</h2>
          <p className="text-lead text-ink-muted-80 mt-3 max-w-2xl mx-auto text-body-cjk">
            {t("sub")}
          </p>
        </motion.div>

        <div className="space-y-8">
          {GROUP_ORDER.map((g, gi) => {
            const list = grouped.get(g) ?? [];
            if (list.length === 0) return null;
            return (
              <motion.div
                key={g}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: gi * 0.05 }}
              >
                <h3 className="text-caption font-semibold text-ink-muted-48 uppercase tracking-wide mb-3">
                  {t(`groups.${g}` as never)}
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                  {list.map((it) => (
                    <div
                      key={it.name}
                      className={`h-16 flex items-center justify-center px-4 rounded-md border border-divider-soft ${GROUP_COLORS[g]} hover:border-primary hover:bg-canvas-pearl transition-colors`}
                    >
                      <span className="text-caption font-semibold text-center truncate">
                        {it.name}
                      </span>
                    </div>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>

        <div className="text-center mt-10">
          <a
            href="#"
            data-cta-id="integrations_view_all"
            className="text-button text-primary hover:text-primary-focus inline-flex items-center gap-1"
          >
            {t("cta")}
          </a>
        </div>
      </div>
    </section>
  );
}