"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const BrandMark = () => (
  <span
    aria-hidden
    className="relative flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-primary/60 text-[13px] font-semibold text-primary-foreground shadow-soft"
  >
    &ldquo;
  </span>
);

const Links = () => {
  const pathname = usePathname();

  const linkClass = (href: string) =>
    cn(
      "relative rounded-md px-2 py-1 text-sm font-medium transition-colors whitespace-nowrap",
      pathname === href
        ? "text-foreground"
        : "text-muted-foreground hover:text-foreground"
    );

  return (
    <>
      <Link href="/" className="flex items-center gap-2">
        <BrandMark />
        <span className="text-sm font-semibold tracking-tight">Quote</span>
      </Link>
      <div className="flex items-center gap-1">
        <Link href="/" className={linkClass("/")}>
          Daily
          {pathname === "/" && (
            <span
              aria-hidden
              className="absolute inset-x-2 -bottom-0.5 h-px bg-gradient-to-r from-transparent via-primary to-transparent"
            />
          )}
        </Link>
        <Link href="/library" className={linkClass("/library")}>
          Library
          {pathname === "/library" && (
            <span
              aria-hidden
              className="absolute inset-x-2 -bottom-0.5 h-px bg-gradient-to-r from-transparent via-primary to-transparent"
            />
          )}
        </Link>
      </div>
    </>
  );
};

export default Links;
