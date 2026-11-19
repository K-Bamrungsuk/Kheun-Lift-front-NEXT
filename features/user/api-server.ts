import { cache } from "react";
import { serverFetch } from "@/lib/api-server";
import { publicUserSchema, userSchema } from "./types";

export const getMe = cache(() => serverFetch("/users/me", userSchema));

export const getUser = (id: string) =>
  serverFetch(`/users/${encodeURIComponent(id)}`, publicUserSchema);
