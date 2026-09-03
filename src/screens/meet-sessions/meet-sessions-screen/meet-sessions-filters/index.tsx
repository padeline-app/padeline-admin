import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import {
  GAME_MODE_LABELS,
  MEET_SESSION_STATUS_LABELS,
} from "@/lib/format";
import type { GameMode, MeetSessionStatus } from "@/lib/types";

export function MeetSessionsFilters({
  status,
  gameMode,
  search,
}: {
  status?: MeetSessionStatus;
  gameMode?: GameMode;
  search?: string;
}) {
  function href({
    nextStatus,
    nextGameMode,
  }: {
    nextStatus?: MeetSessionStatus;
    nextGameMode?: GameMode;
  }) {
    const params = new URLSearchParams();
    if (search) params.set("q", search);
    if (nextStatus) params.set("status", nextStatus);
    if (nextGameMode) params.set("mode", nextGameMode);
    const query = params.toString();
    return query ? `/admin/sessions?${query}` : "/admin/sessions";
  }

  function chip({
    label,
    active,
    target,
  }: {
    label: string;
    active: boolean;
    target: string;
  }) {
    return (
      <Link key={target + label} href={target}>
        <Badge
          variant={active ? "default" : "outline"}
          className={cn(!active && "text-muted-foreground")}
        >
          {label}
        </Badge>
      </Link>
    );
  }

  return (
    <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
      <div className="flex items-center gap-1.5">
        {chip({
          label: "All statuses",
          active: !status,
          target: href({ nextGameMode: gameMode }),
        })}
        {(
          Object.entries(MEET_SESSION_STATUS_LABELS) as [
            MeetSessionStatus,
            string,
          ][]
        ).map(([value, label]) =>
          chip({
            label,
            active: status === value,
            target: href({ nextStatus: value, nextGameMode: gameMode }),
          }),
        )}
      </div>
      <div className="flex items-center gap-1.5">
        {chip({
          label: "All modes",
          active: !gameMode,
          target: href({ nextStatus: status }),
        })}
        {(Object.entries(GAME_MODE_LABELS) as [GameMode, string][]).map(
          ([value, label]) =>
            chip({
              label,
              active: gameMode === value,
              target: href({ nextStatus: status, nextGameMode: value }),
            }),
        )}
      </div>
    </div>
  );
}
