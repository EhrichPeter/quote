"use client";

import { useGetQuotes } from "@/data/get-quotes";
import QuoteCard from "./quote-card";
import QuoteCardSkeleton from "./quote-card-skeleton";
import { useInView } from "react-intersection-observer";
import { useEffect, useMemo } from "react";
import { QuoteWithBookMark } from "@/server/quotes/models";
import { LoaderIcon } from "lucide-react";
import { useSearchParams } from "next/navigation";
import NoQuotes from "../library/no-quotes";

const QuoteList = () => {
  const {
    data: quotePages,
    fetchNextPage,
    fetchStatus,
    hasNextPage,
    isPending,
  } = useGetQuotes();

  const searchParams = useSearchParams();
  const currentTag = searchParams.get("tag");

  const filteredQuotes = useMemo(() => {
    if (!quotePages) return [];
    const all = quotePages.pages.flatMap((page) => page.data);
    if (currentTag === "bookmarked") {
      return all.filter((q) => q.bookmarked);
    }
    return all;
  }, [currentTag, quotePages]);

  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);

  if (isPending) {
    return (
      <div className="grid w-full grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <div className="sm:col-span-2">
          <QuoteCardSkeleton />
        </div>
        <QuoteCardSkeleton />
        <QuoteCardSkeleton />
        <QuoteCardSkeleton />
      </div>
    );
  }

  if (filteredQuotes.length === 0) {
    return (
      <div className="flex w-full justify-center">
        <NoQuotes />
      </div>
    );
  }

  return (
    <div className="flex w-full flex-col gap-10">
      <div className="grid w-full grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filteredQuotes.map((quote: QuoteWithBookMark, i) => (
          <div
            key={quote.id}
            className={i === 0 ? "sm:col-span-2" : undefined}
          >
            <QuoteCard {...quote} />
          </div>
        ))}
      </div>
      <div
        ref={ref}
        className="flex h-10 items-center justify-center text-muted-foreground"
      >
        {fetchStatus === "fetching" ? (
          <LoaderIcon className="h-4 w-4 animate-spin" />
        ) : null}
      </div>
    </div>
  );
};

export default QuoteList;
