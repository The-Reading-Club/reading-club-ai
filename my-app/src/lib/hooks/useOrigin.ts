import { useEffect, useState } from "react";

export const useOrigin = () => {
  // const [origin, setOrigin] = useState<string | null>(null);

  // useEffect(() => {
  //     setOrigin(window.location.origin);
  // }, []);

  // return origin;

  const [mounted, setMounted] = useState(false);

  const origin =
    typeof window !== "undefined" && window.location.origin
      ? window.location.origin
      : "";

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return "";

  return origin;
};
