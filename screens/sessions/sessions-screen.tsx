import { Card, CardContent } from "@/components/ui/card";
import { SearchForm } from "@/app/shell/search-form";
import type { GameMode, SessionStatus } from "@/lib/types";
import { listSessions } from "./api";
import { SessionsFilters } from "./sessions-filters";
import { SessionsTable } from "./sessions-table";

export async function SessionsScreen({
  search,
  status,
  gameMode,
}: {
  search?: string;
  status?: SessionStatus;
  gameMode?: GameMode;
}) {
  const { sessions, total } = await listSessions({ search, status, gameMode });

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-semibold">Sessions</h1>
          <p className="text-sm text-muted-foreground">
            {total} session{total === 1 ? "" : "s"}
          </p>
        </div>
        <SearchForm placeholder="Search sessions…" defaultValue={search} />
      </div>
      <SessionsFilters status={status} gameMode={gameMode} search={search} />
      <Card>
        <CardContent>
          <SessionsTable sessions={sessions} />
        </CardContent>
      </Card>
    </div>
  );
}
