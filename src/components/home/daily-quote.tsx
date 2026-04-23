"use client";
import dayjs from "dayjs";
import QuoteCard from "../shared/quote-card";
import QuoteCardSkeleton from "../shared/quote-card-skeleton";
import { useGetLatestQuote } from "@/data/get-latest-quote";

const DailyQuote = () => {
  const { data: quote, isPending, isError } = useGetLatestQuote();

  return (
    <div className="flex w-full flex-col items-center gap-10">
      <div className="flex flex-col items-center gap-2 text-center">
        <p className="text-xs font-medium uppercase tracking-[0.22em] text-muted-foreground">
          {dayjs().format("dddd, MMMM D")}
        </p>
        <h1 className="font-display text-3xl tracking-tight sm:text-4xl">
          Today&apos;s quote
        </h1>
      </div>

      <div className="w-full max-w-2xl">
        {isPending ? (
          <QuoteCardSkeleton />
        ) : isError || !quote ? (
          <p className="text-center text-sm text-muted-foreground">
            Couldn&apos;t load today&apos;s quote. Please refresh and try again.
          </p>
        ) : (
          <QuoteCard {...quote} />
        )}
      </div>
    </div>
  );
};

export default DailyQuote;
