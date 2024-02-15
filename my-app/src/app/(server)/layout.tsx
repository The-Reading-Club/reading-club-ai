import NavBarV1 from "@/components/NavBarV1/NavBarV1";
import React from "react";

import { SessionProvider } from "next-auth/react";
import { auth } from "@/auth";
import { checkSubscription } from "@/lib/subscription";
import ClientConfigurator from "./_components/ClientConfigurator";

// FYI: The protected folder really doesn't mean that routes outside of it are not protected.
// It's just a way to organize the layout components.
// It's also useful for files like this to set a common layout

const ProtectedLayout = async ({ children }: React.PropsWithChildren) => {
  const session = await auth();

  const isPlus = await checkSubscription();

  return (
    <div
      className=""
      // style={{ border: "5px solid red" }}
    >
      <ClientConfigurator isPlus={isPlus} />
      {/* I think navbar shit shouldn't be on the client */}
      <NavBarV1
        showSignout={
          session?.user.email !== undefined && session?.user.email !== undefined
        }
      />
      {/* <h1>ProtectedLayout</h1> */}

      <SessionProvider session={session}>{children} </SessionProvider>
    </div>
  );
};

export default ProtectedLayout;
