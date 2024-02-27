import { MyConvexProvider } from "@/components/providers/convex-provider/convex-provider";
import React from "react";

interface FeedClientLayoutProps {
  children: React.ReactNode;
}

const FeedClientLayout: React.FC<FeedClientLayoutProps> = ({ children }) => {
  return <MyConvexProvider>{children}</MyConvexProvider>;
};

export default FeedClientLayout;
