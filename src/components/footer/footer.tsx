import Link from "next/link";

const Footer = () => {
  return (
    <footer className="border-t py-8 text-center text-xs text-muted-foreground">
      <div className="container flex flex-col items-center gap-2">
        <p>
          Built by{" "}
          <Link
            href="https://github.com/EhrichPeter"
            target="_blank"
            rel="noopener noreferrer"
            className="underline underline-offset-4 hover:text-foreground"
          >
            Peter Ehrich
          </Link>
          . Source on{" "}
          <Link
            href="https://github.com/EhrichPeter/quote"
            target="_blank"
            rel="noopener noreferrer"
            className="underline underline-offset-4 hover:text-foreground"
          >
            GitHub
          </Link>
          .
        </p>
        <p>
          Quotes from{" "}
          <Link
            href="https://zenquotes.io/"
            target="_blank"
            rel="noopener noreferrer"
            className="underline underline-offset-4 hover:text-foreground"
          >
            ZenQuotes
          </Link>{" "}
          · Photos from{" "}
          <Link
            href="https://unsplash.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="underline underline-offset-4 hover:text-foreground"
          >
            Unsplash
          </Link>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
