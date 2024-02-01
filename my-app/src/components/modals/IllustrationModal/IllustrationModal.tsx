"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { useIllustrationModal } from "@/lib/hooks/useModals";

const IllustrationModal = () => {
  const illustrationModal = useIllustrationModal();

  return (
    <Dialog
      open={illustrationModal.isOpen}
      onOpenChange={illustrationModal.onClose}
    >
      {/* I am really liking ShadCN */}
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle
            className="flex justify-center items-center flex-col gap-y-4 pb-0"
            // style={{ border: "2px solid red" }}
          >
            <div className="flex items-center gap-x-2 font-bold py-1 text-darkFont">
              Edit illustration
            </div>
          </DialogTitle>
        </DialogHeader>
        <DialogDescription className="text-center pt-0 space-y-2 text-zing-900 font-medium">
          <div className="flex flex-row">
            <div className="basis-[30%]">
              <img
                // width={"20%"}
                // width={"100%"}
                // height={"auto"}
                src={illustrationModal.imageSrc}
                alt={illustrationModal.revisedPrompt}
                // opacity = "0.5"
                className="opacity-50 rounded-lg"
                // onClick={onClick}
                // style={{ cursor: "pointer" }}
              />
            </div>
            {/* https://youtu.be/KvZoBV_1yYE */}
            <div className="basis-[70%] pl-4 pt-0 text-justify text-base">
              {illustrationModal.revisedPrompt}
            </div>
          </div>
        </DialogDescription>
      </DialogContent>
    </Dialog>
  );
};

export default IllustrationModal;
