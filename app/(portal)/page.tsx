import { requireAdmin } from "@/lib/auth";
import { DashboardScreen } from "@/screens/dashboard/dashboard-screen";

export default async function DashboardPage() {
  await requireAdmin();
  return <DashboardScreen />;
}
