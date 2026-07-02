"use client";

import CartDrawer from "@/components/CartDrawer";
import LocationPicker from "@/components/LocationPicker";
import { useApp } from "@/components/AppProvider";

export default function Overlays() {
  const { hydrated, located } = useApp();
  return (
    <>
      <CartDrawer />
      {hydrated && !located && <LocationPicker />}
    </>
  );
}
