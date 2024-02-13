"use client";

import IllustrationModalProvider from "@/components/modals/IllustrationModal/IllustrationModalProvider";
import ProModalProvider from "@/components/modals/ProModal/ProModalProvider";
import { ReactQueryProvider } from "@/components/providers/ReactQueryProviders";
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
      <ReactQueryProvider>{children}</ReactQueryProvider>
    </>
  );
}
