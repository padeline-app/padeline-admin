import { MagnifyingGlassIcon } from "@phosphor-icons/react";
import { Input } from "@/components/ui/input";

export function PlayersSearchForm({
  defaultValue,
}: {
  defaultValue?: string;
}) {
  return (
    <form className="relative w-full max-w-xs">
      <MagnifyingGlassIcon
        size={16}
        className="absolute top-1/2 left-3 -translate-y-1/2 text-muted-foreground"
      />
      <Input
        type="search"
        name="q"
        placeholder="Search players…"
        defaultValue={defaultValue}
        className="pl-9"
      />
    </form>
  );
}
