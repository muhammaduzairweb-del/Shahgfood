"use client";

// Vendor portal (magic link from the WhatsApp alert): the restaurant replies to
// the customer from here. Mobile-first — owners will open this on their phone.
// Opening this screen marks the customer's messages "read" (their blue ticks).

import { useEffect, useRef, useState } from "react";
import {
  addDoc, collection, doc, onSnapshot, orderBy, query, updateDoc,
} from "firebase/firestore";
import { FaCheck, FaCheckDouble, FaPaperPlane, FaPhoneAlt, FaStore, FaUser } from "react-icons/fa";
import { db } from "@/lib/firebase";

const GREEN = "#00A884";
const GREEN_DARK = "#008069";
const PANEL = "#F0F2F5";
const INK = "#111B21";
const MUTED = "#667781";
const WALL = "#EFEAE2";
const OUT = "#D9FDD3";

interface Meta {
  customerName: string;
  customerPhone: string;
  restaurantName: string;
  isCustomerTyping: boolean;
}
interface Msg {
  id: string;
  from: "customer" | "vendor";
  text: string;
  ts: number;
  status: string;
}

function fmtTime(ts: number) {
  return new Date(ts).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

export default function VendorChat({ sessionId }: { sessionId: string }) {
  const [meta, setMeta] = useState<Meta | null>(null);
  const [msgs, setMsgs] = useState<Msg[]>([]);
  const [draft, setDraft] = useState("");
  const [missing, setMissing] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);
  const typingTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // session meta (customer identity + typing flag)
  useEffect(
    () =>
      onSnapshot(doc(db, "chats", sessionId), (snap) => {
        const d = snap.data();
        if (!d) { setMissing(true); return; }
        setMeta({
          customerName: d.customerName || "Guest",
          customerPhone: d.customerPhone || "",
          restaurantName: d.restaurantName || "Shah G Foods",
          isCustomerTyping: !!d.isCustomerTyping,
        });
      }),
    [sessionId]
  );

  // live messages; seeing them = customer's messages become "read" (blue ticks)
  useEffect(
    () =>
      onSnapshot(query(collection(db, "chats", sessionId, "messages"), orderBy("ts", "asc")), (snap) => {
        const arr: Msg[] = snap.docs.map((dc) => ({ id: dc.id, ...(dc.data() as Omit<Msg, "id">) }));
        setMsgs(arr);
        arr
          .filter((m) => m.from === "customer" && m.status !== "read")
          .forEach((m) => updateDoc(doc(db, "chats", sessionId, "messages", m.id), { status: "read" }).catch(() => {}));
      }),
    [sessionId]
  );

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [msgs.length, meta?.isCustomerTyping]);

  const setTyping = () => {
    if (!typingTimer.current) updateDoc(doc(db, "chats", sessionId), { isVendorTyping: true }).catch(() => {});
    else clearTimeout(typingTimer.current);
    typingTimer.current = setTimeout(() => {
      typingTimer.current = null;
      updateDoc(doc(db, "chats", sessionId), { isVendorTyping: false }).catch(() => {});
    }, 2500);
  };

  const send = () => {
    const body = draft.trim();
    if (!body) return;
    setDraft("");
    addDoc(collection(db, "chats", sessionId, "messages"), { from: "vendor", text: body, ts: Date.now(), status: "sent" }).catch(() => {});
    updateDoc(doc(db, "chats", sessionId), { lastText: body, lastTs: Date.now(), isVendorTyping: false }).catch(() => {});
  };

  if (missing) {
    return (
      <div style={{ height: "100dvh", display: "flex", alignItems: "center", justifyContent: "center", background: PANEL, color: MUTED, fontSize: 15, padding: 20, textAlign: "center" }}>
        This chat link is invalid or the conversation was removed.
      </div>
    );
  }

  return (
    <div style={{ height: "100dvh", display: "flex", flexDirection: "column", background: WALL }}>
      {/* header — customer identity */}
      <div style={{ background: GREEN_DARK, color: "#fff", padding: "12px 16px", display: "flex", alignItems: "center", gap: 12, flex: "none" }}>
        <div style={{ width: 42, height: 42, borderRadius: "50%", background: "rgba(255,255,255,.18)", display: "flex", alignItems: "center", justifyContent: "center", flex: "none" }}>
          <FaUser size={17} />
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontWeight: 800, fontSize: 16, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{meta?.customerName || "…"}</div>
          <div className="num" style={{ fontSize: 12, opacity: 0.85 }}>
            {meta?.isCustomerTyping ? "typing…" : meta?.customerPhone || ""}
          </div>
        </div>
        {meta?.customerPhone && (
          <a href={`tel:${meta.customerPhone}`} aria-label="Call customer" style={{ color: "#fff", padding: 8, display: "flex" }}>
            <FaPhoneAlt size={16} />
          </a>
        )}
      </div>

      {/* vendor badge strip */}
      <div style={{ background: "#FFF6E5", color: "#8a6a2f", fontSize: 12, fontWeight: 700, padding: "7px 14px", display: "flex", alignItems: "center", gap: 7, flex: "none" }}>
        <FaStore size={11} /> Replying as {meta?.restaurantName || "your restaurant"} · via Shah G Online
      </div>

      {/* messages */}
      <div
        className="no-bar"
        style={{ flex: 1, overflowY: "auto", padding: "16px 12px 8px", backgroundImage: "radial-gradient(rgba(60,40,20,.05) 1.4px, transparent 1.4px)", backgroundSize: "24px 24px" }}
      >
        {msgs.map((m) => {
          const mine = m.from === "vendor";
          return (
            <div key={m.id} style={{ display: "flex", justifyContent: mine ? "flex-end" : "flex-start", margin: "3px 0" }}>
              <div style={{ maxWidth: "78%", background: mine ? OUT : "#fff", color: INK, borderRadius: 10, padding: "7px 10px 8px 12px", boxShadow: "0 1px .5px rgba(11,20,26,.13)", fontSize: 14.3, lineHeight: 1.45, whiteSpace: "pre-wrap", wordBreak: "break-word", direction: /[؀-ۿ]/.test(m.text) ? "rtl" : "ltr", textAlign: "start" }}>
                {m.text}
                <span className="num" style={{ display: "inline-flex", alignItems: "center", gap: 4, fontSize: 10.5, color: MUTED, marginInlineStart: 9, position: "relative", top: 4, float: "right" }}>
                  {fmtTime(m.ts)}
                  {mine && (m.status === "read" ? <FaCheckDouble size={11} color="#53BDEB" /> : m.status === "delivered" ? <FaCheckDouble size={11} color="#8696A0" /> : <FaCheck size={11} color="#8696A0" />)}
                </span>
              </div>
            </div>
          );
        })}
        {meta?.isCustomerTyping && (
          <div style={{ display: "flex", justifyContent: "flex-start", margin: "3px 0" }}>
            <div style={{ background: "#fff", borderRadius: 10, padding: "13px 16px", boxShadow: "0 1px .5px rgba(11,20,26,.13)", display: "flex", gap: 5 }}>
              {[0, 1, 2].map((i) => (
                <span key={i} style={{ width: 7, height: 7, borderRadius: "50%", background: "#8696A0", animation: `typingBlink 1.2s ease ${i * 0.18}s infinite` }} />
              ))}
            </div>
          </div>
        )}
        <div ref={endRef} />
      </div>

      {/* composer */}
      <div style={{ background: PANEL, padding: "9px 12px", display: "flex", alignItems: "flex-end", gap: 9, flex: "none" }}>
        <textarea
          value={draft}
          onChange={(e) => {
            setDraft(e.target.value);
            setTyping();
            e.target.style.height = "auto";
            e.target.style.height = Math.min(e.target.scrollHeight, 110) + "px";
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(); }
          }}
          rows={1}
          placeholder="Reply to customer"
          style={{ flex: 1, resize: "none", border: "none", outline: "none", borderRadius: 10, padding: "12px 14px", fontSize: 14.5, fontFamily: "inherit", background: "#fff", color: INK, lineHeight: 1.45, maxHeight: 110 }}
        />
        <button
          onClick={send}
          disabled={!draft.trim()}
          aria-label="Send"
          style={{ cursor: draft.trim() ? "pointer" : "default", border: "none", width: 45, height: 45, borderRadius: "50%", background: draft.trim() ? GREEN : "#B7C0C6", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", flex: "none" }}
        >
          <FaPaperPlane size={16} style={{ marginInlineStart: -2 }} />
        </button>
      </div>
    </div>
  );
}
