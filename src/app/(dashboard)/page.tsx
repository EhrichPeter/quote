import DailyQuote from "@/components/home/daily-quote";
import AllQuotes from "@/components/home/past-quotes";
import { findMany } from "@/server/quotes/queries";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";

export default async function Home() {
  const queryClient = new QueryClient();
  await queryClient.prefetchInfiniteQuery({
    queryKey: ["quotes"],
    queryFn: ({ pageParam }) => findMany({ pageParam }),
    initialPageParam: 0,
  });

  return (
    <div className="flex flex-col items-center gap-8 pt-6 w-full">
      <HydrationBoundary state={dehydrate(queryClient)}>
        <DailyQuote />
        <AllQuotes />
      </HydrationBoundary>
    </div>
  );
}
