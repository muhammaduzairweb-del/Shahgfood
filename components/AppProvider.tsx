"use client";

import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { cityFromCoords, matchCoverage, type CityChoice } from "@/lib/data";
import { getPrecisePosition, reverseGeocode } from "@/lib/geo";

export type LocStatus = "idle" | "locating" | "ready" | "denied" | "unavailable" | "outside";

interface AppState {
  branch: string;
  setBranch: (b: string) => void;
  area: string;
  setArea: (a: string) => void;
  located: boolean;
  setLocated: (v: boolean) => void;
  pickerOpen: boolean;
  setPickerOpen: (v: boolean) => void;
  city: CityChoice;
  setCity: (c: CityChoice) => void;
  locStatus: LocStatus;
  detectLocation: () => void;
  hydrated: boolean;
}

const Ctx = createContext<AppState | null>(null);

const LS = "sjf.v1";

interface Persisted {
  branch: string;
  area: string;
  located: boolean;
  city: CityChoice;
}

const DEFAULTS: Persisted = {
  branch: "F-10 Markaz",
  area: "",
  located: false,
  city: "",
};

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<Persisted>(DEFAULTS);
  const [pickerOpen, setPickerOpen] = useState(false);
  const [hydrated, setHydrated] = useState(false);
  const [locStatus, setLocStatus] = useState<LocStatus>("idle");

  useEffect(() => {
    try {
      const raw = localStorage.getItem(LS);
      if (raw) {
        const saved = JSON.parse(raw);
        setState({ branch: saved.branch ?? DEFAULTS.branch, area: saved.area ?? "", located: !!saved.located, city: saved.city ?? "" });
      }
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
        const r = await reverseGeocode(latitude, longitude);
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
  }, [persist]);

  const value: AppState = {
    branch: state.branch,
    setBranch: (b) => persist({ branch: b }),
    area: state.area,
    setArea: (a) => persist({ area: a }),
    located: state.located,
    setLocated: (v) => persist({ located: v }),
    pickerOpen,
    setPickerOpen,
    city: state.city,
    // manual city change invalidates any previously detected street address
    setCity: (c) => { persist((p) => ({ city: c, located: !!c, area: p.city === c ? p.area : "" })); setLocStatus(c ? "ready" : "idle"); },
    locStatus,
    detectLocation,
    hydrated,
  };

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useApp(): AppState {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useApp must be used within <AppProvider>");
  return ctx;
}
