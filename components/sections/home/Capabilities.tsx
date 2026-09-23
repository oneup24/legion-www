"use client";

import * as React from "react";
import { motion } from "framer-motion";
import {
  Layers,
  Sparkles,
  Gauge,
  Maximize2,
  type LucideIcon,
} from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/lib/i18n/navigation";

type Capability = { title: string; desc: string; icon: string };

const iconMap: Record<string, LucideIcon> = {
  Layers,
  Sparkles,
  Gauge,
  Maximize2,
};

export function Capabilities() {
  const t = useTranslations("home.capabilities");
  const items = t.raw("items") as Capability[];

  return (
    <section className="tile-dark-1">
      <div className="mx-auto max-w-[1024px] px-4 sm:px-6 py-16 sm:py-24">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="text-center mb-12"
        >
          <p className="text-caption text-body-muted mb-3 tracking-wide">
            {t("eyebrow")}
          </p>
          <h2 className="text-display-lg text-on-dark">{t("headline")}</h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {items.map((item, i) => {
            const Icon = iconMap[item.icon] ?? Layers;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className="bg-white/5 rounded-xl p-8 hover:bg-white/10 transition-colors group"
              >
                <Icon
                  size={28}
                  strokeWidth={1.5}
                  className="text-primary-on-dark mb-5"
                />
                <h3 className="text-tagline text-on-dark mb-2">{item.title}</h3>
                <p className="text-body text-body-muted text-body-cjk">
                  {item.desc}
                </p>
                <Link
                  href="/product"
                  className="mt-4 inline-block text-caption text-primary-on-dark opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  了解更多 →
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}