import { Suspense } from "react";
import { Spinner } from "./spinner";

// Children load inside Suspense so the heading shows at once; cacheComponents flags uncached fetches outside Suspense.
export function Panel({
  id,
  title,
  children,
}: {
  id: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section aria-labelledby={id} className="rounded-xl bg-surface p-5 md:p-7">
      <h2 id={id} className="mb-5 text-lg font-semibold">
        {title}
      </h2>
      <Suspense fallback={<Spinner />}>{children}</Suspense>
    </section>
  );
}
