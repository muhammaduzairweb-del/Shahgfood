"use client";

import { useEffect } from "react";
import { SLOTS, messageFor } from "@/lib/push-messages";
import { ensurePushSubscription } from "@/lib/push-client";

function msUntilHour(hour: number) {
  const now = new Date();
  const target = new Date();
  target.setHours(hour, 0, 0, 0);
  if (target.getTime() <= now.getTime()) target.setDate(target.getDate() + 1);
  return target.getTime() - now.getTime();
}

export default function NotifyReminder() {
  useEffect(() => {
    if (typeof window === "undefined" || !("Notification" in window)) return;

    let timers: ReturnType<typeof setTimeout>[] = [];
    const clearAll = () => { timers.forEach(clearTimeout); timers = []; };

    const fire = async (hour: number) => {
      const { title, body } = messageFor(hour);
      const options: NotificationOptions = { body, icon: "/icon.svg", badge: "/icon.svg", tag: `shahg-${hour}` };
      try {
        if ("serviceWorker" in navigator) {
          const reg = await navigator.serviceWorker.getRegistration();
          if (reg) { reg.showNotification(title, options); return; }
        }
        new Notification(title, options);
      } catch { /* ignore */ }
    };

    const arm = (hour: number) => {
      const id = setTimeout(() => {
        const today = new Date().toDateString();
        if (localStorage.getItem(`notify-${hour}`) !== today) {
          fire(hour);
          localStorage.setItem(`notify-${hour}`, today);
        }
        arm(hour); // reschedule for the next day
      }, msUntilHour(hour));
      timers.push(id);
    };

    const start = () => {
      if (Notification.permission !== "granted") return;
      // real Web Push: register this browser so /api/push/send reaches it
      // even when the site is closed (local timers below cover open tabs)
      ensurePushSubscription();
      clearAll();
      const today = new Date().toDateString();
      const nowHour = new Date().getHours();
      // catch-up: if slots already passed today, fire only the most recent one (no spam)
      const missed = SLOTS.filter((h) => h <= nowHour && localStorage.getItem(`notify-${h}`) !== today);
      if (missed.length) {
        fire(Math.max(...missed));
        SLOTS.filter((h) => h <= nowHour).forEach((h) => localStorage.setItem(`notify-${h}`, today));
      }
      SLOTS.forEach(arm);
    };

    start();
    window.addEventListener("notify-enabled", start);
    return () => {
      clearAll();
      window.removeEventListener("notify-enabled", start);
    };
  }, []);

  return null;
}
