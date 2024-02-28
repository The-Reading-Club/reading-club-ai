import { headers } from "next/headers";
import React from "react";

interface LayoutProps {
  children: React.ReactNode;
}

const layout = ({ children }: LayoutProps) => {
  let pathname: string | null = null;

  const headerList = headers();
  if (headerList && headerList.get("x-pathname")) {
    pathname = headerList.get("x-pathname") as string;
  }

  const isLandingPage = pathname === "/";

  if (isLandingPage === true) {
    return null;
  }
  return children;
};

export default layout;
