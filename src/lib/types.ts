import type {
  AdminRole,
  GameMode,
  MeetFormat,
  MeetSessionStatus,
} from "@/lib/drizzle/types";

export type { AdminRole, GameMode, MeetFormat, MeetSessionStatus };

export interface AdminUser {
  uid: string;
  email: string | null;
  name: string | null;
  picture: string | null;
  role: AdminRole;
}
