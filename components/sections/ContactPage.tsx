"use client";

import * as React from "react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/Button";
import { submitContact } from "@/lib/forms/submit";

export function ContactPage() {
  const t = useTranslations("contact");
  const [status, setStatus] = React.useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("submitting");
    const data = Object.fromEntries(new FormData(e.currentTarget).entries());
    try {
      const result = await submitContact({
        name: String(data.name),
        company: data.company ? String(data.company) : undefined,
        phone: data.phone ? String(data.phone) : undefined,
        email: String(data.email),
        notes: String(data.notes),
      });
      if (!result.ok) throw new Error();
      setStatus("success");
    } catch {
      setStatus("error");
    }
  };

  const wa = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "85200000000";

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

      <section className="bg-canvas">
        <div className="mx-auto max-w-[1024px] px-4 sm:px-6 pb-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {/* Form */}
            <div>
              {status === "success" ? (
                <div className="p-8 rounded-xl bg-success/10 text-center">
                  <p className="text-body text-ink">{t("form.success")}</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <Field name="name" label={t("form.name")} required />
                  <Field name="company" label={t("form.company")} />
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Field name="phone" label={t("form.phone")} type="tel" />
                    <Field
                      name="email"
                      label={t("form.email")}
                      type="email"
                      required
                    />
                  </div>
                  <div>
                    <label className="text-caption text-ink-muted-80 mb-1 block font-medium">
                      {t("form.message")} *
                    </label>
                    <textarea
                      name="notes"
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

            {/* Info */}
            <div className="space-y-6">
              <InfoRow label="地址" value={t("info.address")} />
              <InfoRow label="電話" value={t("info.phone")} />
              <InfoRow
                label="電郵"
                value={t("info.email")}
                href={`mailto:${t("info.email")}`}
              />
              <a
                href={`https://wa.me/${wa}`}
                target="_blank"
                rel="noopener noreferrer"
                data-cta-id="contact_whatsapp"
                className="inline-flex items-center gap-2 h-11 px-5 bg-[#25D366] text-white rounded-pill text-button hover:bg-[#1ebd5a]"
              >
                {t("info.whatsapp")}
              </a>
            </div>
          </div>
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

function InfoRow({
  label,
  value,
  href,
}: {
  label: string;
  value: string;
  href?: string;
}) {
  const content = (
    <>
      <div className="text-caption text-ink-muted-48">{label}</div>
      <div className="text-body text-ink mt-1">{value}</div>
    </>
  );
  return (
    <div className="border-b border-divider-soft pb-4">
      {href ? (
        <a href={href}>{content}</a>
      ) : (
        content
      )}
    </div>
  );
}