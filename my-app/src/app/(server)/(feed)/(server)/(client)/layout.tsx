import { MyConvexProvider } from "@/components/providers/convex-provider/convex-provider";
import React from "react";
import FeedLayout from "./_client-components/FeedLayout";

interface FeedClientLayoutProps {
  children: React.ReactNode;
}

const FeedClientLayout: React.FC<FeedClientLayoutProps> = ({ children }) => {
  return (
    <MyConvexProvider>
      <FeedLayout> {children}</FeedLayout>
    </MyConvexProvider>
  );
};

export default FeedClientLayout;
