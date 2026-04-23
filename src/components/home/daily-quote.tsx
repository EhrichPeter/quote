"use client";
import QuoteCard from "../shared/quote-card";
import QuoteCardSkeleton from "../shared/quote-card-skeleton";
import { useGetLatestQuote } from "@/data/get-latest-quote";

const DailyQuote = () => {
  const { data: quote, isPending, isError } = useGetLatestQuote();

  return (
    <div className="flex flex-col items-center w-full gap-8">
      <div className="grid text-center">
        <h1 className="text-4xl font-bold tracking-tight">Quote of the day</h1>
        <p className="text-balance text-muted-foreground">
          Your daily dose of inspiration.
        </p>
      </div>
      {isPending ? (
        <QuoteCardSkeleton />
      ) : isError || !quote ? (
        <p className="text-sm text-muted-foreground">
          Couldn&apos;t load today&apos;s quote. Please refresh and try again.
        </p>
      ) : (
        <QuoteCard {...quote} />
      )}
    </div>
  );
};

export default DailyQuote;
