import { requireAbility } from "@/server/auth/admin";
import { listAdmins } from "@/server/admins/api";
import { AdminsScreen } from "@/screens/admins/admins-screen";

export default async function AdminsPage() {
  await requireAbility("read", "Admin");
  const admins = await listAdmins();
  return <AdminsScreen admins={admins} />;
}
