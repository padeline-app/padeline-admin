import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatDate, formatElo, formatFullName } from "@/lib/format";
import type { PlayerRow } from "@/lib/types";

export function PlayersTable({ players }: { players: PlayerRow[] }) {
  if (players.length === 0) {
    return (
      <p className="py-12 text-center text-sm text-muted-foreground">
        No players found.
      </p>
    );
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Player</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Elo Rating</TableHead>
          <TableHead>Account</TableHead>
          <TableHead>Joined</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {players.map((player) => (
          <TableRow key={player.id}>
            <TableCell>
              <div className="flex items-center gap-2.5">
                <Avatar className="size-7">
                  <AvatarImage src={player.profileImageUrl ?? undefined} />
                  <AvatarFallback>
                    {player.username.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">
                    {formatFullName({
                      firstName: player.firstName,
                      lastName: player.lastName,
                      fallback: player.username,
                    })}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    @{player.username}
                  </p>
                </div>
              </div>
            </TableCell>
            <TableCell className="text-muted-foreground">
              {player.email}
            </TableCell>
            <TableCell>{formatElo({ value: player.eloRating })}</TableCell>
            <TableCell>
              {player.isClaimed ? (
                <Badge variant="secondary">Claimed</Badge>
              ) : (
                <Badge variant="outline">Unclaimed</Badge>
              )}
            </TableCell>
            <TableCell>{formatDate({ value: player.createdAt })}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
