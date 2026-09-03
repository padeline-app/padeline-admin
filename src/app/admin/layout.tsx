import { requireAdmin } from "@/server/auth/admin";
import { AdminAuthProvider } from "@/lib/firebase/admin-auth";
import { Header } from "@/components/header";
import { Sidebar } from "@/components/sidebar";
import { ViewerBanner } from "@/components/viewer-banner";

export default async function AdminLayout({
  children,
}: LayoutProps<"/admin">) {
  const user = await requireAdmin();

  return (
    <AdminAuthProvider user={user}>
      <div className="flex min-h-screen">
        <Sidebar />
        <div className="flex min-w-0 flex-1 flex-col">
          <Header />
          <ViewerBanner />
          <main className="flex-1 p-6">{children}</main>
        </div>
      </div>
    </AdminAuthProvider>
  );
}
