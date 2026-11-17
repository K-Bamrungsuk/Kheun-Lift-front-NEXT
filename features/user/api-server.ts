import { cache } from "react";
import { serverFetch } from "@/lib/api-server";
import type { PublicUser, User } from "./types";

export const getMe = cache(() =>
  serverFetch<{ user: User }>("/users/me").then((res) => res.user),
);

export const getUser = (id: string) =>
  serverFetch<{ user: PublicUser }>(`/users/${encodeURIComponent(id)}`).then((res) => res.user);
