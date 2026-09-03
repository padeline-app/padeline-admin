"use client";

import { Card, CardContent } from "@/components/ui/card";
import type { GameMode, SessionStatus } from "@/lib/types";
import type { ListSessionsResult } from "@/server/sessions/api";
import { SessionsFilters } from "./sessions-filters";
import { SessionsSearchForm } from "./search-form";
import { SessionsTable } from "./sessions-table";

export function SessionsScreen({
  sessions,
  total,
  search,
  status,
  gameMode,
}: {
  sessions: ListSessionsResult["sessions"];
  total: number;
  search?: string;
  status?: SessionStatus;
  gameMode?: GameMode;
}) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-semibold">Sessions</h1>
          <p className="text-sm text-muted-foreground">
            {total} session{total === 1 ? "" : "s"}
          </p>
        </div>
        <SessionsSearchForm defaultValue={search} />
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
