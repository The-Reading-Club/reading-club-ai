import { cn } from "@/lib/utils";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";
import React from "react";

interface FormErrorProps {
  message?: string;
  extraMarginHack?: boolean;
}

const FormError: React.FC<FormErrorProps> = ({ message, extraMarginHack }) => {
  if (!message) return null;

  return (
    <div
      className={cn(
        "bg-destructive/15 p-3 rounded-md flex items-center gap-x-2 text-sm text-destructive",
        extraMarginHack ? "m-6" : "mt-0"
      )}
    >
      <ExclamationTriangleIcon className="h-4 w-4" />
      <p>{message}</p>
    </div>
  );
};

export default FormError;
