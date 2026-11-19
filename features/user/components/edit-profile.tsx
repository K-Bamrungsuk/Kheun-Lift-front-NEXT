import { Panel } from "@/components/ui/panel";
import { getMe } from "../api-server";
import { ProfileForm } from "./profile-form";

export function EditProfile() {
  return (
    <Panel id="edit-profile-title" title="Edit profile">
      <EditProfileForm />
    </Panel>
  );
}

async function EditProfileForm() {
  const user = await getMe();
  return <ProfileForm user={user} />;
}
