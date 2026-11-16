import { Modal } from "@/components/ui/modal";
import { ProfilePicture } from "@/features/user/components/profile-picture";

export default function ProfilePictureModal() {
  return (
    <Modal labelledBy="picture-title">
      <ProfilePicture after="back" />
    </Modal>
  );
}
