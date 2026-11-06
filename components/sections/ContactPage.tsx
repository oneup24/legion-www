"use client";

import * as React from "react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/Button";
import { submitContact } from "@/lib/forms/submit";
import { PageHero } from "@/components/editorial/PageHero";
import { SectionHeader } from "@/components/editorial/SectionHeader";
import { SectionShell } from "@/components/editorial/SectionShell";
import { HexBadge } from "@/components/brand/Hex";

const FIELD =
  "w-full h-12 px-4 border border-white/20 bg-transparent text-white outline-none transition-colors focus:border-accent";

export function ContactPage() {
  const t = useTranslations("contact");
  const tNav = useTranslations("nav");
  const tModal = useTranslations("modal");
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
      <PageHero
        tone="void"
        kicker={tNav("contact")}
        title={t("headline")}
        lead={t("sub")}
      />

      <SectionShell tone="surface" hexField fieldOpacity={0.04}>
        <div className="shell section-y">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-14">
            {/* Form */}
            <div className="lg:col-span-7">
              <SectionHeader
                index="01"
                kicker={tNav("contact")}
                title={t("formTitle")}
                tone="surface"
              />

              <div className="mt-10">
                {status === "success" ? (
                  <div className="border border-accent/40 bg-accent/10 p-8 text-center">
                    <p className="t-body text-white">{t("form.success")}</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                      <Field name="name" label={t("form.name")} required />
                      <Field name="company" label={t("form.company")} />
                    </div>
                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                      <Field name="phone" label={t("form.phone")} type="tel" />
                      <Field
                        name="email"
                        label={t("form.email")}
                        type="email"
                        required
                      />
                    </div>
                    <div>
                      <label className="t-label mb-2 block text-ash">
                        {t("form.message")} *
                      </label>
                      <textarea
                        name="notes"
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

            {/* Channels */}
            <div className="lg:col-span-5">
              <SectionHeader
                index="02"
                kicker={t("channelsKicker")}
                title={t("channelsTitle")}
                tone="surface"
              />

              <div className="mt-10 border-t border-white/12">
                <InfoRow index="01" label={t("info.address")} value={t("info.address")} />
                <InfoRow index="02" label={t("form.phone")} value={t("info.phone")} />
                <InfoRow
                  index="03"
                  label={t("form.email")}
                  value={t("info.email")}
                  href={`mailto:${t("info.email")}`}
                />
              </div>

              <a
                href={`https://wa.me/${wa}`}
                target="_blank"
                rel="noopener noreferrer"
                data-cta-id="contact_whatsapp"
                className="btn mt-6 bg-[#25D366] text-white hover:bg-[#1ebd5a]"
              >
                {t("info.whatsapp")}
              </a>
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
      <input name={name} type={type} required={required} className={FIELD} />
    </div>
  );
}

function InfoRow({
  index,
  label,
  value,
  href,
}: {
  index: string;
  label: string;
  value: string;
  href?: string;
}) {
  const content = (
    <>
      <div className="flex items-center gap-3">
        <HexBadge size={24} tone="legion">
          {index}
        </HexBadge>
        <div className="t-label text-ash">{label}</div>
      </div>
      <div className="mt-3 t-body text-white">{value}</div>
    </>
  );
  return (
    <div className="border-b border-white/12 py-5">
      {href ? (
        <a href={href} className="block hover:opacity-70">
          {content}
        </a>
      ) : (
        content
      )}
    </div>
  );
}
