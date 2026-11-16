import { clientFetch } from "@/lib/api";
import type { User } from "./types";

// Go rejects null values, so send only the fields that changed.
export type UpdateMeInput = Partial<
  Record<
    "username" | "gender" | "bodyWeight" | "height" | "dateOfBirth",
    string | number
  >
>;

export const updateMe = (body: UpdateMeInput) =>
  clientFetch<{ user: User }>("/users/me", {
    method: "PATCH",
    body: JSON.stringify(body),
  });

export const deleteMe = () => clientFetch("/users/me", { method: "DELETE" });

export function uploadProfileImage(file: File) {
  const body = new FormData();
  body.append("profileImage", file);
  return clientFetch<{ user: User }>("/users/me/profile-image", {
    method: "POST",
    body,
  });
}

export const deleteProfileImage = () =>
  clientFetch<{ message: string }>("/users/me/profile-image", {
    method: "DELETE",
  });
