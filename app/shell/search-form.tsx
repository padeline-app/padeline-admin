import { MagnifyingGlassIcon } from "@phosphor-icons/react/dist/ssr";
import { Input } from "@/components/ui/input";

// Plain GET form — search state lives in the URL (?q=), no client JS.
export function SearchForm({
  placeholder,
  defaultValue,
}: {
  placeholder: string;
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
        placeholder={placeholder}
        defaultValue={defaultValue}
        className="pl-9"
      />
    </form>
  );
}
