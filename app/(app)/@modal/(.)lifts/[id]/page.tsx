import { Suspense } from "react";
import { Spinner } from "@/components/ui/spinner";
import { Modal } from "@/components/ui/modal";
import { LiftDetail } from "@/features/lifts/components/lift-detail";

export default function LiftModal({ params }: { params: Promise<{ id: string }> }) {
  return (
    <Modal labelledBy="lift-title" wide>
      <Suspense fallback={<Spinner />}>
        {params.then(({ id }) => (
          <LiftDetail id={id} variant="modal" />
        ))}
      </Suspense>
    </Modal>
  );
}
