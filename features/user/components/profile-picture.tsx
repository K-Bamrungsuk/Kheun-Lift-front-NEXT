import { Panel } from "@/components/ui/panel";
import type { Variant } from "@/components/ui/modal";
import { getMe } from "../api-server";
import { ProfilePictureForm } from "./profile-picture-form";

export function ProfilePicture({ variant }: { variant: Variant }) {
  return (
    <Panel id="picture-title" title="Profile picture">
      <ProfilePictureLoader variant={variant} />
    </Panel>
  );
}

async function ProfilePictureLoader({ variant }: { variant: Variant }) {
  const user = await getMe();
  return <ProfilePictureForm user={user} variant={variant} />;
}
