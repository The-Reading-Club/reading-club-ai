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
  const onSocialClick = (provider: "google" = "google" /** | "github" */) => {
    try {
      signIn(provider, {
        callbackUrl: DEFAULT_LOGIN_REDIRECT_URL,
      });
    } catch {
      try {
        // https://stackoverflow.com/questions/77548942/nextauth-with-google-provider-needs-to-open-a-pop-up
        popupCenter("/auth/google-login", "Google Sign In");
      } catch (error) {
        throw error;
      }
    }
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
          onClick={() => onSocialClick("google")}
        >
          <FcGoogle className="w-5 h-5" />
        </Button>
      )}
      <TRCButton2
        outline
        label="Sign in with Google"
        icon={FcGoogle}
        onClick={() => {
          // onClick("google")
          onSocialClick();
        }}
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

function popupCenter(url: string, title: string) {
  const dualScreenLeft = window.screenLeft ?? window.screenX;
  const dualScreenTop = window.screenTop ?? window.screenY;

  const width =
    window.innerWidth ?? document.documentElement.clientWidth ?? screen.width;

  const height =
    window.innerHeight ??
    document.documentElement.clientHeight ??
    screen.height;

  const systemZoom = width / window.screen.availWidth;

  const left = (width - 500) / 2 / systemZoom + dualScreenLeft;
  const top = (height - 550) / 2 / systemZoom + dualScreenTop;

  const newWindow = window.open(
    url,
    title,
    `width=${500 / systemZoom},height=${
      550 / systemZoom
    },top=${top},left=${left}`
  );

  newWindow?.focus();
}
