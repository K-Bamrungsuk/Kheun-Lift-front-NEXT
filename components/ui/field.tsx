export function Field({ label, id, ...props }: { label: string; id: string } & React.ComponentProps<"input">) {
  return (
    <div>
      <label htmlFor={id} className="text-sm text-muted">{label}</label>
      {/* text-base (16px) stops iOS from zooming into the field on focus */}
      <input id={id} name={id} required className="mt-2 min-h-12 w-full min-w-0 rounded-lg border border-border bg-background px-4 text-base" {...props} />
    </div>
  );
}
