"use client";

import {
  usePathname,
  useRouter,
  useSearchParams,
} from "next/dist/client/components/navigation";
import { cn } from "@/lib/utils";

const FILTERS = [
  { key: null, label: "All" },
  { key: "bookmarked", label: "Bookmarked" },
] as const;

export const Filter = () => {
  const pathname = usePathname();
  const { replace } = useRouter();
  const searchParams = useSearchParams();
  const currentTag = searchParams.get("tag");

  const setFilter = (term: string | null) => {
    const params = new URLSearchParams();
    if (term) params.set("tag", term);
    replace(`${pathname}${params.toString() ? `?${params.toString()}` : ""}`);
  };

  return (
    <div
      role="tablist"
      aria-label="Filter quotes"
      className="inline-flex items-center gap-1 rounded-full border border-border/70 bg-card p-1"
    >
      {FILTERS.map(({ key, label }) => {
        const active = (currentTag ?? null) === key;
        return (
          <button
            key={key ?? "all"}
            role="tab"
            aria-selected={active}
            onClick={() => setFilter(key)}
            className={cn(
              "rounded-full px-4 py-1.5 text-sm transition-colors",
              active
                ? "bg-foreground text-background"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            {label}
          </button>
        );
      })}
    </div>
  );
};

export default Filter;
