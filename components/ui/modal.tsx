"use client";

import { createContext, useContext, useEffect, useRef, useState } from "react";
import { Icon } from "./icon";

const CloseModal = createContext<(() => void) | null>(null);

// null outside a modal, so a form can tell whether it was opened in one.
export const useCloseModal = () => useContext(CloseModal);

type DialogProps = {
  labelledBy: string;
  wide?: boolean;
  children: React.ReactNode;
};

// For a form without its own URL, so a refresh simply closes it.
export function ModalButton({
  label,
  className,
  trigger,
  ...props
}: DialogProps & {
  label: string;
  className: string;
  trigger: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button
        type="button"
        aria-label={label}
        className={className}
        onClick={() => setOpen(true)}
      >
        {trigger}
      </button>
      {open && <Dialog {...props} onClose={() => setOpen(false)} />}
    </>
  );
}

function Dialog({
  labelledBy,
  wide = false,
  onClose,
  children,
}: DialogProps & { onClose: () => void }) {
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
        onClose();
      }}
      className={`m-auto w-[calc(100%-2rem)] ${wide ? "max-h-[95dvh] max-w-2xl" : "max-h-[85dvh] max-w-md"} overflow-y-auto rounded-2xl bg-surface text-foreground shadow-2xl backdrop:bg-background/60 backdrop:backdrop-blur-md`}
    >
      <div className="flex justify-end px-3 pt-3">
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="grid size-11 place-items-center rounded-lg text-muted transition-colors hover:bg-surface-high hover:text-foreground"
        >
          <Icon name="x" />
        </button>
      </div>
      <CloseModal value={onClose}>{children}</CloseModal>
    </dialog>
  );
}
