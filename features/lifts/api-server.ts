import { serverFetch } from "@/lib/api-server";
import type { LiftRecord } from "./types";

export const getMyLifts = () =>
  serverFetch<{ data: LiftRecord[] }>("/lifts/me").then((res) => res.data);
