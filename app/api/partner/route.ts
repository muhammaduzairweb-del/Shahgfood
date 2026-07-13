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

    const restaurant = g("restaurant");
    const owner = g("owner");
    const email = g("email");
    const phone = g("phone");
    const areas = g("areas");
    const pkg = g("package");
    const term = g("term");
    const amount = g("amount");
    const dishes = g("dishes");

    if (!restaurant || !email || !phone) {
      return NextResponse.json({ ok: false, error: "Missing required fields." }, { status: 400 });
    }

    const user = process.env.SMTP_USER;
    const pass = process.env.SMTP_PASS;
    if (!user || !pass) {
      return NextResponse.json({ ok: false, error: "Email not configured. Add SMTP_USER & SMTP_PASS in .env." }, { status: 500 });
    }

    const fromName = process.env.MAIL_FROM_NAME || "Shah G Online";
    const transporter = nodemailer.createTransport({ service: "gmail", auth: { user, pass } });

    // ---- 1) internal notification to admin ----
    const row = (a: string, b: string) => `<tr><td style="padding:8px 12px;background:#F7F3EB;font-weight:700;color:#5A5245;white-space:nowrap">${esc(a)}</td><td style="padding:8px 12px;color:#211812">${esc(b) || "—"}</td></tr>`;
    const adminHtml = `
    <div style="font-family:Arial,Helvetica,sans-serif;max-width:600px;margin:0 auto;background:#fff;border:1px solid #EAE1D2;border-radius:16px;overflow:hidden">
      <div style="background:linear-gradient(120deg,#5E1A86,#8E1E7C,#B71C66);padding:26px 24px;color:#fff">
        <div style="font-size:13px;letter-spacing:1px;opacity:.85;font-weight:700">SHAH G ONLINE · NEW LISTING REQUEST</div>
        <div style="font-size:26px;font-weight:800;margin-top:6px">${esc(restaurant)}</div>
      </div>
      <div style="padding:22px 24px">
        <table style="width:100%;border-collapse:separate;border-spacing:0 6px;font-size:14px">
          ${row("Package", `${pkg} · ${term}`)}
          ${row("Amount", amount)}
          ${row("Owner / contact", owner)}
          ${row("Email", email)}
          ${row("Phone / WhatsApp", phone)}
          ${row("Areas covered", areas)}
        </table>
        <div style="margin-top:18px;font-weight:800;color:#C1272D;font-size:13px;letter-spacing:.4px">DISHES SUBMITTED</div>
        <div style="margin-top:8px;padding:14px;background:#F7F3EB;border-radius:12px;white-space:pre-wrap;font-size:13.5px;color:#4A4238;line-height:1.6">${esc(dishes)}</div>
        <div style="margin-top:18px;font-size:12.5px;color:#8A8072">Contact this partner to arrange the PayFast payment, then approve & list them.</div>
      </div>
      <div style="background:#211812;color:rgba(255,255,255,.6);padding:14px 24px;font-size:12px;text-align:center">Shah G Online · shahgfood.com</div>
    </div>`;

    await transporter.sendMail({
      from: `"${fromName}" <${user}>`,
      to: process.env.MAIL_TO || user,
      replyTo: email,
      subject: `🍽️ New Partner: ${restaurant} — ${pkg} (${term})`,
      html: adminHtml,
    });

    // ---- 2) bilingual confirmation to the partner (Nastaliq for Urdu) ----
    const userHtml = `
    <div style="font-family:'Segoe UI',Arial,Helvetica,sans-serif;max-width:600px;margin:0 auto;background:#fff;border:1px solid #EAE1D2;border-radius:18px;overflow:hidden">
      <div style="background:linear-gradient(120deg,#5E1A86,#8E1E7C,#B71C66);padding:30px 26px;color:#fff;text-align:center">
        <div style="font-size:13px;letter-spacing:1.2px;opacity:.85;font-weight:700">SHAH G ONLINE</div>
        <div style="font-size:26px;font-weight:800;margin-top:8px">Thank you, ${esc(owner || restaurant)}! 🎉</div>
      </div>
      <div style="padding:26px 26px 8px;color:#3a332b;font-size:15px;line-height:1.75">
        <p style="margin:0 0 14px">We've received your listing request for <b>${esc(restaurant)}</b> on the <b>${esc(pkg)}</b> (${esc(term)}) plan.</p>
        <p style="margin:0 0 14px">Our team is reviewing your details and will contact you shortly from this email address to complete your payment via <b>PayFast</b> and take your listing live — usually within 24 hours.</p>
        <p style="margin:0 0 4px;color:#8A8072">Please just wait for our response — no action is needed from you right now. 🙏</p>
      </div>
      <div dir="rtl" style="padding:18px 26px 26px;border-top:1px solid #F0E7D8;font-family:'Noto Nastaliq Urdu','Jameel Noori Nastaleeq','Segoe UI',serif;color:#3a332b;font-size:17px;line-height:2.2;text-align:right">
        <p style="margin:0 0 10px">شاہ جی آن لائن کا انتخاب کرنے کا شکریہ! 🎉</p>
        <p style="margin:0 0 10px">ہمیں آپ کے ریستوران <b>${esc(restaurant)}</b> کی <b>${esc(pkg)}</b> پلان پر لسٹنگ درخواست موصول ہو گئی ہے۔</p>
        <p style="margin:0 0 10px">ہماری ٹیم آپ کی تفصیلات کا جائزہ لے رہی ہے اور جلد اسی ای میل سے آپ سے رابطہ کر کے <b>PayFast</b> کے ذریعے ادائیگی مکمل کرا کے آپ کی لسٹنگ لائیو کر دے گی — عموماً 24 گھنٹے میں۔</p>
        <p style="margin:0;color:#8A8072">براہِ کرم ہمارے جواب کا انتظار کریں — ابھی آپ کو کچھ کرنے کی ضرورت نہیں۔ 🙏</p>
      </div>
      <div style="background:#211812;color:rgba(255,255,255,.6);padding:16px 24px;font-size:12px;text-align:center">Shah G Online · shahgfood.com · ${PUBLIC_EMAIL}</div>
    </div>`;

    await transporter.sendMail({
      from: `"${fromName}" <${user}>`,
      to: email,
      subject: `✅ Shah G Online — we received your request / آپ کی درخواست موصول ہو گئی`,
      html: userHtml,
    });

    return NextResponse.json({ ok: true });
  } catch (e) {
    return NextResponse.json({ ok: false, error: e instanceof Error ? e.message : "Failed to send." }, { status: 500 });
  }
}
