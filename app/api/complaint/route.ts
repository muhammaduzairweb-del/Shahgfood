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

    // confirmation to the customer
    const userHtml = `
    <div style="font-family:'Segoe UI',Arial,Helvetica,sans-serif;max-width:600px;margin:0 auto;background:#fff;border:1px solid #EAE1D2;border-radius:18px;overflow:hidden">
      <div style="background:linear-gradient(120deg,#5E1A86,#B71C66);padding:28px 26px;color:#fff;text-align:center">
        <div style="font-size:13px;letter-spacing:1.2px;opacity:.85;font-weight:700">SHAH G ONLINE</div>
        <div style="font-size:24px;font-weight:800;margin-top:8px">We've received your complaint 🙏</div>
      </div>
      <div style="padding:24px 26px 6px;color:#3a332b;font-size:15px;line-height:1.75">
        <p style="margin:0 0 12px">Thank you, ${esc(name)}. We take complaints seriously and our team will investigate the whole matter regarding <b>${esc(g("restaurant"))}</b>.</p>
        <p style="margin:0 0 4px;color:#8A8072">We'll get back to you at this email. Please also check your Spam folder.</p>
      </div>
      <div dir="rtl" style="padding:16px 26px 24px;border-top:1px solid #F0E7D8;font-family:'Noto Nastaliq Urdu','Jameel Noori Nastaleeq','Segoe UI',serif;color:#3a332b;font-size:17px;line-height:2.2;text-align:right">
        <p style="margin:0 0 10px">آپ کی شکایت موصول ہو گئی ہے 🙏</p>
        <p style="margin:0 0 10px">شکریہ! ہماری ٹیم <b>${esc(g("restaurant"))}</b> کے خلاف اس معاملے کی مکمل تحقیق کرے گی اور اسی ای میل پر آپ سے رابطہ کرے گی۔ براہ کرم اپنا اسپام فولڈر بھی دیکھیں۔</p>
      </div>
      <div style="background:#211812;color:rgba(255,255,255,.6);padding:16px 24px;font-size:12px;text-align:center">Shah G Online · shahgfood.com · ${PUBLIC_EMAIL}</div>
    </div>`;

    await transporter.sendMail({
      from: `"${fromName}" <${user}>`,
      to: email,
      subject: `✅ Shah G Online — your complaint was received / آپ کی شکایت موصول ہو گئی`,
      html: userHtml,
    });

    return NextResponse.json({ ok: true });
  } catch (e) {
    return NextResponse.json({ ok: false, error: e instanceof Error ? e.message : "Failed to send." }, { status: 500 });
  }
}
