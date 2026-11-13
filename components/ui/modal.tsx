"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { Icon } from "./icon";

export function Modal({
  labelledBy,
  children,
}: {
  labelledBy: string;
  children: React.ReactNode;
}) {
  const router = useRouter();
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = ref.current!;
    if (!dialog.open) dialog.showModal();
    // cacheComponents hides this page with Activity on back navigation; an open modal would leave the page inert.
    return () => dialog.close();
  }, []);

  return (
    <dialog
      ref={ref}
      aria-labelledby={labelledBy}
      onCancel={(event) => {
        event.preventDefault();
        router.back();
      }}
      className="m-0 mt-auto max-h-[90dvh] w-full max-w-none overflow-y-auto rounded-t-2xl bg-surface pb-[env(safe-area-inset-bottom)] text-foreground backdrop:bg-background/80 backdrop:backdrop-blur-sm md:m-auto md:max-w-lg md:rounded-2xl md:pb-0"
    >
      <div className="flex justify-end px-3 pt-3">
        <button
          type="button"
          onClick={() => router.back()}
          aria-label="Close"
          className="grid size-11 place-items-center rounded-lg text-muted transition-colors hover:bg-surface-high hover:text-foreground"
        >
          <Icon name="x" />
        </button>
      </div>
      {children}
    </dialog>
  );
}
