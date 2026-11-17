import { cache } from "react";
import { serverFetch } from "@/lib/api-server";
import type { User } from "./types";

export const getMe = cache(() =>
  serverFetch<{ user: User }>("/users/me").then((res) => res.user),
);
