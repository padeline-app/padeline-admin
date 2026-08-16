import "server-only";

import type { PlayerRow, SessionRow, SessionStatus } from "@/lib/types";

export interface DashboardStats {
  totalPlayers: number;
  totalVenues: number;
  totalSessions: number;
  sessionsByStatus: Record<SessionStatus, number>;
  upcomingSessions: SessionRow[];
  recentPlayers: PlayerRow[];
}

export async function getDashboardStats(): Promise<DashboardStats> {
  // TODO(introspect): counts over user/venue/meet_session (deleted_at IS NULL),
  // group meet_session by status, next 5 SCHEDULED sessions by starts_at,
  // last 5 players by created_at.
  return {
    totalPlayers: 0,
    totalVenues: 0,
    totalSessions: 0,
    sessionsByStatus: {
      SCHEDULED: 0,
      IN_PROGRESS: 0,
      TEAMS_ASSIGNED: 0,
      COMPLETED: 0,
    },
    upcomingSessions: [],
    recentPlayers: [],
  };
}
