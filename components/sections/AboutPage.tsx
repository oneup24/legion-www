"use client";

import * as React from "react";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";

type Value = { letter: string; title: string; desc: string };
type TeamMember = { name: string; role: string; initials: string; bio: string };

export function AboutPage() {
  const t = useTranslations("about");
  const values = t.raw("values.items") as Value[];
  const team = (t.has("team.members") ? t.raw("team.members") : []) as TeamMember[];

  // 6 placeholder slots
  const placeholderTeam: TeamMember[] = [
    { name: "陳大文", role: "創辦人 / CEO", initials: "CW", bio: "20 年 ERP 行業經驗，曾服務多家香港上市公司。" },
    { name: "李曉怡", role: "聯合創辦人 / COO", initials: "LI", bio: "前跨國顧問公司董事，專長業務流程重整。" },
    { name: "黃家俊", role: "技術總監 / CTO", initials: "WK", bio: "前金融科技公司架構師，10 年大型系統開發經驗。" },
    { name: "張嘉儀", role: "產品總監 / CPO", initials: "CK", bio: "前 SaaS 創業團隊成員，深度理解中小企需求。" },
    { name: "吳志明", role: "業務總監", initials: "WC", bio: "15 年 B2B 銷售經驗，香港中小企市場專家。" },
    { name: "鄭佩儀", role: "客戶成功總監", initials: "CP", bio: "前會計師事務所主管，深度了解財務流程。" },
  ];

  const teamData = team.length > 0 ? team : placeholderTeam;

  return (
    <>
      <section className="bg-canvas">
        <div className="mx-auto max-w-[1024px] px-4 sm:px-6 pt-12 sm:pt-20 pb-8 text-center">
          <h1 className="text-hero-display text-ink">{t("headline")}</h1>
          <p className="text-lead text-ink-muted-80 mt-4 max-w-2xl mx-auto text-body-cjk">
            {t("sub")}
          </p>
        </div>
      </section>

      {/* Story */}
      <section className="bg-canvas-parchment">
        <div className="mx-auto max-w-[1024px] px-4 sm:px-6 py-16 grid grid-cols-1 md:grid-cols-3 gap-10">
          <h2 className="text-display-md text-ink">{t("story.title")}</h2>
          <p className="text-body text-ink-muted-80 text-body-cjk md:col-span-2">
            {t("story.body")}
          </p>
        </div>
      </section>

      {/* Vision + Mission */}
      <section className="bg-canvas">
        <div className="mx-auto max-w-[1024px] px-4 sm:px-6 py-16 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-canvas-parchment rounded-xl p-8">
            <h3 className="text-tagline text-ink">{t("vision.title")}</h3>
            <p className="text-body text-ink-muted-80 mt-3 text-body-cjk">
              {t("vision.body")}
            </p>
          </div>
          <div className="bg-canvas-parchment rounded-xl p-8">
            <h3 className="text-tagline text-ink">{t("mission.title")}</h3>
            <p className="text-body text-ink-muted-80 mt-3 text-body-cjk">
              {t("mission.body")}
            </p>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="tile-dark-1">
        <div className="mx-auto max-w-[1024px] px-4 sm:px-6 py-16">
          <h2 className="text-display-lg text-on-dark text-center mb-10">
            {t("values.title")}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {values.map((v, i) => (
              <motion.div
                key={v.letter}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className="bg-white/5 rounded-xl p-8"
              >
                <div className="text-display-lg text-primary-on-dark font-wordmark">
                  {v.letter}
                </div>
                <h3 className="text-tagline text-on-dark mt-3">{v.title}</h3>
                <p className="text-body text-body-muted mt-2 text-body-cjk">
                  {v.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="bg-canvas">
        <div className="mx-auto max-w-[1024px] px-4 sm:px-6 py-16">
          <div className="text-center mb-10">
            <h2 className="text-display-lg text-ink">{t("team.title")}</h2>
            <p className="text-body text-ink-muted-80 mt-3 text-body-cjk">
              {t("team.subtitle")}
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {teamData.map((m, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className="bg-canvas-parchment rounded-xl p-6 text-center"
              >
                <div className="w-20 h-20 mx-auto rounded-pill bg-canvas flex items-center justify-center text-tagline text-ink-muted-80">
                  {m.initials}
                </div>
                <h3 className="text-body-strong text-ink mt-4">{m.name}</h3>
                <p className="text-caption text-primary">{m.role}</p>
                <p className="text-caption text-ink-muted-80 mt-3 text-body-cjk">
                  {m.bio}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}