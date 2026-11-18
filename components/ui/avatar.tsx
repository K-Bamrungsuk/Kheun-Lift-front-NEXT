import { Icon } from "./icon";

export function Avatar({
  src,
  alt,
  className,
}: {
  src: string | null;
  alt: string;
  className: string;
}) {
  const base = `shrink-0 rounded-full border border-accent/30 bg-surface-high ${className}`;
  return src ? (
    // PLAN: profile images use <img>, not next/image, because next.config has no remotePatterns for R2.
    // eslint-disable-next-line @next/next/no-img-element
    <img src={src} alt={alt} className={`${base} object-cover`} />
  ) : (
    <span className={`grid place-items-center text-muted ${base}`}>
      <Icon name="user" className="size-1/2" />
    </span>
  );
}
