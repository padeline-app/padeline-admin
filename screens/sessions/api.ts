import "server-only";

import type { GameMode, SessionRow, SessionStatus } from "@/lib/types";

export async function listSessions({
  status,
  gameMode,
  search,
  page = 1,
  pageSize = 25,
}: {
  status?: SessionStatus;
  gameMode?: GameMode;
  search?: string;
  page?: number;
  pageSize?: number;
}): Promise<{ sessions: SessionRow[]; total: number }> {
  // TODO(introspect): meet_session (deleted_at IS NULL) join venue and
  // "user" (organiser_id), left-join count of meet_participant
  // (deleted_at IS NULL, role in PARTICIPANT/ORGANISER/UMPIRE), filter by
  // status/game_mode, ilike search on title, order by starts_at desc, paginate.
  void status;
  void gameMode;
  void search;
  void page;
  void pageSize;
  return { sessions: [], total: 0 };
}
