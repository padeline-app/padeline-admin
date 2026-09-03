import { Badge } from "@/components/ui/badge";
import { MEET_SESSION_STATUS_LABELS } from "@/lib/format";
import type { MeetSessionStatus } from "@/lib/types";

const STATUS_CLASSES: Record<MeetSessionStatus, string> = {
  SCHEDULED: "bg-secondary text-secondary-foreground",
  IN_PROGRESS: "bg-accent text-accent-foreground",
  TEAMS_ASSIGNED: "bg-warning/15 text-warning",
  COMPLETED: "bg-muted text-muted-foreground",
};

export function MeetSessionStatusBadge({
  status,
}: {
  status: MeetSessionStatus;
}) {
  return (
    <Badge className={STATUS_CLASSES[status]}>
      {MEET_SESSION_STATUS_LABELS[status]}
    </Badge>
  );
}
