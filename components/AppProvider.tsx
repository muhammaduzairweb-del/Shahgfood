"use client";

import { createContext, useCallback, useContext, useEffect, useState } from "react";
import type { Lang } from "@/lib/i18n";
import { cityFromCoords, matchCoverage, type CityChoice } from "@/lib/data";
import { getPrecisePosition, reverseGeocode } from "@/lib/geo";

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
  city: CityChoice;
  setCity: (c: CityChoice) => void;
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
  city: CityChoice;
  user: AppUser | null;
  cart: Cart;
}

const DEFAULTS: Persisted = {
  lang: "ur",
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
    (async () => {
      let pos: GeolocationPosition;
      try {
        // live watch: waits for the GPS to warm up instead of taking the
        // browser's first coarse Wi-Fi/IP guess
        pos = await getPrecisePosition(50, 15000);
      } catch (e) {
        const err = e as GeolocationPositionError;
        setLocStatus(err && err.code === 1 ? "denied" : "unavailable");
        return;
      }
      const { latitude, longitude } = pos.coords;
      // exact street-level address (house number, street, sector)
      let label = "";
      let c: ReturnType<typeof matchCoverage> = null;
      try {
        const r = await reverseGeocode(latitude, longitude, state.lang);
        label = r.label;
        // the ADMIN REGION decides coverage — border towns can be closer to a
        // branch than parts of Islamabad itself, so distance can't be trusted
        c = matchCoverage(r);
      } catch {
        // geocoder unreachable: coordinates are the only signal left
        c = cityFromCoords(latitude, longitude);
      }
      persist({ city: c ?? "other", located: true, ...(label ? { area: label } : {}) });
      setLocStatus(c ? "ready" : "outside");
    })();
  }, [persist, state.lang]);

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
    // manual city change invalidates any previously detected street address
    setCity: (c) => { persist((p) => ({ city: c, located: !!c, area: p.city === c ? p.area : "" })); setLocStatus(c ? "ready" : "idle"); },
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
