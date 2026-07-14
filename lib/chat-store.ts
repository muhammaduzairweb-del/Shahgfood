// ===== Chat store — REAL Firestore backend =====
// Data model:
//   /chats/{sessionId}            — session meta (restaurant, customer, typing flags)
//   /chats/{sessionId}/messages   — { from: "customer"|"vendor", text, ts, status }
//
// The customer UI (ChatApp/Navbar/ChatNotifier) consumes the same API the old
// simulated store exposed — components did not change. "me" = customer,
// "them" = vendor. Ticks: customer msgs are marked "read" by the vendor portal;
// vendor msgs are marked "read" here when the customer views them.

import { useSyncExternalStore } from "react";
import {
  addDoc, collection, doc, onSnapshot, orderBy, query, updateDoc,
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import { RESTAURANTS } from "@/lib/data";

export type MsgStatus = "sent" | "delivered" | "read";

export interface ChatMessage {
  id: string;
  sessionId: string;
  from: "me" | "them";
  text: string;
  ts: number;
  status: MsgStatus;
}

export interface ChatSession {
  id: string;
  restaurantSlug: string;
  name: string;
  nameUr: string;
  avatar: string;
  lastText: string;
  lastTs: number;
  unread: number;
  typing?: boolean;
}

export interface ChatState {
  sessions: ChatSession[];
  messages: Record<string, ChatMessage[]>;
}

export interface ChatProfile {
  name: string;
  phone: string;
}

const LS_PROFILE = "sg.chat.profile.v1";
const LS_SESSIONS = "sg.chat.sessions.v1"; // Record<restaurantSlug, sessionId>

const EMPTY: ChatState = { sessions: [], messages: {} };

let state: ChatState = EMPTY;
let profile: ChatProfile | null = null;
let sessionMap: Record<string, string> = {};
let started = false;

const metaById = new Map<string, ChatSession>();
const msgsById = new Map<string, ChatMessage[]>();
const attached = new Set<string>();

const listeners = new Set<() => void>();
const incomingListeners = new Set<(s: ChatSession, m: ChatMessage) => void>();
let activeId: string | null = null;

// ---------- bootstrap ----------

function start() {
  if (started || typeof window === "undefined") return;
  started = true;
  try {
    profile = JSON.parse(localStorage.getItem(LS_PROFILE) || "null");
  } catch { profile = null; }
  try {
    sessionMap = JSON.parse(localStorage.getItem(LS_SESSIONS) || "{}");
  } catch { sessionMap = {}; }
  Object.values(sessionMap).forEach(attach);
}

function emit() {
  state = {
    sessions: Array.from(metaById.values()),
    messages: Object.fromEntries(msgsById),
  };
  listeners.forEach((l) => l());
}

function unreadOf(id: string, msgs: ChatMessage[]): number {
  const viewing = activeId === id && typeof document !== "undefined" && !document.hidden;
  return viewing ? 0 : msgs.filter((m) => m.from === "them" && m.status !== "read").length;
}

/** Live listeners on the session doc + its messages sub-collection. */
function attach(id: string) {
  if (attached.has(id)) return;
  attached.add(id);

  onSnapshot(doc(db, "chats", id), (snap) => {
    const d = snap.data();
    if (!d) return;
    metaById.set(id, {
      id,
      restaurantSlug: d.restaurantSlug || "shah-g-foods",
      name: d.restaurantName || "Shah G Foods",
      nameUr: d.restaurantNameUr || "شاہ جی فوڈز",
      avatar: d.avatar || "/Shahgfoods__Feature.jpg",
      lastText: d.lastText || "",
      lastTs: d.lastTs || d.createdAt || Date.now(),
      unread: unreadOf(id, msgsById.get(id) || []),
      typing: !!d.isVendorTyping,
    });
    emit();
  });

  onSnapshot(query(collection(db, "chats", id, "messages"), orderBy("ts", "asc")), (snap) => {
    const arr: ChatMessage[] = snap.docs.map((dc) => {
      const m = dc.data();
      return {
        id: dc.id,
        sessionId: id,
        from: m.from === "vendor" ? "them" : "me",
        text: m.text || "",
        ts: m.ts || Date.now(),
        status: (m.status as MsgStatus) || "sent",
      };
    });
    const prev = msgsById.get(id);
    msgsById.set(id, arr);

    const meta = metaById.get(id);
    if (meta) metaById.set(id, { ...meta, unread: unreadOf(id, arr) });

    // new vendor message → notifications (skip the very first snapshot)
    if (prev) {
      const before = prev.filter((m) => m.from === "them").length;
      const now = arr.filter((m) => m.from === "them").length;
      if (now > before) {
        const last = [...arr].reverse().find((m) => m.from === "them");
        const s = metaById.get(id);
        if (last && s) incomingListeners.forEach((cb) => cb(s, last));
        if (activeId === id && typeof document !== "undefined" && !document.hidden) markChatRead(id);
      }
    }
    emit();
  });
}

// ---------- public API (same shape the UI already uses) ----------

export function subscribeChat(cb: () => void): () => void {
  start();
  listeners.add(cb);
  return () => listeners.delete(cb);
}

export function onIncomingMessage(cb: (s: ChatSession, m: ChatMessage) => void): () => void {
  start();
  incomingListeners.add(cb);
  return () => incomingListeners.delete(cb);
}

export function setActiveSession(id: string | null) {
  activeId = id;
  if (id) markChatRead(id);
}
export function activeSession(): string | null {
  return activeId;
}

/** Customer identity (welcome form). null until the user has introduced themselves. */
export function getChatProfile(): ChatProfile | null {
  start();
  return profile;
}
export function saveChatProfile(p: ChatProfile) {
  profile = { name: p.name.trim(), phone: p.phone.trim() };
  try { localStorage.setItem(LS_PROFILE, JSON.stringify(profile)); } catch { /* ignore */ }
  listeners.forEach((l) => l());
}
export function useChatProfile(): ChatProfile | null {
  return useSyncExternalStore(subscribeChat, getChatProfile, () => null);
}

/** Open (or create) the session with a restaurant. Creates /chats/{id} in Firestore. */
export async function openSession(restaurantSlug: string): Promise<string> {
  start();
  const existing = sessionMap[restaurantSlug];
  if (existing) {
    attach(existing);
    return existing;
  }
  const r = RESTAURANTS.find((x) => x.slug === restaurantSlug) ?? RESTAURANTS[0];
  const ref = await addDoc(collection(db, "chats"), {
    restaurantSlug: r.slug,
    restaurantName: r.name,
    restaurantNameUr: r.nameUr,
    avatar: r.image,
    customerName: profile?.name || "Guest",
    customerPhone: profile?.phone || "",
    createdAt: Date.now(),
    lastText: "",
    lastTs: Date.now(),
    isVendorTyping: false,
    isCustomerTyping: false,
    notified: false,
  });
  sessionMap = { ...sessionMap, [restaurantSlug]: ref.id };
  try { localStorage.setItem(LS_SESSIONS, JSON.stringify(sessionMap)); } catch { /* ignore */ }
  attach(ref.id);
  return ref.id;
}

/** Mark all vendor messages in this session as read (drives the vendor's blue ticks). */
export function markChatRead(sessionId: string) {
  const msgs = msgsById.get(sessionId) || [];
  const unreadMsgs = msgs.filter((m) => m.from === "them" && m.status !== "read");
  const meta = metaById.get(sessionId);
  if (meta && meta.unread !== 0) {
    metaById.set(sessionId, { ...meta, unread: 0 });
    emit();
  }
  unreadMsgs.forEach((m) => {
    updateDoc(doc(db, "chats", sessionId, "messages", m.id), { status: "read" }).catch(() => {});
  });
}

/** Send a customer message; first message also pings the vendor on WhatsApp. */
export function sendChat(sessionId: string, text: string) {
  const body = text.trim();
  if (!body) return;
  const isFirst = (msgsById.get(sessionId) || []).filter((m) => m.from === "me").length === 0;

  addDoc(collection(db, "chats", sessionId, "messages"), {
    from: "customer",
    text: body,
    ts: Date.now(),
    status: "sent",
  }).catch(() => {});
  updateDoc(doc(db, "chats", sessionId), {
    lastText: body,
    lastTs: Date.now(),
    isCustomerTyping: false,
  }).catch(() => {});

  if (isFirst) {
    // magic-link WhatsApp alert to the restaurant owner (server route)
    fetch("/api/chat/notify-vendor", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ sessionId, customerName: profile?.name || "Guest", text: body }),
    }).catch(() => {});
    updateDoc(doc(db, "chats", sessionId), { notified: true }).catch(() => {});
  }
}

/** Debounced "customer is typing" flag for the vendor portal. */
const typingTimers = new Map<string, ReturnType<typeof setTimeout>>();
export function signalCustomerTyping(sessionId: string) {
  if (!typingTimers.has(sessionId)) {
    updateDoc(doc(db, "chats", sessionId), { isCustomerTyping: true }).catch(() => {});
  } else {
    clearTimeout(typingTimers.get(sessionId)!);
  }
  typingTimers.set(
    sessionId,
    setTimeout(() => {
      typingTimers.delete(sessionId);
      updateDoc(doc(db, "chats", sessionId), { isCustomerTyping: false }).catch(() => {});
    }, 2500)
  );
}

// ---------- hooks ----------

export function useChatState(): ChatState {
  return useSyncExternalStore(subscribeChat, () => state, () => EMPTY);
}

export function useChatUnread(): number {
  return useSyncExternalStore(
    subscribeChat,
    () => state.sessions.reduce((a, s) => a + s.unread, 0),
    () => 0
  );
}
