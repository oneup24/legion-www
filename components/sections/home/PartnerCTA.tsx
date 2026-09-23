"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Link } from "@/lib/i18n/navigation";

export function PartnerCTA() {
  const t = useTranslations("home.partnerCta");
  return (
    <section className="tile-dark-2">
      <div className="mx-auto max-w-[1024px] px-4 sm:px-6 py-16 sm:py-24 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="text-display-lg text-on-dark"
        >
          {t("headline")}
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="text-lead text-body-muted mt-4 max-w-2xl mx-auto text-body-cjk"
        >
          {t("sub")}
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="mt-8"
        >
          <Link
            href="/partners"
            data-cta-id="partner_cta"
            className="inline-flex h-12 items-center justify-center px-6 rounded-pill bg-primary text-on-primary text-button hover:bg-primary-focus transition-colors"
          >
            {t("cta")} →
          </Link>
        </motion.div>
      </div>
    </section>
  );
}