import type { GameMode, MeetFormat, SessionStatus } from "./types";

// Labels match the mobile app's vocabulary exactly
// (mobile-app/src/utils/meetFormatters.ts, src/api/static.ts).
export const GAME_MODE_LABELS: Record<GameMode, string> = {
  CASUAL_UNRATED: "Casual Unrated",
  CASUAL_RATED: "Casual Rated",
  COMPETITIVE: "Competitive",
  TOURNAMENT: "Tournament",
};

export const MEET_FORMAT_LABELS: Record<MeetFormat, string> = {
  AMERICANO: "Americano",
  MEXICANO: "Mexicano",
  TEAM_AMERICANO: "Team Americano",
  TEAM_MEXICANO: "Team Mexicano",
};

export const SESSION_STATUS_LABELS: Record<SessionStatus, string> = {
  SCHEDULED: "Scheduled",
  IN_PROGRESS: "In Progress",
  TEAMS_ASSIGNED: "Teams Assigned",
  COMPLETED: "Completed",
};

export function formatFullName({
  firstName,
  lastName,
  fallback,
}: {
  firstName: string | null;
  lastName: string | null;
  fallback: string;
}) {
  const name = [firstName, lastName].filter(Boolean).join(" ");
  return name || fallback;
}

export function formatDate({ value }: { value: string | Date }) {
  return new Date(value).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export function formatDateTime({ value }: { value: string | Date }) {
  return new Date(value).toLocaleString("en-GB", {
    day: "numeric",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function formatElo({ value }: { value: string }) {
  return Math.round(Number(value)).toString();
}
