// Shah G Foods — service worker (enables install + basic offline)
const CACHE = "shahg-v1";

self.addEventListener("install", (event) => {
  self.skipWaiting();
  event.waitUntil(caches.open(CACHE).then((c) => c.addAll(["/"]).catch(() => {})));
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
  );
  self.clients.claim();
});

// Web Push from /api/push/send — shows even when the site is closed
self.addEventListener("push", (event) => {
  let data = {};
  try { data = event.data ? event.data.json() : {}; } catch { /* ignore */ }
  const title = data.title || "Shah G Online";
  event.waitUntil(
    self.registration.showNotification(title, {
      body: data.body || "",
      icon: "/icon.svg",
      badge: "/icon.svg",
      tag: data.tag || "shahg-push",
      data: { url: data.url || "/restaurant/shah-g-foods/menu" },
    })
  );
});

// Open the site when a notification is clicked
self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  const url = (event.notification.data && event.notification.data.url) || "/restaurant/shah-g-foods/menu";
  event.waitUntil(
    clients.matchAll({ type: "window", includeUncontrolled: true }).then((list) => {
      for (const c of list) {
        if ("focus" in c) { c.navigate(url).catch(() => {}); return c.focus(); }
      }
      if (clients.openWindow) return clients.openWindow(url);
    })
  );
});

// Network-first, fall back to cache when offline
self.addEventListener("fetch", (event) => {
  const req = event.request;
  if (req.method !== "GET" || !req.url.startsWith("http")) return;
  event.respondWith(
    fetch(req)
      .then((res) => {
        const copy = res.clone();
        caches.open(CACHE).then((c) => c.put(req, copy)).catch(() => {});
        return res;
      })
      .catch(() => caches.match(req).then((r) => r || caches.match("/")))
  );
});
