"use client";
import useMounted from "@/lib/hooks/useMounted";
import React from "react";
import ProModal from "./ProModal";

const ProModalProvider = () => {
  const mounted = useMounted();

  if (!mounted) {
    return null;
  }

  return (
    <>
      <ProModal />
    </>
  );
};

export default ProModalProvider;
