import type { Metadata } from "next";
import AuthForms from "@/components/AuthForms";

export const metadata: Metadata = {
  title: "Reset password",
  description: "Reset your Shah Jee Foods account password.",
  robots: { index: false, follow: true },
};

export default function ForgotPasswordPage() {
  return <AuthForms mode="forgot" />;
}
