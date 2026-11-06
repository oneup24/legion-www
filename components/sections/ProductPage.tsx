"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import {
  LayoutDashboard,
  Receipt,
  Users,
  Package,
  FileText,
  UserCog,
  Workflow,
  type LucideIcon,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { useBookDemo } from "@/components/chrome/useBookDemo";
import { ProductIntegrations } from "@/components/sections/ProductIntegrations";
import { PageHero } from "@/components/editorial/PageHero";
import { SectionHeader } from "@/components/editorial/SectionHeader";
import { SectionShell } from "@/components/editorial/SectionShell";
import { HexBadge, HexIcon, HexOutline } from "@/components/brand/Hex";
import { DashboardOverviewMockup } from "@/components/brand/mockups/DashboardOverview";

type ModuleKey =
  | "dashboard"
  | "finance"
  | "crm"
  | "inventory"
  | "sales"
  | "hr"
  | "automation";

const MODULES: ModuleKey[] = [
  "dashboard",
  "finance",
  "crm",
  "inventory",
  "sales",
  "hr",
  "automation",
];

const MODULE_ICON: Record<ModuleKey, LucideIcon> = {
  dashboard: LayoutDashboard,
  finance: Receipt,
  crm: Users,
  inventory: Package,
  sales: FileText,
  hr: UserCog,
  automation: Workflow,
};

export function ProductPage() {
  const t = useTranslations("product");
  const { setOpen, setSource } = useBookDemo();

  return (
    <>
      <PageHero
        kicker={t("sections.modulesKicker")}
        title={t("headline")}
        lead={t("sub")}
        tone="void"
      >
        <div className="mt-10 flex flex-wrap gap-4">
          <Button
            variant="accent"
            size="lg"
            data-cta-id="product_hero_book_demo"
            onClick={() => {
              setSource("product_hero");
              setOpen(true);
            }}
          >
            {t("bottomCta.primaryCta")}
          </Button>
        </div>
      </PageHero>

      {/* The product render — the brightest object on the page */}
      <section className="relative bg-void pb-4">
        <div className="shell">
          <div className="relative border border-white/12 bg-white">
            <DashboardOverviewMockup className="block w-full h-auto" />
          </div>
        </div>
      </section>

      {/* The seven modules as a hexagon grid */}
      <SectionShell tone="surface" hexField fieldOpacity={0.04}>
        <div className="shell section-y">
          <SectionHeader
            index="01"
            kicker={t("sections.modulesKicker")}
            title={t("sections.modulesTitle")}
            tone="surface"
          />

          <div className="mt-14 grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-4 lg:grid-cols-7">
            {MODULES.map((key, i) => {
              const Icon = MODULE_ICON[key];
              return (
                <motion.div
                  key={key}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-8%" }}
                  transition={{ duration: 0.45, delay: i * 0.05 }}
                  className="flex flex-col items-center text-center"
                >
                  <HexIcon size={52} tone="legion">
                    <Icon size={21} strokeWidth={1.5} aria-hidden />
                  </HexIcon>
                  <h3 className="mt-5 t-body text-white">{t(`section.${key}.title`)}</h3>
                  <span className="mt-2 t-index text-accent tabular-nums">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </motion.div>
              );
            })}
          </div>
        </div>
      </SectionShell>

      {/* Module detail index */}
      <SectionShell tone="void">
        <div className="shell section-y">
          <SectionHeader
            index="02"
            kicker={t("sections.modulesKicker")}
            title={t("sections.modulesTitle")}
            tone="void"
          />

          <div className="mt-14 border-t border-white/12">
            {MODULES.map((key, i) => {
              const bullets = t.raw(`section.${key}.bullets`) as string[];
              return (
                <motion.article
                  key={key}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-8%" }}
                  transition={{ duration: 0.45, delay: i * 0.04 }}
                  className="grid grid-cols-1 gap-4 border-b border-white/12 py-8 lg:grid-cols-12 lg:gap-8 lg:py-10"
                >
                  <div className="lg:col-span-1">
                    <HexBadge size={30} tone="legion">
                      {String(i + 1).padStart(2, "0")}
                    </HexBadge>
                  </div>

                  <div className="lg:col-span-4">
                    <h3 className="t-display-3 text-white">
                      {t(`section.${key}.title`)}
                    </h3>
                    <p className="mt-2 t-body text-smoke/60">
                      {t(`section.${key}.tagline`)}
                    </p>
                  </div>

                  <div className="lg:col-span-7">
                    <ul className="grid grid-cols-1 gap-x-8 gap-y-2.5 sm:grid-cols-2">
                      {bullets.map((b, bi) => (
                        <li
                          key={bi}
                          className="flex items-start gap-3 t-body text-white/85"
                        >
                          <HexIcon size={12} tone="legion" className="mt-1.5 shrink-0" />
                          {b}
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.article>
              );
            })}
          </div>
        </div>
      </SectionShell>

      <ProductIntegrations />

      {/* Bottom CTA — the brand blue band */}
      <SectionShell tone="accent" hexField fieldOpacity={0.12}>
        <div className="shell relative section-y">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-end lg:gap-14">
            <div className="lg:col-span-8">
              <SectionHeader
                index="03"
                kicker={t("sections.ctaKicker")}
                title={t("bottomCta.headline")}
                tone="accent"
                titleClassName="text-white"
              />
            </div>
            <div className="lg:col-span-4 lg:justify-self-end">
              <div className="flex flex-col items-start gap-4 sm:flex-row">
                <Button
                  variant="white"
                  size="lg"
                  data-cta-id="product_book_demo"
                  onClick={() => {
                    setSource("product_bottom");
                    setOpen(true);
                  }}
                >
                  {t("bottomCta.primaryCta")}
                </Button>
                <a
                  href="#"
                  data-cta-id="product_download"
                  className="link-arrow text-white"
                >
                  {t("bottomCta.secondaryCta")}
                </a>
              </div>
            </div>
          </div>
        </div>
      </SectionShell>
    </>
  );
}
