"use client";

import Link from "next/link";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { formatDateTime, formatFullName } from "@/lib/format";
import type { DashboardStats } from "@/server/dashboard/api";
import { StatCard } from "./stat-card";

export function DashboardScreen({ stats }: { stats: DashboardStats }) {
  return (
    <div className="space-y-6">
      <h1 className="text-xl font-semibold">Dashboard</h1>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Players" value={stats.totalPlayers} />
        <StatCard label="Venues" value={stats.totalVenues} />
        <StatCard label="Sessions" value={stats.totalSessions} />
        <StatCard
          label="In progress"
          value={stats.sessionsByStatus.IN_PROGRESS}
          hint="Sessions running now"
        />
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-baseline justify-between">
              Upcoming sessions
              <Link
                href="/admin/sessions"
                className="text-sm font-normal text-primary hover:underline"
              >
                View all
              </Link>
            </CardTitle>
          </CardHeader>
          <CardContent>
            {stats.upcomingSessions.length === 0 ? (
              <p className="py-6 text-center text-sm text-muted-foreground">
                No upcoming sessions.
              </p>
            ) : (
              <ul className="divide-y divide-border">
                {stats.upcomingSessions.map((session) => (
                  <li
                    key={session.id}
                    className="flex items-center justify-between py-2.5"
                  >
                    <div>
                      <p className="text-sm font-medium">{session.title}</p>
                      <p className="text-xs text-muted-foreground">
                        {session.venueName}
                      </p>
                    </div>
                    <span className="text-sm text-muted-foreground">
                      {formatDateTime({ value: session.startsAt })}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-baseline justify-between">
              New players
              <Link
                href="/admin/players"
                className="text-sm font-normal text-primary hover:underline"
              >
                View all
              </Link>
            </CardTitle>
          </CardHeader>
          <CardContent>
            {stats.recentPlayers.length === 0 ? (
              <p className="py-6 text-center text-sm text-muted-foreground">
                No players yet.
              </p>
            ) : (
              <ul className="divide-y divide-border">
                {stats.recentPlayers.map((player) => (
                  <li
                    key={player.id}
                    className="flex items-center justify-between py-2.5"
                  >
                    <p className="text-sm font-medium">
                      {formatFullName({
                        firstName: player.firstName,
                        lastName: player.lastName,
                        fallback: player.username,
                      })}
                    </p>
                    <span className="text-sm text-muted-foreground">
                      @{player.username}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
