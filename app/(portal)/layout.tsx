import { requireAdmin } from "@/lib/auth";
import { Header } from "@/app/shell/header";
import { Sidebar } from "@/app/shell/sidebar";

// Identity display for the chrome. Enforcement also happens per-page via
// requireAdmin() — layouts don't re-run on soft navigation and never guard
// Server Actions.
export default async function PortalLayout({
  children,
}: LayoutProps<"/">) {
  const identity = await requireAdmin();

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex min-w-0 flex-1 flex-col">
        <Header identity={identity} />
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
}
