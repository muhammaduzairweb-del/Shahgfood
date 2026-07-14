"use client";

// WhatsApp-style masked chat: customers talk to listed restaurants without ever
// seeing their number. Desktop = two-pane (WhatsApp Web), mobile = full screen.

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import {
  FaArrowLeft, FaCheck, FaCheckDouble, FaCommentDots, FaLock, FaPaperPlane, FaPhoneAlt, FaSearch, FaStore,
} from "react-icons/fa";
import { useApp } from "@/components/AppProvider";
import { useWidth } from "@/components/hooks";
import { ORDER_TEL } from "@/lib/data";
import {
  markChatRead, openSession, sendChat, setActiveSession, signalCustomerTyping, useChatProfile, useChatState,
  type ChatMessage, type ChatSession, type MsgStatus,
} from "@/lib/chat-store";
import WelcomeForm from "@/components/chat/WelcomeForm";

// WhatsApp Web palette
const GREEN = "#00A884";
const GREEN_DARK = "#008069";
const PANEL = "#F0F2F5";
const BORDER = "#E9EDEF";
const INK = "#111B21";
const MUTED = "#667781";
const WALL = "#EFEAE2";
const OUT = "#D9FDD3";
const TICK_BLUE = "#53BDEB";

function fmtTime(ts: number) {
  return new Date(ts).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}
function dayKey(ts: number) {
  return new Date(ts).toDateString();
}
function fmtDay(ts: number, ur: boolean) {
  const d = new Date(ts);
  const today = new Date();
  const yest = new Date(Date.now() - 864e5);
  if (d.toDateString() === today.toDateString()) return ur ? "آج" : "Today";
  if (d.toDateString() === yest.toDateString()) return ur ? "کل" : "Yesterday";
  return d.toLocaleDateString([], { day: "numeric", month: "short", year: "numeric" });
}
function fmtListTime(ts: number, ur: boolean) {
  const d = new Date(ts);
  if (d.toDateString() === new Date().toDateString()) return fmtTime(ts);
  if (d.toDateString() === new Date(Date.now() - 864e5).toDateString()) return ur ? "کل" : "Yesterday";
  return d.toLocaleDateString([], { day: "2-digit", month: "2-digit", year: "2-digit" });
}

function Ticks({ st }: { st: MsgStatus }) {
  if (st === "sent") return <FaCheck size={11} color="#8696A0" />;
  return <FaCheckDouble size={11} color={st === "read" ? TICK_BLUE : "#8696A0"} />;
}

function Avatar({ src, name, size = 49 }: { src: string; name: string; size?: number }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={src} alt={name} style={{ width: size, height: size, borderRadius: "50%", objectFit: "cover", flex: "none", background: "#DFE5E7" }} />
  );
}

