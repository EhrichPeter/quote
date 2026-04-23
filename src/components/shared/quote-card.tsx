"use client";

import { toggleBookmark } from "@/server/bookmarks/actions";
import { QuoteWithBookMark } from "@/server/quotes/models";
import {
  BookmarkCheckIcon,
  BookmarkIcon,
  CheckIcon,
  CopyIcon,
  LoaderIcon,
} from "lucide-react";
import Image from "next/image";
import { Button } from "../ui/button";
import dayjs from "dayjs";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useState } from "react";

const QuoteCard = (props: QuoteWithBookMark) => {
  const {
    id,
    picture_alt,
    picture_link,
    author,
    quote,
    bookmarked,
    created_at,
    bookmarks,
  } = props;

  const queryClient = useQueryClient();
  const { isPending, mutate } = useMutation({
    mutationKey: ["quotes"],
    mutationFn: () => toggleBookmark({ quote_id: id }),
    onSuccess: ({ data: new_state, serverError }) => {
      if (serverError) {
        toast("Almost there!", { description: serverError });
        return;
      }
      toast(new_state ? "Bookmark saved" : "Bookmark removed", {
        description: new_state
          ? "You have bookmarked this quote."
          : "You have unbookmarked this quote.",
      });
      queryClient.invalidateQueries({ queryKey: ["quotes"] });
      queryClient.invalidateQueries({ queryKey: ["latestQuote"] });
    },
    onError: () => {
      toast("Something went wrong!", {
        description: "Please try again in a moment.",
      });
    },
  });

  const [copied, setCopied] = useState(false);
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(`"${quote}" — ${author}`);
      setCopied(true);
      toast("Copied to clipboard");
      setTimeout(() => setCopied(false), 1800);
    } catch {
      toast("Couldn't copy", {
        description: "Your browser blocked clipboard access.",
      });
    }
  };

  return (
    <figure className="group relative w-full max-w-2xl overflow-hidden rounded-2xl border border-border/70 bg-card/60 shadow-soft backdrop-blur-sm transition-all duration-300 ease-out hover:-translate-y-0.5 hover:shadow-glow">
      <div className="relative aspect-[16/10] w-full overflow-hidden rounded-t-2xl">
        <Image
          src={picture_link}
          alt={picture_alt}
          fill
          sizes="(max-width: 768px) 100vw, 672px"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
          priority
        />
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/50 to-black/10"
        />
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-tr from-primary/20 via-transparent to-transparent mix-blend-soft-light"
        />

        <div className="absolute left-4 top-4 flex flex-wrap items-center gap-2 text-[11px] font-medium text-white/90">
          <span className="inline-flex items-center gap-1 rounded-full border border-white/20 bg-black/30 px-2.5 py-1 backdrop-blur-md">
            {dayjs(created_at).format("MMM D, YYYY")}
          </span>
          <span className="inline-flex items-center gap-1 rounded-full border border-white/20 bg-black/30 px-2.5 py-1 backdrop-blur-md">
            <BookmarkIcon className="h-3 w-3" /> {bookmarks.length}
          </span>
        </div>

        <blockquote className="absolute inset-x-0 bottom-0 flex flex-col items-center gap-3 px-6 pb-8 pt-20 text-center text-white sm:px-10 sm:pb-10">
          <p className="font-display text-balance text-2xl leading-snug drop-shadow-md sm:text-3xl md:text-4xl">
            &ldquo;{quote}&rdquo;
          </p>
          <figcaption className="text-xs font-medium uppercase tracking-[0.18em] text-white/70">
            — {author}
          </figcaption>
        </blockquote>
      </div>

      <div className="flex items-center justify-between gap-2 border-t border-border/60 bg-card/80 px-4 py-2.5 backdrop-blur">
        <span className="text-xs text-muted-foreground">
          {dayjs(created_at).format("MMM D, YYYY")}
        </span>
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="icon"
            onClick={handleCopy}
            aria-label="Copy quote"
            title="Copy quote"
            className="h-8 w-8 rounded-full"
          >
            {copied ? (
              <CheckIcon className="h-4 w-4 text-primary" />
            ) : (
              <CopyIcon className="h-4 w-4" />
            )}
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => mutate()}
            disabled={isPending}
            aria-label={bookmarked ? "Remove bookmark" : "Bookmark quote"}
            aria-pressed={bookmarked}
            title={bookmarked ? "Remove bookmark" : "Bookmark quote"}
            className="h-8 w-8 rounded-full"
          >
            {isPending ? (
              <LoaderIcon className="h-4 w-4 animate-spin" />
            ) : bookmarked ? (
              <BookmarkCheckIcon className="h-4 w-4 text-primary" />
            ) : (
              <BookmarkIcon className="h-4 w-4" />
            )}
          </Button>
        </div>
      </div>
    </figure>
  );
};

export default QuoteCard;
