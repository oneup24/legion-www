"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { DashboardOverviewMockup } from "@/components/brand/mockups/DashboardOverview";
import { FinanceModuleMockup } from "@/components/brand/mockups/FinanceModule";
import { CrmModuleMockup } from "@/components/brand/mockups/CrmModule";

type TabKey = "dashboard" | "finance" | "crm";
const mockups: Record<TabKey, React.ComponentType<{ className?: string }>> = {
  dashboard: DashboardOverviewMockup,
  finance: FinanceModuleMockup,
  crm: CrmModuleMockup,
};

export function ProductPreview() {
  const t = useTranslations("home.productPreview");
  const [active, setActive] = React.useState<TabKey>("dashboard");
  const Active = mockups[active];
  const tabs: { key: TabKey; label: string }[] = [
    { key: "dashboard", label: t("tabs.dashboard") },
    { key: "finance", label: t("tabs.finance") },
    { key: "crm", label: t("tabs.crm") },
  ];

  return (
    <section id="product" className="bg-canvas">
      <div className="mx-auto max-w-[1024px] px-4 sm:px-6 py-16 sm:py-24">
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
          <p className="text-lead text-ink-muted-80 mt-3">{t("sub")}</p>
        </motion.div>

        <div
          role="tablist"
          aria-label="Product modules"
          className="flex items-center justify-center gap-1 mb-8 bg-canvas-parchment rounded-pill p-1 max-w-md mx-auto"
        >
          {tabs.map((tab) => {
            const isActive = active === tab.key;
            return (
              <button
                key={tab.key}
                role="tab"
                aria-selected={isActive}
                onClick={() => setActive(tab.key)}
                data-cta-id={`preview_tab_${tab.key}`}
                className={`flex-1 h-10 rounded-pill text-button transition-all ${
                  isActive
                    ? "bg-canvas text-ink shadow-sm"
                    : "text-ink-muted-80 hover:text-ink"
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        <motion.div
          key={active}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="rounded-xl overflow-hidden product-shadow bg-canvas-pearl"
        >
          <Active className="w-full h-auto block" />
        </motion.div>

        <p className="text-body text-ink-muted-80 text-body-cjk text-center mt-6 max-w-2xl mx-auto">
          {t(`descriptions.${active}` as never)}
        </p>
      </div>
    </section>
  );
}