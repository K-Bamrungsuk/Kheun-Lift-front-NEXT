"use client";

import { useEffect, useRef, useState } from "react";
import { Icon } from "@/components/ui/icon";

export function LiftMenu({
  disabled,
  onEdit,
  onDelete,
}: {
  disabled: boolean;
  onEdit: () => void;
  onDelete: () => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);

  // Close the menu on a click outside it. Safari does not focus clicked buttons, so blur is not enough.
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

  function handleEdit() {
    setOpen(false);
    onEdit();
  }

  function handleDelete() {
    setOpen(false);
    onDelete();
  }

  const item =
    "flex min-h-11 w-full items-center px-4 text-left text-sm transition-colors hover:bg-surface-high";

  return (
    <div
      ref={ref}
      className="relative shrink-0"
      onKeyDown={(event) => {
        // Esc closes only the menu; without this the <dialog> would close the whole modal.
        if (open && event.key === "Escape") {
          event.preventDefault();
          event.stopPropagation();
          setOpen(false);
        }
      }}
    >
      <button
        type="button"
        aria-label="Lift options"
        aria-haspopup="menu"
        aria-expanded={open}
        disabled={disabled}
        onClick={() => setOpen(!open)}
        className="grid size-11 place-items-center rounded-lg text-muted transition-colors hover:bg-surface-high hover:text-foreground disabled:opacity-60"
      >
        <Icon name="more" />
      </button>
      {open && (
        <div
          role="menu"
          className="absolute right-0 top-full z-10 mt-1 w-40 overflow-hidden rounded-xl border border-border bg-surface py-1 shadow-xl"
        >
          <button type="button" role="menuitem" autoFocus onClick={handleEdit} className={item}>
            Edit
          </button>
          <button
            type="button"
            role="menuitem"
            onClick={handleDelete}
            className={`${item} text-danger`}
          >
            Delete
          </button>
        </div>
      )}
    </div>
  );
}
