import { NextRequest, NextResponse } from "next/server";
import { createHash } from "node:crypto";
import { doc, setDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";

export const runtime = "nodejs";

// Stores a visitor's push subscription in Firestore /pushSubs/{sha256(endpoint)}.
// Idempotent — re-subscribing the same browser overwrites the same doc.

export async function POST(req: NextRequest) {
  try {
    const { sub, lang } = await req.json();
    if (!sub?.endpoint || !sub?.keys?.p256dh || !sub?.keys?.auth) {
      return NextResponse.json({ ok: false, error: "Invalid subscription." }, { status: 400 });
    }
    const id = createHash("sha256").update(sub.endpoint).digest("hex").slice(0, 40);
    await setDoc(doc(db, "pushSubs", id), {
      endpoint: sub.endpoint,
      p256dh: sub.keys.p256dh,
      auth: sub.keys.auth,
      lang: lang === "ur" ? "ur" : "en",
      updatedAt: Date.now(),
    });
    return NextResponse.json({ ok: true });
  } catch (e) {
    return NextResponse.json({ ok: false, error: e instanceof Error ? e.message : "Failed." }, { status: 500 });
  }
}
