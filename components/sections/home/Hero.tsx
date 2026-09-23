"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/Button";
import { useBookDemo } from "@/components/chrome/useBookDemo";
import { DashboardOverviewMockup } from "@/components/brand/mockups/DashboardOverview";

export function Hero() {
  const t = useTranslations("home.hero");
  const { setOpen: setBookOpen, setSource } = useBookDemo();

  return (
    <section className="relative bg-canvas">
      <div className="mx-auto max-w-[1024px] px-4 sm:px-6 pt-12 sm:pt-20 pb-12 sm:pb-24 text-center">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="text-caption text-ink-muted-48 mb-4 tracking-wide"
        >
          {t("eyebrow")}
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.05 }}
          className="text-hero-display text-ink"
        >
          {t("headline")}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="text-lead text-ink-muted-80 mt-5 max-w-2xl mx-auto text-body-cjk"
        >
          {t("sub")}
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.15 }}
          className="mt-7 flex flex-col sm:flex-row items-center justify-center gap-3"
        >
          <Button
            variant="primary"
            size="lg"
            data-cta-id="hero_book_demo"
            onClick={() => {
              setSource("hero");
              setBookOpen(true);
            }}
          >
            {t("primaryCta")}
          </Button>
          <a
            href="#product"
            data-cta-id="hero_secondary"
            className="text-button text-primary hover:text-primary-focus inline-flex items-center gap-1 h-12 px-2"
          >
            {t("secondaryCta")} →
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.25 }}
          className="mt-12 sm:mt-16"
        >
          <div className="relative rounded-xl overflow-hidden product-shadow bg-canvas-pearl">
            <DashboardOverviewMockup className="w-full h-auto block" />
          </div>
          <p className="text-caption text-ink-muted-48 mt-3 text-center">
            {t("mockupCaption")}
          </p>
        </motion.div>
      </div>
    </section>
  );
}