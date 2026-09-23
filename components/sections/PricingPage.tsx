"use client";

import * as React from "react";
import { useTranslations } from "next-intl";
import { ChevronDown } from "lucide-react";
import { motion } from "framer-motion";

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
  const tiers = t.raw("tiers") as Tier[];
  const faqs = t.raw("faq.items") as FAQ[];
  const [openIdx, setOpenIdx] = React.useState<number | null>(0);

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
        <div className="mx-auto max-w-[1024px] px-4 sm:px-6 pb-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {tiers.map((tier, i) => (
              <motion.div
                key={tier.name}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className={`rounded-xl p-8 bg-canvas border ${
                  tier.featured
                    ? "border-primary-focus border-2"
                    : "border-hairline"
                }`}
              >
                {tier.featured && (
                  <span className="inline-block text-caption bg-primary text-on-primary px-3 py-1 rounded-pill mb-4">
                    推薦
                  </span>
                )}
                <h3 className="text-tagline text-ink">{tier.name}</h3>
                <p className="text-caption text-ink-muted-80 mt-2">{tier.desc}</p>
                <div className="mt-6 flex items-baseline gap-1">
                  <span className="text-display-lg text-ink">
                    HK${tier.price}
                  </span>
                  <span className="text-caption text-ink-muted-48">
                    {tier.period}
                  </span>
                </div>
                <ul className="mt-6 space-y-2">
                  {tier.features.map((f, fi) => (
                    <li
                      key={fi}
                      className="flex items-start gap-2 text-body text-ink text-body-cjk"
                    >
                      <span className="text-primary mt-0.5">✓</span>
                      {f}
                    </li>
                  ))}
                </ul>
                <button
                  type="button"
                  data-cta-id={`pricing_${tier.name.toLowerCase()}`}
                  className={`mt-8 w-full h-11 rounded-pill text-button transition-colors ${
                    tier.featured
                      ? "bg-primary text-on-primary hover:bg-primary-focus"
                      : "border border-primary text-primary hover:bg-primary/5"
                  }`}
                >
                  {tier.cta}
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-canvas-parchment">
        <div className="mx-auto max-w-[800px] px-4 sm:px-6 py-16">
          <h2 className="text-display-lg text-ink text-center mb-10">
            {t("faq.title")}
          </h2>
          <div className="space-y-2">
            {faqs.map((faq, i) => {
              const isOpen = openIdx === i;
              return (
                <div
                  key={i}
                  className="bg-canvas rounded-xl border border-hairline"
                >
                  <button
                    type="button"
                    onClick={() => setOpenIdx(isOpen ? null : i)}
                    aria-expanded={isOpen}
                    className="w-full flex items-center justify-between p-5 text-left"
                  >
                    <span className="text-body-strong text-ink">{faq.q}</span>
                    <ChevronDown
                      size={20}
                      className={`transition-transform ${isOpen ? "rotate-180" : ""}`}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-5 text-body text-ink-muted-80 text-body-cjk">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}