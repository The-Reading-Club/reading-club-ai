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
          <DialogTitle className="flex justify-center items-center flex-col gap-y-4 pb-2">
            <div className="flex items-center gap-x-2 font-bold py-1 text-darkFont">
              Edit illustration
            </div>
          </DialogTitle>
        </DialogHeader>
        <DialogDescription className="text-center pt-2 space-y-2 text-zing-900 font-medium">
          {illustrationModal.revisedPrompt}
        </DialogDescription>
      </DialogContent>
    </Dialog>
  );
};

export default IllustrationModal;
