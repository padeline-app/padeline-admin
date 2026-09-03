import { requireAbility } from "@/server/auth/admin";
import { listPlayers } from "@/server/players/api";
import { PlayersScreen } from "@/screens/players/players-screen";

export default async function PlayersPage({
  searchParams,
}: PageProps<"/admin/players">) {
  await requireAbility("read", "Player");
  const params = await searchParams;
  const search = typeof params.q === "string" ? params.q : undefined;
  const page = Math.max(1, Number(params.page) || 1);
  const { players, total } = await listPlayers({ search, page });
  return (
    <PlayersScreen players={players} total={total} search={search} page={page} />
  );
}
