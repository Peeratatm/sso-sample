import { user } from "@/db";
import { responseHeaders } from "@/services/api";
import {
  jwtAccessTokenGenerate,
  jwtRefreshTokenGenerate,
} from "@/utilities/jwt";
import { headers } from "next/headers";
const jwt = require("jsonwebtoken");

export const dynamic = "force-dynamic";

export const OPTIONS = async (request) => {
  return new Response("", {
    status: 200,
  });
};

export async function POST(request) {
  const headersList = headers();
  const authorizationHeader = headersList.get("authorization") || "";
  const ssoToken = authorizationHeader.replace("Bearer ", "");

  if (!ssoToken) {
    return Response.json({ message: "Unauthorize" }, { status: 401 });
  }

  try {
    const decoded = await jwt.verify(ssoToken, process.env.SSO_TOKEN_SECRET);
    const userID = decoded.id;
    const findUser = user.find((u) => u.id == userID);
    if (findUser.sso == ssoToken) {
      // ใช้แล้วต้องทิ้งเลย
      findUser.sso = null;
    } else {
      return Response.json(
        { message: "SSO Token is already used" },
        { status: 403 },
      );
    }

    const accessToken = jwtAccessTokenGenerate({
      ...findUser,
      refresh: "",
      password: "",
      sso: "",
    });
    return Response.json(
      {
        account: { ...findUser, refresh: "", password: "", sso: "" },
        accessToken,
      },
      { status: 200 },
    );
  } catch (error) {
    return Response.json({ message: error.message }, { status: 403 });
  }
}
