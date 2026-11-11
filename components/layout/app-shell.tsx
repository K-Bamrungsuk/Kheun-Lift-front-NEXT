import Link from "next/link";
import { Icon } from "@/components/ui/icon";
import { AppNavigation } from "./app-navigation";

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-dvh bg-background text-foreground">
      <a className="skip-link" href="#main-content">Skip to content</a>
      <header className="sticky top-0 z-40 border-b border-border/60 bg-surface-low/95 pt-[env(safe-area-inset-top)] backdrop-blur-xl">
        <div className="mx-auto flex min-h-20 max-w-6xl items-center justify-between gap-4 px-4 md:px-8">
          <Link href="/dashboard" className="flex min-h-11 shrink-0 items-center gap-3" aria-label="Kheun Lift home">
            <span className="grid size-11 place-items-center rounded-xl bg-surface text-accent"><Icon name="shieldCheck" className="size-6" /></span>
            <span><span className="block font-mono text-xs font-semibold tracking-[0.2em] text-accent">KHEUN LIFT</span><span className="mt-0.5 block text-sm text-muted">Your strength. On record.</span></span>
          </Link>
          <div className="hidden md:block"><AppNavigation /></div>
          <Link href="/profile" aria-label="View athlete profile" className="grid size-11 shrink-0 place-items-center rounded-full border border-accent/30 bg-surface-high font-semibold text-accent md:hidden">K</Link>
        </div>
      </header>
      <main id="main-content" tabIndex={-1} className="mx-auto max-w-xl space-y-6 px-4 pb-[calc(8rem+env(safe-area-inset-bottom))] pt-6 md:max-w-6xl md:px-8 md:pb-12 md:pt-10">
        <p role="note" className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs leading-5 text-muted"><span className="rounded border border-accent/25 bg-accent/10 px-2 py-0.5 font-mono text-[10px] font-semibold uppercase tracking-wider text-accent">Demo preview</span>Sample data. Account changes and lift saving are not connected.</p>
        {children}
      </main>
      <AppNavigation mobile />
    </div>
  );
}
