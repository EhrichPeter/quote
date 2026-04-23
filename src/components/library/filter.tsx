"use client";

import {
  usePathname,
  useRouter,
  useSearchParams,
} from "next/dist/client/components/navigation";
import { BookmarkIcon, LayersIcon } from "lucide-react";
import { cn } from "@/lib/utils";

const FILTERS = [
  { key: null, label: "All quotes", icon: LayersIcon },
  { key: "bookmarked", label: "Bookmarked", icon: BookmarkIcon },
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
      className="inline-flex items-center gap-1 rounded-full border border-border/70 bg-card/60 p-1 shadow-soft backdrop-blur"
    >
      {FILTERS.map(({ key, label, icon: Icon }) => {
        const active = (currentTag ?? null) === key;
        return (
          <button
            key={key ?? "all"}
            role="tab"
            aria-selected={active}
            onClick={() => setFilter(key)}
            className={cn(
              "inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-sm font-medium transition-colors",
              active
                ? "bg-primary text-primary-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            <Icon className="h-3.5 w-3.5" />
            {label}
          </button>
        );
      })}
    </div>
  );
};

export default Filter;
