import { clientFetch } from "@/lib/api";

const post = (path: string, body?: object) =>
  clientFetch(path, { method: "POST", body: body && JSON.stringify(body) });

export const login = (email: string, password: string) => post("/auth/login", { email, password });

export const register = (body: { username: string; email: string; password: string }) =>
  post("/auth/register", body);

export const logout = () => post("/auth/logout");
