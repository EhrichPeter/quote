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
      <div className="flex flex-col items-center w-full gap-8">
        <QuoteCardSkeleton />
        <QuoteCardSkeleton />
      </div>
    );
  }

  if (filteredQuotes.length === 0) {
    return <NoQuotes />;
  }

  return (
    <div className="flex flex-col items-center w-full gap-8">
      {filteredQuotes.map((quote: QuoteWithBookMark) => (
        <QuoteCard key={quote.id} {...quote} />
      ))}
      <div ref={ref} className="h-8 flex items-center justify-center">
        {fetchStatus === "fetching" ? (
          <LoaderIcon className="animate-spin text-muted-foreground" />
        ) : null}
      </div>
    </div>
  );
};

export default QuoteList;
