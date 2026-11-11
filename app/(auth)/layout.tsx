import Link from "next/link";
import { Icon } from "@/components/ui/icon";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-surface-low px-5 py-8 text-foreground">
      <a className="skip-link" href="#account-content">Skip to content</a>
      <Link href="/" className="mx-auto flex w-fit items-center gap-2 font-black" aria-label="Kheun Lift home">
        <span className="rounded-xl bg-accent p-2 text-background"><Icon name="dumbbell" /></span>
        <span>KHEUN <span className="text-accent">LIFT</span></span>
      </Link>
      <main id="account-content" tabIndex={-1} className="mx-auto mt-12 max-w-md rounded-xl border border-border bg-background p-6 sm:p-8">
        {children}
      </main>
    </div>
  );
}
