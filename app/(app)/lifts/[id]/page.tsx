import type { Metadata } from "next";
import { Suspense } from "react";
import { Spinner } from "@/components/ui/spinner";
import { LiftDetail } from "@/features/lifts/components/lift-detail";

export const metadata: Metadata = { title: "Lift | Kheun Lift" };

export default function LiftPage({ params }: { params: Promise<{ id: string }> }) {
  return (
    // Same width as the lift modal, so a refresh keeps the same look.
    <div className="mx-auto w-full max-w-2xl">
      <Suspense fallback={<Spinner />}>
        {params.then(({ id }) => (
          <LiftDetail id={id} variant="page" />
        ))}
      </Suspense>
    </div>
  );
}
