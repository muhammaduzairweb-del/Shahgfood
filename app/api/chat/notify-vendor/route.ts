import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";

// Fires ONCE per chat session (on the customer's first message): sends the
// restaurant owner a WhatsApp alert with a magic link into the vendor portal.
//
// SECURITY: WHATSAPP_TOKEN is server-only on purpose. Never expose it with a
// NEXT_PUBLIC_ prefix — that would ship it to every visitor's browser and let
// anyone send WhatsApp messages as the business.

const GRAPH_VERSION = "v25.0";

export async function POST(req: NextRequest) {
  let payload: { sessionId?: string; customerName?: string; text?: string };
  try {
    payload = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON body." }, { status: 400 });
  }
  const { sessionId, customerName, text } = payload;
  if (!sessionId || !text) {
    return NextResponse.json({ ok: false, error: "sessionId and text are required." }, { status: 400 });
  }

  const origin = process.env.SITE_ORIGIN || "http://localhost:3000";
  const magicLink = `${origin}/vendor/chat/${sessionId}`;
  const body =
    `🔔 *Shah G Food - New Inquiry!*\n` +
    `👤 *Customer:* ${customerName || "Guest"}\n` +
    `💬 *Message:* ${text}\n` +
    `👉 *Click to reply instantly:* ${magicLink}`;

  const token = process.env.WHATSAPP_TOKEN;
  const phoneId = process.env.WHATSAPP_PHONE_NUMBER_ID;
  const to = process.env.VENDOR_WHATSAPP;

  // Local fallback: missing keys → log the exact payload instead of crashing,
  // so the whole flow stays testable without Meta credentials.
  if (!token || !phoneId || !to) {
    console.log("\n================ WHATSAPP NOTIFY (SIMULATED — env keys missing) ================");
    console.log(`  To      : ${to || "<VENDOR_WHATSAPP not set>"}`);
    console.log(`  Message :\n${body.split("\n").map((l) => "    " + l).join("\n")}`);
    console.log("=================================================================================\n");
    return NextResponse.json({ ok: true, simulated: true, magicLink });
  }

  try {
    const res = await fetch(`https://graph.facebook.com/${GRAPH_VERSION}/${phoneId}/messages`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        messaging_product: "whatsapp",
        to,
        type: "text",
        text: { body, preview_url: false },
      }),
    });
    const data = await res.json();

    if (!res.ok) {
      // Most common on a fresh number: error 131047 — free-form text is only
      // allowed inside the 24h customer-service window. The vendor messaging
      // your business number once (or an approved template) opens it.
      console.log("\n================ WHATSAPP NOTIFY FAILED — payload for manual retry ================");
      console.log(`  To      : ${to}`);
      console.log(`  Message :\n${body.split("\n").map((l) => "    " + l).join("\n")}`);
      console.log("  Meta error:", JSON.stringify(data?.error || data, null, 2));
      console.log("====================================================================================\n");
      return NextResponse.json({ ok: false, error: data?.error?.message || "WhatsApp API error", magicLink }, { status: 502 });
    }

    return NextResponse.json({ ok: true, id: data?.messages?.[0]?.id, magicLink });
  } catch (e) {
    console.log("\n================ WHATSAPP NOTIFY FAILED (network) ================");
    console.log(`  Message :\n${body.split("\n").map((l) => "    " + l).join("\n")}`);
    console.log("  Error   :", e instanceof Error ? e.message : e);
    console.log("===================================================================\n");
    return NextResponse.json({ ok: false, error: "Network error reaching Meta.", magicLink }, { status: 502 });
  }
}
