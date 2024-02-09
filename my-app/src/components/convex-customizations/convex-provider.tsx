"use client";

import { ReactNode } from "react";
import { ConvexProviderWithAuth, ConvexReactClient } from "convex/react";
import { useAuthFromNextAuth } from "./useAuthFromNextAuth";

const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

export default function ConvexProvider({ children }: { children: ReactNode }) {
  //   const auth = useAuthFromNextAuth();

  return (
    <ConvexProviderWithAuth client={convex} useAuth={useAuthFromNextAuth}>
      {children}
    </ConvexProviderWithAuth>
  );
}
