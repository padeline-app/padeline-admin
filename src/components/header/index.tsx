"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { RoleBadge, ROLE_HINTS } from "@/components/role-badge";
import { signOut } from "@/server/auth/actions";
import { useAdminAuth } from "@/lib/firebase/admin-auth";

export function Header() {
  const { user } = useAdminAuth();
  if (!user) return null;
  const initial = (user.name ?? user.email ?? "?").charAt(0).toUpperCase();

  return (
    <header className="flex h-14 items-center justify-end border-b border-border bg-card px-6">
      <DropdownMenu>
        <DropdownMenuTrigger
          render={
            <Button variant="ghost" className="gap-2 px-2">
              <Avatar className="size-7">
                <AvatarImage src={user.picture ?? undefined} />
                <AvatarFallback>{initial}</AvatarFallback>
              </Avatar>
              <span className="text-sm font-medium">
                {user.name ?? user.email}
              </span>
            </Button>
          }
        />
        <DropdownMenuContent align="end">
          <DropdownMenuLabel className="font-normal text-muted-foreground">
            {user.email}
          </DropdownMenuLabel>
          <DropdownMenuLabel className="flex items-center gap-2 pt-0">
            <RoleBadge role={user.role} />
            <span className="text-xs font-normal text-muted-foreground">
              {ROLE_HINTS[user.role]}
            </span>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <form action={signOut}>
            <DropdownMenuItem
              render={<button type="submit" className="w-full" />}
            >
              Sign out
            </DropdownMenuItem>
          </form>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  );
}
