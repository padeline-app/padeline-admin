import { Ability, AbilityBuilder } from "@casl/ability";
import type * as schema from "@/lib/drizzle/schema/schema";
import type { AdminRole } from "@/lib/drizzle/types";

export type AdminAction = "read" | "create" | "update" | "delete" | "manage";

export type SubjectTableOf = {
  Admin: typeof schema.adminUser;
  Player: typeof schema.user;
  Venue: typeof schema.venue;
  MeetSession: typeof schema.meetSession;
};

export type AdminSubject = keyof SubjectTableOf | "Dashboard" | "all";

export type AppAbility = Ability<[AdminAction, AdminSubject]>;

export function defineAbilitiesFor(role: AdminRole): AppAbility {
  const { can, build } = new AbilityBuilder(
    Ability<[AdminAction, AdminSubject]>,
  );

  switch (role) {
    case "OWNER":
      can("manage", "all");
      break;
    case "ADMIN":
      can("read", "all");
      can(["create", "update", "delete"], ["Player", "Venue", "MeetSession"]);
      break;
    case "VIEWER":
      can("read", ["Dashboard", "Player", "Venue", "MeetSession"]);
      break;
  }

  return build();
}
