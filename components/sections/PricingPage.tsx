"use client";

import * as React from "react";
import { useTranslations } from "next-intl";
import { ChevronDown } from "lucide-react";
import { motion } from "framer-motion";
import { PageHero } from "@/components/editorial/PageHero";
import { SectionHeader } from "@/components/editorial/SectionHeader";
import { SectionShell } from "@/components/editorial/SectionShell";
import { HexBadge } from "@/components/brand/Hex";

type Tier = {
  name: string;
  price: string;
  period: string;
  desc: string;
  features: string[];
  cta: string;
  featured?: boolean;
};

type FAQ = { q: string; a: string };

export function PricingPage() {
  const t = useTranslations("pricing");
  const tNav = useTranslations("nav");
  const tiers = t.raw("tiers") as Tier[];
  const faqs = t.raw("faq.items") as FAQ[];
  const [openIdx, setOpenIdx] = React.useState<number | null>(0);

  return (
    <>
      <PageHero
        kicker={tNav("pricing")}
        title={t("headline")}
        lead={t("sub")}
        tone="void"
      />

      {/* Tiers */}
      <SectionShell tone="surface" hexField fieldOpacity={0.04}>
        <div className="shell section-y">
          <SectionHeader
            index="01"
            kicker={t("tiersKicker")}
            title={t("tiersTitle")}
            tone="surface"
          />

          <p className="mt-8 max-w-2xl border-l-2 border-accent pl-5 t-body text-smoke/70">
            {t("priceNote")}
          </p>

          <div className="mt-14 grid grid-cols-1 gap-x-10 gap-y-12 border-t border-white/12 pt-2 md:grid-cols-3">
            {tiers.map((tier, i) => {
              // Pricing has not been published yet — show an honest placeholder
              // instead of rendering a raw "TBC" next to a currency symbol.
              const pricePending =
                !tier.price || tier.price.toUpperCase() === "TBC";
              return (
                <motion.div
                  key={tier.name}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-8%" }}
                  transition={{ duration: 0.45, delay: i * 0.05 }}
                  className={`flex flex-col pt-8 ${
                    tier.featured
                      ? "border-t-2 border-accent -mt-px"
                      : "border-t border-transparent -mt-px"
                  }`}
                >
                  <div className="flex items-center justify-between gap-3">
                    <HexBadge size={30} tone={tier.featured ? "legion" : "onDark"}>
                      {String(i + 1).padStart(2, "0")}
                    </HexBadge>
                    {tier.featured ? (
                      <span className="t-label text-accent">Recommended</span>
                    ) : null}
                  </div>

                  <h3 className="mt-5 t-display-3 text-white">{tier.name}</h3>
                  <p className="mt-2 t-body text-smoke/60">{tier.desc}</p>

                  <div className="mt-6 flex items-baseline gap-2">
                    {pricePending ? (
                      <span className="t-display-3 text-ash">{t("pricePending")}</span>
                    ) : (
                      <>
                        <span className="t-display-2 text-white">
                          HK${tier.price}
                        </span>
                        <span className="t-caption text-ash">{tier.period}</span>
                      </>
                    )}
                  </div>

                  <ul className="mt-7 flex-1 space-y-2.5">
                    {tier.features.map((f, fi) => (
                      <li
                        key={fi}
                        className="flex items-start gap-3 t-body text-white/85"
                      >
                        <HexBadge size={12} tone="legion" className="mt-1.5 shrink-0" />
                        {f}
                      </li>
                    ))}
                  </ul>

                  <button
                    type="button"
                    data-cta-id={`pricing_${tier.name.toLowerCase()}`}
                    className={`btn mt-8 w-full ${
                      tier.featured
                        ? "btn-accent"
                        : "btn-ghost"
                    }`}
                  >
                    {tier.cta}
                  </button>
                </motion.div>
              );
            })}
          </div>
        </div>
      </SectionShell>

      {/* FAQ */}
      <SectionShell tone="void">
        <div className="shell section-y">
          <SectionHeader
            index="02"
            kicker={tNav("pricing")}
            title={t("faq.title")}
            tone="void"
          />

          <div className="mt-14 max-w-3xl border-t border-white/12">
            {faqs.map((faq, i) => {
              const isOpen = openIdx === i;
              return (
                <div key={i} className="border-b border-white/12">
                  <button
                    type="button"
                    onClick={() => setOpenIdx(isOpen ? null : i)}
                    aria-expanded={isOpen}
                    className="w-full flex items-start justify-between gap-6 py-5 text-left"
                  >
                    <span className="t-body text-white">{faq.q}</span>
                    <ChevronDown
                      size={20}
                      className={`shrink-0 mt-1 transition-transform ${
                        isOpen ? "rotate-180 text-accent" : "text-ash"
                      }`}
                    />
                  </button>
                  {isOpen ? (
                    <div className="pb-6 pr-10 t-body text-smoke/65">{faq.a}</div>
                  ) : null}
                </div>
              );
            })}
          </div>
        </div>
      </SectionShell>
    </>
  );
}
