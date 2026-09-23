"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/Button";
import { Link } from "@/lib/i18n/navigation";
import { useBookDemo } from "@/components/chrome/useBookDemo";

export function FinalCTA() {
  const t = useTranslations("home.finalCta");
  const { setOpen, setSource } = useBookDemo();
  return (
    <section className="tile-dark-3">
      <div className="mx-auto max-w-[1024px] px-4 sm:px-6 py-20 sm:py-32 text-center">
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
          className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Button
            variant="primary"
            size="lg"
            data-cta-id="final_book_demo"
            onClick={() => {
              setSource("final_cta");
              setOpen(true);
            }}
          >
            {t("primaryCta")}
          </Button>
          <Link
            href="/contact"
            className="text-button text-primary-on-dark hover:underline"
          >
            {t("secondaryCta")} →
          </Link>
        </motion.div>
      </div>
    </section>
  );
}