import type { Metadata } from "next";
import ChatApp from "@/components/chat/ChatApp";

export const metadata: Metadata = {
  title: "Chats",
  description: "Chat directly with restaurants on Shah G Online, without sharing your number.",
  robots: { index: false, follow: false },
};

export default function ChatPage() {
  return <ChatApp />;
}
