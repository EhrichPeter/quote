import Footer from "@/components/footer/footer";
import { Header } from "@/components/header/header";
import type { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="container flex flex-1 flex-col items-center px-4 py-16 md:py-24">
        {children}
      </main>
      <Footer />
    </div>
  );
}
