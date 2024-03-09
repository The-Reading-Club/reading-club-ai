"use client";
import React from "react";
import Modal from "../Modal";
import { useTRCAppStore } from "@/stores/store";

const DefaultAppModal = () => {
  const s = useTRCAppStore();
  return (
    <Modal
      isOpen={s.defaultModalOpen}
      // isOpen={true}
      onClose={s.defaultModalOnClose}
      // Actions
      onSubmit={s.defaultModalOnSubmit}
      actionLabel={s.defaultModalActionLabel}
      secondaryActionLabel={s.defaultModalSecondaryActionLabel}
      secondaryAction={s.defaultModalSecondaryAction}
      disabled={s.defaultModalDisabled}
      // Content
      title={s.defaultModalTitle}
      body={s.defaultModalBody}
      footer={s.defaultModalFooter}
    />
  );
};

export default DefaultAppModal;
