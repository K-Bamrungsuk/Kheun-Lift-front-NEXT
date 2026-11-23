import { z } from "zod";
import { clientFetch } from "@/lib/api";
import type { UpdateMeInput } from "./types";

export const updateMe = (body: UpdateMeInput) =>
  clientFetch("/users/me", z.unknown(), {
    method: "PATCH",
    body: JSON.stringify(body),
  });

export const deleteMe = () => clientFetch("/users/me", z.unknown(), { method: "DELETE" });

export function uploadProfileImage(file: File) {
  const body = new FormData();
  body.append("profileImage", file);
  return clientFetch("/users/me/profile-image", z.unknown(), {
    method: "POST",
    body,
  });
}

export const deleteProfileImage = () =>
  clientFetch("/users/me/profile-image", z.unknown(), {
    method: "DELETE",
  });
