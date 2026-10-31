import Link from "next/link";
import { Icon } from "@/components/ui/icon";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-zinc-950 px-5 py-8 text-white">
      <a className="skip-link" href="#account-content">Skip to content</a>
      <Link href="/" className="mx-auto flex w-fit items-center gap-2 font-black" aria-label="Kheun Lift home">
        <span className="rounded-xl bg-yellow-400 p-2 text-black"><Icon name="dumbbell" /></span>
        <span>KHEUN <span className="text-yellow-400">LIFT</span></span>
      </Link>
      <main id="account-content" tabIndex={-1} className="mx-auto mt-12 max-w-md rounded-3xl border border-zinc-800 bg-black p-6 sm:p-8">
        {children}
      </main>
    </div>
  );
}
