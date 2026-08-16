import { Badge } from "@/components/ui/badge";
import { SESSION_STATUS_LABELS } from "@/lib/format";
import type { SessionStatus } from "@/lib/types";

const STATUS_CLASSES: Record<SessionStatus, string> = {
  SCHEDULED: "bg-secondary text-secondary-foreground",
  IN_PROGRESS: "bg-accent text-accent-foreground",
  TEAMS_ASSIGNED: "bg-warning/15 text-warning",
  COMPLETED: "bg-muted text-muted-foreground",
};

export function StatusBadge({ status }: { status: SessionStatus }) {
  return (
    <Badge className={STATUS_CLASSES[status]}>
      {SESSION_STATUS_LABELS[status]}
    </Badge>
  );
}
