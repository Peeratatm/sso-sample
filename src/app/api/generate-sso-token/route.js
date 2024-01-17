import { user } from "@/db";
import { jwtSSOGenerate } from "@/utilities/jwt";
import { headers } from "next/headers";
const jwt = require("jsonwebtoken");

export const dynamic = "force-dynamic";
export async function POST(request) {
  const headersList = headers();
  const authorizationHeader = headersList.get("authorization") || ""
  const accessToken = authorizationHeader.replace("Bearer ", "");

  if (!accessToken) {
    return Response.json({ message: "Unauthorize" }, { status: 401 });
  }

  try {
    const decoded = await jwt.verify(
      accessToken,
      process.env.ACCESS_TOKEN_SECRET
    );
    const userID = decoded.id;
    const findUser = user.find((u) => u.id == userID);
    const ssoToken = jwtSSOGenerate({
      ...findUser,
      refresh: "",
      password: "",
      sso: ""
    });
    findUser.sso = ssoToken
    return Response.json({ ssoToken });
  } catch (error) {
    return Response.json({ message: error.message }, { status: 403 });
  }
}
