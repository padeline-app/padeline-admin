import type { ReactNode } from "react";
import { AdminAuthProvider } from "@/lib/firebase/admin-auth";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return <AdminAuthProvider>{children}</AdminAuthProvider>;
}
