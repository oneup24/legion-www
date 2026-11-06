"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { SectionShell } from "@/components/editorial/SectionShell";
import { SectionLabel } from "@/components/editorial/SectionLabel";
import { HexOutline } from "@/components/brand/Hex";
import { Link } from "@/lib/i18n/navigation";

/**
 * Manifesto — the point of view.
 *
 * Agency sites open with a belief, not a feature list, and the statement
 * carries the whole block: set oversized, set uppercase, set on the grid
 * with the supporting argument in a narrow column beside it.
 */
export function Belief() {
  const t = useTranslations("home.manifesto");

  return (
    <SectionShell tone="surface" hexField fieldOpacity={0.04}>
      <HexOutline
        size={560}
        strokePx={1}
        className="pointer-events-none absolute -left-44 bottom-[-24%] text-accent"
        style={{ opacity: 0.3 }}
      />

      <div className="shell relative section-y">
        <div className="split-grid-wide">
          <div>
            <SectionLabel tone="surface">{t("label")}</SectionLabel>
            <span
              aria-hidden
              className="mt-10 block text-[120px] leading-[0.6] text-accent sm:text-[160px]"
            >
              &ldquo;
            </span>
          </div>

          <div>
            <motion.h2
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.5 }}
              className="t-display-1 t-balance text-white"
            >
              {t("quote")}
            </motion.h2>

            <div className="mt-10 max-w-xl border-t border-white/12 pt-8">
              <p className="t-lead text-smoke/70">{t("body")}</p>
              <Link href="/product" className="link-arrow mt-8 text-white">
                {t("cta")}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </SectionShell>
  );
}
