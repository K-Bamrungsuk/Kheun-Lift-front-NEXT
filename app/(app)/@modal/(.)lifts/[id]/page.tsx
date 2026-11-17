import { Suspense } from "react";
import { Modal } from "@/components/ui/modal";
import { LiftDetail } from "@/features/lifts/components/lift-detail";

export default function LiftModal({ params }: { params: Promise<{ id: string }> }) {
  return (
    <Modal labelledBy="lift-title" wide>
      <Suspense fallback={<p className="p-5 text-sm text-muted">Loading...</p>}>
        {params.then(({ id }) => (
          <LiftDetail id={id} after="back" />
        ))}
      </Suspense>
    </Modal>
  );
}
