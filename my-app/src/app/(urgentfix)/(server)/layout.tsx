import NavBarV1 from "@/components/NavBarV1/NavBarV1";
import React from "react";

import { SessionProvider } from "next-auth/react";
import { auth } from "@/auth";
import { checkSubscription } from "@/lib/subscription";
import ClientConfigurator from "./_components/ClientConfigurator";
import { getRateLimitCount, getRateLimitReset } from "@/lib/rate-limit";
import { headers } from "next/headers";
import { getLocaleFromHeadersList } from "@/lib/internationalization/utils";
import { getDictionary } from "@/lib/internationalization/dictionary";
import { Locale } from "@/i18n.config";

// FYI: The protected folder really doesn't mean that routes outside of it are not protected.
// It's just a way to organize the layout components.
// It's also useful for files like this to set a common layout

const ProtectedLayout = async ({ children }: React.PropsWithChildren) => {
  const session = await auth();

  const isPlus = await checkSubscription();

  const rateLimitIllustration = await getRateLimitCount({
    feature: "illustration",
  });

  const rateLimitIllustrationReset = await getRateLimitReset({
    feature: "illustration",
  });

  const rateLimitGeneration = await getRateLimitCount({
    feature: "generation",
  });

  const rateLimitGenerationReset = await getRateLimitReset({
    feature: "generation",
  });

  const headerList = headers();
  const locale = getLocaleFromHeadersList(headerList);

  const dictionary = await getDictionary(locale as Locale);

  return (
    <div
      className="h-screen"
      // style={{ border: "5px solid red" }}
    >
      <ClientConfigurator
        isPlus={isPlus}
        rateLimits={{
          illustration: Number(rateLimitIllustration),
          illustrationReset: Number(rateLimitIllustrationReset),
          illustrationPrompt: Number(rateLimitIllustration),
          illustrationPromptReset: Number(rateLimitIllustrationReset),
          generation: Number(rateLimitGeneration),
          generationReset: Number(rateLimitGenerationReset),
        }}
        dictionary={dictionary}
      />
      {/* I think navbar shit shouldn't be on the client */}
      {/* <p>{`RATE LIMIT TEST ILLUSTRATION ${rateLimitIllustration}`}</p>
      <p>{`RATE LIMIT TEST GENERATION ${rateLimitGeneration}`}</p> */}
      <NavBarV1
        showSignout={
          session?.user.email !== undefined && session?.user.email !== undefined
        }
        dictionary={dictionary}
      />
      {/* <h1>ProtectedLayout</h1> */}

      {/* <SessionProvider session={session}> */}
      {children}
      {/* </SessionProvider> */}
    </div>
  );
};

export default ProtectedLayout;
