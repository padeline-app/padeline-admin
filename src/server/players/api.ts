import "server-only";

import { and, desc, ilike, isNull, or, sql } from "drizzle-orm";
import { getDb } from "@/lib/drizzle/client";
import { user } from "@/lib/drizzle/schema/schema";

export async function listPlayers({
  search,
  page = 1,
  pageSize = 25,
}: {
  search?: string;
  page?: number;
  pageSize?: number;
}) {
  const searchFilter = search
    ? or(
        ilike(user.email, `%${search}%`),
        ilike(user.username, `%${search}%`),
        ilike(user.firstName, `%${search}%`),
        ilike(user.lastName, `%${search}%`),
      )
    : undefined;

  const [players, [totals]] = await Promise.all([
    getDb()
      .select({
        id: user.id,
        email: user.email,
        username: user.username,
        firstName: user.firstName,
        lastName: user.lastName,
        profileImageUrl: user.profileImageUrl,
        eloRating: user.eloRating,
        isClaimed: user.isClaimed,
        createdAt: user.createdAt,
      })
      .from(user)
      .where(and(isNull(user.deletedAt), searchFilter))
      .orderBy(desc(user.createdAt))
      .limit(pageSize)
      .offset((page - 1) * pageSize),
    getDb()
      .select({ count: sql<number>`count(*)::int` })
      .from(user)
      .where(and(isNull(user.deletedAt), searchFilter)),
  ]);

  return { players, total: totals.count };
}

export type ListPlayersResult = Awaited<ReturnType<typeof listPlayers>>;
