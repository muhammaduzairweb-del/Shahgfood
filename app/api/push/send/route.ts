import { NextRequest, NextResponse } from "next/server";
import webpush from "web-push";
import { collection, deleteDoc, doc, getDoc, getDocs, setDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { SLOTS, messageFor } from "@/lib/push-messages";

export const runtime = "nodejs";
export const maxDuration = 60;

// The push cannon. Call it on ANY schedule (Vercel cron, cron-job.org hourly…):
// it resolves the current hour in Asia/Karachi, checks whether that hour is a
// notification slot, and sends that slot's message to every subscriber exactly
// once per day (idempotent via /pushMeta/lastSent). Dead subscriptions
// (uninstalled browsers) are cleaned up as it goes.
//
// Auth: ?key=CRON_SECRET or "Authorization: Bearer CRON_SECRET".

function karachiHour(): number {
  return parseInt(
    new Intl.DateTimeFormat("en-GB", { timeZone: "Asia/Karachi", hour: "2-digit", hour12: false }).format(new Date()),
    10
  );
}
function karachiDate(): string {
  return new Intl.DateTimeFormat("en-CA", { timeZone: "Asia/Karachi" }).format(new Date()); // YYYY-MM-DD
}

async function handle(req: NextRequest) {
  const secret = process.env.CRON_SECRET;
  const given = req.nextUrl.searchParams.get("key") || (req.headers.get("authorization") || "").replace(/^Bearer\s+/i, "");
  if (!secret || given !== secret) {
    return NextResponse.json({ ok: false, error: "Unauthorized." }, { status: 401 });
  }

  const pub = process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY;
  const priv = process.env.VAPID_PRIVATE_KEY;
  if (!pub || !priv) {
    return NextResponse.json({ ok: false, error: "VAPID keys not configured." }, { status: 500 });
  }
  webpush.setVapidDetails(process.env.VAPID_SUBJECT || "mailto:business@shahgfood.com", pub, priv);

  const hour = karachiHour();
  const today = karachiDate();
  // allow explicit override for testing: /api/push/send?key=...&hour=20
  const forced = req.nextUrl.searchParams.get("hour");
  const slot = forced ? parseInt(forced, 10) : hour;

  if (!SLOTS.includes(slot)) {
    return NextResponse.json({ ok: true, skipped: true, reason: `No slot at ${slot}:00 PKT.` });
  }

  // once per slot per day
  const metaRef = doc(db, "pushMeta", "lastSent");
  const meta = (await getDoc(metaRef)).data() || {};
  if (!forced && meta[`h${slot}`] === today) {
    return NextResponse.json({ ok: true, skipped: true, reason: `Slot ${slot}:00 already sent today.` });
  }

  const subsSnap = await getDocs(collection(db, "pushSubs"));
  let sent = 0;
  let removed = 0;
  const jobs = subsSnap.docs.map(async (d) => {
    const s = d.data();
    const msg = messageFor(slot, s.lang === "ur");
    try {
      await webpush.sendNotification(
        { endpoint: s.endpoint, keys: { p256dh: s.p256dh, auth: s.auth } },
        JSON.stringify({ title: msg.title, body: msg.body, tag: `shahg-${slot}`, url: slot === 10 || slot === 17 ? "/partner" : "/restaurant/shah-g-foods/menu" })
      );
      sent++;
    } catch (e) {
      const code = (e as { statusCode?: number })?.statusCode;
      if (code === 404 || code === 410) {
        await deleteDoc(doc(db, "pushSubs", d.id)).catch(() => {});
        removed++;
      }
    }
  });
  await Promise.allSettled(jobs);

  await setDoc(metaRef, { ...meta, [`h${slot}`]: today }, { merge: true });
  return NextResponse.json({ ok: true, slot: `${slot}:00 PKT`, subscribers: subsSnap.size, sent, removedDead: removed });
}

export async function GET(req: NextRequest) { return handle(req); }
export async function POST(req: NextRequest) { return handle(req); }
