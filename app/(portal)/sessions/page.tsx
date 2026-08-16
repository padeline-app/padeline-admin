import { requireAdmin } from "@/lib/auth";
import { SessionsScreen } from "@/screens/sessions/sessions-screen";
import type { GameMode, SessionStatus } from "@/lib/types";
import { GAME_MODE_LABELS, SESSION_STATUS_LABELS } from "@/lib/format";

export default async function SessionsPage({
  searchParams,
}: PageProps<"/sessions">) {
  await requireAdmin();
  const params = await searchParams;

  const search = typeof params.q === "string" ? params.q : undefined;
  const status =
    typeof params.status === "string" && params.status in SESSION_STATUS_LABELS
      ? (params.status as SessionStatus)
      : undefined;
  const gameMode =
    typeof params.mode === "string" && params.mode in GAME_MODE_LABELS
      ? (params.mode as GameMode)
      : undefined;

  return (
    <SessionsScreen search={search} status={status} gameMode={gameMode} />
  );
}
