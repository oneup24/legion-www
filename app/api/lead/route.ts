import { NextResponse } from "next/server";
import { z } from "zod";
import { sendEmail } from "@/lib/email/send";
import { appendLead } from "@/lib/sheets/append";

const leadSchema = z.object({
  name: z.string().min(1),
  company: z.string().min(1),
  headcount: z.string().min(1),
  phone: z.string().min(8),
  email: z.string().email(),
  painPoints: z.array(z.string()).optional(),
  preferredTime: z.string().optional(),
  notes: z.string().optional(),
  source: z.string().optional(),
  hp: z.string().optional(),
});

export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "invalid-json" }, { status: 400 });
  }

  const parsed = leadSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: "validation", issues: parsed.error.issues },
      { status: 400 },
    );
  }

  // Honeypot — silent drop
  if (parsed.data.hp && parsed.data.hp.length > 0) {
    return NextResponse.json({ ok: true, dropped: true });
  }

  const lead = {
    ...parsed.data,
    timestamp: new Date().toISOString(),
  };

  const recipient = process.env.RESEND_TO_SALES || "sales@legionone.hk";
  const html = renderLeadHtml(lead);

  const [emailResult, sheetResult] = await Promise.all([
    sendEmail({
      to: recipient,
      subject: `[新預約] ${lead.name} · ${lead.company}`,
      html,
      replyTo: lead.email,
    }),
    appendLead(lead, "Leads"),
  ]);

  const ok =
    emailResult.ok || sheetResult.ok; // at least one succeeded
  if (!ok) {
    return NextResponse.json(
      { ok: false, emailQueued: false, sheetArchived: false },
      { status: 503 },
    );
  }

  return NextResponse.json({
    ok: true,
    emailQueued: emailResult.ok,
    sheetArchived: sheetResult.ok,
  });
}

function renderLeadHtml(lead: {
  name: string;
  company: string;
  headcount: string;
  phone: string;
  email: string;
  painPoints?: string[];
  preferredTime?: string;
  notes?: string;
  source?: string;
}): string {
  return `
    <h2>新預約申請</h2>
    <table style="border-collapse:collapse">
      <tr><td><b>姓名</b></td><td style="padding-left:12px">${lead.name}</td></tr>
      <tr><td><b>公司</b></td><td style="padding-left:12px">${lead.company}</td></tr>
      <tr><td><b>團隊人數</b></td><td style="padding-left:12px">${lead.headcount}</td></tr>
      <tr><td><b>電話</b></td><td style="padding-left:12px">${lead.phone}</td></tr>
      <tr><td><b>電郵</b></td><td style="padding-left:12px">${lead.email}</td></tr>
      <tr><td><b>痛點</b></td><td style="padding-left:12px">${(lead.painPoints ?? []).join(", ")}</td></tr>
      <tr><td><b>偏好時間</b></td><td style="padding-left:12px">${lead.preferredTime ?? ""}</td></tr>
      <tr><td><b>備註</b></td><td style="padding-left:12px">${lead.notes ?? ""}</td></tr>
      <tr><td><b>來源</b></td><td style="padding-left:12px">${lead.source ?? ""}</td></tr>
    </table>
  `;
}