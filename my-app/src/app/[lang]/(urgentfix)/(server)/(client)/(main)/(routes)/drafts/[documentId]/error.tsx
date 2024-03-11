// https://nextjs.org/docs/app/building-your-application/routing/error-handling

"use client"; // Error components must be Client Components

import { Button } from "@/components/ui/button";
import { useEffect } from "react";
import CustomErrorPage from "./CustomErrorPage";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return <CustomErrorPage error={error} reset={reset} />;
}
