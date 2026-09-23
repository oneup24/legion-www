import { NextResponse } from "next/server";
import { z } from "zod";
import { sendEmail } from "@/lib/email/send";
import { appendLead } from "@/lib/sheets/append";

const partnerSchema = z.object({
  company: z.string().min(1),
  name: z.string().min(1),
  role: z.string().min(1),
  email: z.string().email(),
  phone: z.string().min(8),
  model: z.string().min(1),
  background: z.string().min(1),
});

export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }
  const parsed = partnerSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, issues: parsed.error.issues },
      { status: 400 },
    );
  }
  const lead = { ...parsed.data, timestamp: new Date().toISOString() };
  const recipient = process.env.RESEND_TO_PARTNERS || "partners@legionone.hk";
  const html = `
    <h2>新合作夥伴申請</h2>
    <table>
      <tr><td><b>公司</b></td><td>${lead.company}</td></tr>
      <tr><td><b>聯絡人</b></td><td>${lead.name} (${lead.role})</td></tr>
      <tr><td><b>電郵</b></td><td>${lead.email}</td></tr>
      <tr><td><b>電話</b></td><td>${lead.phone}</td></tr>
      <tr><td><b>合作模式</b></td><td>${lead.model}</td></tr>
      <tr><td><b>背景</b></td><td>${lead.background}</td></tr>
    </table>
  `;
  const [emailResult, sheetResult] = await Promise.all([
    sendEmail({
      to: recipient,
      subject: `[合作夥伴申請] ${lead.company}`,
      html,
      replyTo: lead.email,
    }),
    appendLead(lead, "Partners"),
  ]);
  const ok = emailResult.ok || sheetResult.ok;
  if (!ok) return NextResponse.json({ ok: false }, { status: 503 });
  return NextResponse.json({
    ok: true,
    emailQueued: emailResult.ok,
    sheetArchived: sheetResult.ok,
  });
}