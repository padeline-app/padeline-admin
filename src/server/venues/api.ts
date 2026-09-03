import "server-only";

import { and, asc, ilike, isNull, or, sql } from "drizzle-orm";
import { getDb } from "@/lib/drizzle/client";
import { venue } from "@/lib/drizzle/schema/schema";

export async function listVenues({
  search,
  page = 1,
  pageSize = 25,
}: {
  search?: string;
  page?: number;
  pageSize?: number;
}) {
  const searchFilter = search
    ? or(ilike(venue.name, `%${search}%`), ilike(venue.city, `%${search}%`))
    : undefined;

  const [venues, [totals]] = await Promise.all([
    getDb()
      .select({
        id: venue.id,
        name: venue.name,
        addressFull: venue.addressFull,
        city: venue.city,
        country: venue.country,
        createdAt: venue.createdAt,
      })
      .from(venue)
      .where(and(isNull(venue.deletedAt), searchFilter))
      .orderBy(asc(venue.name))
      .limit(pageSize)
      .offset((page - 1) * pageSize),
    getDb()
      .select({ count: sql<number>`count(*)::int` })
      .from(venue)
      .where(and(isNull(venue.deletedAt), searchFilter)),
  ]);

  return { venues, total: totals.count };
}

export type ListVenuesResult = Awaited<ReturnType<typeof listVenues>>;
