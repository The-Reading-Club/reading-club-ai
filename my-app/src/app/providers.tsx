"use client";

import ConvexProvider from "@/components/convex-customizations/convex-provider";
import IllustrationModalProvider from "@/components/modals/IllustrationModal/IllustrationModalProvider";
import ProModalProvider from "@/components/modals/ProModal/ProModalProvider";
import { ReactNode } from "react";
import { Toaster } from "sonner";

const ToasterProvider = () => {
  // fancy stuff I dont need yet
  // const {theme} = useTheme

  return <Toaster />;
};

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <>
      <ToasterProvider />
      <ProModalProvider />
      <IllustrationModalProvider />
      <ConvexProvider>{children}</ConvexProvider>
    </>
  );
}
