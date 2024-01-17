import { user } from "@/db";
import { jwtAccessTokenGenerate, jwtRefreshTokenGenerate } from "@/utilities/jwt";
import { headers } from "next/headers";
const jwt = require("jsonwebtoken");

export const dynamic = "force-dynamic";

export async function POST(request) {
  const headersList = headers();
  const authorizationHeader = headersList.get("authorization") || "";
  const refreshToken = authorizationHeader.replace("Bearer ", "");

  if (!refreshToken) {
    return Response.json({ message: "Unauthorize" }, { status: 401 });
  }

  try {
    const decoded = await jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET
    );
    const userID = decoded.id;
    const findUser = user.find((u) => u.id == userID);
    if (findUser.refresh == refreshToken) {
      // ใช้แล้วต้องทิ้งเลย
      findUser.refresh = null;
    } else {
      return Response.json(
        { message: "Refresh Token is already used" },
        { status: 403 }
      );
    }

    const accessToken = jwtAccessTokenGenerate({
      ...findUser,
      refresh: "",
      password: "",
      sso: "",
    });
    const newRefreshToken = jwtRefreshTokenGenerate({
      ...findUser,
      refresh: "",
      password: "",
      sso: "",
    });
    findUser.refresh = newRefreshToken;

    return Response.json({
      account: { ...findUser, refresh: "", password: "", sso: "" },
      accessToken,
      refreshToken: newRefreshToken,
    });
  } catch (error) {
    return Response.json({ message: error.message }, { status: 403 });
  }
}
