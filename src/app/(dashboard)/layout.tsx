import Footer from "@/components/footer/footer";
import { Header } from "@/components/header/header";
import type { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="relative flex min-h-screen flex-col">
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
      >
        <div className="absolute inset-0 bg-grid mask-radial-fade opacity-60" />
        <div className="absolute left-1/2 top-[-10%] h-[520px] w-[820px] -translate-x-1/2 rounded-full bg-primary/20 blur-3xl dark:bg-primary/30" />
        <div className="absolute right-[-10%] top-[30%] h-[380px] w-[520px] rounded-full bg-fuchsia-500/10 blur-3xl dark:bg-fuchsia-500/20" />
      </div>

      <Header />
      <main className="container flex flex-1 flex-col items-center py-12 md:py-16">
        {children}
      </main>
      <Footer />
    </div>
  );
}
