"use client";
import React, { useCallback, useEffect, useState } from "react";
import { Input, Button } from "@nextui-org/react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { api } from "@/services/api";
import { toast } from "@/utilities/toast";

function LoginPage(props) {
  const { searchParams, params, accessToken, refreshToken } = props;
  const { redirectUrl = '', serviceUrl ='' } = searchParams;
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState("");

  const autoLoginSSO = useCallback(async () => {
    try {
      if (serviceUrl && accessToken) {
        toast.loading({ title: "Loading.." });
        const ses = await api.generateSSOToken();
        const ssoToken = ses.ssoToken;
        window.location.href = `${serviceUrl}/sso?redirectUrl=${redirectUrl}&ssoToken=${ssoToken}`;
        toast.clear();
      }
    } catch (error) {
      console.log("auto login error >> ", error);
      toast.clear();
    }
  }, [redirectUrl, accessToken, serviceUrl]);

  const logout = useCallback(() => {
    Cookies.remove("accessToken");
    Cookies.remove("refreshToken");
    router.refresh();
  }, [router]);

  const login = useCallback(async () => {
    try {
      setLoading(true);
      const res = await api.login({ email, password });
      const accessToken = res.accessToken;
      const refreshToken = res.refreshToken;
      Cookies.set("accessToken", accessToken);
      Cookies.set("refreshToken", refreshToken);

      if (serviceUrl) {
        const ses = await api.generateSSOToken();
        const ssoToken = ses.ssoToken;
        window.location.href = `${serviceUrl}/sso?redirectUrl=${redirectUrl}&ssoToken=${ssoToken}`;
      }else{
        router.refresh()
      }

      setLoading(false);
    } catch (error) {
      console.log("login error >> ", error.message);
      toast.show({ type: "error", title: error.message, autoClose: true });
      setLoading(false);
    }
  }, [email, password, setLoading, redirectUrl, serviceUrl, router]);

  useEffect(() => {
    autoLoginSSO();
  }, []);

  return (
    <div className="flex min-h-screen items-center justify-center">
      {accessToken ? (
        <div className="flex flex-col gap-4">
          <h3 className="text-center">You are logged in</h3>
          <Button color="primary" variant="ghost" onClick={logout}>
            Logout
          </Button>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          <h3 className="text-center">SSO Login</h3>
          <Input
            type="email"
            label="Email"
            variant="bordered"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <Input
            label="Password"
            variant="bordered"
            type="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <Button
            color="primary"
            variant="ghost"
            isLoading={loading}
            onClick={login}
          >
            Submit
          </Button>
        </div>
      )}
    </div>
  );
}

export default LoginPage;
