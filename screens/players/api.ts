import "server-only";

import type { PlayerRow } from "@/lib/types";

export async function listPlayers({
  search,
  page = 1,
  pageSize = 25,
}: {
  search?: string;
  page?: number;
  pageSize?: number;
}): Promise<{ players: PlayerRow[]; total: number }> {
  // TODO(introspect): select from "user" (deleted_at IS NULL), ilike search on
  // email/username/first_name/last_name, order by created_at desc, paginate.
  void search;
  void page;
  void pageSize;
  return { players: [], total: 0 };
}
