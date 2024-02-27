"use client";

import { ReactNode } from "react";
import { ConvexProviderWithAuth, ConvexReactClient } from "convex/react";
import { useAuthFromNextAuth } from "./useAuthFromNextAuth";

// https://chat.openai.com/c/7060cadb-783f-4b67-8776-bc0b1c94e4a9
const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

export function MyConvexProvider({ children }: { children: ReactNode }) {
  //   const auth = useAuthFromNextAuth();

  return (
    <ConvexProviderWithAuth client={convex} useAuth={useAuthFromNextAuth}>
      {children}
    </ConvexProviderWithAuth>
  );
}
