// https://nextjs.org/docs/app/building-your-application/routing/error-handling

"use client"; // Error components must be Client Components

import { Button } from "@/components/ui/button";
import { useEffect } from "react";

export default function CustomErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="text-center p-24 flex flex-col gap-10 items-start">
      <h1 className="text-4xl">There was an error on your browser</h1>
      {/* This is often fixed by refreshing the page */}
      <p className="text-lg">This is often solved by refreshing the page.</p>
      <Button
        variant={"accent"}
        size={"lg"}
        onClick={
          // Attempt to recover by trying to re-render the segment
          () => reset()
        }
      >
        Refresh page
      </Button>
      {/* If you need help, you can contact jose@readingclub.ai */}
      <p className="text-lg">
        If you need further help, you can contact José Alvarez, our CTO, at{" "}
        <a href="mailto:jose@readingclub.ai">
          <span className="text-accent2">jose@readingclub.ai</span>
        </a>
        .
      </p>
    </div>
  );
}
