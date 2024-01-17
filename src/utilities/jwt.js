import jwt from "jsonwebtoken";

export const jwtAccessTokenGenerate = (user) => {
  const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "3d",
    algorithm: "HS256",
  });

  return accessToken;
};

export const jwtRefreshTokenGenerate = (user) => {
  const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: "1d",
    algorithm: "HS256",
  });

  return refreshToken;
};

export const jwtSSOGenerate = (user) => {
  const accessToken = jwt.sign(user, process.env.SSO_TOKEN_SECRET, {
    expiresIn: "1m",
    algorithm: "HS256",
  });

  return accessToken;
};
