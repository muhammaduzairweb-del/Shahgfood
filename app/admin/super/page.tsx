import type { Metadata } from "next";
import AdminConsole from "@/components/AdminConsole";

export const metadata: Metadata = {
  title: "Super Admin",
  robots: { index: false, follow: false },
};

export default function SuperAdminPage() {
  return <AdminConsole superMode />;
}
