import { Menu } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { createClient } from "@/utils/supabase/server";
import Link from "next/link";
import { ModeToggle } from "../ui/mode-toggle";
import Links from "./links";
import { UserDropdown } from "./user-dropdown";

export async function Header() {
  const supabase = await createClient();
  const { user } = (await supabase.auth.getUser()).data;

  return (
    <header className="sticky top-0 z-30 border-b border-border/60 bg-background/80 backdrop-blur-md supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between gap-6 px-4 md:px-6">
        <div className="hidden items-center gap-8 md:flex">
          <Links />
        </div>

        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="shrink-0 md:hidden"
            >
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle navigation menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left">
            <div className="mt-6 flex flex-col gap-6 text-base">
              <Links />
            </div>
          </SheetContent>
        </Sheet>

        <div className="flex items-center gap-1">
          <ModeToggle />
          {user ? (
            <UserDropdown email={user.email} />
          ) : (
            <Button asChild variant="ghost" size="sm" className="text-sm">
              <Link href="/login">Sign in</Link>
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}
