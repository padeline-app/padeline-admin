"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BuildingsIcon,
  CalendarDotsIcon,
  ShieldCheckIcon,
  SquaresFourIcon,
  UsersIcon,
} from "@phosphor-icons/react";
import { cn } from "@/lib/utils";

export function Sidebar() {
  const pathname = usePathname();

  const navItems = [
    { href: "/admin", label: "Dashboard", icon: SquaresFourIcon },
    { href: "/admin/venues", label: "Venues", icon: BuildingsIcon },
    { href: "/admin/players", label: "Players", icon: UsersIcon },
    { href: "/admin/sessions", label: "Sessions", icon: CalendarDotsIcon },
    { href: "/admin/admins", label: "Admins", icon: ShieldCheckIcon },
  ];

  return (
    <aside className="flex w-56 shrink-0 flex-col border-r border-sidebar-border bg-sidebar">
      <div className="flex h-14 items-center border-b border-sidebar-border px-4">
        <span className="font-semibold text-sidebar-primary">Padeline</span>
        <span className="ml-1.5 text-sm text-muted-foreground">Admin</span>
      </div>
      <nav className="flex flex-col gap-1 p-2">
        {navItems.map(({ href, label, icon: Icon }) => {
          const active =
            href === "/admin" ? pathname === "/admin" : pathname.startsWith(href);
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                "flex items-center gap-2.5 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                active
                  ? "bg-sidebar-accent text-sidebar-accent-foreground"
                  : "text-muted-foreground hover:bg-sidebar-accent/60 hover:text-sidebar-accent-foreground",
              )}
            >
              <Icon size={18} weight={active ? "fill" : "regular"} />
              {label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
