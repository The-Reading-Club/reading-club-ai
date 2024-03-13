import { auth } from "@/auth";
import { SessionProvider } from "next-auth/react";
import React from "react";

const AuthLayout = async ({ children }: React.PropsWithChildren) => {
  const session = await auth();

  return (
    <div className="h-full flex items-center justify-center p-10">
      {/* <SessionProvider session={session}> */}
      {children}
      {/* </SessionProvider> */}
    </div>
  );
};

export default AuthLayout;
