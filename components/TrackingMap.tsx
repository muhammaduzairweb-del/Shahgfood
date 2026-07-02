"use client";

import { useEffect, useMemo } from "react";
import { MapContainer, TileLayer, Marker, Polyline, useMap } from "react-leaflet";
import L from "leaflet";

export interface LatLng {
  lat: number;
  lng: number;
}

function bubbleIcon(emoji: string, bg: string, size = 38) {
  return L.divIcon({
    className: "sjf-marker",
    html: `<div style="width:${size}px;height:${size}px;border-radius:50%;background:${bg};display:flex;align-items:center;justify-content:center;font-size:${size * 0.5}px;box-shadow:0 6px 16px rgba(0,0,0,.35);border:3px solid #fff">${emoji}</div>`,
    iconSize: [size, size],
    iconAnchor: [size / 2, size / 2],
  });
}

function lerp(a: LatLng, b: LatLng, t: number): LatLng {
  return { lat: a.lat + (b.lat - a.lat) * t, lng: a.lng + (b.lng - a.lng) * t };
}

function FitBounds({ points }: { points: LatLng[] }) {
  const map = useMap();
  useEffect(() => {
    const bounds = L.latLngBounds(points.map((p) => [p.lat, p.lng] as [number, number]));
    map.fitBounds(bounds, { padding: [50, 50], maxZoom: 15 });
    // Fix half-rendered tiles when the map mounts inside an animated / late-sized container
    const t = setTimeout(() => map.invalidateSize(), 200);
    return () => clearTimeout(t);
  }, [map, points]);
  return null;
}

export default function TrackingMap({
  branch,
  dest,
  progress,
}: {
  branch: LatLng;
  dest: LatLng;
  progress: number; // 0..1 along the route
}) {
  const rider = useMemo(() => lerp(branch, dest, Math.max(0, Math.min(1, progress))), [branch, dest, progress]);
  const center: [number, number] = [(branch.lat + dest.lat) / 2, (branch.lng + dest.lng) / 2];

  const branchIcon = useMemo(() => bubbleIcon("🏪", "#211812", 34), []);
  const destIcon = useMemo(() => bubbleIcon("📍", "#C1272D", 34), []);
  const riderIcon = useMemo(() => bubbleIcon("🛵", "#1E5631", 42), []);

  return (
    <MapContainer
      center={center}
      zoom={14}
      scrollWheelZoom={false}
      style={{ width: "100%", height: 300 }}
    >
      <TileLayer attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>' url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <Polyline positions={[[branch.lat, branch.lng], [dest.lat, dest.lng]]} pathOptions={{ color: "#C1272D", weight: 4, opacity: 0.55, dashArray: "2 10" }} />
      <Polyline positions={[[branch.lat, branch.lng], [rider.lat, rider.lng]]} pathOptions={{ color: "#1E5631", weight: 5, opacity: 0.9 }} />
      <Marker position={[branch.lat, branch.lng]} icon={branchIcon} />
      <Marker position={[dest.lat, dest.lng]} icon={destIcon} />
      <Marker position={[rider.lat, rider.lng]} icon={riderIcon} />
      <FitBounds points={[branch, dest]} />
    </MapContainer>
  );
}
