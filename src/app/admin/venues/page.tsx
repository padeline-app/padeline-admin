import { requireAbility } from "@/server/auth/admin";
import { listVenues } from "@/server/venues/api";
import { VenuesScreen } from "@/screens/venues/venues-screen";

export default async function VenuesPage({
  searchParams,
}: PageProps<"/admin/venues">) {
  await requireAbility("read", "Venue");
  const params = await searchParams;
  const search = typeof params.q === "string" ? params.q : undefined;
  const page = Math.max(1, Number(params.page) || 1);
  const { venues, total } = await listVenues({ search, page });
  return (
    <VenuesScreen venues={venues} total={total} search={search} page={page} />
  );
}
