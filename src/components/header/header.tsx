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
    <header className="sticky top-0 z-10 flex h-16 items-center justify-between gap-4 border-b bg-background/80 px-4 backdrop-blur md:px-6">
      <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
        <Links />
      </nav>
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="shrink-0 md:hidden">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left">
          <nav className="grid gap-6 text-lg font-medium">
            <Links />
          </nav>
        </SheetContent>
      </Sheet>
      <div className="flex items-center gap-2 md:gap-3">
        <ModeToggle />
        {user ? (
          <UserDropdown email={user.email} />
        ) : (
          <Button asChild>
            <Link href="/login">Log in</Link>
          </Button>
        )}
      </div>
    </header>
  );
}
