"use client";

// Global chat notification layer (mounted site-wide via Overlays):
//  - in-app toast (slide-in, avatar + name + preview, click → open chat)
//  - message ping sound (WebAudio, no asset file)
//  - browser Notification when the tab is hidden (permission handled by the
//    existing NotifyPrompt — never re-prompts here)
//  - "(n)" unread counter in the browser tab title

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { FaCommentDots } from "react-icons/fa";
import { activeSession, onIncomingMessage, useChatUnread } from "@/lib/chat-store";

interface Toast {
  id: string;
  name: string;
  text: string;
  avatar: string;
  slug: string;
}

let audioCtx: AudioContext | null = null;
function playPing() {
  try {
    audioCtx = audioCtx || new AudioContext();
    if (audioCtx.state === "suspended") audioCtx.resume();
    const t = audioCtx.currentTime;
    [880, 1318].forEach((f, i) => {
      const o = audioCtx!.createOscillator();
      const g = audioCtx!.createGain();
      o.type = "sine";
      o.frequency.value = f;
      g.gain.setValueAtTime(0.0001, t + i * 0.09);
      g.gain.exponentialRampToValueAtTime(0.05, t + i * 0.09 + 0.02);
      g.gain.exponentialRampToValueAtTime(0.0001, t + i * 0.09 + 0.24);
      o.connect(g).connect(audioCtx!.destination);
      o.start(t + i * 0.09);
      o.stop(t + i * 0.09 + 0.26);
    });
  } catch { /* audio blocked until first user gesture — fine */ }
}

export default function ChatNotifier() {
  const [toasts, setToasts] = useState<Toast[]>([]);
  const unread = useChatUnread();
  const router = useRouter();

  // browser-tab unread counter: "(2) Shah G Online…"
  useEffect(() => {
    const base = document.title.replace(/^\(\d+\)\s*/, "");
    document.title = unread > 0 ? `(${unread}) ${base}` : base;
  }, [unread]);

  useEffect(
    () =>
      onIncomingMessage((s, m) => {
        playPing();

        // OS-level notification when the tab is in the background
        if (document.hidden && typeof Notification !== "undefined" && Notification.permission === "granted") {
          try {
            const n = new Notification(s.name, { body: m.text, icon: s.avatar, tag: s.id });
            n.onclick = () => {
              window.focus();
              window.location.href = `/chat?to=${s.restaurantSlug}`;
            };
            return; // OS notification shown — skip the in-app toast
          } catch { /* fall through to toast */ }
        }

        // in-app toast — but not for the thread the user is looking at
        if (activeSession() === s.id && !document.hidden) return;
        const t: Toast = { id: m.id, name: s.name, text: m.text, avatar: s.avatar, slug: s.restaurantSlug };
        setToasts((p) => [...p.slice(-2), t]);
        setTimeout(() => setToasts((p) => p.filter((x) => x.id !== t.id)), 5200);
      }),
    []
  );

  if (toasts.length === 0) return null;

  return (
    <div style={{ position: "fixed", top: 16, insetInlineEnd: 16, zIndex: 120, display: "flex", flexDirection: "column", gap: 10, width: "min(340px, calc(100vw - 32px))" }}>
      {toasts.map((t) => (
        <div
          key={t.id}
          onClick={() => {
            setToasts((p) => p.filter((x) => x.id !== t.id));
            router.push(`/chat?to=${t.slug}`);
          }}
          style={{
            cursor: "pointer", display: "flex", alignItems: "center", gap: 12,
            background: "#fff", borderRadius: 16, padding: "12px 14px",
            borderInlineStart: "4px solid #00A884",
            boxShadow: "0 18px 40px -16px rgba(0,0,0,.4)", animation: "rise .3s ease",
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={t.avatar} alt={t.name} style={{ width: 42, height: 42, borderRadius: "50%", objectFit: "cover", flex: "none" }} />
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 6, fontWeight: 800, fontSize: 13.5, color: "#111B21" }}>
              <FaCommentDots size={12} color="#00A884" /> {t.name}
            </div>
            <div style={{ fontSize: 12.5, color: "#667781", marginTop: 2, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{t.text}</div>
          </div>
        </div>
      ))}
    </div>
  );
}
