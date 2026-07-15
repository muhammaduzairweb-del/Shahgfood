// Client-side Web Push subscription: once permission is granted, subscribe the
// browser with our VAPID public key and register the subscription server-side
// so /api/push/send can reach this visitor even when the site is closed.

function urlB64ToUint8Array(base64: string): Uint8Array {
  const padding = "=".repeat((4 - (base64.length % 4)) % 4);
  const b64 = (base64 + padding).replace(/-/g, "+").replace(/_/g, "/");
  const raw = atob(b64);
  const arr = new Uint8Array(raw.length);
  for (let i = 0; i < raw.length; i++) arr[i] = raw.charCodeAt(i);
  return arr;
}

export async function ensurePushSubscription(lang: "en" | "ur"): Promise<void> {
  try {
    if (typeof window === "undefined") return;
    if (!("serviceWorker" in navigator) || !("PushManager" in window)) return;
    if (Notification.permission !== "granted") return;
    const key = process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY;
    if (!key) return;

    const reg = await navigator.serviceWorker.ready;
    let sub = await reg.pushManager.getSubscription();
    if (!sub) {
      sub = await reg.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlB64ToUint8Array(key),
      });
    }

    // re-register at most once a day (keeps lang fresh, survives DB cleanups)
    const marker = `push-registered-${lang}`;
    const today = new Date().toDateString();
    if (localStorage.getItem(marker) === today) return;

    await fetch("/api/push/subscribe", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ sub: sub.toJSON(), lang }),
    });
    localStorage.setItem(marker, today);
  } catch { /* push unsupported or blocked — local reminders still work */ }
}
