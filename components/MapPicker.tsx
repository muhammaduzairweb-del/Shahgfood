"use client";

import { useEffect, useMemo, useState } from "react";
import { MapContainer, TileLayer, Marker, useMap, useMapEvents } from "react-leaflet";
import L from "leaflet";
import { CITY_CENTER } from "@/lib/data";

function pinIcon() {
  return L.divIcon({
    className: "sjf-marker",
    html: `<div style="width:40px;height:40px;border-radius:50% 50% 50% 0;transform:rotate(-45deg);background:#C1272D;display:flex;align-items:center;justify-content:center;box-shadow:0 8px 18px rgba(0,0,0,.4);border:3px solid #fff"><span style="transform:rotate(45deg);font-size:17px">📍</span></div>`,
    iconSize: [40, 40],
    iconAnchor: [20, 40],
  });
}

function ClickToPlace({ onPick }: { onPick: (lat: number, lng: number) => void }) {
  useMapEvents({
    click(e) {
      onPick(e.latlng.lat, e.latlng.lng);
    },
  });
  return null;
}

// Leaflet renders blank/sliver tiles if the container is sized after mount
// (e.g. inside an animated modal) — re-measure whenever the box changes.
function AutoResize() {
  const map = useMap();
  useEffect(() => {
    const el = map.getContainer();
    const ro = new ResizeObserver(() => map.invalidateSize());
    ro.observe(el);
    const t = setTimeout(() => map.invalidateSize(), 250);
    return () => { ro.disconnect(); clearTimeout(t); };
  }, [map]);
  return null;
}

function Recenter({ center }: { center: [number, number] | null }) {
  const map = useMap();
  useEffect(() => {
    if (center) map.setView(center, Math.max(map.getZoom(), 16));
    const t = setTimeout(() => map.invalidateSize(), 200);
    return () => clearTimeout(t);
  }, [map, center]);
  return null;
}

/**
 * Tap-or-drag pin picker so users can choose their exact location themselves.
 * Calls onPick with every new position (tap on the map or drag the pin).
 */
export default function MapPicker({
  initial,
  onPick,
  height = 260,
}: {
  /** starting pin, e.g. from a GPS fix; null = no pin yet */
  initial: { lat: number; lng: number } | null;
  onPick: (lat: number, lng: number) => void;
  /** CSS height for the map (number of px or any CSS size) */
  height?: number | string;
}) {
  const [pin, setPin] = useState<{ lat: number; lng: number } | null>(initial);
  const icon = useMemo(() => pinIcon(), []);

  useEffect(() => {
    if (initial) setPin(initial);
  }, [initial]);

  const place = (lat: number, lng: number) => {
    setPin({ lat, lng });
    onPick(lat, lng);
  };

  return (
    <MapContainer
      center={pin ? [pin.lat, pin.lng] : [CITY_CENTER.lat, CITY_CENTER.lng]}
      zoom={pin ? 16 : 12}
      scrollWheelZoom
      style={{ width: "100%", height }}
    >
      <TileLayer attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>' url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <AutoResize />
      <ClickToPlace onPick={place} />
      <Recenter center={pin ? [pin.lat, pin.lng] : null} />
      {pin && (
        <Marker
          position={[pin.lat, pin.lng]}
          icon={icon}
          draggable
          eventHandlers={{
            dragend: (e) => {
              const p = (e.target as L.Marker).getLatLng();
              place(p.lat, p.lng);
            },
          }}
        />
      )}
    </MapContainer>
  );
}
