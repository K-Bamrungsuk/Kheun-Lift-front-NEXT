"use client";

import { Fragment } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Icon } from "@/components/ui/icon";

const navigation = [
  { name: "Home", href: "/dashboard", icon: "home" },
  { name: "Rank", href: "/leaderboard", icon: "trophy" },
  { name: "Social", icon: "users" },
  { name: "Profile", href: "/profile", icon: "user" },
] as const;

export function AppNavigation({ mobile = false }: { mobile?: boolean }) {
  const pathname = usePathname();
  const addLiftButton = (
    <button type="button" disabled aria-label="Add Lift — coming soon" title="Lift submission is not connected yet" className={mobile ? "-mt-9 grid size-14 cursor-not-allowed place-items-center rounded-full border-4 border-black bg-yellow-400 text-black" : "ml-2 cursor-not-allowed rounded-xl bg-yellow-400 px-4 py-2 text-black"}>
      <Icon name="plus" className={mobile ? "size-7" : "size-[18px]"} />
    </button>
  );

  return (
    <nav aria-label={mobile ? "Mobile navigation" : "Main navigation"} className={mobile ? "mobile-nav fixed left-1/2 z-50 flex w-[calc(100%-32px)] max-w-md -translate-x-1/2 items-center justify-around rounded-3xl border border-zinc-800 bg-zinc-950/95 px-3 py-3 shadow-2xl backdrop-blur md:hidden" : "flex items-center gap-2"}>
      {navigation.map((item, index) => {
        const active = "href" in item && pathname === item.href;
        let color = "text-zinc-400 hover:text-white";
        if (!("href" in item)) color = "cursor-not-allowed text-zinc-600";
        else if (active) color = mobile ? "text-yellow-400" : "bg-yellow-400 text-black";
        const className = `${mobile ? "p-2" : "flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-semibold"} ${color}`;
        const content = <><Icon name={item.icon} className={mobile ? "size-[22px]" : "size-[18px]"} />{!mobile && item.name}</>;

        return (
          <Fragment key={item.name}>
            {"href" in item ? (
              <Link href={item.href} aria-label={mobile ? item.name : undefined} aria-current={active ? "page" : undefined} className={className}>{content}</Link>
            ) : (
              <button type="button" disabled aria-label="Social — coming soon" title="Social is not available yet" className={className}>{content}</button>
            )}
            {mobile && index === 1 && addLiftButton}
          </Fragment>
        );
      })}
      {!mobile && addLiftButton}
    </nav>
  );
}
