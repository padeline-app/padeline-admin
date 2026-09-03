import { requireAbility } from "@/server/auth/admin";
import { getDashboardStats } from "@/server/dashboard/api";
import { DashboardScreen } from "@/screens/dashboard/dashboard-screen";

export default async function AdminDashboardPage() {
  await requireAbility("read", "Dashboard");
  const stats = await getDashboardStats();
  return <DashboardScreen stats={stats} />;
}
