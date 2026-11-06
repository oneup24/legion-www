import { getTranslations } from "next-intl/server";
import { PageHero } from "@/components/editorial/PageHero";
import { SectionHeader } from "@/components/editorial/SectionHeader";
import { SectionShell } from "@/components/editorial/SectionShell";
import { HexOutline } from "@/components/brand/Hex";

type Section = { title: string; body: string };

/**
 * Shared shell for the privacy policy and the terms of use.
 *
 * Both documents are still being finalised with legal counsel, so the page
 * says so plainly and then summarises what the site actually does today —
 * rather than shipping boilerplate that pretends to be a finished legal text.
 */
export async function LegalPage({
  doc,
}: {
  doc: "privacy" | "terms";
}) {
  const t = await getTranslations("legal");
  const tDoc = await getTranslations(`legal.${doc}`);
  const sections = tDoc.raw("sections") as Section[];

  return (
    <>
      <PageHero
        kicker={t("kicker")}
        title={tDoc("title")}
        lead={tDoc("lead")}
        tone="void"
      />

      {/* Status — honest about where the document stands */}
      <SectionShell tone="surface" hexField fieldOpacity={0.04}>
        <div className="shell section-y">
          <div className="max-w-3xl border border-white/14 border-l-2 border-l-accent p-7 sm:p-9">
            <span className="t-label text-accent">{t("status")}</span>
            <p className="mt-5 t-body text-smoke/70">{t("statusBody")}</p>
          </div>

          <div className="mt-16 grid grid-cols-1 gap-8 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <SectionHeader
                index="01"
                kicker={t("kicker")}
                title={t("summaryTitle")}
                tone="surface"
              />
            </div>
            <div className="lg:col-span-8">
              <dl className="border-t border-white/12">
                {sections.map((s, i) => (
                  <div
                    key={s.title}
                    className="grid grid-cols-1 gap-3 border-b border-white/12 py-7 sm:grid-cols-12 sm:gap-6"
                  >
                    <dt className="flex items-baseline gap-4 sm:col-span-5">
                      <span className="t-index text-accent tabular-nums">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="t-body text-white">{s.title}</span>
                    </dt>
                    <dd className="t-body text-smoke/65 sm:col-span-7">{s.body}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>
      </SectionShell>

      {/* Contact */}
      <SectionShell tone="accent" hexField fieldOpacity={0.12}>
        <div className="shell relative section-y">
          <HexOutline
            size={320}
            strokePx={1}
            className="pointer-events-none absolute -right-24 -bottom-40 text-white"
            style={{ opacity: 0.26 }}
          />
          <div className="relative grid grid-cols-1 gap-6 lg:grid-cols-12 lg:items-end lg:gap-8">
            <div className="lg:col-span-6">
              <h2 className="t-display-2 text-white">{t("contact.title")}</h2>
            </div>
            <div className="lg:col-span-6">
              <p className="t-body text-white/85">{t("contact.body")}</p>
              <a
                href="mailto:hello@legionone.hk"
                data-cta-id={`legal_${doc}_email`}
                className="link-arrow mt-4 text-white"
              >
                hello@legionone.hk
              </a>
            </div>
          </div>
        </div>
      </SectionShell>
    </>
  );
}
