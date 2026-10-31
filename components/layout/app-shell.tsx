import Link from "next/link";
import { Icon } from "@/components/ui/icon";
import { AppNavigation } from "./app-navigation";

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-black text-white">
      <a className="skip-link" href="#main-content">Skip to content</a>
      <header className="hidden border-b border-zinc-800 bg-zinc-950 md:block">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-8 py-4">
          <Link href="/dashboard" className="flex shrink-0 items-center gap-2 font-black" aria-label="Kheun Lift home">
            <span className="rounded-xl bg-yellow-400 p-2 text-black"><Icon name="dumbbell" className="size-[22px]" /></span>
            <span>KHEUN <span className="text-yellow-400">LIFT</span></span>
          </Link>
          <AppNavigation />
        </div>
      </header>
      <main id="main-content" tabIndex={-1} className="mx-auto max-w-md space-y-4 px-4 pb-[calc(7rem+env(safe-area-inset-bottom))] pt-6 md:max-w-6xl md:px-8 md:pb-10 md:pt-10">
        {children}
      </main>
      <AppNavigation mobile />
    </div>
  );
}