export default function ChatApp() {
  const { lang } = useApp();
  const ur = lang === "ur";
  const st = useChatState();
  const profile = useChatProfile();
  const isMobile = useWidth() < 900;

  const [active, setActive] = useState<string | null>(null);
  const [draft, setDraft] = useState("");
  const [q, setQ] = useState("");
  const endRef = useRef<HTMLDivElement>(null);
  const taRef = useRef<HTMLTextAreaElement>(null);

  // deep link: /chat?to=<restaurant-slug>&text=<prefill> — waits for the
  // welcome form so the Firestore session carries the customer's identity
  useEffect(() => {
    if (!profile) return;
    const sp = new URLSearchParams(window.location.search);
    const to = sp.get("to");
    if (to) {
      openSession(to).then((id) => setActive(id));
      const text = sp.get("text");
      if (text) setDraft(text);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [profile]);

  // desktop: preselect the most recent chat, WhatsApp Web style
  useEffect(() => {
    if (!isMobile && !active && st.sessions.length > 0 && !new URLSearchParams(window.location.search).get("to")) {
      setActive([...st.sessions].sort((a, b) => b.lastTs - a.lastTs)[0].id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [st.sessions.length, isMobile]);

  // the open thread never counts as unread
  useEffect(() => {
    setActiveSession(active);
    if (active) markChatRead(active);
    return () => setActiveSession(null);
  }, [active, st]);

  const sessions = useMemo(() => {
    const list = [...st.sessions].sort((a, b) => b.lastTs - a.lastTs);
    const needle = q.trim().toLowerCase();
    return needle ? list.filter((s) => `${s.name} ${s.nameUr}`.toLowerCase().includes(needle)) : list;
  }, [st.sessions, q]);

  const session = st.sessions.find((s) => s.id === active) || null;
  const msgs = (active && st.messages[active]) || [];

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [msgs.length, session?.typing, active]);

  const send = () => {
    if (!active || !draft.trim()) return;
    sendChat(active, draft);
    setDraft("");
    if (taRef.current) taRef.current.style.height = "auto";
  };

  const startNewChat = () => { openSession("shah-g-foods").then((id) => setActive(id)); };

  const showList = !isMobile || !active;
  const showThread = !isMobile || !!active;

  // first visit: introduce yourself before any Firestore session is created
  if (!profile) return <WelcomeForm ur={ur} />;

  return (
    <div dir={ur ? "rtl" : "ltr"} style={{ height: "100dvh", display: "flex", background: PANEL, overflow: "hidden" }}>
      {/* ===== SIDEBAR: chat list ===== */}
      {showList && (
        <aside style={{ width: isMobile ? "100%" : "clamp(320px,32%,420px)", display: "flex", flexDirection: "column", background: "#fff", borderInlineEnd: isMobile ? "none" : `1px solid ${BORDER}`, flex: "none" }}>
          {/* header */}
          <div style={{ background: GREEN_DARK, color: "#fff", padding: "14px 16px", display: "flex", alignItems: "center", gap: 13 }}>
            <Link href="/" aria-label="Back to Shah G Online" style={{ color: "#fff", display: "flex" }}>
              <FaArrowLeft size={17} style={{ transform: ur ? "scaleX(-1)" : "none" }} />
            </Link>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 800, fontSize: 17 }}>{ur ? "چیٹس" : "Chats"}</div>
              <div style={{ fontSize: 11.5, opacity: 0.85, display: "flex", alignItems: "center", gap: 5 }}>
                <FaLock size={9} /> {ur ? "شاہ جی آن لائن کے ذریعے محفوظ رابطہ" : "Relayed privately by Shah G Online"}
              </div>
            </div>
            <button onClick={startNewChat} aria-label="New chat" style={{ cursor: "pointer", border: "none", background: "rgba(255,255,255,.14)", color: "#fff", width: 36, height: 36, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <FaCommentDots size={16} />
            </button>
          </div>

          {/* search */}
          <div style={{ padding: "8px 12px", background: "#fff", borderBottom: `1px solid ${BORDER}` }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, background: PANEL, borderRadius: 9, padding: "8px 13px" }}>
              <FaSearch size={13} color="#8696A0" />
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder={ur ? "چیٹ تلاش کریں" : "Search or start a new chat"}
                style={{ border: "none", outline: "none", background: "transparent", fontSize: 14, fontFamily: "inherit", flex: 1, color: INK }}
              />
            </div>
          </div>

          {/* sessions */}
          <div className="no-bar" style={{ flex: 1, overflowY: "auto" }}>
            {sessions.length === 0 && (
              <div style={{ padding: "44px 26px", textAlign: "center", color: MUTED, fontSize: 13.5, lineHeight: 1.7 }}>
                {ur ? "ابھی کوئی چیٹ نہیں۔ کسی ریستوران سے بات شروع کریں!" : "No chats yet. Start a conversation with a restaurant!"}
                <button onClick={startNewChat} style={{ display: "block", margin: "16px auto 0", cursor: "pointer", border: "none", background: GREEN, color: "#fff", fontWeight: 800, fontSize: 13.5, fontFamily: "inherit", padding: "11px 20px", borderRadius: 22 }}>
                  {ur ? "شاہ جی فوڈز سے چیٹ کریں" : "Chat with Shah G Foods"}
                </button>
              </div>
            )}
            {sessions.map((s) => (
              <SessionRow key={s.id} s={s} ur={ur} active={s.id === active} onClick={() => setActive(s.id)} />
            ))}
          </div>
        </aside>
      )}

      {/* ===== THREAD ===== */}
      {showThread && (
        <main style={{ flex: 1, display: "flex", flexDirection: "column", minWidth: 0 }}>
          {!session ? (
            /* desktop empty pane */
            <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 14, background: PANEL, borderBottom: `6px solid ${GREEN}` }}>
              <div style={{ width: 110, height: 110, borderRadius: "50%", background: "#fff", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 10px 30px -18px rgba(0,0,0,.35)" }}>
                <FaCommentDots size={44} color={GREEN} />
              </div>
              <div style={{ fontSize: 26, color: "#41525D", fontWeight: 300 }}>{ur ? "شاہ جی چیٹ" : "Shah G Chat"}</div>
              <div style={{ fontSize: 13.5, color: MUTED, maxWidth: 400, textAlign: "center", lineHeight: 1.7 }}>
                {ur ? "ریستوران سے براہِ راست بات کریں، نمبر شیئر کیے بغیر۔ بائیں طرف سے چیٹ منتخب کریں۔" : "Talk to restaurants directly, without sharing your number. Select a chat to start messaging."}
              </div>
              <div style={{ fontSize: 12, color: "#8696A0", display: "flex", alignItems: "center", gap: 6 }}>
                <FaLock size={10} /> {ur ? "شاہ جی آن لائن کے ذریعے محفوظ رابطہ" : "Relayed privately by Shah G Online"}
              </div>
            </div>
          ) : (
            <>
              {/* thread header */}
              <div style={{ background: PANEL, borderBottom: `1px solid ${BORDER}`, padding: "9px 16px", display: "flex", alignItems: "center", gap: 12, flex: "none" }}>
                {isMobile && (
                  <button onClick={() => setActive(null)} aria-label="Back" style={{ cursor: "pointer", border: "none", background: "transparent", color: "#54656F", display: "flex", padding: 4 }}>
                    <FaArrowLeft size={17} style={{ transform: ur ? "scaleX(-1)" : "none" }} />
                  </button>
                )}
                <Avatar src={session.avatar} name={session.name} size={40} />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontWeight: 700, fontSize: 15.5, color: INK, display: "flex", alignItems: "center", gap: 7 }}>
                    {ur ? session.nameUr : session.name}
                    <FaStore size={11} color={MUTED} />
                  </div>
                  <div style={{ fontSize: 12.5, color: session.typing ? GREEN_DARK : MUTED, fontWeight: session.typing ? 700 : 400 }}>
                    {session.typing ? (ur ? "لکھ رہے ہیں…" : "typing…") : ur ? "آن لائن" : "online"}
                  </div>
                </div>
                <a href={`tel:${ORDER_TEL}`} aria-label="Call restaurant" style={{ color: "#54656F", display: "flex", padding: 8 }}>
                  <FaPhoneAlt size={16} />
                </a>
              </div>

              {/* messages — WhatsApp wallpaper */}
              <div
                className="no-bar"
                style={{
                  flex: 1, overflowY: "auto", padding: "18px 7% 10px",
                  background: WALL,
                  backgroundImage: "radial-gradient(rgba(60,40,20,.05) 1.4px, transparent 1.4px)",
                  backgroundSize: "24px 24px",
                }}
              >
                {/* privacy chip */}
                <div style={{ textAlign: "center", marginBottom: 14 }}>
                  <span style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "#FFEECD", color: "#54656F", fontSize: 12, padding: "6px 13px", borderRadius: 8, boxShadow: "0 1px .5px rgba(11,20,26,.13)" }}>
                    <FaLock size={9} /> {ur ? "یہ چیٹ شاہ جی آن لائن کے ذریعے ریلے ہوتی ہے، آپ کا نمبر ریستوران کو نظر نہیں آتا۔" : "This chat is relayed by Shah G Online. Your number is never shown to the restaurant."}
                  </span>
                </div>

                {msgs.map((m, i) => {
                  const prev = msgs[i - 1];
                  const newDay = !prev || dayKey(prev.ts) !== dayKey(m.ts);
                  const firstOfGroup = !prev || prev.from !== m.from || newDay;
                  return (
                    <div key={m.id}>
                      {newDay && (
                        <div style={{ textAlign: "center", margin: "14px 0 10px" }}>
                          <span className="num" style={{ background: "#fff", color: "#54656F", fontSize: 12, fontWeight: 600, padding: "5px 13px", borderRadius: 8, boxShadow: "0 1px .5px rgba(11,20,26,.13)" }}>{fmtDay(m.ts, ur)}</span>
                        </div>
                      )}
                      <Bubble m={m} firstOfGroup={firstOfGroup} ur={ur} />
                    </div>
                  );
                })}

                {session.typing && (
                  <div style={{ display: "flex", justifyContent: "flex-start", margin: "2px 0" }}>
                    <div style={{ background: "#fff", borderRadius: 10, borderTopLeftRadius: 2, padding: "13px 16px", boxShadow: "0 1px .5px rgba(11,20,26,.13)", display: "flex", gap: 5 }}>
                      {[0, 1, 2].map((i) => (
                        <span key={i} style={{ width: 7, height: 7, borderRadius: "50%", background: "#8696A0", animation: `typingBlink 1.2s ease ${i * 0.18}s infinite` }} />
                      ))}
                    </div>
                  </div>
                )}
                <div ref={endRef} />
              </div>

              {/* composer */}
              <div style={{ background: PANEL, padding: "9px 14px", display: "flex", alignItems: "flex-end", gap: 10, flex: "none" }}>
                <textarea
                  ref={taRef}
                  value={draft}
                  onChange={(e) => {
                    setDraft(e.target.value);
                    if (active) signalCustomerTyping(active);
                    e.target.style.height = "auto";
                    e.target.style.height = Math.min(e.target.scrollHeight, 120) + "px";
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(); }
                  }}
                  rows={1}
                  placeholder={ur ? "پیغام لکھیں" : "Type a message"}
                  style={{ flex: 1, resize: "none", border: "none", outline: "none", borderRadius: 10, padding: "12px 15px", fontSize: 14.5, fontFamily: "inherit", background: "#fff", color: INK, lineHeight: 1.45, maxHeight: 120 }}
                />
                <button
                  onClick={send}
                  disabled={!draft.trim()}
                  aria-label="Send"
                  style={{ cursor: draft.trim() ? "pointer" : "default", border: "none", width: 46, height: 46, borderRadius: "50%", background: draft.trim() ? GREEN : "#B7C0C6", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", flex: "none", transition: "background .15s" }}
                >
                  <FaPaperPlane size={17} style={{ marginInlineStart: -2, transform: ur ? "scaleX(-1)" : "none" }} />
                </button>
              </div>
            </>
          )}
        </main>
      )}
    </div>
  );
}

