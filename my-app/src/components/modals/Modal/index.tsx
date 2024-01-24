"use client";
import Button from "@/components/TRCButton1";
import React, { useCallback, useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";

interface ModalProps {
  isOpen?: boolean;
  onClose: () => void;
  onSubmit: () => void;
  title?: string;
  body?: React.ReactElement;
  footer?: React.ReactElement;
  actionLabel: string;
  disabled?: boolean;
  secondaryAction?: () => void;
  secondaryActionLabel?: string;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  title,
  body,
  footer,
  actionLabel,
  disabled,
  secondaryAction,
  secondaryActionLabel,
}) => {
  const [showModal, setShowModal] = useState(isOpen);

  useEffect(() => {
    setShowModal(isOpen);
  }, [isOpen]);

  const handleClose = useCallback(() => {
    if (disabled) return;

    setShowModal(false);

    setTimeout(() => {
      onClose();
    }, 300);
  }, [disabled, onClose]);

  const handleSubmit = useCallback(() => {
    if (disabled) return;

    setShowModal(false);

    // setTimeout(() => {
    onSubmit();
    // }, 300);
  }, [disabled, onSubmit]);

  const handleSecondaryAction = useCallback(() => {
    if (disabled || !secondaryAction) return;

    // setShowModal(false);

    // setTimeout(() => {
    secondaryAction!();
    // }, 300);
  }, [disabled, secondaryAction]);

  if (!isOpen) return null;

  return (
    <>
      {/* https://tailwindcss.com/docs/position#fixed-positioning-elements */}
      {/* This class must be especially designed to add modals
      by leveraging specificity of CSS and absolute relative positions */}
      <div
        onClick={handleClose}
        className="
                    fixed  
                    inset-0
                    z-50
                    bg-neutral-800/70

                    flex
                    justify-center
                    items-center
                    "
      >
        <div
          // This is so that the black overlay doesn't close the modal
          onClick={(e) => e.stopPropagation()}
          className="
                    relative 
                    bg-green-500/50-cancel

                    w-full
                    md:w-4/6
                    lg:2-3/6
                    xl:w-2/5


                    h-full
                    lg:h-auto
                    md:h-auto

                    my-6
                    mx-auto
                    "
        >
          {/* Content */}
          <div>
            <div
              className="
                        bg-white

                        rounded-3xl

                        
                        lg:max-h-[600px] max-h-screen
                        "
            >
              {/* Header */}
              <div
                className="
                            flex
                            items-center
                            justify-center

                            p-6

                            rounded-t
                            border-b-[1px]

                            relative
              "
              >
                <button
                  onClick={handleClose}
                  className="left-9
                            absolute
                            p-1
                            hover:opacity-70
                            translation
                            "
                >
                  <IoMdClose size={18} />
                </button>
                <div className="text-lg font-semibold">{title || "Title"}</div>
              </div>
              {/* Body */}
              {body && (
                <div className="relative p-6 overflow-scroll flex-auto lg:max-h-[300px] max-h-screen">
                  {body}
                </div>
              )}
              {/* Footer */}
              <div className="flex flex-col gap-3 p-6 border-red-800-cancel border-[10px]-cancel">
                {body && (
                  <div className="flex flex-row items-center gap-4 w-full">
                    {secondaryActionLabel && (
                      <>
                        <Button
                          outline
                          disabled={disabled}
                          label={secondaryActionLabel}
                          onClick={handleSecondaryAction}
                        />
                      </>
                    )}
                    {actionLabel && (
                      <Button
                        disabled={disabled}
                        label={actionLabel}
                        onClick={handleSubmit}
                      />
                    )}
                  </div>
                )}
                {footer}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;
