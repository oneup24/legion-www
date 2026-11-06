"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { useBookDemo } from "@/components/chrome/useBookDemo";
import { HexField, HexOutline } from "@/components/brand/Hex";
import { Link } from "@/lib/i18n/navigation";

/**
 * Brand moment — the one place on the site where the brand line is allowed
 * to take the whole screen. Everything else supports it.
 */
export function BrandMoment({
  headline,
  lead,
  primaryCta,
  secondaryCta,
  secondaryHref,
  source,
  ctaId,
}: {
  headline: React.ReactNode;
  lead?: React.ReactNode;
  primaryCta: string;
  secondaryCta?: string;
  secondaryHref?: string;
  source: string;
  ctaId: string;
}) {
  const { setOpen: setBookOpen, setSource } = useBookDemo();

  return (
    <section className="relative overflow-hidden bg-accent">
      <HexField
        className="pointer-events-none absolute inset-0 h-full w-full text-white"
        style={{ opacity: 0.12 }}
      />
      <HexOutline
        size={560}
        strokePx={1}
        className="pointer-events-none absolute -left-40 bottom-[-40%] text-white"
        style={{ opacity: 0.26 }}
      />

      <div className="shell relative py-24 text-center sm:py-32">
        <motion.h2
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.55 }}
          className="t-display-hero t-balance mx-auto max-w-5xl text-white"
        >
          {headline}
        </motion.h2>

        {lead ? (
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.5, delay: 0.08 }}
            className="t-lead mx-auto mt-8 max-w-2xl text-white/85"
          >
            {lead}
          </motion.p>
        ) : null}

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.5, delay: 0.14 }}
          className="mt-11 flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          <Button
            variant="white"
            size="lg"
            data-cta-id={ctaId}
            onClick={() => {
              setSource(source);
              setBookOpen(true);
            }}
          >
            {primaryCta}
          </Button>
          {secondaryCta && secondaryHref ? (
            <Link
              href={secondaryHref}
              data-cta-id={`${ctaId}_secondary`}
              className="link-arrow text-white"
            >
              {secondaryCta}
            </Link>
          ) : null}
        </motion.div>
      </div>
    </section>
  );
}
