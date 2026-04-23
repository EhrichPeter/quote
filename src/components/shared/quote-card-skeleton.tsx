const QuoteCardSkeleton = () => {
  return (
    <div className="flex w-full flex-col overflow-hidden rounded-2xl border border-border/70 bg-card">
      <div className="relative aspect-[4/3] w-full animate-pulse border-b border-border/70 bg-muted" />
      <div className="flex items-center justify-between gap-2 px-4 py-2.5">
        <div className="h-3.5 w-24 animate-pulse rounded bg-muted" />
        <div className="flex items-center gap-1">
          <div className="h-8 w-8 animate-pulse rounded-full bg-muted" />
          <div className="h-8 w-8 animate-pulse rounded-full bg-muted" />
        </div>
      </div>
    </div>
  );
};

export default QuoteCardSkeleton;
