"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Pagination } from "@/components/pagination";
import type { GameMode, MeetSessionStatus } from "@/lib/types";
import type { ListMeetSessionsResult } from "@/server/meet-sessions/api";
import { MeetSessionsFilters } from "./meet-sessions-filters";
import { MeetSessionsSearchForm } from "./search-form";
import { MeetSessionsTable } from "./meet-sessions-table";

export function MeetSessionsScreen({
  meetSessions,
  total,
  search,
  status,
  gameMode,
  page,
}: {
  meetSessions: ListMeetSessionsResult["meetSessions"];
  total: number;
  search?: string;
  status?: MeetSessionStatus;
  gameMode?: GameMode;
  page: number;
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
        <MeetSessionsSearchForm defaultValue={search} />
      </div>
      <MeetSessionsFilters status={status} gameMode={gameMode} search={search} />
      <Card>
        <CardContent>
          <MeetSessionsTable meetSessions={meetSessions} />
        </CardContent>
      </Card>
      <Pagination page={page} total={total} />
    </div>
  );
}
