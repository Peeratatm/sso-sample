import { HTTP_STATUS_CODE } from "@/constants/general";
import Cookies from "js-cookie";
import jsCookie from "js-cookie";

const getDefaultConfigs = (config, _token, _locale, isMultipart) => {
  const token =
    typeof window == "undefined" || _token ? _token : jsCookie.get("accessToken");
  const headers = new Headers();
  if (!isMultipart) {
    headers["Content-Type"] = "application/json";
  }

  return {
    ...config,
    headers: {
      ...headers,
      Authorization: token ? `Bearer ${token}` : undefined,
      appid: process.env.APP_ID,
      ...(config.headers ? config.headers : {}),
    },
  };
};

const httpFetch = ({
  path,
  params,
  config = {},
  method,
  locale,
  shouldThrowError = true,
  token,
  isMultipart = false,
}) => {
  return fetch(`${process.env.API_HOST}${path}`, {
    method,
    body: isMultipart ? params : JSON.stringify(params),
    ...getDefaultConfigs(config, token, locale, isMultipart),
  }).then(async (res) => {
    if (
      typeof window != "undefined" &&
      !res.ok &&
      (res.status == HTTP_STATUS_CODE.UNAUTHORIZED ||
        res.status == HTTP_STATUS_CODE.FORBIDDEN)
    ) {
      console.log("api call status : unauthorize");
      Cookies.remove("accessToken");
      const err = {
        message: "Client Unauthorized",
        status: res.status,
        detail: res,
      };
      console.dir(res, { depth: 6 });

      throw err;
    } else if (shouldThrowError) {
      if (res.ok) {
        return res.json();
      } else {
        const data = await res.json();
        const err = {
          message: data.message || res.statusText,
          status: res.status,
          detail: res,
        };
        console.dir(res, { depth: 6 });

        throw err;
      }
    } else {
      return Promise.resolve(res);
    }
  });
};

export const http = {
  post: (params) => {
    return httpFetch({ ...params, method: "POST" });
  },
  get: (params) => {
    return httpFetch({ ...params, method: "GET" });
  },
  delete: (params) => {
    return httpFetch({ ...params, method: "DELETE" });
  },
  put: (params) => {
    return httpFetch({ ...params, method: "PUT" });
  },
};
