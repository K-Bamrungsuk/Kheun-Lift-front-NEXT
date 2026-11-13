import {cache} from "react";
import {redirect} from "next/navigation";
import {ApiError} from "@/lib/api";
import {serverFetch} from "@/lib/api-server";
import type {User} from "./types";

export const getMe = cache(async () => {
    const { user } = await serverFetch<{ user: User}>("/users/me").catch((error) => {
        if (error instanceof ApiError && error.status === 401) redirect("/login");
        throw error;
    })
    return user
})