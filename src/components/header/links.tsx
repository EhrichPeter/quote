"use client";

import { QuoteIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Links = () => {
  const pathname = usePathname();

  const linkClass = (href: string) =>
    `transition-colors hover:text-foreground whitespace-nowrap ${
      pathname === href ? "text-foreground" : "text-muted-foreground"
    }`;

  return (
    <>
      <Link
        href="/"
        className="flex items-center gap-2 text-lg font-semibold md:text-base"
      >
        <QuoteIcon className="h-6 w-6" />
        <span className="sr-only">Quote — home</span>
      </Link>
      <Link href="/" className={linkClass("/")}>
        Daily Quote
      </Link>
      <Link href="/library" className={linkClass("/library")}>
        Library
      </Link>
    </>
  );
};

export default Links;
