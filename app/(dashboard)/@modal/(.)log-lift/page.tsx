import { Modal } from "@/components/ui/modal";
import { LogLiftForm } from "@/features/lifts/components/log-lift-form";

export default function LogLiftModal() {
  return (
    <Modal labelledBy="attempt-title">
      <LogLiftForm after="back" />
    </Modal>
  );
}
