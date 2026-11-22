"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Icon } from "@/components/ui/icon";
import { ModalButton } from "@/components/ui/modal";

const navigation = [
  { name: "Home", href: "/dashboard", icon: "dumbbell" },
  { name: "Social", icon: "users" },
  { name: "Rank", href: "/leaderboard", icon: "trophy" },
  { name: "Profile", href: "/profile", icon: "user" },
] as const;

export function DesktopNav({ logLift }: { logLift: React.ReactNode }) {
  const pathname = usePathname();
  return (
    <nav aria-label="Main navigation" className="flex items-center gap-1">
      {navigation.map((item) => (
        <NavItem
          key={item.name}
          item={item}
          pathname={pathname}
          className="flex min-h-11 items-center gap-2 rounded-xl px-3 text-sm font-medium"
        />
      ))}
      <ModalButton
        label="Log a lift"
        labelledBy="attempt-title"
        className="ml-2 flex min-h-11 items-center gap-2 rounded-xl bg-accent px-4 text-sm font-semibold text-background transition-colors hover:bg-accent/90"
        trigger={
          <>
            <Icon name="plus" className="size-5" />
            Log lift
          </>
        }
      >
        {logLift}
      </ModalButton>
    </nav>
  );
}

export function MobileNav({ logLift }: { logLift: React.ReactNode }) {
  const pathname = usePathname();
  const item = (entry: (typeof navigation)[number]) => (
    <NavItem
      key={entry.name}
      item={entry}
      pathname={pathname}
      className="flex min-h-14 min-w-11 flex-col items-center justify-center gap-1 rounded-lg px-2 text-[11px]"
    />
  );
  return (
    <nav
      aria-label="Mobile navigation"
      className="mobile-nav fixed inset-x-0 bottom-0 z-50 border-t border-border/60 bg-surface-low/95 backdrop-blur-xl md:hidden"
    >
      <div className="mx-auto flex min-h-20 max-w-xl items-center justify-around gap-1 px-2">
        {navigation.slice(0, 2).map(item)}
        <ModalButton
          label="Log a lift"
          labelledBy="attempt-title"
          className="-mt-5 flex min-h-16 flex-col items-center gap-1 text-accent"
          trigger={
            <>
              <span className="grid size-14 place-items-center rounded-full border-4 border-surface-low bg-accent text-background">
                <Icon name="plus" className="size-7" />
              </span>
              <span className="text-[11px]">Log lift</span>
            </>
          }
        >
          {logLift}
        </ModalButton>
        {navigation.slice(2).map(item)}
      </div>
    </nav>
  );
}

function NavItem({
  item,
  pathname,
  className,
}: {
  item: (typeof navigation)[number];
  pathname: string;
  className: string;
}) {
  const content = (
    <>
      <Icon name={item.icon} className="size-5" />
      <span>{item.name}</span>
    </>
  );
  if (!("href" in item)) {
    return (
      <button
        type="button"
        disabled
        title="Social is not available yet"
        aria-label="Social - coming soon"
        className={`${className} cursor-not-allowed text-muted/40`}
      >
        {content}
      </button>
    );
  }
  const active = pathname === item.href;
  return (
    <Link
      href={item.href}
      aria-current={active ? "page" : undefined}
      className={`${className} transition-colors ${active ? "text-accent" : "text-muted hover:bg-surface-high hover:text-foreground"}`}
    >
      {content}
    </Link>
  );
}
