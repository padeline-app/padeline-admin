import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  formatDateTime,
  GAME_MODE_LABELS,
  MEET_FORMAT_LABELS,
} from "@/lib/format";
import type { ListMeetSessionsResult } from "@/server/meet-sessions/api";
import { MeetSessionStatusBadge } from "../status-badge";

export function MeetSessionsTable({
  meetSessions,
}: {
  meetSessions: ListMeetSessionsResult["meetSessions"];
}) {
  if (meetSessions.length === 0) {
    return (
      <p className="py-12 text-center text-sm text-muted-foreground">
        No sessions found.
      </p>
    );
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Session</TableHead>
          <TableHead>Starts</TableHead>
          <TableHead>Mode</TableHead>
          <TableHead>Format</TableHead>
          <TableHead>Venue</TableHead>
          <TableHead>Organiser</TableHead>
          <TableHead>Players</TableHead>
          <TableHead>Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {meetSessions.map((meetSession) => (
          <TableRow key={meetSession.id}>
            <TableCell className="font-medium">{meetSession.title}</TableCell>
            <TableCell>
              {formatDateTime({ value: meetSession.startsAt })}
            </TableCell>
            <TableCell>
              <Badge variant="secondary">
                {GAME_MODE_LABELS[meetSession.gameMode]}
              </Badge>
            </TableCell>
            <TableCell className="text-muted-foreground">
              {MEET_FORMAT_LABELS[meetSession.meetFormat]}
            </TableCell>
            <TableCell>{meetSession.venueName}</TableCell>
            <TableCell>{meetSession.organiserName}</TableCell>
            <TableCell>
              {meetSession.participantCount}/{meetSession.maxParticipants}
            </TableCell>
            <TableCell>
              <MeetSessionStatusBadge status={meetSession.status} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
