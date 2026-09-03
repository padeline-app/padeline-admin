import { requireAbility } from "@/server/auth/admin";
import { listMeetSessions } from "@/server/meet-sessions/api";
import { MeetSessionsScreen } from "@/screens/meet-sessions/meet-sessions-screen";
import type { GameMode, MeetSessionStatus } from "@/lib/types";
import { GAME_MODE_LABELS, MEET_SESSION_STATUS_LABELS } from "@/lib/format";

export default async function MeetSessionsPage({
  searchParams,
}: PageProps<"/admin/sessions">) {
  await requireAbility("read", "MeetSession");
  const params = await searchParams;

  const search = typeof params.q === "string" ? params.q : undefined;
  const page = Math.max(1, Number(params.page) || 1);
  const status =
    typeof params.status === "string" &&
    params.status in MEET_SESSION_STATUS_LABELS
      ? (params.status as MeetSessionStatus)
      : undefined;
  const gameMode =
    typeof params.mode === "string" && params.mode in GAME_MODE_LABELS
      ? (params.mode as GameMode)
      : undefined;

  const { meetSessions, total } = await listMeetSessions({
    search,
    status,
    gameMode,
    page,
  });
  return (
    <MeetSessionsScreen
      meetSessions={meetSessions}
      total={total}
      search={search}
      status={status}
      gameMode={gameMode}
      page={page}
    />
  );
}
