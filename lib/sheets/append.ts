import { google } from "googleapis";

type Lead = {
  timestamp?: string;
  name: string;
  company: string;
  headcount?: string;
  phone?: string;
  email: string;
  painPoints?: string[];
  source?: string;
  notes?: string;
};

function getAuth() {
  const json = process.env.GOOGLE_SERVICE_ACCOUNT_JSON;
  if (!json) return null;
  const credentials = JSON.parse(json) as {
    client_email: string;
    private_key: string;
  };
  return new google.auth.JWT({
    email: credentials.client_email,
    key: credentials.private_key,
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });
}

export async function appendLead(
  lead: Lead,
  tabName = "Leads",
): Promise<{ ok: boolean; error?: string }> {
  const spreadsheetId = process.env.GOOGLE_SHEETS_ID;
  const auth = getAuth();
  if (!auth || !spreadsheetId) {
    console.warn("[sheets] not configured — skipping append");
    return { ok: false, error: "not-configured" };
  }
  try {
    const sheets = google.sheets({ version: "v4", auth });
    const row = [
      lead.timestamp ?? new Date().toISOString(),
      lead.name,
      lead.company,
      lead.headcount ?? "",
      lead.phone ?? "",
      lead.email,
      (lead.painPoints ?? []).join(", "),
      lead.source ?? "",
      lead.notes ?? "",
    ];
    await sheets.spreadsheets.values.append({
      spreadsheetId,
      range: `${tabName}!A:I`,
      valueInputOption: "USER_ENTERED",
      requestBody: { values: [row] },
    });
    return { ok: true };
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : "unknown" };
  }
}