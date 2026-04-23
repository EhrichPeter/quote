"use client";
import { SparklesIcon } from "lucide-react";
import dayjs from "dayjs";
import QuoteCard from "../shared/quote-card";
import QuoteCardSkeleton from "../shared/quote-card-skeleton";
import { useGetLatestQuote } from "@/data/get-latest-quote";

const DailyQuote = () => {
  const { data: quote, isPending, isError } = useGetLatestQuote();

  return (
    <div className="flex w-full flex-col items-center gap-10">
      <div className="flex flex-col items-center gap-5 text-center">
        <span className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-background/60 px-3 py-1 text-xs font-medium text-muted-foreground backdrop-blur">
          <SparklesIcon className="h-3.5 w-3.5 text-primary" />
          {dayjs().format("dddd, MMMM D")}
        </span>
        <h1 className="font-display text-5xl font-normal leading-[1.05] tracking-tight sm:text-6xl md:text-7xl">
          <span className="text-gradient">Daily inspiration</span>
          <br />
          <span className="text-foreground">for your work &amp; life.</span>
        </h1>
        <p className="max-w-xl text-balance text-muted-foreground sm:text-lg">
          A new handpicked quote every day, paired with a beautiful photo. Save
          the ones that move you.
        </p>
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
