"use client";

import * as React from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { useTranslations } from "next-intl";
import { useBookDemo } from "./useBookDemo";
import { Button } from "@/components/ui/Button";
import { z } from "zod";

const leadSchema = z.object({
  name: z.string().min(1, "必填"),
  company: z.string().min(1, "必填"),
  headcount: z.string().min(1, "必選"),
  phone: z.string().min(8, "電話格式不正確"),
  email: z.string().email("電郵格式不正確"),
  painPoints: z.array(z.string()).optional().default([]),
  preferredTime: z.string().optional(),
  notes: z.string().optional(),
  hp: z.string().optional(),
});

type LeadForm = z.infer<typeof leadSchema>;

export function BookDemoModal() {
  const { open, setOpen, source } = useBookDemo();
  const t = useTranslations("modal");
  const tCommon = useTranslations("common");
  const [status, setStatus] = React.useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");
  const [errors, setErrors] = React.useState<Record<string, string>>({});
  const firstFieldRef = React.useRef<HTMLInputElement>(null);

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
    const data: LeadForm = {
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
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...parsed.data, source }),
      });
      const json = (await res.json().catch(() => ({}))) as { ok?: boolean };
      if (!res.ok || !json.ok) throw new Error("failed");
      setStatus("success");
      // GA4 conversion
      if (typeof window !== "undefined" && (window as unknown as { gtag?: (...args: unknown[]) => void }).gtag) {
        (window as unknown as { gtag: (...args: unknown[]) => void }).gtag(
          "event",
          "lead_submitted",
          { source },
        );
      }
    } catch {
      setStatus("error");
    }
  };

  const fieldCls =
    "w-full h-11 px-4 rounded-md border border-hairline bg-canvas text-body focus:border-primary focus:outline-none";
  const labelCls = "text-caption text-ink-muted-80 mb-1 block font-medium";

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/45 backdrop-blur-sm z-[60] animate-in fade-in" />
        <Dialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[61] w-[min(560px,calc(100vw-32px))] max-h-[calc(100vh-32px)] overflow-y-auto bg-canvas shadow-2xl rounded-xl">
            <div className="p-8">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <Dialog.Title className="text-display-md text-ink">
                    {t("title")}
                  </Dialog.Title>
                  <Dialog.Description className="text-body text-ink-muted-80 mt-2">
                    {t("sub")}
                  </Dialog.Description>
                </div>
                <Dialog.Close asChild>
                  <button
                    aria-label={t("close")}
                    className="w-11 h-11 rounded-pill hover:bg-canvas-parchment flex items-center justify-center"
                  >
                    <X size={18} />
                  </button>
                </Dialog.Close>
              </div>

              {status === "success" ? (
                <div className="py-8 text-center">
                  <div className="w-12 h-12 mx-auto mb-4 rounded-pill bg-success/10 flex items-center justify-center">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      className="text-success w-6 h-6"
                      strokeWidth={2}
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </div>
                  <p className="text-body text-ink">{t("success")}</p>
                  <Button
                    variant="dark-utility"
                    onClick={() => setOpen(false)}
                    className="mt-6"
                  >
                    {t("close")}
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className={labelCls}>{t("fields.name")} *</label>
                      <input
                        ref={firstFieldRef}
                        name="name"
                        type="text"
                        required
                        className={fieldCls}
                        aria-invalid={!!errors.name}
                      />
                      {errors.name && (
                        <p className="text-caption text-error mt-1">
                          {errors.name}
                        </p>
                      )}
                    </div>
                    <div>
                      <label className={labelCls}>
                        {t("fields.company")} *
                      </label>
                      <input
                        name="company"
                        type="text"
                        required
                        className={fieldCls}
                        aria-invalid={!!errors.company}
                      />
                      {errors.company && (
                        <p className="text-caption text-error mt-1">
                          {errors.company}
                        </p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className={labelCls}>
                      {t("fields.headcount")} *
                    </label>
                    <select name="headcount" required className={fieldCls}>
                      <option value="">請選擇——</option>
                      {t.raw("headcountOptions").map((opt: string) => (
                        <option key={opt} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </select>
                    {errors.headcount && (
                      <p className="text-caption text-error mt-1">
                        {errors.headcount}
                      </p>
                    )}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className={labelCls}>
                        {t("fields.phone")} *
                      </label>
                      <input
                        name="phone"
                        type="tel"
                        required
                        className={fieldCls}
                      />
                      {errors.phone && (
                        <p className="text-caption text-error mt-1">
                          {errors.phone}
                        </p>
                      )}
                    </div>
                    <div>
                      <label className={labelCls}>
                        {t("fields.email")} *
                      </label>
                      <input
                        name="email"
                        type="email"
                        required
                        className={fieldCls}
                      />
                      {errors.email && (
                        <p className="text-caption text-error mt-1">
                          {errors.email}
                        </p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className={labelCls}>
                      {t("fields.painPoints")}
                    </label>
                    <div className="grid grid-cols-2 gap-2 mt-1">
                      {t.raw("painPointOptions").map((opt: string) => (
                        <label
                          key={opt}
                          className="flex items-center gap-2 text-caption text-ink-muted-80 cursor-pointer"
                        >
                          <input
                            type="checkbox"
                            name="painPoints"
                            value={opt}
                            className="w-4 h-4 accent-primary"
                          />
                          {opt}
                        </label>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className={labelCls}>
                      {t("fields.preferredTime")}
                    </label>
                    <input
                      name="preferredTime"
                      type="text"
                      placeholder="例如：本週三下午"
                      className={fieldCls}
                    />
                  </div>

                  <div>
                    <label className={labelCls}>{t("fields.notes")}</label>
                    <textarea
                      name="notes"
                      rows={3}
                      className={`${fieldCls} h-auto py-3 resize-none`}
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

                  <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    disabled={status === "submitting"}
                    className="w-full"
                  >
                    {status === "submitting" ? t("submitting") : t("submit")}
                  </Button>

                  <p className="text-caption text-ink-muted-48 text-center">
                    {t("privacy")}
                  </p>

                  {status === "error" && (
                    <p className="text-caption text-error text-center">
                      {t("error")}
                    </p>
                  )}
                </form>
              )}
            </div>
          </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}