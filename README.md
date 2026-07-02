# Shah Jee Foods

Bilingual (English / اردو) desi food‑delivery web app for **Islamabad & Rawalpindi**, built with **Next.js (App Router) + TypeScript**.

## Features
- 🍽️ Full menu — 54 dishes with real photos, 4‑per‑row responsive cards
- 🛒 Cart, checkout (COD / card) and **live order tracking** with a moving rider on a real map (Leaflet + OpenStreetMap) and a countdown ETA
- 📍 First‑run location picker (nearest of 35+ branches auto‑selected)
- 🔐 Login / Signup / Forgot‑password pages
- 🛠️ **Branch admin** (`/admin`) + **Super admin** (`/admin/super`) dashboards with live status sync
- 🌐 Fully bilingual EN / اردو with RTL + Nastaliq
- ⚡ SEO: metadata, Restaurant JSON‑LD, sitemap, robots, PWA manifest

## Getting started

```bash
npm install
npm run dev      # http://localhost:3000
```

## Build

```bash
npm run build
npm start
```

## Project structure
- `app/` — routes (`/`, `/menu`, `/branches`, `/about`, `/checkout`, `/track`, `/login`, `/admin`, …) + API (`/api/orders`)
- `components/` — Navbar, CartDrawer, TrackingMap, admin/auth, content pages
- `lib/` — menu & branch data, bilingual copy, order store, cart helpers

> Demo admin passwords: branch `shahjee`, super `superadmin`. The order store is in‑memory — swap for a database before production.
