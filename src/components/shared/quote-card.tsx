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
import { Badge } from "../ui/badge";
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
        toast("Almost there!", {
          description: serverError,
        });
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
    <figure className="group relative w-full md:w-2/3 lg:w-1/2 overflow-hidden rounded-xl border bg-card shadow-sm transition-shadow duration-300 ease-in-out hover:shadow-xl">
      <div className="relative aspect-[16/10] w-full overflow-hidden">
        <Image
          src={picture_link}
          alt={picture_alt}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 66vw, 50vw"
          className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
          priority
        />
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/10"
        />

        <blockquote className="absolute inset-0 flex flex-col items-center justify-end gap-2 p-6 text-center text-white sm:p-10">
          <p className="text-balance text-lg font-semibold italic leading-snug drop-shadow-md sm:text-2xl">
            &ldquo;{quote}&rdquo;
          </p>
          <figcaption className="text-sm font-medium text-white/80 sm:text-base">
            — {author}
          </figcaption>
        </blockquote>

        <div className="absolute left-4 top-4 flex flex-wrap gap-2">
          <Badge variant="secondary" className="backdrop-blur-sm">
            {dayjs(created_at).format("MMM D, YYYY")}
          </Badge>
          <Badge variant="secondary" className="gap-1 backdrop-blur-sm">
            <BookmarkIcon size={10} /> {bookmarks.length}
          </Badge>
        </div>
      </div>

      <div className="flex items-center justify-end gap-1 border-t bg-card p-2">
        <Button
          variant="ghost"
          size="icon"
          onClick={handleCopy}
          aria-label="Copy quote"
          title="Copy quote"
        >
          {copied ? (
            <CheckIcon className="h-4 w-4" />
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
        >
          {isPending ? (
            <LoaderIcon className="h-4 w-4 animate-spin" />
          ) : bookmarked ? (
            <BookmarkCheckIcon className="h-4 w-4" />
          ) : (
            <BookmarkIcon className="h-4 w-4" />
          )}
        </Button>
      </div>
    </figure>
  );
};

export default QuoteCard;
