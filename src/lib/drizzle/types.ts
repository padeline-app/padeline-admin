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

export type ParticipantRole = "ORGANISER" | "PARTICIPANT" | "UMPIRE";

export type AdminRole = "ADMIN" | "SUPER_ADMIN";
