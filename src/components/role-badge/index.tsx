import { Badge } from "@/components/ui/badge";
import type { AdminRole } from "@/lib/types";

const ROLE_BADGE_CLASSES: Record<AdminRole, string> = {
  OWNER: "bg-primary text-primary-foreground",
  ADMIN: "bg-secondary text-secondary-foreground",
  VIEWER: "bg-muted text-muted-foreground",
};

export const ROLE_HINTS: Record<AdminRole, string> = {
  OWNER: "Full access, including admin management",
  ADMIN: "Manages players, venues and sessions",
  VIEWER: "Read-only access — ask an owner for changes",
};

export function RoleBadge({ role }: { role: AdminRole }) {
  return <Badge className={ROLE_BADGE_CLASSES[role]}>{role}</Badge>;
}
