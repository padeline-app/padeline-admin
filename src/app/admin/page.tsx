import { requireAdmin } from "@/server/auth/admin";
import { getDashboardStats } from "@/server/dashboard/api";
import { DashboardScreen } from "@/screens/dashboard/dashboard-screen";

export default async function AdminDashboardPage() {
  await requireAdmin();
  const stats = await getDashboardStats();
  return <DashboardScreen stats={stats} />;
}
