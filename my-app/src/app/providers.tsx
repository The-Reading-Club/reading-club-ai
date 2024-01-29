"use client";

import ProModalProvider from "@/components/ProModal/ProModalProvider";
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
      {children}
    </>
  );
}
