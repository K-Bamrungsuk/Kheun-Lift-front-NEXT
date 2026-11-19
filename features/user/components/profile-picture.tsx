import { Panel } from "@/components/ui/panel";
import { getMe } from "../api-server";
import { ProfilePictureForm } from "./profile-picture-form";

export function ProfilePicture() {
  return (
    <Panel id="picture-title" title="Profile picture">
      <ProfilePictureLoader />
    </Panel>
  );
}

async function ProfilePictureLoader() {
  const user = await getMe();
  return <ProfilePictureForm user={user} />;
}
