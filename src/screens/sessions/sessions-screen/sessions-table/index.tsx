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
import type { ListSessionsResult } from "@/server/sessions/api";
import { StatusBadge } from "../status-badge";

export function SessionsTable({
  sessions,
}: {
  sessions: ListSessionsResult["sessions"];
}) {
  if (sessions.length === 0) {
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
        {sessions.map((session) => (
          <TableRow key={session.id}>
            <TableCell className="font-medium">{session.title}</TableCell>
            <TableCell>{formatDateTime({ value: session.startsAt })}</TableCell>
            <TableCell>
              <Badge variant="secondary">
                {GAME_MODE_LABELS[session.gameMode]}
              </Badge>
            </TableCell>
            <TableCell className="text-muted-foreground">
              {MEET_FORMAT_LABELS[session.meetFormat]}
            </TableCell>
            <TableCell>{session.venueName}</TableCell>
            <TableCell>{session.organiserName}</TableCell>
            <TableCell>
              {session.participantCount}/{session.maxParticipants}
            </TableCell>
            <TableCell>
              <StatusBadge status={session.status} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
