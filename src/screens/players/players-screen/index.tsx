"use client";

import { Card, CardContent } from "@/components/ui/card";
import type { ListPlayersResult } from "@/server/players/api";
import { PlayersTable } from "./players-table";
import { PlayersSearchForm } from "./search-form";

export function PlayersScreen({
  players,
  total,
  search,
}: {
  players: ListPlayersResult["players"];
  total: number;
  search?: string;
}) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-semibold">Players</h1>
          <p className="text-sm text-muted-foreground">
            {total} player{total === 1 ? "" : "s"}
          </p>
        </div>
        <PlayersSearchForm defaultValue={search} />
      </div>
      <Card>
        <CardContent>
          <PlayersTable players={players} />
        </CardContent>
      </Card>
    </div>
  );
}
