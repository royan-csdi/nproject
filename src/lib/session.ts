"use server";

import { cookies } from "next/headers";

export const createSession = async (
  type: "token" | "refreshToken" | "user",
  value: string
) => {
  const cookieStore = await cookies();
  cookieStore.set(type, value, {
    httpOnly: true,
    path: "/",
  });
};

export const getUserSession = async () => {
  const cookieStore = await cookies();
  return cookieStore.get("user")?.value;
};

export const deleteSession = async () => {
  const cookieStore = await cookies();
  cookieStore.delete("token");
  cookieStore.delete("refreshToken");
};
