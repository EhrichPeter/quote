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

export const metadata: Metadata = {
  title: "Library",
  description: "Browse the full collection of inspiring daily quotes.",
};

export default async function Library() {
  const supabase = createClient();
  const { user } = (await supabase.auth.getUser()).data;

  const queryClient = new QueryClient();
  await queryClient.prefetchInfiniteQuery({
    queryKey: ["quotes"],
    queryFn: ({ pageParam }) => findMany({ pageParam }),
    initialPageParam: 0,
  });

  return (
    <main className="flex flex-col items-center w-full gap-8">
      <div className="grid text-center">
        <h1 className="text-4xl font-bold tracking-tight">Library</h1>
        <p className="text-balance text-muted-foreground">
          A collection of inspiring quotes.
        </p>
      </div>

      {!user && <NotLoggedIn />}

      <HydrationBoundary state={dehydrate(queryClient)}>
        <Filter />
        <QuoteList />
      </HydrationBoundary>
    </main>
  );
}
