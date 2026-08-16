import { Card, CardContent } from "@/components/ui/card";
import { SearchForm } from "@/app/shell/search-form";
import { listPlayers } from "./api";
import { PlayersTable } from "./players-table";

export async function PlayersScreen({ search }: { search?: string }) {
  const { players, total } = await listPlayers({ search });

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-semibold">Players</h1>
          <p className="text-sm text-muted-foreground">
            {total} player{total === 1 ? "" : "s"}
          </p>
        </div>
        <SearchForm placeholder="Search players…" defaultValue={search} />
      </div>
      <Card>
        <CardContent>
          <PlayersTable players={players} />
        </CardContent>
      </Card>
    </div>
  );
}
