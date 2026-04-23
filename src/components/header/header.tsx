import { Menu } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { createClient } from "@/utils/supabase/server";
import Link from "next/link";
import { ModeToggle } from "../ui/mode-toggle";
import Links from "./links";
import { UserDropdown } from "./user-dropdown";

export async function Header() {
  const supabase = createClient();
  const { user } = (await supabase.auth.getUser()).data;

  return (
    <header className="sticky top-0 z-30 border-b border-border/60 bg-background/70 backdrop-blur-xl supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between gap-4 px-4 md:px-6">
        <nav className="hidden items-center gap-6 md:flex">
          <Links />
        </nav>

        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="shrink-0 md:hidden"
            >
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle navigation menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left">
            <nav className="mt-6 grid gap-4 text-base font-medium">
              <Links />
            </nav>
          </SheetContent>
        </Sheet>

        <div className="flex items-center gap-2">
          <ModeToggle />
          {user ? (
            <UserDropdown email={user.email} />
          ) : (
            <Button asChild size="sm" className="rounded-full px-4">
              <Link href="/login">Log in</Link>
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}
