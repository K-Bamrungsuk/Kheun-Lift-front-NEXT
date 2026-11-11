"use client";

import { Fragment } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Icon } from "@/components/ui/icon";

const navigation = [
  { name: "Home", href: "/dashboard", icon: "dumbbell" },
  { name: "Social", icon: "users" },
  { name: "Board", href: "/leaderboard", icon: "trophy" },
  { name: "Profile", href: "/profile", icon: "user" },
] as const;

export function AppNavigation({ mobile = false }: { mobile?: boolean }) {
  const pathname = usePathname();
  const addLiftLink = (
    <Link href="/log-lift" aria-label="Log a lift" aria-current={pathname === "/log-lift" ? "page" : undefined} className={mobile ? "-mt-5 flex min-h-16 flex-col items-center gap-1 text-accent" : "ml-2 flex min-h-11 items-center gap-2 rounded-xl bg-accent px-4 text-sm font-semibold text-background transition-colors hover:bg-accent/90"}>
      <span className={mobile ? "grid size-14 place-items-center rounded-full border-4 border-surface-low bg-accent text-background" : ""}><Icon name="plus" className={mobile ? "size-7" : "size-5"} /></span>
      <span className={mobile ? "font-mono text-[11px]" : ""}>Log lift</span>
    </Link>
  );

  return (
    <nav aria-label={mobile ? "Mobile navigation" : "Main navigation"} className={mobile ? "mobile-nav fixed inset-x-0 bottom-0 z-50 border-t border-border/60 bg-surface-low/95 backdrop-blur-xl md:hidden" : "flex items-center gap-1"}>
      <div className={mobile ? "mx-auto flex min-h-20 max-w-xl items-center justify-around gap-1 px-2" : "flex items-center gap-1"}>
        {navigation.map((item, index) => {
          const active = "href" in item && pathname === item.href;
          const color = !("href" in item) ? "cursor-not-allowed text-muted/40" : active ? "text-accent" : "text-muted hover:bg-surface-high hover:text-foreground";
          const className = `${mobile ? "flex min-h-14 min-w-11 flex-col items-center justify-center gap-1 rounded-lg px-2 text-[11px]" : "flex min-h-11 items-center gap-2 rounded-xl px-3 text-sm font-medium"} transition-colors ${color}`;
          const content = <><Icon name={item.icon} className="size-5" /><span>{item.name}</span></>;
          return (
            <Fragment key={item.name}>
              {"href" in item ? <Link href={item.href} aria-current={active ? "page" : undefined} className={className}>{content}</Link> : <button type="button" disabled title="Social is not available yet" aria-label="Social - coming soon" className={className}>{content}</button>}
              {mobile && index === 1 && addLiftLink}
            </Fragment>
          );
        })}
        {!mobile && addLiftLink}
      </div>
    </nav>
  );
}
