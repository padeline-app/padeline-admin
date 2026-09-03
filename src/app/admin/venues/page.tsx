import { requireAdmin } from "@/server/auth/admin";
import { listVenues } from "@/server/venues/api";
import { VenuesScreen } from "@/screens/venues/venues-screen";

export default async function VenuesPage({
  searchParams,
}: PageProps<"/admin/venues">) {
  await requireAdmin();
  const params = await searchParams;
  const search = typeof params.q === "string" ? params.q : undefined;
  const { venues, total } = await listVenues({ search });
  return <VenuesScreen venues={venues} total={total} search={search} />;
}
