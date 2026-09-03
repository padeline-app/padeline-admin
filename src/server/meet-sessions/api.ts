import "server-only";

import { and, desc, eq, ilike, isNull, sql } from "drizzle-orm";
import { getDb } from "@/lib/drizzle/client";
import {
  meetParticipant,
  meetSession,
  user,
  venue,
} from "@/lib/drizzle/schema/schema";
import type { GameMode, MeetSessionStatus } from "@/lib/drizzle/types";

export async function listMeetSessions({
  status,
  gameMode,
  search,
  page = 1,
  pageSize = 25,
}: {
  status?: MeetSessionStatus;
  gameMode?: GameMode;
  search?: string;
  page?: number;
  pageSize?: number;
}) {
  const filters = [
    isNull(meetSession.deletedAt),
    status ? eq(meetSession.status, status) : undefined,
    gameMode ? eq(meetSession.gameMode, gameMode) : undefined,
    search ? ilike(meetSession.title, `%${search}%`) : undefined,
  ];

  const participantCounts = getDb()
    .select({
      meetSessionId: meetParticipant.meetSessionId,
      count: sql<number>`count(*)::int`.as("count"),
    })
    .from(meetParticipant)
    .where(isNull(meetParticipant.deletedAt))
    .groupBy(meetParticipant.meetSessionId)
    .as("participant_counts");

  const [meetSessions, [totals]] = await Promise.all([
    getDb()
      .select({
        id: meetSession.id,
        title: meetSession.title,
        startsAt: meetSession.startsAt,
        status: meetSession.status,
        gameMode: meetSession.gameMode,
        meetFormat: meetSession.meetFormat,
        maxParticipants: meetSession.maxParticipants,
        participantCount:
          sql<number>`coalesce(${participantCounts.count}, 0)`.as(
            "participant_count",
          ),
        venueName: venue.name,
        organiserName:
          sql<string>`coalesce(nullif(concat_ws(' ', ${user.firstName}, ${user.lastName}), ''), ${user.username})`.as(
            "organiser_name",
          ),
      })
      .from(meetSession)
      .innerJoin(venue, eq(meetSession.venueId, venue.id))
      .innerJoin(user, eq(meetSession.organiserId, user.id))
      .leftJoin(
        participantCounts,
        eq(participantCounts.meetSessionId, meetSession.id),
      )
      .where(and(...filters))
      .orderBy(desc(meetSession.startsAt))
      .limit(pageSize)
      .offset((page - 1) * pageSize),
    getDb()
      .select({ count: sql<number>`count(*)::int` })
      .from(meetSession)
      .where(and(...filters)),
  ]);

  return { meetSessions, total: totals.count };
}

export type ListMeetSessionsResult = Awaited<
  ReturnType<typeof listMeetSessions>
>;
