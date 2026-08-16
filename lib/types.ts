// DTO row types for screen data. Hand-authored seam over the DB schema:
// the generated Drizzle schema (lib/db/schema, from `npm run db:introspect`)
// is only referenced inside each screen's api.ts, which maps rows to these.

export type GameMode =
  | "CASUAL_UNRATED"
  | "CASUAL_RATED"
  | "COMPETITIVE"
  | "TOURNAMENT";

export type MeetFormat =
  | "AMERICANO"
  | "MEXICANO"
  | "TEAM_AMERICANO"
  | "TEAM_MEXICANO";

export type SessionStatus =
  | "SCHEDULED"
  | "IN_PROGRESS"
  | "TEAMS_ASSIGNED"
  | "COMPLETED";

export type AdminRole = "ADMIN" | "SUPER_ADMIN";

export interface VenueRow {
  id: string;
  name: string;
  addressFull: string;
  city: string;
  country: string;
  imageUrl: string | null;
  createdAt: string;
}

export interface PlayerRow {
  id: string;
  email: string;
  username: string;
  firstName: string | null;
  lastName: string | null;
  profileImageUrl: string | null;
  eloRating: string;
  isClaimed: boolean;
  gender: string | null;
  createdAt: string;
}

export interface SessionRow {
  id: string;
  title: string;
  startsAt: string;
  endsAt: string;
  status: SessionStatus;
  gameMode: GameMode;
  meetFormat: MeetFormat;
  maxParticipants: number;
  participantCount: number;
  venueName: string;
  organiserName: string;
}

export interface AdminIdentity {
  uid: string;
  email: string | null;
  name: string | null;
  picture: string | null;
}