function SessionRow({ s, ur, active, onClick }: { s: ChatSession; ur: boolean; active: boolean; onClick: () => void }) {
  return (
    <div onClick={onClick} style={{ cursor: "pointer", display: "flex", alignItems: "center", gap: 13, padding: "10px 14px", background: active ? PANEL : "transparent", borderBottom: `1px solid ${BORDER}` }}>
      <Avatar src={s.avatar} name={s.name} />
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: 8 }}>
          <span style={{ fontWeight: 700, fontSize: 15.5, color: INK, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{ur ? s.nameUr : s.name}</span>
          <span className="num" style={{ fontSize: 11.5, color: s.unread ? GREEN : MUTED, fontWeight: s.unread ? 800 : 400, flex: "none" }}>{fmtListTime(s.lastTs, ur)}</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8, marginTop: 2 }}>
          <span style={{ fontSize: 13.5, color: s.typing ? GREEN_DARK : MUTED, fontWeight: s.typing ? 700 : 400, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
            {s.typing ? (ur ? "لکھ رہے ہیں…" : "typing…") : s.lastText}
          </span>
          {s.unread > 0 && (
            <span className="num" style={{ flex: "none", minWidth: 20, height: 20, borderRadius: 10, background: GREEN, color: "#fff", fontSize: 11.5, fontWeight: 800, display: "flex", alignItems: "center", justifyContent: "center", padding: "0 6px" }}>{s.unread}</span>
          )}
        </div>
      </div>
    </div>
  );
}

