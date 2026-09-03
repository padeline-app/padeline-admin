"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  CaretLeftIcon,
  CaretRightIcon,
} from "@phosphor-icons/react";
import { Button } from "@/components/ui/button";

export function Pagination({
  page,
  total,
  pageSize = 25,
}: {
  page: number;
  total: number;
  pageSize?: number;
}) {
  const searchParams = useSearchParams();
  const pageCount = Math.max(1, Math.ceil(total / pageSize));
  if (pageCount <= 1) return null;

  function pageHref(nextPage: number) {
    const params = new URLSearchParams(searchParams);
    params.set("page", String(nextPage));
    return `?${params.toString()}`;
  }

  return (
    <div className="flex items-center justify-between">
      <p className="text-sm text-muted-foreground">
        Page {page} of {pageCount}
      </p>
      <div className="flex gap-2">
        {page > 1 ? (
          <Button variant="outline" size="sm" render={<Link href={pageHref(page - 1)} />}>
            <CaretLeftIcon size={16} />
            Previous
          </Button>
        ) : null}
        {page < pageCount ? (
          <Button variant="outline" size="sm" render={<Link href={pageHref(page + 1)} />}>
            Next
            <CaretRightIcon size={16} />
          </Button>
        ) : null}
      </div>
    </div>
  );
}
