"use client";

import * as React from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/lib/i18n/navigation";
import { motion } from "framer-motion";

const industries = [
  {
    key: "trading",
    title: "貿易公司",
    desc: "報價、訂單、船務、收款一條龍。",
    href: "/use-cases/trading",
    comingSoon: false,
  },
  {
    key: "professional-services",
    title: "專業服務",
    desc: "客戶、專案、時間、發票統一管理。",
    href: "/use-cases/professional-services",
    comingSoon: false,
  },
  {
    key: "retail",
    title: "零售與電商",
    desc: "POS、網店、庫存無縫整合。",
    href: null,
    comingSoon: true,
  },
  {
    key: "manufacturing",
    title: "輕工製造",
    desc: "BOM、生產排程、QC 流程。",
    href: null,
    comingSoon: true,
  },
] as const;

export function UseCasesHubPage() {
  const t = useTranslations("useCases.hub");

  return (
    <>
      <section className="bg-canvas">
        <div className="mx-auto max-w-[1024px] px-4 sm:px-6 pt-12 sm:pt-20 pb-8 text-center">
          <h1 className="text-hero-display text-ink">{t("headline")}</h1>
          <p className="text-lead text-ink-muted-80 mt-4 max-w-2xl mx-auto text-body-cjk">
            {t("sub")}
          </p>
        </div>
      </section>

      <section className="bg-canvas">
        <div className="mx-auto max-w-[1024px] px-4 sm:px-6 pb-20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {industries.map((ind, i) => {
              const inner = (
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.05 }}
                  className={`relative rounded-xl p-10 md:p-12 transition-colors h-full ${
                    ind.comingSoon
                      ? "bg-canvas-parchment opacity-60"
                      : "bg-canvas-parchment hover:bg-surface-chip-translucent"
                  }`}
                >
                  {ind.comingSoon && (
                    <span className="absolute top-4 right-4 text-caption bg-canvas text-ink-muted-80 px-3 py-1 rounded-pill">
                      {t("comingSoon")}
                    </span>
                  )}
                  <h3 className="text-display-md text-ink">{ind.title}</h3>
                  <p className="text-body text-ink-muted-80 mt-3 text-body-cjk">
                    {ind.desc}
                  </p>
                  {!ind.comingSoon && (
                    <span className="mt-6 inline-block text-button text-primary">
                      {ind.title} →
                    </span>
                  )}
                </motion.div>
              );
              return ind.href ? (
                <Link key={ind.key} href={ind.href}>
                  {inner}
                </Link>
              ) : (
                <div key={ind.key}>{inner}</div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}