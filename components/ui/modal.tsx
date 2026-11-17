"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { Icon } from "./icon";

export function Modal({
  labelledBy,
  wide = false,
  children,
}: {
  labelledBy: string;
  wide?: boolean;
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
      className={`m-auto max-h-[85dvh] w-[calc(100%-2rem)] ${wide ? "max-w-2xl" : "max-w-md"} overflow-y-auto rounded-2xl bg-surface text-foreground shadow-2xl backdrop:bg-background/60 backdrop:backdrop-blur-md`}
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
