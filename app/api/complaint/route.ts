import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export const runtime = "nodejs";
const PUBLIC_EMAIL = "business@shahgfood.com";

function esc(s: string) {
  return String(s).replace(/[<>&]/g, (c) => ({ "<": "&lt;", ">": "&gt;", "&": "&amp;" }[c] || c));
}

export async function POST(req: NextRequest) {
  try {
    const form = await req.formData();
    const g = (k: string) => ((form.get(k) as string) || "").trim();

    const name = g("name");
    const email = g("email");
    const phone = g("phone");
    if (!name || !email || !phone) {
      return NextResponse.json({ ok: false, error: "Missing required fields." }, { status: 400 });
    }

    const evidence = form.get("evidence") as File | null;
    const attachments: { filename: string; content: Buffer }[] = [];
    if (evidence && typeof evidence.arrayBuffer === "function") {
      const buf = Buffer.from(await evidence.arrayBuffer());
      attachments.push({ filename: evidence.name || "evidence", content: buf });
    }

    const user = process.env.SMTP_USER;
    const pass = process.env.SMTP_PASS;
    if (!user || !pass) {
      return NextResponse.json({ ok: false, error: "Email not configured. Add SMTP_USER & SMTP_PASS in .env." }, { status: 500 });
    }
    const fromName = process.env.MAIL_FROM_NAME || "Shah G Online";
    const transporter = nodemailer.createTransport({ service: "gmail", auth: { user, pass } });

    const row = (a: string, b: string) => `<tr><td style="padding:8px 12px;background:#F7F3EB;font-weight:700;color:#5A5245;white-space:nowrap">${esc(a)}</td><td style="padding:8px 12px;color:#211812">${esc(b) || "—"}</td></tr>`;
    const adminHtml = `
    <div style="font-family:Arial,Helvetica,sans-serif;max-width:600px;margin:0 auto;background:#fff;border:1px solid #EAE1D2;border-radius:16px;overflow:hidden">
      <div style="background:linear-gradient(120deg,#9A1B1B,#C1272D);padding:24px;color:#fff">
        <div style="font-size:13px;letter-spacing:1px;opacity:.85;font-weight:700">SHAH G ONLINE · CUSTOMER COMPLAINT</div>
        <div style="font-size:22px;font-weight:800;margin-top:6px">${esc(g("issueLabel"))}</div>
      </div>
      <div style="padding:22px 24px">
        <table style="width:100%;border-collapse:separate;border-spacing:0 6px;font-size:14px">
          ${row("Complainant", name)}
          ${row("Email", email)}
          ${row("Phone", phone)}
          ${row("Restaurant", g("restaurant"))}
          ${row("Area / city", g("area"))}
          ${row("Order date / time", g("orderDate"))}
          ${row("Items ordered", g("items"))}
          ${row("Amount paid", g("amount"))}
          ${row("Payment", g("payment"))}
        </table>
        <div style="margin-top:16px;font-weight:800;color:#C1272D;font-size:13px">WHAT HAPPENED</div>
        <div style="margin-top:8px;padding:14px;background:#F7F3EB;border-radius:12px;white-space:pre-wrap;font-size:13.5px;color:#4A4238;line-height:1.6">${esc(g("details"))}</div>
        <div style="margin-top:16px;font-size:12.5px;color:#8A8072">${attachments.length ? "Evidence attached. " : ""}Investigate this complaint against the restaurant.</div>
      </div>
      <div style="background:#211812;color:rgba(255,255,255,.6);padding:14px 24px;font-size:12px;text-align:center">Shah G Online · shahgfood.com · ${PUBLIC_EMAIL}</div>
    </div>`;

    await transporter.sendMail({
      from: `"${fromName}" <${user}>`,
      to: process.env.MAIL_TO || user,
      replyTo: email,
      subject: `⚠️ Complaint: ${g("restaurant") || "Unknown restaurant"} — ${g("issueLabel")}`,
      html: adminHtml,
      attachments,
    });

    // no auto-mail to the customer — the team replies manually from the admin inbox
    return NextResponse.json({ ok: true });
  } catch (e) {
    return NextResponse.json({ ok: false, error: e instanceof Error ? e.message : "Failed to send." }, { status: 500 });
  }
}
