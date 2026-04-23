import Link from "next/link";

const NoQuotes = () => {
  return (
    <div className="flex w-full max-w-md flex-col items-center gap-2 rounded-2xl border border-dashed border-border/70 px-6 py-10 text-center">
      <p className="text-sm font-medium">Nothing here yet.</p>
      <p className="text-sm text-muted-foreground">
        Try{" "}
        <Link
          href="/library"
          className="font-medium text-foreground underline-offset-4 hover:underline"
        >
          viewing all quotes
        </Link>
        .
      </p>
    </div>
  );
};

export default NoQuotes;
