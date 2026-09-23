"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

type PainPoint = { before: string; after: string };

export function PainPoints() {
  const t = useTranslations("home.painPoints");
  const items = t.raw("items") as PainPoint[];

  return (
    <section className="bg-canvas-parchment">
      <div className="mx-auto max-w-[1024px] px-4 sm:px-6 py-16 sm:py-24">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="text-center mb-12"
        >
          <p className="text-caption text-ink-muted-48 mb-3 tracking-wide">
            {t("eyebrow")}
          </p>
          <h2 className="text-display-lg text-ink max-w-3xl mx-auto">
            {t("headline")}
          </h2>
          <p className="text-lead text-ink-muted-80 mt-4 text-body-cjk">
            {t("lead")}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {items.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="bg-canvas rounded-xl p-8 md:p-10"
            >
              <div className="space-y-4">
                <div>
                  <div className="text-caption font-semibold text-ink-muted-48 uppercase mb-2">
                    {t("before")}
                  </div>
                  <p className="text-body text-ink-muted-48 text-body-cjk line-through decoration-2 decoration-error/40">
                    {item.before}
                  </p>
                </div>
                <div className="h-px bg-divider-soft" />
                <div>
                  <div className="text-caption font-semibold text-primary uppercase mb-2">
                    {t("after")}
                  </div>
                  <p className="text-body text-ink text-body-cjk relative inline-block">
                    {item.after}
                    <span
                      aria-hidden
                      className="absolute left-0 right-0 -bottom-1 h-[2px] bg-primary"
                    />
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}