import Link from "next/link";

const Footer = () => {
  return (
    <footer className="mt-16 border-t border-border/60 bg-background/40 py-8 backdrop-blur">
      <div className="container flex flex-col items-center gap-3 text-center text-xs text-muted-foreground sm:flex-row sm:justify-between sm:text-left">
        <div className="flex items-center gap-2">
          <span
            aria-hidden
            className="flex h-6 w-6 items-center justify-center rounded-md bg-gradient-to-br from-primary to-primary/60 text-[11px] font-semibold text-primary-foreground"
          >
            &ldquo;
          </span>
          <span>
            Built by{" "}
            <Link
              href="https://github.com/EhrichPeter"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-foreground/80 underline-offset-4 hover:underline"
            >
              Peter Ehrich
            </Link>
          </span>
        </div>

        <p>
          Quotes from{" "}
          <Link
            href="https://zenquotes.io/"
            target="_blank"
            rel="noopener noreferrer"
            className="underline-offset-4 hover:text-foreground hover:underline"
          >
            ZenQuotes
          </Link>{" "}
          · Photos from{" "}
          <Link
            href="https://unsplash.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="underline-offset-4 hover:text-foreground hover:underline"
          >
            Unsplash
          </Link>{" "}
          · Source on{" "}
          <Link
            href="https://github.com/EhrichPeter/quote"
            target="_blank"
            rel="noopener noreferrer"
            className="underline-offset-4 hover:text-foreground hover:underline"
          >
            GitHub
          </Link>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
