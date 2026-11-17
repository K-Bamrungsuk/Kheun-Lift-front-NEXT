import type { Metadata } from "next";
import { EditProfile } from "@/features/user/components/edit-profile";

export const metadata: Metadata = { title: "Edit Profile | Kheun Lift" };

export default function EditProfilePage() {
  // Same width as the edit modal, so a refresh keeps the same look.
  return (
    <div className="mx-auto w-full max-w-md">
      <EditProfile variant="page" />
    </div>
  );
}
