"use client";

import * as React from "react";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { PageHero } from "@/components/editorial/PageHero";
import { SectionHeader } from "@/components/editorial/SectionHeader";
import { SectionShell } from "@/components/editorial/SectionShell";
import { HexAvatar, HexIcon, HexOutline } from "@/components/brand/Hex";

type Value = { letter: string; title: string; desc: string };
type TeamMember = { name: string; role: string; initials: string; bio: string };

export function AboutPage() {
  const t = useTranslations("about");
  const tNav = useTranslations("nav");
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
      <PageHero
        kicker={tNav("about")}
        title={t("headline")}
        lead={t("sub")}
        tone="void"
      />

      {/* Story */}
      <SectionShell tone="surface" hexField fieldOpacity={0.04}>
        <div className="shell section-y">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <SectionHeader
                index="01"
                kicker={tNav("about")}
                title={t("story.title")}
                tone="surface"
              />
            </div>
            <div className="lg:col-span-8">
              <p className="t-lead text-smoke/70">{t("story.body")}</p>
            </div>
          </div>
        </div>
      </SectionShell>

      {/* Vision + Mission */}
      <SectionShell tone="void">
        <div className="shell section-y">
          <SectionHeader
            index="02"
            kicker={tNav("about")}
            title={t("pillarsTitle")}
            tone="void"
          />
          <div className="mt-12 grid grid-cols-1 gap-x-14 gap-y-10 border-t border-white/12 pt-10 lg:grid-cols-2">
            <div>
              <HexIcon size={44} tone="legion">
                <span className="t-micro text-white">01</span>
              </HexIcon>
              <h3 className="mt-6 t-display-3 text-white">{t("vision.title")}</h3>
              <p className="mt-4 t-body text-smoke/65">{t("vision.body")}</p>
            </div>
            <div className="lg:border-l lg:border-white/12 lg:pl-14">
              <HexIcon size={44} tone="legion">
                <span className="t-micro text-white">02</span>
              </HexIcon>
              <h3 className="mt-6 t-display-3 text-white">{t("mission.title")}</h3>
              <p className="mt-4 t-body text-smoke/65">{t("mission.body")}</p>
            </div>
          </div>
        </div>
      </SectionShell>

      {/* Values — L.E.G.I.O.N. as hexagon letter tiles */}
      <SectionShell tone="surface" hexField fieldOpacity={0.04}>
        <div className="shell relative section-y">
          <HexOutline
            size={460}
            strokePx={1}
            className="pointer-events-none absolute -right-32 -top-32 text-accent"
            style={{ opacity: 0.26 }}
          />
          <div className="relative">
            <SectionHeader
              index="03"
              kicker={tNav("about")}
              title={t("values.title")}
              tone="surface"
            />
            <div className="mt-14 grid grid-cols-1 gap-x-10 gap-y-12 border-t border-white/12 pt-10 sm:grid-cols-2 lg:grid-cols-3">
              {values.map((v, i) => (
                <motion.div
                  key={v.letter}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-8%" }}
                  transition={{ duration: 0.45, delay: i * 0.05 }}
                >
                  <div className="flex items-center gap-4">
                    <HexIcon size={56} tone="legion">
                      <span className="text-[22px] font-medium leading-none text-white">
                        {v.letter}
                      </span>
                    </HexIcon>
                    <span className="t-index text-ash">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <h3 className="mt-6 t-display-3 text-white">{v.title}</h3>
                  <p className="mt-3 t-body text-smoke/65">{v.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </SectionShell>

      {/* Team */}
      <SectionShell tone="void">
        <div className="shell section-y">
          <SectionHeader
            index="04"
            kicker={tNav("about")}
            title={t("team.title")}
            lead={t("team.subtitle")}
            tone="void"
          />

          {team.length === 0 ? (
            <p className="mt-8 max-w-2xl border-l-2 border-accent pl-5 t-body text-smoke/70">
              {t("team.pendingNote")}
            </p>
          ) : null}

          <div className="mt-14 grid grid-cols-1 gap-x-10 gap-y-12 border-t border-white/12 pt-10 sm:grid-cols-2 lg:grid-cols-3">
            {teamData.map((m, i) => (
              <motion.article
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-8%" }}
                transition={{ duration: 0.45, delay: i * 0.05 }}
              >
                <div className="flex items-start gap-4">
                  <HexAvatar initials={m.initials} size={56} tone="legion" />
                  <div className="pt-1">
                    <span className="t-index text-accent tabular-nums">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h3 className="mt-1 t-body text-white">{m.name}</h3>
                    <p className="t-caption text-accent mt-1">{m.role}</p>
                  </div>
                </div>
                <p className="mt-4 t-body text-smoke/65">{m.bio}</p>
              </motion.article>
            ))}
          </div>
        </div>
      </SectionShell>
    </>
  );
}
