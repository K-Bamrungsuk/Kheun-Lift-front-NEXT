import Link from "next/link";

export function AccountSwitchLink({
  question,
  label,
  href,
}: {
  question: string;
  label: string;
  href: string;
}) {
  return (
    <div className="mt-8">
      <p className="flex items-center gap-3 text-sm text-muted">
        <span aria-hidden="true" className="h-px flex-1 bg-border" />
        {question}
        <span aria-hidden="true" className="h-px flex-1 bg-border" />
      </p>
      <Link
        href={href}
        className="mt-5 flex min-h-12 w-full items-center justify-center rounded-xl border border-border px-4 font-semibold transition-colors hover:border-accent hover:text-accent"
      >
        {label}
      </Link>
    </div>
  );
}
