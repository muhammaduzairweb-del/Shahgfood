"use client";

import LocationPicker from "@/components/LocationPicker";
import { useApp } from "@/components/AppProvider";

export default function Overlays() {
  const { hydrated, located } = useApp();
  // marketplace: no cart — orders go directly to the restaurant via call/WhatsApp
  return <>{hydrated && !located && <LocationPicker />}</>;
}
