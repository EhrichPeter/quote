const QuoteCardSkeleton = () => {
  return (
    <div className="w-full md:w-2/3 lg:w-1/2 overflow-hidden rounded-xl border bg-card shadow-sm">
      <div className="relative aspect-[16/10] w-full animate-pulse bg-muted" />
      <div className="flex items-center justify-end gap-2 border-t p-3">
        <div className="h-8 w-8 animate-pulse rounded-md bg-muted" />
        <div className="h-8 w-8 animate-pulse rounded-md bg-muted" />
      </div>
    </div>
  );
};

export default QuoteCardSkeleton;
