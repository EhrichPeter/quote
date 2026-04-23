import Filter from "@/components/library/filter";
import NotLoggedIn from "@/components/library/not-logged-in";
import QuoteList from "@/components/shared/quote-list";
import { findMany } from "@/server/quotes/queries";
import { createClient } from "@/utils/supabase/server";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import type { Metadata } from "next";
import { LibraryIcon } from "lucide-react";

export const metadata: Metadata = {
  title: "Library",
  description: "Browse the full collection of inspiring daily quotes.",
};

export default async function Library() {
  const supabase = await createClient();
  const { user } = (await supabase.auth.getUser()).data;

  const queryClient = new QueryClient();
  await queryClient.prefetchInfiniteQuery({
    queryKey: ["quotes"],
    queryFn: ({ pageParam }) => findMany({ pageParam }),
    initialPageParam: 0,
  });

  return (
    <div className="flex w-full flex-col items-center gap-10">
      <div className="flex flex-col items-center gap-4 text-center">
        <span className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-background/60 px-3 py-1 text-xs font-medium text-muted-foreground backdrop-blur">
          <LibraryIcon className="h-3.5 w-3.5 text-primary" />
          The archive
        </span>
        <h1 className="font-display text-5xl font-normal leading-[1.05] tracking-tight sm:text-6xl">
          <span className="text-gradient">Every quote</span>, in one place.
        </h1>
        <p className="max-w-lg text-balance text-muted-foreground sm:text-lg">
          Scroll through the full archive, filter your bookmarks, and copy any
          line you&apos;d like to carry with you.
        </p>
      </div>

      {!user && (
        <div className="w-full max-w-2xl">
          <NotLoggedIn />
        </div>
      )}

      <HydrationBoundary state={dehydrate(queryClient)}>
        <Filter />
        <QuoteList />
      </HydrationBoundary>
    </div>
  );
}
