import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import axios from "axios";
import satellite from "@/services/satellite";

export async function POST(request: NextRequest) {
  const cookieStore = await cookies();
  const refreshToken = cookieStore.get("refreshToken");
  const token = cookieStore.get("token");
  console.log("REFRESH TOKEN:", refreshToken, "TOKEN:", token);

  try {
    const newToken = await satellite.post("/auth/refresh-token", {
      refresh: refreshToken?.value,
    });
    const response = NextResponse.json({ success: true });

    response.cookies.set("token", newToken.data.data.accessToken, {
      httpOnly: true,
      path: "/",
    });

    return response;
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      { success: false, error: "Token refresh failed" },
      { status: 500 }
    );
  }
}
export async function GET(request: NextRequest) {
  try {
    return NextResponse.json(
      { success: false, error: "Token refresh failed" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Token refresh failed" },
      { status: 500 }
    );
  }
}
