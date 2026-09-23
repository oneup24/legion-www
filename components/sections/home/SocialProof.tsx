"use client";

import * as React from "react";
import { motion, useInView } from "framer-motion";
import { useTranslations } from "next-intl";

type Stat = { value: string; suffix: string; label: string };

function CountUp({
  target,
  suffix,
}: {
  target: string;
  suffix: string;
}) {
  const ref = React.useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });
  const numericTarget = parseInt(target, 10);
  const [val, setVal] = React.useState(0);

  React.useEffect(() => {
    if (!inView || isNaN(numericTarget)) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      setVal(numericTarget);
      return;
    }
    const duration = 1200;
    const start = performance.now();
    let raf = 0;
    const tick = (t: number) => {
      const elapsed = t - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setVal(Math.round(numericTarget * eased));
      if (progress < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, numericTarget]);

  return (
    <span ref={ref}>
      {val}
      {suffix}
    </span>
  );
}

export function SocialProof() {
  const t = useTranslations("home.socialProof");
  const stats = t.raw("stats") as Stat[];

  return (
    <section className="bg-canvas-parchment">
      <div className="mx-auto max-w-[1024px] px-4 sm:px-6 py-16 sm:py-24">
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="text-display-md text-ink text-center mb-12"
        >
          {t("headline")}
        </motion.h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="text-center"
            >
              <div className="text-hero-display text-ink">
                <CountUp target={stat.value} suffix={stat.suffix} />
              </div>
              <div className="text-body text-ink-muted-80 mt-2 text-body-cjk">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}