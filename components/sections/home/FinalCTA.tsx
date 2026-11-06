"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { useBookDemo } from "@/components/chrome/useBookDemo";
import { HexField, HexOutline } from "@/components/brand/Hex";
import { LogoMark } from "@/components/brand/LogoMark";
import { Link } from "@/lib/i18n/navigation";

/**
 * Final call to action.
 *
 * The brand blue, full bleed. This is the one place the page breaks into
 * colour, and it does so exactly once, at the end.
 */
export function FinalCTA() {
  const t = useTranslations("home.final");
  const { setOpen: setBookOpen, setSource } = useBookDemo();

  return (
    <section className="relative overflow-hidden bg-accent">
      <HexField
        className="pointer-events-none absolute inset-0 h-full w-full text-white"
        style={{ opacity: 0.12 }}
      />
      <HexOutline
        size={620}
        strokePx={1}
        className="pointer-events-none absolute -right-40 -top-48 text-white"
        style={{ opacity: 0.28 }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -left-32 -bottom-48 opacity-[0.1]"
      >
        <LogoMark size={420} tone="light" />
      </div>

      <div className="shell relative section-y">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl"
        >
          <span className="t-label text-white/80">{t("label")}</span>
          <h2 className="mt-6 t-display-hero t-balance text-white">
            {t("headline")}
          </h2>
          <p className="mt-7 t-lead max-w-xl text-white/85">{t("sub")}</p>

          <div className="mt-10 flex flex-wrap gap-4">
            <button
              type="button"
              onClick={() => {
                setSource("final_cta");
                setBookOpen(true);
              }}
              data-cta-id="final_book_demo"
              className="btn btn-white"
            >
              {t("primaryCta")}
            </button>
            <Link
              href="/contact"
              className="btn border border-white/60 text-white hover:bg-white/10"
            >
              {t("secondaryCta")}
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
