import NavBarV1 from "@/components/NavBarV1/NavBarV1";
import React from "react";

import { SessionProvider } from "next-auth/react";
import { auth } from "@/auth";

// FYI: The protected folder really doesn't mean that routes outside of it are not protected.
// It's just a way to organize the layout components.
// It's also useful for files like this to set a common layout

const ProtectedLayout = async ({ children }: React.PropsWithChildren) => {
  const session = await auth();
  return (
    <div
      className=""
      // style={{ border: "5px solid red" }}
    >
      <NavBarV1 />
      {/* <h1>ProtectedLayout</h1> */}

      <SessionProvider session={session}>{children} </SessionProvider>
    </div>
  );
};

export default ProtectedLayout;
