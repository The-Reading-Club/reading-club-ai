"use client";

import { DEFAULT_LOGIN_REDIRECT_URL } from "@/routes";
import { signIn, useSession } from "next-auth/react";
import { useEffect } from "react";

export default function SignInPopUpPage() {
  const { data: session, status } = useSession();

  useEffect(() => {
    if (!(status === "loading") && !session) {
      signIn("google", {
        callbackUrl:
          // DEFAULT_LOGIN_REDIRECT_URL
          "/auth/google-login",
      });
    }
    if (session) {
      window.close();
    }
  }, [session, status, session?.user?.email]);

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        position: "absolute",
        left: 0,
        top: 0,
        background: "white",
      }}
    />
  );
}
