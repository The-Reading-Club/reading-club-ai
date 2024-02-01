"use client";
import useMounted from "@/lib/hooks/useMounted";
import IllustrationModal from "./IllustrationModal";

const IllustrationModalProvider = () => {
  const mounted = useMounted();

  if (!mounted) {
    return null;
  }

  return (
    <>
      <IllustrationModal />
    </>
  );
};

export default IllustrationModalProvider;
