import "server-only";

import type { VenueRow } from "@/lib/types";

export async function listVenues({
  search,
  page = 1,
  pageSize = 25,
}: {
  search?: string;
  page?: number;
  pageSize?: number;
}): Promise<{ venues: VenueRow[]; total: number }> {
  // TODO(introspect): select from venue (deleted_at IS NULL), ilike search on
  // name/city, order by name, paginate via getDb().
  void search;
  void page;
  void pageSize;
  return { venues: [], total: 0 };
}
