import { requireAdmin } from "@/lib/auth";
import { PlayersScreen } from "@/screens/players/players-screen";

export default async function PlayersPage({
  searchParams,
}: PageProps<"/players">) {
  await requireAdmin();
  const params = await searchParams;
  const search = typeof params.q === "string" ? params.q : undefined;
  return <PlayersScreen search={search} />;
}
