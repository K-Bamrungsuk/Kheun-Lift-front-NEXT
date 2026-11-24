import Link from "next/link";
import { Icon } from "@/components/ui/icon";

const points = [
  { icon: "dumbbell", text: "Log squat, bench and deadlift with a video link." },
  { icon: "shieldCheck", text: "Verified lifts go on the leaderboard." },
  { icon: "trophy", text: "Ranked by exercise and weight class." },
] as const;

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="grid min-h-dvh bg-background text-foreground lg:grid-cols-2">
      <a className="skip-link" href="#account-content">
        Skip to content
      </a>
      {/* The brand panel shows on lg and wider only */}
      <aside className="hidden flex-col justify-between border-r border-border bg-surface-low p-12 lg:flex xl:p-16">
        <Logo />
        <p className="text-5xl font-bold leading-[1.1] tracking-tight xl:text-6xl">
          Lift it.
          <br />
          Film it.
          <br />
          <span className="text-accent">Prove it.</span>
        </p>
        <ul className="space-y-4 text-sm text-muted">
          {points.map((point) => (
            <li key={point.icon} className="flex items-center gap-3">
              <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-surface text-accent">
                <Icon name={point.icon} className="size-4" />
              </span>
              {point.text}
            </li>
          ))}
        </ul>
      </aside>
      <div className="flex flex-col lg:justify-center lg:p-16">
        <header className="px-5 pt-8 sm:px-8 lg:hidden">
          <div className="mx-auto max-w-sm">
            <Logo />
            <p className="mt-12 text-5xl font-bold leading-[1.05] tracking-tight">
              Lift it.
              <br />
              Film it.
              <br />
              <span className="text-accent">Prove it.</span>
            </p>
          </div>
        </header>
        <main
          id="account-content"
          tabIndex={-1}
          className="px-5 pb-10 pt-14 sm:px-8 lg:p-0"
        >
          <div className="mx-auto max-w-sm">{children}</div>
        </main>
      </div>
    </div>
  );
}

function Logo() {
  return (
    <Link
      href="/"
      className="flex w-fit items-center gap-2 font-bold"
      aria-label="Kheun Lift home"
    >
      <span className="rounded-xl bg-accent p-2 text-background">
        <Icon name="dumbbell" />
      </span>
      <span>
        KHEUN <span className="text-accent">LIFT</span>
      </span>
    </Link>
  );
}
