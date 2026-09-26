import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { COMPLAINT_CATEGORIES, COMPLAINT_CITIES, LIMITS } from "@/lib/complaints";

export const runtime = "nodejs";

function esc(s: string) {
  return String(s).replace(/[<>&]/g, (c) => ({ "<": "&lt;", ">": "&gt;", "&": "&amp;" }[c] || c));
}

export async function POST(req: NextRequest) {
  try {
    const form = await req.formData();
    const g = (k: string) => ((form.get(k) as string) || "").trim();

    // honeypot: real people never see or fill this field
    if (g("website")) return NextResponse.json({ ok: true });

    const name = g("name");
    const phone = g("phone");
    const email = g("email");
    const restaurant = g("restaurant").slice(0, LIMITS.restaurant);
    const area = g("area").slice(0, LIMITS.area);
    const title = g("title").slice(0, LIMITS.title);
    const story = g("story").slice(0, LIMITS.story);
    const orderDate = g("orderDate").slice(0, LIMITS.orderDate);
    const category = COMPLAINT_CATEGORIES.includes(g("category")) ? g("category") : "Other";
    const city = COMPLAINT_CITIES.includes(g("city")) ? g("city") : "Other";
    const rating = Math.min(5, Math.max(1, parseInt(g("rating"), 10) || 1));

    if (!name || !phone || !email || !restaurant || !title || story.length < 30 || g("agree") !== "yes") {
      return NextResponse.json({ ok: false, error: "Please fill in all required fields. Your complaint needs at least 30 characters." }, { status: 400 });
    }

    // the team inbox is the only place complaints (and contact details) go;
    // approved ones are published by adding them to lib/complaints-data.ts
    const user = process.env.SMTP_USER;
    const pass = process.env.SMTP_PASS;
    if (!user || !pass) throw new Error("SMTP_USER / SMTP_PASS are not set");
    {
      const attachments: { filename: string; content: Buffer }[] = [];
      const file = form.get("evidence") as File | null;
      if (file && typeof file.arrayBuffer === "function" && file.size > 0 && file.size <= 5 * 1024 * 1024) {
        attachments.push({ filename: file.name || "evidence", content: Buffer.from(await file.arrayBuffer()) });
      }
      const row = (a: string, b: string) => `<tr><td style="padding:7px 12px;background:#F7F3EB;font-weight:700;color:#5A5245;white-space:nowrap">${esc(a)}</td><td style="padding:7px 12px;color:#211812">${esc(b) || "-"}</td></tr>`;
      const transporter = nodemailer.createTransport({ service: "gmail", auth: { user, pass } });
      await transporter.sendMail({
        from: `"${process.env.MAIL_FROM_NAME || "Complaints"}" <${user}>`,
        to: process.env.MAIL_TO || user,
        replyTo: email,
        subject: `New complaint to review: ${restaurant} (${rating}★)`,
        attachments,
        html: `
        <div style="font-family:Arial,Helvetica,sans-serif;max-width:600px;margin:0 auto;border:1px solid #EAE1D2;border-radius:14px;overflow:hidden">
          <div style="background:#C1272D;color:#fff;padding:20px 24px">
            <div style="font-size:12px;letter-spacing:1px;font-weight:700;opacity:.85">NEW COMPLAINT FROM SHAHGFOOD.COM</div>
            <div style="font-size:20px;font-weight:800;margin-top:6px">${esc(title)}</div>
          </div>
          <div style="padding:20px 24px">
            <table style="width:100%;border-collapse:separate;border-spacing:0 5px;font-size:14px">
              ${row("Restaurant", restaurant)}${row("City / area", `${city}${area ? `, ${area}` : ""}`)}${row("Category", category)}
              ${row("Rating", `${rating} / 5`)}${row("Order date", orderDate)}
              ${row("Name (private)", name)}${row("Phone (private)", phone)}${row("Email (private)", email)}
            </table>
            <div style="margin-top:14px;padding:14px;background:#F7F3EB;border-radius:10px;white-space:pre-wrap;font-size:13.5px;line-height:1.6;color:#4A4238">${esc(story)}</div>
            <div style="margin-top:14px;font-size:12.5px;color:#8A8072;line-height:1.6">${attachments.length ? "Evidence attached. " : ""}To publish this complaint on the website, send it to your developer. The name, phone and email above stay private.</div>
          </div>
        </div>`,
      });
    }

    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("complaint submit failed:", e);
    return NextResponse.json({ ok: false, error: "Your complaint could not be submitted right now. Please try again in a few minutes." }, { status: 500 });
  }
}
