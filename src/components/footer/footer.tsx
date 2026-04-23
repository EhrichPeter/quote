import Link from "next/link";

const Footer = () => {
  return (
    <footer className="border-t border-border/60 py-8">
      <div className="container flex flex-col items-center gap-2 px-4 text-center text-xs text-muted-foreground sm:flex-row sm:justify-between sm:text-left">
        <p>
          Built by{" "}
          <Link
            href="https://github.com/EhrichPeter"
            target="_blank"
            rel="noopener noreferrer"
            className="text-foreground/80 underline-offset-4 hover:underline"
          >
            Peter Ehrich
          </Link>
        </p>
        <p>
          Quotes from{" "}
          <Link
            href="https://zenquotes.io/"
            target="_blank"
            rel="noopener noreferrer"
            className="underline-offset-4 hover:text-foreground hover:underline"
          >
            ZenQuotes
          </Link>
          {" · "}
          Photos from{" "}
          <Link
            href="https://unsplash.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="underline-offset-4 hover:text-foreground hover:underline"
          >
            Unsplash
          </Link>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
