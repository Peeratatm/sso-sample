import { http } from "./http";

export const responseHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers":
    "Content-Type, Authorization, X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Date, X-Api-Version",
  "Access-Control-Max-Age": "86400",
};

export const api = {
  uploadImage: (params, options) => {
    const data = new FormData();
    data.append("image", params.file, params.file.name);
    return http.post({
      path: `/file-aws/image/upload`,
      params: data,
      isMultipart: true,
      ...options,
    });
  },
  login: (params, options) => {
    return http.post({
      path: `/api/login`,
      params,
      ...options,
    });
  },
  generateSSOToken: (params, options) => {
    return http.post({
      path: `/api/generate-sso-token`,
      params,
      ...options,
    });
  },
};
