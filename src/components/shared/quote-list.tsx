"use client";

import { useGetQuotes } from "@/data/get-quotes";
import { Button } from "../ui/button";
import QuoteCard from "./quote-card";
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
  } = useGetQuotes();

  const searchParams = useSearchParams();
  const currentTag = searchParams.get("tag");

  const filteredData = useMemo(() => {
    if (currentTag && quotePages) {
      return quotePages.pages.map((page) =>
        page.data.filter((quote) => quote.bookmarked)
      );
    }

    return quotePages?.pages.map((page) => page.data);
  }, [currentTag, quotePages]);

  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);

  if (!filteredData) {
    return <NoQuotes />;
  }

  return (
    <div className="flex flex-col items-center w-full gap-8">
      {filteredData.map((page) =>
        page.map((quote: QuoteWithBookMark) => (
          <QuoteCard key={quote.id} {...quote} />
        ))
      )}
      <div ref={ref}>
        {fetchStatus === "fetching" ? (
          <LoaderIcon className="animate-spin" />
        ) : null}
      </div>
    </div>
  );
};

export default QuoteList;
