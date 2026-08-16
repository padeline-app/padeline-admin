import { Card, CardContent } from "@/components/ui/card";
import { SearchForm } from "@/app/shell/search-form";
import { listVenues } from "./api";
import { VenuesTable } from "./venues-table";

export async function VenuesScreen({ search }: { search?: string }) {
  const { venues, total } = await listVenues({ search });

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-semibold">Venues</h1>
          <p className="text-sm text-muted-foreground">
            {total} venue{total === 1 ? "" : "s"}
          </p>
        </div>
        <SearchForm placeholder="Search venues…" defaultValue={search} />
      </div>
      <Card>
        <CardContent>
          <VenuesTable venues={venues} />
        </CardContent>
      </Card>
    </div>
  );
}
