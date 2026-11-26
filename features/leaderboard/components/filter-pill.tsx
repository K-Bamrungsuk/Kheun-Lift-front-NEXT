import Link from "next/link";
import { Icon } from "@/components/ui/icon";
import { ModalButton } from "@/components/ui/modal";

type Query = { exercise?: string | number; gender?: string; weightClass?: string | number };

function href(query: Query) {
  const params = new URLSearchParams();
  for (const [key, value] of Object.entries(query))
    if (value !== undefined) params.set(key, String(value));
  return `/leaderboard?${params}`;
}

const styles = {
  segment: {
    base: "flex min-h-11 items-center justify-center rounded-lg px-2 text-center leading-tight",
    on: "bg-surface-high font-semibold text-accent shadow-sm shadow-black/30",
    off: "text-muted hover:text-foreground",
  },
  chip: {
    base: "flex min-h-11 shrink-0 items-center justify-center rounded-lg border px-3 text-sm tabular-nums",
    on: "border-accent/25 bg-accent/10 text-accent",
    off: "border-border bg-surface text-muted hover:bg-surface-high",
  },
};

export function Pill({
  query,
  active,
  segment = false,
  children,
}: {
  query: Query;
  active: boolean;
  segment?: boolean;
  children: React.ReactNode;
}) {
  const style = styles[segment ? "segment" : "chip"];
  return (
    <Link
      href={href(query)}
      prefetch={segment ? true : undefined}
      aria-current={active ? "true" : undefined}
      className={`${style.base} transition-colors ${active ? style.on : style.off}`}
    >
      {children}
    </Link>
  );
}

export function FilterPill({
  id,
  title,
  value,
  children,
}: {
  id: string;
  title: string;
  value: string;
  children: React.ReactNode;
}) {
  return (
    <ModalButton
      label={`${title}: ${value}. Change`}
      labelledBy={id}
      className="flex min-h-11 items-center gap-2 rounded-full border border-border bg-surface-low px-4 text-sm transition-colors hover:bg-surface-high"
      trigger={
        <>
          <span className="text-muted">{title}</span>
          <span className="font-semibold capitalize text-accent">{value}</span>
          <Icon name="chevronDown" className="size-4 text-muted" />
        </>
      }
    >
      <div className="space-y-4 px-5 pb-6 md:px-7">
        <h2 id={id} className="text-lg font-semibold">
          {title}
        </h2>
        {children}
      </div>
    </ModalButton>
  );
}
