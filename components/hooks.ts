"use client";

import { useEffect, useState } from "react";

/** Window width (SSR-safe: starts at 1200 to match server render, updates on mount). */
export function useWidth(): number {
  const [w, setW] = useState(1200);
  useEffect(() => {
    const onResize = () => setW(window.innerWidth);
    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);
  return w;
}
