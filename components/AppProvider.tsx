"use client";

import { createContext, useCallback, useContext, useEffect, useState } from "react";
import type { Lang } from "@/lib/i18n";
import { cityFromCoords, type City } from "@/lib/data";

export type LocStatus = "idle" | "locating" | "ready" | "denied" | "unavailable" | "outside";

export interface AppUser {
  name: string;
  contact: string;
}

export type Cart = Record<number, number>;

interface AppState {
  lang: Lang;
  setLang: (l: Lang) =>  void;
  toggleLang: () => void;
  branch: string;
  
  setBranch: (b: string) => void;
  area: string;
  setArea: (a: string) => void;
  located: boolean;
  setLocated: (v: boolean) => void;
  city: City | "";
  setCity: (c: City | "") => void;
  locStatus: LocStatus;
  detectLocation: () => void;
  user: AppUser | null;
  login: (u: AppUser) => void;
  logout: () => void;
  // cart
  cart: Cart;
  addItem: (id: number) => void;
  decItem: (id: number) => void;
  clearCart: () => void;
  cartCount: number;
  cartOpen: boolean;
  setCartOpen: (v: boolean) => void;
  hydrated: boolean;
}

const Ctx = createContext<AppState | null>(null);

const LS = "sjf.v1";

interface Persisted {
  lang: Lang;
  branch: string;
  area: string;
  located: boolean;
  city: City | "";
  user: AppUser | null;
  cart: Cart;
}

const DEFAULTS: Persisted = {
  lang: "en",
  branch: "F-10 Markaz",
  area: "",
  located: false,
  city: "",
  user: null,
  cart: {},
};

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<Persisted>(DEFAULTS);
  const [cartOpen, setCartOpen] = useState(false);
  const [hydrated, setHydrated] = useState(false);
  const [locStatus, setLocStatus] = useState<LocStatus>("idle");

  useEffect(() => {
    try {
      const raw = localStorage.getItem(LS);
      if (raw) setState({ ...DEFAULTS, ...JSON.parse(raw) });
    } catch {
      /* ignore */
    }
    setHydrated(true);
  }, []);

  const persist = useCallback((next: Partial<Persisted> | ((prev: Persisted) => Partial<Persisted>)) => {
    setState((prev) => {
      const patch = typeof next === "function" ? next(prev) : next;
      const merged = { ...prev, ...patch };
      try {
        localStorage.setItem(LS, JSON.stringify(merged));
      } catch {
        /* ignore */
      }
      return merged;
    });
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    document.documentElement.lang = state.lang === "ur" ? "ur" : "en";
    document.documentElement.dir = state.lang === "ur" ? "rtl" : "ltr";
  }, [state.lang, hydrated]);

  const addItem = useCallback((id: number) => persist((p) => ({ cart: { ...p.cart, [id]: (p.cart[id] || 0) + 1 } })), [persist]);
  const decItem = useCallback(
    (id: number) =>
      persist((p) => {
        const cart = { ...p.cart };
        const q = (cart[id] || 0) - 1;
        if (q <= 0) delete cart[id];
        else cart[id] = q;
        return { cart };
      }),
    [persist]
  );
  const clearCart = useCallback(() => persist({ cart: {} }), [persist]);

  const detectLocation = useCallback(() => {
    if (typeof navigator === "undefined" || !navigator.geolocation) {
      setLocStatus("unavailable");
      return;
    }
    setLocStatus("locating");
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const c = cityFromCoords(pos.coords.latitude, pos.coords.longitude);
        if (c) {
          persist({ city: c, located: true });
          setLocStatus("ready");
        } else {
          // Outside our current service region — keep whatever city was set.
          setLocStatus("outside");
        }
      },
      (err) => setLocStatus(err.code === err.PERMISSION_DENIED ? "denied" : "unavailable"),
      { enableHighAccuracy: false, timeout: 8000, maximumAge: 10 * 60 * 1000 }
    );
  }, [persist]);

  const cartCount = Object.values(state.cart).reduce((a, b) => a + b, 0);

  const value: AppState = {
    lang: state.lang,
    setLang: (l) => persist({ lang: l }),
    toggleLang: () => persist({ lang: state.lang === "ur" ? "en" : "ur" }),
    branch: state.branch,
    setBranch: (b) => persist({ branch: b }),
    area: state.area,
    setArea: (a) => persist({ area: a }),
    located: state.located,
    setLocated: (v) => persist({ located: v }),
    city: state.city,
    setCity: (c) => { persist({ city: c, located: !!c }); setLocStatus(c ? "ready" : "idle"); },
    locStatus,
    detectLocation,
    user: state.user,
    login: (u) => persist({ user: u }),
    logout: () => persist({ user: null }),
    cart: state.cart,
    addItem,
    decItem,
    clearCart,
    cartCount,
    cartOpen,
    setCartOpen,
    hydrated,
  };

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useApp(): AppState {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useApp must be used within <AppProvider>");
  return ctx;
}
