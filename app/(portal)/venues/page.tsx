import { requireAdmin } from "@/lib/auth";
import { VenuesScreen } from "@/screens/venues/venues-screen";

export default async function VenuesPage({
  searchParams,
}: PageProps<"/venues">) {
  await requireAdmin();
  const params = await searchParams;
  const search = typeof params.q === "string" ? params.q : undefined;
  return <VenuesScreen search={search} />;
}
