"use client";
import React, { useState } from "react";
import { Doc, Id } from "@/../convex/_generated/dataModel";

import {
  PopoverTrigger,
  Popover,
  PopoverContent,
} from "@/components/ui/popover";
import { useOrigin } from "@/lib/hooks/useOrigin";
import { useMutation, useQuery } from "convex/react";
import { api } from "@/../convex/_generated/api";
import { toast } from "sonner";
import { Button } from "../ui/button";
import { useParams } from "next/navigation";
import { Check, Copy, Globe } from "lucide-react";

interface ShareProps {
  initialData: Doc<"documents">;
}

const ShareComponent: React.FC<ShareProps> = ({ initialData }) => {
  const origin = useOrigin();
  const update = useMutation(api.documents.update);

  const [copied, setCopied] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const url = `${origin}/preview/${initialData._id}`;

  const onSharing = () => {
    setIsSubmitting(true);

    const promise = update({
      id: initialData._id,
      isShared: true,
      isPublished: true,
    }).finally(() => setIsSubmitting(false));

    toast.promise(promise, {
      loading: "Sharing...",
      success: "Shared!",
      error: "Error sharing story.",
    });
  };

  const onUnshare = () => {
    setIsSubmitting(true);

    const promise = update({
      id: initialData._id,
      isShared: false,
    }).finally(() => setIsSubmitting(false));

    toast.promise(promise, {
      loading: "Unsharing...",
      success: "Unshared!",
      error: "Error unsharing story.",
    });
  };

  const onCopy = () => {
    navigator.clipboard.writeText(url);
    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant={"accent"} size={"lg"}>
          Share with family
          {/* {initialData.isShared && (
            <Globe className="text-sky-500 w-4 h-4 ml-2" />
          )} */}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-72" align="end" alignOffset={8} forceMount>
        {initialData.isShared ? (
          <div className="space-y-4">
            <div className="flex items-center gap-x-2">
              <Globe className="text-sky-500 animate-pulse h-4 w-4" />
              <p className="text-xs font-medium text-sky-500">
                This story is live on web.
              </p>
            </div>
            <div className="flex items-center">
              <input
                className="flex-1 px-2 text-xs border rounded-l-md h-8 bg-muted truncate"
                value={url}
                disabled
              />
              <Button
                onClick={onCopy}
                disabled={copied}
                className="h-8 rounded-l-none"
              >
                {copied ? (
                  <Check className="h-4 w-4" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
              </Button>
            </div>
            {/* <Button>
              <a
                href={url}
                target="_blank"
                rel="noreferrer"
                className="text-xs font-medium"
              >
                Open in new tab
              </a>
            </Button> */}
            <Button
              onClick={onUnshare}
              //   className="w-full"
              //   size={"lg"}
              className="w-full text-xs hover:bg-red-500 hover:text-gray-50"
              size={"sm"}
              //   variant={"destructive"}
              //   variant={"ghost"}
              variant={"secondary"}
              disabled={isSubmitting}
            >
              Unshare
            </Button>
          </div>
        ) : (
          //   <Button
          //     onClick={onUnshare}
          //     className="w-full"
          //     variant={"danger"}
          //     size={"lg"}
          //     disabled={isSubmitting}
          //   >
          //     Unshare
          //   </Button>
          <div className="flex flex-col items-center justify-center">
            <Globe className="w-8 h-8 text-muted-foreground mb-2" />
            <p className="text-sm font-medium mb-2">Share this story</p>
            <span className="text-xs text-muted-foreground mb-4">
              Share your books with friends and family.
            </span>
            <Button
              disabled={isSubmitting}
              onClick={onSharing}
              className="w-full text-xs"
              size="sm"
              variant={"accent"}
            >
              Share
            </Button>
          </div>
        )}
      </PopoverContent>
    </Popover>
  );
};

const ShareWrapper = () => {
  const params = useParams();

  const document = useQuery(api.documents.getById, {
    documentId: params.documentId as Id<"documents">,
  });

  if (document === undefined) {
    return <></>;
  }

  if (document === null) return null;

  return <ShareComponent initialData={document} />;
};

export default ShareWrapper;
