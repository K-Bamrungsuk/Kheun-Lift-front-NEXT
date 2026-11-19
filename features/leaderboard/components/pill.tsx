import Link from "next/link";

type Query = { exercise?: string | number; gender?: string; weightClass?: string | number };

function href(query: Query) {
  const params = new URLSearchParams();
  for (const [key, value] of Object.entries(query))
    if (value !== undefined) params.set(key, String(value));
  return `/leaderboard?${params}`;
}

export function Pill({
  query,
  active,
  children,
}: {
  query: Query;
  active: boolean;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href(query)}
      aria-current={active ? "true" : undefined}
      className={`flex min-h-11 items-center rounded-lg border px-3 text-sm transition-colors ${
        active
          ? "border-accent/25 bg-accent/10 text-accent"
          : "border-border bg-surface text-muted hover:bg-surface-high"
      }`}
    >
      {children}
    </Link>
  );
}
