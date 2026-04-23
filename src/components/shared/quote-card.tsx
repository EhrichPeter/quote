"use client";

import { toggleBookmark } from "@/server/bookmarks/actions";
import { QuoteWithBookMark } from "@/server/quotes/models";
import {
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
import { cn } from "@/lib/utils";

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
    onSuccess: (result) => {
      const serverError = result?.serverError;
      const new_state = result?.data;
      if (serverError) {
        toast("Almost there!", {
          description:
            typeof serverError === "string" ? serverError : undefined,
        });
        return;
      }
      toast(new_state ? "Bookmark saved" : "Bookmark removed");
      queryClient.invalidateQueries({ queryKey: ["quotes"] });
      queryClient.invalidateQueries({ queryKey: ["latestQuote"] });
    },
    onError: () => {
      toast("Something went wrong", {
        description: "Please try again in a moment.",
      });
    },
  });

  const [copied, setCopied] = useState(false);
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(`"${quote}" — ${author}`);
      setCopied(true);
      toast("Copied");
      setTimeout(() => setCopied(false), 1800);
    } catch {
      toast("Couldn't copy", {
        description: "Clipboard access was blocked.",
      });
    }
  };

  return (
    <figure className="group relative flex w-full flex-col overflow-hidden rounded-2xl border border-border/70 bg-card transition-[transform,box-shadow,border-color] duration-500 ease-out hover:-translate-y-0.5 hover:border-border hover:shadow-[0_20px_40px_-24px_hsl(var(--foreground)/0.2)]">
      <div className="relative isolate aspect-[4/3] w-full overflow-hidden border-b border-border/70">
        <Image
          src={picture_link}
          alt={picture_alt}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="transform-gpu object-cover transition-transform duration-700 ease-out [backface-visibility:hidden] group-hover:scale-[1.03]"
          priority
        />
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/35 to-transparent"
        />

        <blockquote className="absolute inset-x-0 bottom-0 flex flex-col items-center gap-3 px-6 pb-7 pt-14 text-center text-white sm:px-8">
          <p className="font-display line-clamp-5 text-balance text-xl leading-snug sm:text-2xl">
            &ldquo;{quote}&rdquo;
          </p>
          <figcaption className="text-[10px] font-medium uppercase tracking-[0.22em] text-white/75">
            {author}
          </figcaption>
        </blockquote>
      </div>

      <div className="flex items-center justify-between gap-2 px-4 py-2.5">
        <span className="text-xs text-muted-foreground">
          {dayjs(created_at).format("MMM D, YYYY")}
        </span>
        <div className="flex items-center gap-0.5">
          {bookmarks.length > 0 && (
            <span className="mr-2 inline-flex items-center gap-1 text-xs text-muted-foreground">
              <BookmarkIcon className="h-3 w-3" />
              {bookmarks.length}
            </span>
          )}
          <Button
            variant="ghost"
            size="icon"
            onClick={handleCopy}
            aria-label="Copy quote"
            title="Copy quote"
            className="h-8 w-8 rounded-full"
          >
            <span className="relative block h-4 w-4">
              <CopyIcon
                className={cn(
                  "absolute inset-0 h-4 w-4 transition-all duration-200",
                  copied ? "scale-50 opacity-0" : "scale-100 opacity-100"
                )}
              />
              <CheckIcon
                className={cn(
                  "absolute inset-0 h-4 w-4 transition-all duration-200",
                  copied ? "scale-100 opacity-100" : "scale-50 opacity-0"
                )}
              />
            </span>
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
            ) : (
              <BookmarkIcon
                className={cn(
                  "h-4 w-4 transition-all duration-200",
                  bookmarked
                    ? "scale-110 fill-current text-foreground"
                    : "scale-100 text-muted-foreground"
                )}
              />
            )}
          </Button>
        </div>
      </div>
    </figure>
  );
};

export default QuoteCard;
