"use client";

import * as React from "react";
import { useTranslations } from "next-intl";
import { Share2, Wrench, Puzzle } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { submitPartnerApplication } from "@/lib/forms/submit";
import { motion } from "framer-motion";
import { PageHero } from "@/components/editorial/PageHero";
import { SectionHeader } from "@/components/editorial/SectionHeader";
import { SectionShell } from "@/components/editorial/SectionShell";
import { HexBadge, HexIcon } from "@/components/brand/Hex";

const iconMap = { Share2, Wrench, Puzzle } as const;

const FIELD =
  "w-full h-12 px-4 border border-white/20 bg-transparent text-white outline-none transition-colors focus:border-accent";

export function PartnersPage() {
  const t = useTranslations("partners");
  const tNav = useTranslations("nav");
  const tModal = useTranslations("modal");
  const models = t.raw("models.items") as Array<{
    title: string;
    desc: string;
    icon: string;
  }>;
  const promises = t.raw("promises.items") as string[];

  const [status, setStatus] = React.useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("submitting");
    const data = Object.fromEntries(new FormData(e.currentTarget).entries());
    try {
      const result = await submitPartnerApplication({
        company: String(data.company),
        name: String(data.name),
        role: String(data.role),
        email: String(data.email),
        phone: String(data.phone),
        model: String(data.model),
        background: String(data.background),
      });
      if (!result.ok) throw new Error();
      setStatus("success");
      if (result.mode === "mailto") setTimeout(() => {}, 600);
    } catch {
      setStatus("error");
    }
  };

  return (
    <>
      <PageHero
        tone="void"
        kicker={tNav("partners")}
        title={t("headline")}
        lead={t("sub")}
      />

      {/* Philosophy */}
      <SectionShell tone="surface" hexField fieldOpacity={0.04}>
        <div className="shell section-y grid grid-cols-1 gap-8 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <SectionHeader
              index="01"
              kicker={tNav("partners")}
              title={t("philosophy.title")}
              tone="surface"
            />
          </div>
          <div className="lg:col-span-8">
            <p className="t-lead text-smoke/70">{t("philosophy.body")}</p>
          </div>
        </div>
      </SectionShell>

      {/* Models */}
      <SectionShell tone="void">
        <div className="shell section-y">
          <SectionHeader
            index="02"
            kicker={tNav("partners")}
            title={t("models.title")}
            tone="void"
          />

          <div className="mt-14 grid grid-cols-1 gap-x-10 gap-y-12 border-t border-white/12 pt-10 md:grid-cols-3">
            {models.map((m, i) => {
              const Icon = iconMap[m.icon as keyof typeof iconMap];
              return (
                <motion.div
                  key={m.title}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-8%" }}
                  transition={{ duration: 0.45, delay: i * 0.05 }}
                >
                  <div className="flex items-center justify-between">
                    <HexIcon size={44} tone="legion">
                      <Icon size={19} strokeWidth={1.6} aria-hidden />
                    </HexIcon>
                    <HexBadge size={28} tone="onDark">
                      {String(i + 1).padStart(2, "0")}
                    </HexBadge>
                  </div>
                  <h3 className="mt-6 t-display-3 text-white">{m.title}</h3>
                  <p className="mt-3 t-body text-smoke/65">{m.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </SectionShell>

      {/* Promises — the brand blue block */}
      <SectionShell tone="accent" hexField fieldOpacity={0.12}>
        <div className="shell section-y">
          <SectionHeader
            index="03"
            kicker={tNav("partners")}
            title={t("promises.title")}
            tone="accent"
            titleClassName="text-white"
          />
          <ul className="mt-14 max-w-3xl border-t border-white/30">
            {promises.map((p, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-8%" }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className="grid grid-cols-1 gap-4 border-b border-white/30 py-6 lg:grid-cols-12 lg:gap-8"
              >
                <span className="lg:col-span-1">
                  <HexBadge size={28} tone="onLegion">
                    {String(i + 1).padStart(2, "0")}
                  </HexBadge>
                </span>
                <span className="lg:col-span-11 t-body text-white/90">{p}</span>
              </motion.li>
            ))}
          </ul>
        </div>
      </SectionShell>

      {/* Form */}
      <SectionShell tone="void">
        <div className="shell section-y">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-14">
            <div className="lg:col-span-5">
              <SectionHeader
                index="04"
                kicker={tNav("partners")}
                title={t("form.title")}
                tone="void"
              />
            </div>

            <div className="lg:col-span-7">
              {status === "success" ? (
                <div className="border border-accent/40 bg-accent/10 p-8 text-center">
                  <p className="t-body text-white">{t("form.success")}</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <Field name="company" label={t("form.fields.company")} required />
                  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                    <Field name="name" label={t("form.fields.name")} required />
                    <Field name="role" label={t("form.fields.role")} required />
                  </div>
                  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                    <Field
                      name="email"
                      label={t("form.fields.email")}
                      type="email"
                      required
                    />
                    <Field
                      name="phone"
                      label={t("form.fields.phone")}
                      type="tel"
                      required
                    />
                  </div>
                  <div>
                    <label className="t-label mb-2 block text-ash">
                      {t("form.fields.model")}
                    </label>
                    <select name="model" required className={FIELD}>
                      <option value="">—</option>
                      {models.map((m) => (
                        <option key={m.title} value={m.title}>
                          {m.title}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="t-label mb-2 block text-ash">
                      {t("form.fields.background")}
                    </label>
                    <textarea
                      name="background"
                      rows={5}
                      required
                      className={`${FIELD} h-auto resize-none py-3`}
                    />
                  </div>
                  <Button
                    type="submit"
                    variant="accent"
                    size="lg"
                    className="w-full"
                    disabled={status === "submitting"}
                  >
                    {status === "submitting" ? tModal("submitting") : t("form.submit")}
                  </Button>
                  {status === "error" && (
                    <p className="t-caption text-center text-error">{tModal("error")}</p>
                  )}
                </form>
              )}
            </div>
          </div>
        </div>
      </SectionShell>
    </>
  );
}

function Field({
  name,
  label,
  type = "text",
  required,
}: {
  name: string;
  label: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label className="t-label mb-2 block text-ash">
        {label}
        {required ? " *" : ""}
      </label>
      <input
        name={name}
        type={type}
        required={required}
        className={FIELD}
      />
    </div>
  );
}
