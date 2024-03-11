import { auth } from "@/auth";
// import { useSession } from "next-auth/react";
import { headers } from "next/headers";
import React, { use } from "react";

// interface LayoutProps {
//   children: React.ReactNode;
// }

export default async function UrgentFixLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  let pathname: string | null = null;

  const headerList = headers();
  if (headerList && headerList.get("x-pathname")) {
    pathname = headerList.get("x-pathname") as string;
  }

  const isLandingPage = pathname === "/";

  // const session = useSession();
  const session = await auth();

  let userIsLoggedIn = false;

  if (session && session.user && session.user.email) {
    userIsLoggedIn = true;
  }

  if (isLandingPage === true && userIsLoggedIn === false) {
    return null;
  }
  // https://github.com/vercel/next.js/issues/49280
  return <>{children}</>;
}
