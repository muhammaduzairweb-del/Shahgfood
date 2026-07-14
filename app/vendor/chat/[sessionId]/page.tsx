import type { Metadata } from "next";
import VendorChat from "@/components/chat/VendorChat";

export const metadata: Metadata = {
  title: "Reply to customer",
  robots: { index: false, follow: false },
};

export default async function VendorChatPage({ params }: { params: Promise<{ sessionId: string }> }) {
  const { sessionId } = await params;
  return <VendorChat sessionId={sessionId} />;
}
