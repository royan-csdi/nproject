"use server";

import { createSession } from "@/lib/session";
import satellite from "@/services/satellite";
import {
  IAPIBaseResponse,
  ILoginPayloadRequest,
  ILoginPayloadResponse,
  IRegisterPayloadRequest,
} from "@/interfaces";
import { cookies } from "next/headers";
import axios from "axios";

export const login = async (body: ILoginPayloadRequest) => {
  try {
    const endpoint = "auth/login";
    const response = await satellite({
      method: "POST",
      url: endpoint,
      data: body,
    });

    const { accessToken, refreshToken, user } = response.data;
    createSession("token", accessToken);
    createSession("refreshToken", refreshToken);
    createSession("user", JSON.stringify(user));
    return response.data;
  } catch (error: any) {
    throw error;
  }
};

export const register = async (body: IRegisterPayloadRequest) => {
  try {
    const endpoint = "auth/register";
    const response = await satellite({
      method: "POST",
      url: endpoint,
      data: body,
    });
    return response.data;
  } catch (error: any) {
    throw error;
  }
};

export default async function refreshFetcher() {
  try {
    const cookieStore = await cookies();
    const refresh = cookieStore.get("refreshToken")?.value;
    console.log("REFRESH TOKEN:", refresh);

    const fetcher = await satellite.post("/auth/refresh-token", { refresh });
    const { access } = fetcher.data;
    cookieStore.set({
      name: "token",
      value: access,
      maxAge: 60 * 60 * 24,
    });
  } catch (error: any) {
    throw error;
  }
}
