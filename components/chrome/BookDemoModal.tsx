"use client";

import * as React from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { useTranslations } from "next-intl";
import { useBookDemo } from "./useBookDemo";
import { Button } from "@/components/ui/Button";
import { submitLead } from "@/lib/forms/submit";
import { HexBadge } from "@/components/brand/Hex";
import { z } from "zod";

export function BookDemoModal() {
  const { open, setOpen, source } = useBookDemo();
  const t = useTranslations("modal");
  const [status, setStatus] = React.useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");
  const [errors, setErrors] = React.useState<Record<string, string>>({});
  const firstFieldRef = React.useRef<HTMLInputElement>(null);

  const leadSchema = React.useMemo(
    () =>
      z.object({
        name: z.string().min(1, t("errors.required")),
        company: z.string().min(1, t("errors.required")),
        headcount: z.string().min(1, t("errors.required")),
        phone: z.string().min(8, t("errors.phone")),
        email: z.string().email(t("errors.email")),
        painPoints: z.array(z.string()).optional().default([]),
        preferredTime: z.string().optional(),
        notes: z.string().optional(),
        hp: z.string().optional(),
      }),
    [t],
  );

  React.useEffect(() => {
    if (open) {
      setStatus("idle");
      setErrors({});
      // Focus first field on open
      setTimeout(() => firstFieldRef.current?.focus(), 50);
    }
  }, [open]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = {
      name: String(formData.get("name") ?? ""),
      company: String(formData.get("company") ?? ""),
      headcount: String(formData.get("headcount") ?? ""),
      phone: String(formData.get("phone") ?? ""),
      email: String(formData.get("email") ?? ""),
      painPoints: formData.getAll("painPoints").map(String),
      preferredTime: String(formData.get("preferredTime") ?? "") || undefined,
      notes: String(formData.get("notes") ?? "") || undefined,
      hp: String(formData.get("hp") ?? ""),
    };

    const parsed = leadSchema.safeParse(data);
    if (!parsed.success) {
      const fieldErrors: Record<string, string> = {};
      parsed.error.issues.forEach((issue) => {
        const k = issue.path[0];
        if (typeof k === "string") fieldErrors[k] = issue.message;
      });
      setErrors(fieldErrors);
      return;
    }

    setStatus("submitting");
    try {
      const result = await submitLead({ ...parsed.data, source });
      if (!result.ok) throw new Error("failed");
      setStatus("success");
      if (result.mode === "mailto") {
        // Give the mail client a moment to open, then close the modal.
        setTimeout(() => setOpen(false), 600);
      }
      if (
        typeof window !== "undefined" &&
        (window as unknown as { gtag?: (...args: unknown[]) => void }).gtag
      ) {
        (window as unknown as { gtag: (...args: unknown[]) => void }).gtag(
          "event",
          "lead_submitted",
          { source, mode: result.mode },
        );
      }
    } catch {
      setStatus("error");
    }
  };

  const fieldCls =
    "w-full h-12 px-4 border border-white/20 bg-transparent text-white outline-none transition-colors focus:border-accent";
  const labelCls = "t-label mb-2 block text-ash";

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/75 backdrop-blur-sm z-[60]" />
        <Dialog.Content className="fixed top-1/2 left-1/2 z-[61] max-h-[calc(100vh-32px)] w-[min(620px,calc(100vw-32px))] -translate-x-1/2 -translate-y-1/2 overflow-y-auto border border-white/14 bg-surface-1">
          <div className="p-7 sm:p-9">
            <div className="mb-8 flex items-start justify-between gap-6">
              <div>
                <div className="mb-5 flex items-center gap-3">
                  <HexBadge size={26} tone="legion">
                    01
                  </HexBadge>
                  <span className="h-px w-10 bg-white/20" aria-hidden />
                  <span className="t-label text-ash">{t("kicker")}</span>
                </div>
                <Dialog.Title className="t-display-2 t-balance text-white">
                  {t("title")}
                </Dialog.Title>
                <Dialog.Description className="t-body mt-3 text-smoke/70">
                  {t("sub")}
                </Dialog.Description>
              </div>
              <Dialog.Close asChild>
                <button
                  aria-label={t("close")}
                  className="flex h-11 w-11 shrink-0 items-center justify-center border border-white/20 text-white transition-colors hover:border-white/50"
                >
                  <X size={18} />
                </button>
              </Dialog.Close>
            </div>

            {status === "success" ? (
              <div className="py-8 text-center">
                <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center border border-accent bg-accent/10">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    className="h-7 w-7 text-accent"
                    strokeWidth={2}
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
                <p className="t-body text-white">{t("success")}</p>
                <Button
                  variant="ghost"
                  onClick={() => setOpen(false)}
                  className="mt-6"
                >
                  {t("close")}
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <div>
                    <label className={labelCls}>
                      {t("fields.name")} *
                    </label>
                    <input
                      ref={firstFieldRef}
                      name="name"
                      type="text"
                      required
                      className={fieldCls}
                      aria-invalid={!!errors.name}
                    />
                    {errors.name && (
                      <p className="t-caption mt-1 text-error">{errors.name}</p>
                    )}
                  </div>
                  <div>
                    <label className={labelCls}>{t("fields.company")} *</label>
                    <input
                      name="company"
                      type="text"
                      required
                      className={fieldCls}
                      aria-invalid={!!errors.company}
                    />
                    {errors.company && (
                      <p className="t-caption mt-1 text-error">{errors.company}</p>
                    )}
                  </div>
                </div>

                <div>
                  <label className={labelCls}>{t("fields.headcount")} *</label>
                  <select name="headcount" required className={fieldCls}>
                    <option value="">—</option>
                    {t.raw("headcountOptions").map((opt: string) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                  {errors.headcount && (
                    <p className="t-caption mt-1 text-error">{errors.headcount}</p>
                  )}
                </div>

                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <div>
                    <label className={labelCls}>{t("fields.phone")} *</label>
                    <input name="phone" type="tel" required className={fieldCls} />
                    {errors.phone && (
                      <p className="t-caption mt-1 text-error">{errors.phone}</p>
                    )}
                  </div>
                  <div>
                    <label className={labelCls}>{t("fields.email")} *</label>
                    <input name="email" type="email" required className={fieldCls} />
                    {errors.email && (
                      <p className="t-caption mt-1 text-error">{errors.email}</p>
                    )}
                  </div>
                </div>

                <div>
                  <label className={labelCls}>{t("fields.painPoints")}</label>
                  <div className="mt-1 grid grid-cols-2 gap-2">
                    {t.raw("painPointOptions").map((opt: string) => (
                      <label
                        key={opt}
                        className="flex cursor-pointer items-center gap-2 t-caption text-smoke/75"
                      >
                        <input
                          type="checkbox"
                          name="painPoints"
                          value={opt}
                          className="h-4 w-4 accent-accent"
                        />
                        {opt}
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className={labelCls}>{t("fields.preferredTime")}</label>
                  <input
                    name="preferredTime"
                    type="text"
                    className={fieldCls}
                  />
                </div>

                <div>
                  <label className={labelCls}>{t("fields.notes")}</label>
                  <textarea
                    name="notes"
                    rows={3}
                    className={`${fieldCls} h-auto resize-none py-3`}
                  />
                </div>

                {/* Honeypot — hidden from real users */}
                <div className="absolute -left-[9999px]" aria-hidden>
                  <label>
                    Don&apos;t fill this
                    <input
                      type="text"
                      name="hp"
                      tabIndex={-1}
                      autoComplete="off"
                    />
                  </label>
                </div>

                <div className="mt-7 border-t border-white/12 pt-7">
                  <Button
                    type="submit"
                    variant="accent"
                    size="lg"
                    disabled={status === "submitting"}
                    className="w-full"
                  >
                    {status === "submitting" ? t("submitting") : t("submit")}
                  </Button>

                  <p className="t-caption mt-3 text-center text-ash">{t("privacy")}</p>
                </div>

                {status === "error" && (
                  <p className="t-caption text-center text-error">{t("error")}</p>
                )}
              </form>
            )}
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
