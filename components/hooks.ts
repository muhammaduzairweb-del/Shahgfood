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

/** True when the page is scrolling down (past `reveal` px) → hide the bar; false when scrolling up. */
export function useHideOnScroll(reveal = 80): boolean {
  const [hidden, setHidden] = useState(false);
  useEffect(() => {
    let last = window.scrollY;
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const y = window.scrollY;
        const delta = y - last;
        // ignore tiny jitters; always show near the very top
        if (y < reveal) setHidden(false);
        else if (Math.abs(delta) > 6) setHidden(delta > 0);
        last = y;
        ticking = false;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [reveal]);
  return hidden;
}
