"use client";

import { useEffect } from "react";
import { useApp } from "@/components/AppProvider";

const HOUR = 20; // 8 PM

function msUntilHour(hour: number) {
  const now = new Date();
  const target = new Date();
  target.setHours(hour, 0, 0, 0);
  if (target.getTime() <= now.getTime()) target.setDate(target.getDate() + 1);
  return target.getTime() - now.getTime();
}

export default function NotifyReminder() {
  const { lang } = useApp();
  const ur = lang === "ur";

  useEffect(() => {
    if (typeof window === "undefined" || !("Notification" in window)) return;

    const fire = async () => {
      const title = ur ? "بھوک لگی ہے؟ 🍛" : "Hungry? 🍛";
      const body = ur
        ? "ابھی آرڈر کریں — ایپ ابھی زیرِ تعمیر ہے، مگر آپ نمبر پر کال کر کے براہِ راست آرڈر کر سکتے ہیں :)"
        : "Order now — the app is under development, but you can order directly by phone for now :)";
      const options: NotificationOptions = { body, icon: "/icon.svg", badge: "/icon.svg", tag: "shahg-daily" };
      try {
        if ("serviceWorker" in navigator) {
          const reg = await navigator.serviceWorker.getRegistration();
          if (reg) { reg.showNotification(title, options); return; }
        }
        new Notification(title, options);
      } catch { /* ignore */ }
    };

    let timer: ReturnType<typeof setTimeout>;
    const schedule = () => {
      if (Notification.permission !== "granted") return;
      const today = new Date().toDateString();
      // if it's already past 8 PM and we haven't reminded today, fire once now
      if (new Date().getHours() >= HOUR && localStorage.getItem("notify-last") !== today) {
        fire();
        localStorage.setItem("notify-last", today);
      }
      clearTimeout(timer);
      timer = setTimeout(() => {
        const t = new Date().toDateString();
        if (localStorage.getItem("notify-last") !== t) {
          fire();
          localStorage.setItem("notify-last", t);
        }
        schedule();
      }, msUntilHour(HOUR));
    };

    schedule();
    const onEnabled = () => schedule();
    window.addEventListener("notify-enabled", onEnabled);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("notify-enabled", onEnabled);
    };
  }, [ur]);

  return null;
}
