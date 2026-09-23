"use client";

import LocationPicker from "@/components/LocationPicker";
import { useApp } from "@/components/AppProvider";

export default function Overlays() {
  const { hydrated, pickerOpen } = useApp();
  return <>{hydrated && pickerOpen && <LocationPicker />}</>;
}
