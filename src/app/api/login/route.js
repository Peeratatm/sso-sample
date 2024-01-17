import { user } from "@/db";
import { jwtAccessTokenGenerate, jwtRefreshTokenGenerate } from "@/utilities/jwt";

export const dynamic = "force-dynamic";
export async function POST(request) {
  const params = await request.json();
  const findUser = user.find(
    (u) => u.email == params.email && u.password == params.password
  );
  if (findUser) {
    const accessToken = jwtAccessTokenGenerate({
      ...findUser,
      refresh: "",
      password: "",
      sso: ""
    });
    const refreshToken = jwtRefreshTokenGenerate({
      ...findUser,
      refresh: "",
      password: "",
      sso: ""
    });
    findUser.refresh = refreshToken;
    return Response.json({ accessToken, refreshToken });
  } else {
    return Response.json(
      { message: "Invalid email or password" },
      { status: 400 }
    );
  }
}
