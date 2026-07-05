import type { Metadata } from "next";
import AuthForms from "@/components/AuthForms";

export const metadata: Metadata = {
  title: "Create account",
  description: "Join Shah G Foods for faster checkout, saved addresses and live order tracking.",
  robots: { index: false, follow: true },
};

export default function SignupPage() {
  return <AuthForms mode="signup" />;
}
