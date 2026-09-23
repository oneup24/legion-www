/**
 * Form submission helper for static-export deployment (e.g. GitHub Pages).
 *
 * Tries the internal API first. If unavailable (static export, network down),
 * falls back to opening the user's mail client pre-filled with the form data.
 *
 * For production deployments with a backend (Vercel, etc.), set
 * NEXT_PUBLIC_DISABLE_MAILTO_FALLBACK=true to skip the fallback.
 */

type LeadPayload = {
  name: string;
  company: string;
  headcount: string;
  phone: string;
  email: string;
  painPoints?: string[];
  preferredTime?: string;
  notes?: string;
  source?: string;
};

const SALES_EMAIL =
  process.env.NEXT_PUBLIC_SALES_EMAIL || "sales@legionone.hk";
const PARTNERS_EMAIL =
  process.env.NEXT_PUBLIC_PARTNERS_EMAIL || "partners@legionone.hk";
const DISABLE_MAILTO = process.env.NEXT_PUBLIC_DISABLE_MAILTO_FALLBACK === "true";

export type SubmitResult = {
  ok: boolean;
  mode: "api" | "mailto" | "noop";
  error?: string;
};

function buildMailto(to: string, subject: string, body: string): string {
  const params = new URLSearchParams({ subject, body });
  return `mailto:${to}?${params.toString()}`;
}

function leadBody(payload: LeadPayload): string {
  return [
    `姓名：${payload.name}`,
    `公司：${payload.company}`,
    `團隊人數：${payload.headcount}`,
    `電話：${payload.phone}`,
    `電郵：${payload.email}`,
    payload.painPoints?.length ? `痛點：${payload.painPoints.join(", ")}` : "",
    payload.preferredTime ? `偏好時間：${payload.preferredTime}` : "",
    payload.notes ? `備註：${payload.notes}` : "",
    payload.source ? `來源：${payload.source}` : "",
  ]
    .filter(Boolean)
    .join("\n");
}

export async function submitLead(
  payload: LeadPayload,
): Promise<SubmitResult> {
  if (!DISABLE_MAILTO) {
    // Try the API first; if it 404s (static export), fall back.
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (res.ok) return { ok: true, mode: "api" };
    } catch {
      // network error → fall through to mailto
    }
  }

  const subject = `[LegionOne 預約] ${payload.name} · ${payload.company}`;
  const href = buildMailto(SALES_EMAIL, subject, leadBody(payload));
  if (typeof window !== "undefined") {
    window.location.href = href;
  }
  return { ok: true, mode: "mailto" };
}

type PartnerPayload = {
  company: string;
  name: string;
  role: string;
  email: string;
  phone: string;
  model: string;
  background: string;
};

export async function submitPartnerApplication(
  payload: PartnerPayload,
): Promise<SubmitResult> {
  if (!DISABLE_MAILTO) {
    try {
      const res = await fetch("/api/partner-application", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (res.ok) return { ok: true, mode: "api" };
    } catch {
      // fall through
    }
  }

  const subject = `[合作夥伴申請] ${payload.company}`;
  const body = [
    `公司：${payload.company}`,
    `聯絡人：${payload.name} (${payload.role})`,
    `電郵：${payload.email}`,
    `電話：${payload.phone}`,
    `合作模式：${payload.model}`,
    `背景：${payload.background}`,
  ].join("\n");
  const href = buildMailto(PARTNERS_EMAIL, subject, body);
  if (typeof window !== "undefined") {
    window.location.href = href;
  }
  return { ok: true, mode: "mailto" };
}

type ContactPayload = {
  name: string;
  company?: string;
  phone?: string;
  email: string;
  notes: string;
};

export async function submitContact(
  payload: ContactPayload,
): Promise<SubmitResult> {
  if (!DISABLE_MAILTO) {
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...payload, source: "contact_form" }),
      });
      if (res.ok) return { ok: true, mode: "api" };
    } catch {
      // fall through
    }
  }
  const subject = `[聯絡查詢] ${payload.name}`;
  const body = [
    `姓名：${payload.name}`,
    payload.company ? `公司：${payload.company}` : "",
    payload.phone ? `電話：${payload.phone}` : "",
    `電郵：${payload.email}`,
    "",
    "查詢內容：",
    payload.notes,
  ]
    .filter(Boolean)
    .join("\n");
  const href = buildMailto(SALES_EMAIL, subject, body);
  if (typeof window !== "undefined") {
    window.location.href = href;
  }
  return { ok: true, mode: "mailto" };
}