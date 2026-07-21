"use client";

import LocationPicker from "@/components/LocationPicker";
import ChatNotifier from "@/components/chat/ChatNotifier";
import ChatSoonToast from "@/components/ChatSoonToast";
import { useApp } from "@/components/AppProvider";

export default function Overlays() {
  const { hydrated, pickerOpen } = useApp();
  // marketplace: no cart — orders go directly to the restaurant via call/WhatsApp
  return (
    <>
      <ChatNotifier />
      <ChatSoonToast />
      {hydrated && pickerOpen && <LocationPicker />}
    </>
  );
}
