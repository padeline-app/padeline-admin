"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Pagination } from "@/components/pagination";
import type { ListVenuesResult } from "@/server/venues/api";
import { VenuesSearchForm } from "./search-form";
import { VenuesTable } from "./venues-table";

export function VenuesScreen({
  venues,
  total,
  search,
  page,
}: {
  venues: ListVenuesResult["venues"];
  total: number;
  search?: string;
  page: number;
}) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-semibold">Venues</h1>
          <p className="text-sm text-muted-foreground">
            {total} venue{total === 1 ? "" : "s"}
          </p>
        </div>
        <VenuesSearchForm defaultValue={search} />
      </div>
      <Card>
        <CardContent>
          <VenuesTable venues={venues} />
        </CardContent>
      </Card>
      <Pagination page={page} total={total} />
    </div>
  );
}
