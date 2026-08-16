import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatDate } from "@/lib/format";
import type { VenueRow } from "@/lib/types";

export function VenuesTable({ venues }: { venues: VenueRow[] }) {
  if (venues.length === 0) {
    return (
      <p className="py-12 text-center text-sm text-muted-foreground">
        No venues found.
      </p>
    );
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Address</TableHead>
          <TableHead>City</TableHead>
          <TableHead>Country</TableHead>
          <TableHead>Added</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {venues.map((venue) => (
          <TableRow key={venue.id}>
            <TableCell className="font-medium">{venue.name}</TableCell>
            <TableCell className="text-muted-foreground">
              {venue.addressFull}
            </TableCell>
            <TableCell>{venue.city}</TableCell>
            <TableCell>{venue.country}</TableCell>
            <TableCell>{formatDate({ value: venue.createdAt })}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