function Bubble({ m, firstOfGroup, ur }: { m: ChatMessage; firstOfGroup: boolean; ur: boolean }) {
  const mine = m.from === "me";
  return (
    <div style={{ display: "flex", justifyContent: mine ? "flex-end" : "flex-start", margin: firstOfGroup ? "8px 0 2px" : "2px 0" }}>
      <div
        style={{
          maxWidth: "68%", background: mine ? OUT : "#fff", color: INK,
          borderRadius: 10,
          ...(firstOfGroup ? (mine ? { borderTopRightRadius: 2 } : { borderTopLeftRadius: 2 }) : {}),
          padding: "7px 10px 8px 12px", boxShadow: "0 1px .5px rgba(11,20,26,.13)",
          fontSize: 14.3, lineHeight: 1.45, whiteSpace: "pre-wrap", wordBreak: "break-word",
          direction: /[؀-ۿ]/.test(m.text) ? "rtl" : "ltr", textAlign: "start",
        }}
      >
        {m.text}
        <span className="num" style={{ display: "inline-flex", alignItems: "center", gap: 4, fontSize: 10.5, color: "#667781", marginInlineStart: 9, verticalAlign: "bottom", position: "relative", top: 4, float: ur ? "left" : "right" }}>
          {fmtTime(m.ts)}
          {mine && <Ticks st={m.status} />}
        </span>
      </div>
    </div>
  );
}
