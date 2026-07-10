"use client";

import { useEffect } from "react";
import { useApp } from "@/components/AppProvider";

// three gentle "we're going digital soon" nudges through the day
const SLOTS = [10, 15, 20]; // 10 AM · 3 PM · 8 PM

function messageFor(hour: number, ur: boolean): { title: string; body: string } {
  if (hour === 10)
    return ur
      ? { title: "ناشتے کا وقت؟ 🍳", body: "دیسی ناشتے کی طلب ہو رہی ہے؟ ہم بہت جلد ڈیجیٹل ہو رہے ہیں — بس تیار رہیں! :)" }
      : { title: "Nashta time? 🍳", body: "Craving a proper desi breakfast? We're going digital very soon — stay tuned! :)" };
  if (hour === 15)
    return ur
      ? { title: "چٹ پٹی طلب؟ 🌶️", body: "چاٹ اور چائے کا دل کر رہا ہے؟ تھوڑا صبر — ہم جلد آن لائن آ رہے ہیں، پھر سب ایک کلک پر۔ تیار رہیں! :)" }
      : { title: "Chatpata craving? 🌶️", body: "Feeling like some chaat & chai? Hang tight — we're coming online soon, then it's all one click away. Stay tuned! :)" };
  return ur
    ? { title: "کھانے کا وقت 🍛", body: "آج رات کچھ مزیدار کھانے کو دل چاہ رہا ہے؟ ہم جلد لائیو ہوں گے — پھر نوٹیفیکیشن کی برسات! تیار رہیں :)" }
    : { title: "Dinner o'clock 🍛", body: "Hungry for something hearty tonight? We'll be live very soon — get ready for a notification barsaat. Stay tuned! :)" };
}

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

    let timers: ReturnType<typeof setTimeout>[] = [];
    const clearAll = () => { timers.forEach(clearTimeout); timers = []; };

    const fire = async (hour: number) => {
      const { title, body } = messageFor(hour, ur);
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
  }, [ur]);

  return null;
}
