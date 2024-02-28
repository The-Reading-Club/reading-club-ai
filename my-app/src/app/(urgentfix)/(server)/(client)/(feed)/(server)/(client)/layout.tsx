import React from "react";
import FeedLayout from "./_client-components/FeedLayout";

interface FeedClientLayoutProps {
  children: React.ReactNode;
}

const FeedClientLayout: React.FC<FeedClientLayoutProps> = ({ children }) => {
  return <FeedLayout> {children}</FeedLayout>;
};

export default FeedClientLayout;
