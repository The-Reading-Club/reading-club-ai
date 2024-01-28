"use client";
import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";
import React from "react";
import { FcGoogle } from "react-icons/fc";
// apple
import { FaApple } from "react-icons/fa";
import { DEFAULT_LOGIN_REDIRECT_URL } from "@/routes";
import TRCButton2 from "@/components/TRCButton2";
// import { FaFacebookF } from "react-icons/fa";

const Social = () => {
  const onClick = (provider: "google" /** | "github" */) => {
    signIn(provider, {
      callbackUrl: DEFAULT_LOGIN_REDIRECT_URL,
    });
  };
  return (
    <div
      // horizontal
      // className="flex items-center w-full gap-x-2"
      // vertical
      className="flex flex-col w-full gap-y-2"
    >
      {false && (
        <Button
          size="lg"
          className="w-full"
          variant="outline"
          onClick={() => onClick("google")}
        >
          <FcGoogle className="w-5 h-5" />
        </Button>
      )}
      <TRCButton2
        outline
        label="Sign in with Google"
        icon={FcGoogle}
        onClick={() => onClick("google")}
      />
      {/* <Button size="lg" className="w-full" variant="outline" onClick={() => {}}>
        <FaFacebookF className="w-5 h-5" />
      </Button> */}
      {false && (
        <Button
          size="lg"
          className="w-full"
          variant="outline"
          onClick={() => {}}
        >
          <FaApple className="w-5 h-5" />
        </Button>
      )}
    </div>
  );
};

export default Social;
