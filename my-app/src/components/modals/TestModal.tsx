"use client";
import React from "react";
import Modal from "@/components/modals/Modal";
import useMounted from "@/lib/hooks/useMounted";

const TestModal = () => {
  const mounted = useMounted();

  if (!mounted) return <></>;
  return (
    <Modal
      isOpen
      onClose={() => {}}
      onSubmit={() => {}}
      actionLabel="Submit"
      secondaryActionLabel="Cancel"
      secondaryAction={() => {}}
      title="Test Modal"
      body={
        <>
          <div>Test Modal Body</div>
          <div>Test Modal Body</div>
          <div>Test Modal Body</div>
          <div>Test Modal Body</div>
          <div>Test Modal Body</div>
          <div>Test Modal Body</div>
          <div>Test Modal Body</div>
          <div>Test Modal Body</div>
          <div>Test Modal Body</div>
          <div>Test Modal Body</div>
          <div>Test Modal Body</div>
          <div>Test Modal Body</div>
          <div>Test Modal Body</div>
          <div>Test Modal Body</div>
          <div>Test Modal Body</div>
          <div>Test Modal Body</div>
          <div>Test Modal Body</div>
          <div>Test Modal Body</div>
          <div>Test Modal Body</div>
          <div>Test Modal Body</div>
          <div>Test Modal Body</div>
          <div>Test Modal Body</div>
          <div>Test Modal Body</div>
          <div>Test Modal Body</div>
          <div>Test Modal Body</div>
          <div>Test Modal Body</div>
          <div>Test Modal Body</div>
          <div>Test Modal Body</div>
          <div>Test Modal Body</div>
          <div>Test Modal Body</div>
          <div>Test Modal Body</div>
        </>
      }
    />
  );
};

export default TestModal;
