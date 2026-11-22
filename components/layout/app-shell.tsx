import Link from "next/link";
import { Avatar } from "@/components/ui/avatar";
import { Icon } from "@/components/ui/icon";
import { LogLiftPanel } from "@/features/lifts/components/log-lift-panel";
import type { User } from "@/features/user/types";
import { DesktopNav, MobileNav } from "./app-navigation";

export function AppShell({
  user,
  children,
}: {
  user: User;
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-dvh bg-background text-foreground">
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <header className="sticky top-0 z-40 border-b border-border/60 bg-surface-low/95 pt-[env(safe-area-inset-top)] backdrop-blur-xl">
        <div className="mx-auto flex min-h-20 max-w-6xl items-center justify-between gap-4 px-4 md:px-8">
          <Link
            href="/dashboard"
            className="flex min-h-11 shrink-0 items-center gap-3"
            aria-label="Kheun Lift home"
          >
            <span className="grid size-11 place-items-center rounded-xl bg-surface text-accent">
              <Icon name="shieldCheck" className="size-6" />
            </span>
            <span>
              <span className="block text-xs font-semibold tracking-[0.2em] text-accent">
                KHEUN LIFT
              </span>
              <span className="mt-0.5 block text-sm text-muted">
                Your strength. On record.
              </span>
            </span>
          </Link>
          <div className="hidden md:flex">
            <DesktopNav logLift={<LogLiftPanel />} />
          </div>
          <Link
            href="/profile"
            aria-label="View athlete profile"
            className="shrink-0 rounded-full md:hidden"
          >
            {/* The link's aria-label already names it, so the image is decorative. */}
            <Avatar src={user.profileImage} alt="" className="size-11" />
          </Link>
        </div>
      </header>
      <main
        id="main-content"
        tabIndex={-1}
        className="mx-auto max-w-xl space-y-6 px-4 pb-[calc(8rem+env(safe-area-inset-bottom))] pt-6 md:max-w-6xl md:px-8 md:pb-12 md:pt-10"
      >
        {children}
      </main>
      <MobileNav logLift={<LogLiftPanel />} />
    </div>
  );
}
