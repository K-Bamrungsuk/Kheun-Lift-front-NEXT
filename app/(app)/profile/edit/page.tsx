import type { Metadata } from "next";
import { EditProfile } from "@/features/user/components/edit-profile";

export const metadata: Metadata = { title: "Edit Profile | Kheun Lift" };

export default function EditProfilePage() {
  return <EditProfile after="profile" />;
}
