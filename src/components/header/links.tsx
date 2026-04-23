"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const Links = () => {
  const pathname = usePathname();

  const linkClass = (href: string) =>
    cn(
      "text-sm transition-colors whitespace-nowrap",
      pathname === href
        ? "text-foreground"
        : "text-muted-foreground hover:text-foreground"
    );

  return (
    <>
      <Link
        href="/"
        className="font-display text-lg tracking-tight text-foreground"
      >
        Quote
      </Link>
      <nav className="flex items-center gap-5">
        <Link href="/" className={linkClass("/")}>
          Today
        </Link>
        <Link href="/library" className={linkClass("/library")}>
          Library
        </Link>
      </nav>
    </>
  );
};

export default Links;
