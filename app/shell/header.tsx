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
import type { AdminIdentity } from "@/lib/types";
import { signOut } from "@/screens/sign-in/actions";

export function Header({ identity }: { identity: AdminIdentity }) {
  const initial = (identity.name ?? identity.email ?? "?")
    .charAt(0)
    .toUpperCase();

  return (
    <header className="flex h-14 items-center justify-end border-b border-border bg-card px-6">
      <DropdownMenu>
        <DropdownMenuTrigger
          render={
            <Button variant="ghost" className="gap-2 px-2">
              <Avatar className="size-7">
                <AvatarImage src={identity.picture ?? undefined} />
                <AvatarFallback>{initial}</AvatarFallback>
              </Avatar>
              <span className="text-sm font-medium">
                {identity.name ?? identity.email}
              </span>
            </Button>
          }
        />
        <DropdownMenuContent align="end">
          <DropdownMenuLabel className="font-normal text-muted-foreground">
            {identity.email}
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
