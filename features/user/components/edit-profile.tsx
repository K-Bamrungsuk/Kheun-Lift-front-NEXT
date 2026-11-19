import { Panel } from "@/components/ui/panel";
import type { Variant } from "@/components/ui/modal";
import { getMe } from "../api-server";
import { ProfileForm } from "./profile-form";

export function EditProfile({ variant }: { variant: Variant }) {
  return (
    <Panel id="edit-profile-title" title="Edit profile">
      <EditProfileForm variant={variant} />
    </Panel>
  );
}

async function EditProfileForm({ variant }: { variant: Variant }) {
  const user = await getMe();
  return <ProfileForm user={user} variant={variant} />;
}
