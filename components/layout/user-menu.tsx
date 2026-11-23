"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Avatar } from "@/components/ui/avatar";
import { LogoutButton } from "@/features/auth/components/logout-button";

export function UserMenu({ profileImage }: { profileImage: string | null }) {
  const ref = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);

  // Safari does not focus clicked buttons, so blur is not enough to close the menu.
  useEffect(() => {
    if (!open) return;
    function handlePointerDown(event: PointerEvent) {
      const clickedInside = event.target instanceof Node && ref.current?.contains(event.target);
      if (clickedInside) return;
      setOpen(false);
    }
    document.addEventListener("pointerdown", handlePointerDown);
    return () => document.removeEventListener("pointerdown", handlePointerDown);
  }, [open]);

  return (
    <div
      ref={ref}
      className="relative shrink-0"
      onKeyDown={(event) => {
        if (open && event.key === "Escape") setOpen(false);
      }}
    >
      <button
        type="button"
        aria-label="Account menu"
        aria-haspopup="menu"
        aria-expanded={open}
        onClick={() => setOpen(!open)}
        className="block rounded-full"
      >
        <Avatar src={profileImage} alt="" className="size-11" />
      </button>
      {open && (
        <div
          role="menu"
          className="absolute right-0 top-full z-10 mt-2 w-44 overflow-hidden rounded-xl border border-border bg-surface py-1 shadow-xl"
        >
          <Link
            href="/profile"
            role="menuitem"
            autoFocus
            onClick={() => setOpen(false)}
            className="flex min-h-11 w-full items-center px-4 text-sm transition-colors hover:bg-surface-high"
          >
            Profile
          </Link>
          <LogoutButton />
        </div>
      )}
    </div>
  );
}
