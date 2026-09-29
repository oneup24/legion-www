"use client";

import * as React from "react";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";

type LogoItem = { name: string; industry: string };

export function LogoStrip() {
  const t = useTranslations("home.customerLogos");
  const items = t.raw("items") as LogoItem[];

  return (
    <section className="bg-canvas border-y border-divider-soft">
      <div className="mx-auto max-w-[1024px] px-4 sm:px-6 py-10 sm:py-14">
        <p className="text-caption text-ink-muted-48 text-center mb-6 tracking-wide">
          {t("eyebrow")}
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
          {items.map((logo, i) => (
            <motion.div
              key={logo.name}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.04 }}
              className="group flex flex-col items-center justify-center h-20 px-3 rounded-md bg-canvas-parchment hover:bg-surface-chip-translucent transition-colors"
              aria-label={logo.name}
            >
              <span className="text-caption font-semibold text-ink-muted-80 group-hover:text-ink text-center leading-tight">
                {logo.name}
              </span>
              <span className="text-fine-print text-ink-muted-48 mt-1">
                {logo.industry}
              </span>
            </motion.div>
          ))}
        </div>
        <p className="text-fine-print text-ink-muted-48 text-center mt-6">
          {t("subtitle")}
        </p>
      </div>
    </section>
  );
}