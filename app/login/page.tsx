import type { Metadata } from "next";
import AuthForms from "@/components/AuthForms";

export const metadata: Metadata = {
  title: "Log in",
  description: "Log in to your Shah G Foods account to reorder your favourites and track deliveries.",
  robots: { index: false, follow: true },
};

export default function LoginPage() {
  return <AuthForms mode="login" />;
}
