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
  description: "Browse the full collection of quotes.",
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
    <div className="flex w-full flex-col gap-10">
      <div className="flex flex-col items-center gap-2 text-center">
        <p className="text-xs font-medium uppercase tracking-[0.22em] text-muted-foreground">
          The archive
        </p>
        <h1 className="font-display text-3xl tracking-tight sm:text-4xl">
          Library
        </h1>
      </div>

      {!user && (
        <div className="mx-auto w-full max-w-2xl">
          <NotLoggedIn />
        </div>
      )}

      <HydrationBoundary state={dehydrate(queryClient)}>
        <div className="flex justify-center">
          <Filter />
        </div>
        <QuoteList />
      </HydrationBoundary>
    </div>
  );
}
