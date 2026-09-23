"use client";

import * as React from "react";
import { useTranslations } from "next-intl";
import { Share2, Wrench, Puzzle } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { motion } from "framer-motion";

const iconMap = { Share2, Wrench, Puzzle } as const;

export function PartnersPage() {
  const t = useTranslations("partners");
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
      const res = await fetch("/api/partner-application", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error();
      setStatus("success");
    } catch {
      setStatus("error");
    }
  };

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

      {/* Philosophy */}
      <section className="bg-canvas-parchment">
        <div className="mx-auto max-w-[1024px] px-4 sm:px-6 py-16 grid grid-cols-1 md:grid-cols-3 gap-10">
          <h2 className="text-display-md text-ink">{t("philosophy.title")}</h2>
          <p className="text-body text-ink-muted-80 text-body-cjk md:col-span-2">
            {t("philosophy.body")}
          </p>
        </div>
      </section>

      {/* Models */}
      <section className="bg-canvas">
        <div className="mx-auto max-w-[1024px] px-4 sm:px-6 py-16">
          <h2 className="text-display-lg text-ink text-center mb-10">
            {t("models.title")}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {models.map((m, i) => {
              const Icon = iconMap[m.icon as keyof typeof iconMap];
              return (
                <motion.div
                  key={m.title}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.05 }}
                  className="bg-canvas-parchment rounded-xl p-8"
                >
                  <Icon
                    size={28}
                    strokeWidth={1.5}
                    className="text-primary mb-4"
                  />
                  <h3 className="text-tagline text-ink">{m.title}</h3>
                  <p className="text-body text-ink-muted-80 mt-2 text-body-cjk">
                    {m.desc}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Promises */}
      <section className="tile-dark-1">
        <div className="mx-auto max-w-[1024px] px-4 sm:px-6 py-16">
          <h2 className="text-display-lg text-on-dark text-center mb-10">
            {t("promises.title")}
          </h2>
          <ul className="max-w-2xl mx-auto space-y-4">
            {promises.map((p, i) => (
              <li
                key={i}
                className="flex items-start gap-3 text-body text-on-dark text-body-cjk"
              >
                <span className="text-primary-on-dark">✓</span>
                {p}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Form */}
      <section className="bg-canvas">
        <div className="mx-auto max-w-[1024px] px-4 sm:px-6 py-16">
          <h2 className="text-display-lg text-ink text-center">
            {t("form.title")}
          </h2>
          {status === "success" ? (
            <div className="max-w-xl mx-auto mt-8 p-8 rounded-xl bg-success/10 text-center">
              <p className="text-body text-ink">{t("form.success")}</p>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="max-w-xl mx-auto mt-8 space-y-4"
            >
              <Field name="company" label={t("form.fields.company")} required />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Field name="name" label={t("form.fields.name")} required />
                <Field name="role" label={t("form.fields.role")} required />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                <label className="text-caption text-ink-muted-80 mb-1 block font-medium">
                  {t("form.fields.model")}
                </label>
                <select
                  name="model"
                  required
                  className="w-full h-11 px-4 rounded-md border border-hairline bg-canvas"
                >
                  <option value="">請選擇——</option>
                  {models.map((m) => (
                    <option key={m.title} value={m.title}>
                      {m.title}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-caption text-ink-muted-80 mb-1 block font-medium">
                  {t("form.fields.background")}
                </label>
                <textarea
                  name="background"
                  rows={5}
                  required
                  className="w-full px-4 py-3 rounded-md border border-hairline bg-canvas resize-none"
                />
              </div>
              <Button
                type="submit"
                variant="primary"
                size="lg"
                className="w-full"
                disabled={status === "submitting"}
              >
                {status === "submitting" ? "送出中..." : t("form.submit")}
              </Button>
              {status === "error" && (
                <p className="text-caption text-error text-center">
                  送出失敗，請稍後再試。
                </p>
              )}
            </form>
          )}
        </div>
      </section>
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
      <label className="text-caption text-ink-muted-80 mb-1 block font-medium">
        {label}
        {required && " *"}
      </label>
      <input
        name={name}
        type={type}
        required={required}
        className="w-full h-11 px-4 rounded-md border border-hairline bg-canvas"
      />
    </div>
  );
}