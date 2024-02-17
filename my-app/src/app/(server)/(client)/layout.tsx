"use client";

import { MyConvexProvider } from "@/components/providers/convex-provider/convex-provider";

// import { ConvexProvider, ConvexReactClient } from "convex/react";

// const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

const MainLayout = ({ children }: React.PropsWithChildren) => {
  // return <ConvexProvider client={convex}>{children}</ConvexProvider>;

  return <MyConvexProvider>{children}</MyConvexProvider>;
};

export default MainLayout;
