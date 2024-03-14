"use client";
import React, { use, useEffect, useState } from "react";
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
import { Checkbox } from "../ui/checkbox";
import { useTRCAppConfigStore } from "@/stores/store";

interface ShareProps {
  initialData: Doc<"documents">;
  children: React.ReactNode;
}

// children: childrenAsPopupTrigger = (
//   <Button variant={"accent"} size={"lg"}>
//     Share with family
//     {/* {initialData.isShared && (
// <Globe className="text-sky-500 w-4 h-4 ml-2" />
// )} */}
//   </Button>
// ),

const ShareComponent: React.FC<ShareProps> = ({
  initialData,
  children: childrenAsPopupTrigger,
}) => {
  const origin = useOrigin();
  const update = useMutation(api.documents.update);

  const [copied, setCopied] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { dictionary } = useTRCAppConfigStore();

  // interesting situation here... but it works better by calling
  // onSharing and onUnshare directly from the button
  // const [published, setPublished] = useState<boolean>(
  //   initialData.isPublished ?? false
  // );

  // useEffect(() => {
  //   if (initialData.isPublished != published) {
  //     onSharing();
  //   }
  // }, [published]);

  const url = `${origin}/preview/${initialData._id}`;

  // If you are publishing, you are also sharing
  // If you are sharing, you are not necessarily publishing
  const onSharing = (published: boolean) => {
    setIsSubmitting(true);

    const promise = update({
      id: initialData._id,
      isShared: true,
      isPublished: published,
    }).finally(() => setIsSubmitting(false));

    toast.promise(promise, {
      // loading: "Sharing...",
      loading: dictionary?.toasts.sharing,
      // success: `Shared${published ? " and posted" : ""}!`,
      // success: published ? `Shared!` : `Shared and posted!`,
      success: published
        ? dictionary?.toasts.onlyShared
        : dictionary?.toasts.sharedAndPosted,
      // error: "Error sharing story.",
      error: dictionary?.toasts.errorSharingStory,
    });
  };

  // If you are unsharing, you are not publishing
  const onUnshare = () => {
    setIsSubmitting(true);

    const promise = update({
      id: initialData._id,
      isShared: false,
      isPublished: false,
    }).finally(() => setIsSubmitting(false));

    toast.promise(promise, {
      // loading: "Unsharing...",
      loading: dictionary?.toasts.unsharing,
      // success: "Unshared!",
      success: dictionary?.toasts.unshared,
      // error: "Error unsharing story.",
      error: dictionary?.toasts.errorUnsharingStory,
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
        {/* <Button variant={"accent"} size={"lg"}>
          Share with family
        </Button> */}
        {childrenAsPopupTrigger}
      </PopoverTrigger>
      <PopoverContent
        className="w-72"
        align="center"
        alignOffset={8}
        forceMount
      >
        {initialData.isShared ? (
          <div className="space-y-4">
            <div className="flex items-center gap-x-2">
              <Globe className="text-sky-500 animate-pulse h-4 w-4" />
              <p className="text-xs font-medium text-sky-500">
                {/* This story is live on web. */}
                {dictionary?.components.share.liveOnWeb}
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
            <div className="flex items-center space-x-2  mb-4">
              <Checkbox
                checked={initialData.isPublished}
                // checked={initialData.isPublished}
                onCheckedChange={(publishCheck: boolean) =>
                  // setPublished(publishCheck)
                  onSharing(publishCheck)
                }
              />
              <label
                htmlFor="terms2"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                {/* Post on readingclub.ai profile */}
                {dictionary?.components.share.postOnSocial}
              </label>
            </div>
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
              {dictionary?.components.share.unshare}
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
            <p className="text-sm font-medium mb-2">
              {dictionary?.components.share.shareThisStory}
            </p>
            <span className="text-xs text-muted-foreground mb-4 text-center">
              {/* Share your books with friends and family. */}
              {dictionary?.components.share.shareWithFamily}
            </span>
            {/* <div className="flex items-center space-x-2  mb-4">
              <Checkbox
                checked={initialData.isPublished}
                // checked={initialData.isPublished}
                onCheckedChange={(publishCheck: boolean) =>
                  onSharing(publishCheck)
                }
              />
              <label
                htmlFor="terms2"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Post on readingclub.ai profile
              </label>
            </div> */}
            <Button
              disabled={isSubmitting}
              onClick={() => onSharing(initialData.isPublished == true)}
              className="w-full text-xs"
              size="sm"
              variant={"accent"}
            >
              {dictionary?.components.share.share}
            </Button>
          </div>
        )}
      </PopoverContent>
    </Popover>
  );
};

interface ShareWrapperProps {
  documentId: Id<"documents">; // I want this component to be reusable outside drafts view
  children: React.ReactNode;
}

const ShareWrapper: React.FC<ShareWrapperProps> = ({
  documentId,
  children,
}) => {
  // const params = useParams();

  const document = useQuery(api.documents.getById, {
    // documentId: params.documentId as Id<"documents">,
    documentId: documentId,
  });

  if (document === undefined) {
    return <></>;
  }

  if (document === null) return null;

  return <ShareComponent initialData={document}>{children}</ShareComponent>;
};

export default ShareWrapper;
