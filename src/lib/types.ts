import type {
  AdminRole,
  GameMode,
  MeetFormat,
  SessionStatus,
} from "@/lib/drizzle/types";

export type { AdminRole, GameMode, MeetFormat, SessionStatus };

export interface AdminUser {
  uid: string;
  email: string | null;
  name: string | null;
  picture: string | null;
  role: AdminRole;
}
