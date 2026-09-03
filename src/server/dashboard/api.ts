import "server-only";

import { and, asc, desc, eq, gte, isNull, sql } from "drizzle-orm";
import { getDb } from "@/lib/drizzle/client";
import { meetSession, user, venue } from "@/lib/drizzle/schema/schema";
import type { MeetSessionStatus } from "@/lib/drizzle/types";

export async function getDashboardStats() {
  const db = getDb();

  const [[players], [venues], [meetSessions], statusRows, upcoming, recent] =
    await Promise.all([
      db
        .select({ count: sql<number>`count(*)::int` })
        .from(user)
        .where(isNull(user.deletedAt)),
      db
        .select({ count: sql<number>`count(*)::int` })
        .from(venue)
        .where(isNull(venue.deletedAt)),
      db
        .select({ count: sql<number>`count(*)::int` })
        .from(meetSession)
        .where(isNull(meetSession.deletedAt)),
      db
        .select({
          status: meetSession.status,
          count: sql<number>`count(*)::int`,
        })
        .from(meetSession)
        .where(isNull(meetSession.deletedAt))
        .groupBy(meetSession.status),
      db
        .select({
          id: meetSession.id,
          title: meetSession.title,
          venueName: venue.name,
          startsAt: meetSession.startsAt,
        })
        .from(meetSession)
        .innerJoin(venue, eq(meetSession.venueId, venue.id))
        .where(
          and(
            isNull(meetSession.deletedAt),
            eq(meetSession.status, "SCHEDULED"),
            gte(meetSession.startsAt, sql`now()`),
          ),
        )
        .orderBy(asc(meetSession.startsAt))
        .limit(5),
      db
        .select({
          id: user.id,
          username: user.username,
          firstName: user.firstName,
          lastName: user.lastName,
        })
        .from(user)
        .where(isNull(user.deletedAt))
        .orderBy(desc(user.createdAt))
        .limit(5),
    ]);

  const meetSessionsByStatus: Record<MeetSessionStatus, number> = {
    SCHEDULED: 0,
    IN_PROGRESS: 0,
    TEAMS_ASSIGNED: 0,
    COMPLETED: 0,
  };
  for (const row of statusRows) meetSessionsByStatus[row.status] = row.count;

  return {
    totalPlayers: players.count,
    totalVenues: venues.count,
    totalMeetSessions: meetSessions.count,
    meetSessionsByStatus,
    upcomingMeetSessions: upcoming,
    recentPlayers: recent,
  };
}

export type DashboardStats = Awaited<ReturnType<typeof getDashboardStats>>;
