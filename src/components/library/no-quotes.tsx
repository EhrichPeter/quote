import { SearchIcon } from "lucide-react";
import Link from "next/link";

const NoQuotes = () => {
  return (
    <div className="flex w-full max-w-md flex-col items-center gap-3 rounded-2xl border border-dashed border-border/70 bg-card/40 px-6 py-10 text-center backdrop-blur">
      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
        <SearchIcon className="h-4 w-4" />
      </div>
      <p className="font-medium">No quotes match your filter.</p>
      <p className="text-sm text-muted-foreground">
        Try a different filter or{" "}
        <Link
          href="/library"
          className="font-medium text-primary underline-offset-4 hover:underline"
        >
          view all quotes
        </Link>
        .
      </p>
    </div>
  );
};

export default NoQuotes;
