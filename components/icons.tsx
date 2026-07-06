"use client";

import type { CategoryKey } from "@/lib/data";

interface IconProps {
  size?: number;
  color?: string;
  strokeWidth?: number;
}

const base = (size: number, color: string, sw: number) => ({
  width: size,
  height: size,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: color,
  strokeWidth: sw,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
});

export function IconHome({ size = 24, color = "currentColor", strokeWidth = 2 }: IconProps) {
  return (
    <svg {...base(size, color, strokeWidth)}>
      <path d="M3 11l9-8 9 8" />
      <path d="M5 10v10h4v-6h6v6h4V10" />
    </svg>
  );
}

export function IconMenu({ size = 24, color = "currentColor", strokeWidth = 2 }: IconProps) {
  return (
    <svg {...base(size, color, strokeWidth)}>
      <path d="M6 3v6a2 2 0 0 0 4 0V3" />
      <path d="M8 11v10" />
      <path d="M17 3c-1.5 0-2.5 2-2.5 4.5S15.5 12 17 12" />
      <path d="M17 3v18" />
    </svg>
  );
}

export function IconPin({ size = 24, color = "currentColor", strokeWidth = 2 }: IconProps) {
  return (
    <svg {...base(size, color, strokeWidth)}>
      <path d="M12 21s-7-6.3-7-11a7 7 0 1 1 14 0c0 4.7-7 11-7 11z" />
      <circle cx="12" cy="10" r="2.5" />
    </svg>
  );
}

export function IconInfo({ size = 24, color = "currentColor", strokeWidth = 2 }: IconProps) {
  return (
    <svg {...base(size, color, strokeWidth)}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 11v5" />
      <path d="M12 8h.01" />
    </svg>
  );
}

export function IconBag({ size = 24, color = "currentColor", strokeWidth = 2 }: IconProps) {
  return (
    <svg {...base(size, color, strokeWidth)}>
      <path d="M6 8h12l-1 12H7L6 8z" />
      <path d="M9 8V6a3 3 0 0 1 6 0v2" />
    </svg>
  );
}

export function IconStar({ size = 24, color = "currentColor" }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color} stroke="none">
      <path d="M12 3.2l2.6 5.27 5.82.85-4.21 4.1.99 5.79L12 16.98 6.8 19.2l.99-5.79-4.21-4.1 5.82-.85z" />
    </svg>
  );
}

export function IconScooter({ size = 24, color = "currentColor", strokeWidth = 2 }: IconProps) {
  return (
    <svg {...base(size, color, strokeWidth)}>
      <circle cx="6" cy="18" r="2.5" />
      <circle cx="17.5" cy="18" r="2.5" />
      <path d="M8.5 18h6.5" />
      <path d="M15 18l-2-9h-2.5" />
      <path d="M4 9h3.5l2.2 6" />
      <path d="M18.5 15.5L17 9h-2" />
    </svg>
  );
}

// ---- category icons ----
function IconRice({ size = 24, color = "currentColor", strokeWidth = 2 }: IconProps) {
  return (
    <svg {...base(size, color, strokeWidth)}>
      <path d="M4 12h16a8 8 0 0 1-16 0z" />
      <path d="M3 12h18" />
      <path d="M9 8c0-1.5 1-2 1.5-3M13 8c0-1.5 1-2 1.5-3" />
    </svg>
  );
}
function IconFlame({ size = 24, color = "currentColor", strokeWidth = 2 }: IconProps) {
  return (
    <svg {...base(size, color, strokeWidth)}>
      <path d="M12 3c.5 3 3.5 4.2 3.5 8a3.5 3.5 0 0 1-7 0c0-1.3.5-2.2 1.2-3" />
      <path d="M12 21a5 5 0 0 0 5-5c0-4-3-5-5-9-2 4-5 5-5 9a5 5 0 0 0 5 5z" opacity=".55" />
    </svg>
  );
}
function IconBurger({ size = 24, color = "currentColor", strokeWidth = 2 }: IconProps) {
  return (
    <svg {...base(size, color, strokeWidth)}>
      <path d="M4 9a8 8 0 0 1 16 0z" />
      <path d="M4 13.5h16" />
      <path d="M4 17h16a3 3 0 0 1-3 3H7a3 3 0 0 1-3-3z" />
    </svg>
  );
}
function IconSalad({ size = 24, color = "currentColor", strokeWidth = 2 }: IconProps) {
  return (
    <svg {...base(size, color, strokeWidth)}>
      <path d="M4 12h16a8 8 0 0 1-16 0z" />
      <path d="M9 8c1-2 4-2 5 0" />
      <path d="M12 8c0-2 2-3 3-3" />
    </svg>
  );
}
function IconCup({ size = 24, color = "currentColor", strokeWidth = 2 }: IconProps) {
  return (
    <svg {...base(size, color, strokeWidth)}>
      <path d="M6 8h12l-1.2 12H7.2z" />
      <path d="M5 8h14" />
      <path d="M10 4h4" />
    </svg>
  );
}

function IconBowl({ size = 24, color = "currentColor", strokeWidth = 2 }: IconProps) {
  return (
    <svg {...base(size, color, strokeWidth)}>
      <path d="M3 11h18a9 9 0 0 1-18 0z" />
      <path d="M7 11c0-2.2 2.2-3.5 5-3.5s5 1.3 5 3.5" />
      <path d="M12 4.5v2" />
    </svg>
  );
}

const CAT_MAP: Record<CategoryKey, (p: IconProps) => React.ReactElement> = {
  rice: IconRice,
  curry: IconBowl,
  karahi: IconBowl,
  bbq: IconFlame,
  fast: IconBurger,
  chaat: IconSalad,
  shakes: IconCup,
  juice: IconCup,
  sweets: IconBowl,
  drinks: IconCup,
};

export function CategoryIcon({ cat, size = 24, color = "currentColor", strokeWidth = 2 }: { cat: CategoryKey } & IconProps) {
  const C = CAT_MAP[cat];
  return <C size={size} color={color} strokeWidth={strokeWidth} />;
}

// ---- brand / social icons (fixed brand colours) ----
export function IconFacebook({ size = 22 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="#1877F2" aria-hidden>
      <path d="M24 12.07C24 5.4 18.63 0 12 0S0 5.4 0 12.07C0 18.1 4.39 23.1 10.13 24v-8.44H7.08v-3.49h3.05V9.41c0-3.02 1.79-4.69 4.53-4.69 1.31 0 2.68.24 2.68.24v2.95h-1.51c-1.49 0-1.95.93-1.95 1.87v2.25h3.32l-.53 3.49h-2.79V24C19.61 23.1 24 18.1 24 12.07z" />
    </svg>
  );
}

export function IconInstagram({ size = 22 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden>
      <defs>
        <linearGradient id="igGrad" x1="2" y1="22" x2="22" y2="2" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#FEDA75" />
          <stop offset=".25" stopColor="#FA7E1E" />
          <stop offset=".5" stopColor="#D62976" />
          <stop offset=".75" stopColor="#962FBF" />
          <stop offset="1" stopColor="#4F5BD5" />
        </linearGradient>
      </defs>
      <rect x="2" y="2" width="20" height="20" rx="5.6" fill="none" stroke="url(#igGrad)" strokeWidth="2" />
      <circle cx="12" cy="12" r="4.4" fill="none" stroke="url(#igGrad)" strokeWidth="2" />
      <circle cx="17.4" cy="6.6" r="1.35" fill="url(#igGrad)" />
    </svg>
  );
}
