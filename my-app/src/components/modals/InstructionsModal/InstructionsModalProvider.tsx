import useMounted from "@/lib/hooks/useMounted";
import React from "react";
import InstructionsModal from "./InstructionsModal";

const InstructionsModalProvider = () => {
  const mounted = useMounted();

  if (!mounted) {
    return null;
  }

  return (
    <>
      <InstructionsModal />
    </>
  );
};

export default InstructionsModalProvider;
