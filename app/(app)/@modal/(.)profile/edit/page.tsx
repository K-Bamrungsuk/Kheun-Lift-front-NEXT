import { Modal } from "@/components/ui/modal";
import { EditProfile } from "@/features/user/components/edit-profile";

export default function EditProfileModal() {
  return (
    <Modal labelledBy="edit-profile-title">
      <EditProfile variant="modal" />
    </Modal>
  );
}
