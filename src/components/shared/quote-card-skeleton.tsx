const QuoteCardSkeleton = () => {
  return (
    <div className="flex w-full flex-col overflow-hidden rounded-2xl border border-border/70 bg-card/60 shadow-soft backdrop-blur-sm">
      <div className="relative aspect-[4/3] w-full animate-pulse bg-gradient-to-br from-muted to-muted/50" />
      <div className="flex items-center justify-between gap-2 border-t border-border/60 px-4 py-2.5">
        <div className="h-4 w-28 animate-pulse rounded-md bg-muted" />
        <div className="flex items-center gap-1">
          <div className="h-8 w-8 animate-pulse rounded-full bg-muted" />
          <div className="h-8 w-8 animate-pulse rounded-full bg-muted" />
        </div>
      </div>
    </div>
  );
};

export default QuoteCardSkeleton;
