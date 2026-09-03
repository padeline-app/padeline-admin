import { requireAdmin } from "@/server/auth/admin";
import { listPlayers } from "@/server/players/api";
import { PlayersScreen } from "@/screens/players/players-screen";

export default async function PlayersPage({
  searchParams,
}: PageProps<"/admin/players">) {
  await requireAdmin();
  const params = await searchParams;
  const search = typeof params.q === "string" ? params.q : undefined;
  const { players, total } = await listPlayers({ search });
  return <PlayersScreen players={players} total={total} search={search} />;
}
