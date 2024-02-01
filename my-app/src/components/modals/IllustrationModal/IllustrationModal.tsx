"use client";

import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { useIllustrationModal } from "@/lib/hooks/useModals";
import EditableText from "@/components/input/EditableText/EditableText";
import { useTRCEditorStore } from "@/stores/store";
import { startIllustrationGeneration } from "@/components/TRCEditorV2/plugins/upload-images";
import { devAlert } from "@/lib/utils";
import { CommandGenerateIllustration } from "@/components/TRCEditorV2/extensions/slash-command/CommandList";

const IllustrationModal = () => {
  const illustrationModal = useIllustrationModal();

  const [promptText, setPromptText] = useState(illustrationModal.revisedPrompt);

  const { editorInstance } = useTRCEditorStore();

  // Use effect to update the prompt text when the modal is opened
  useEffect(() => {
    setPromptText(illustrationModal.revisedPrompt);
  }, [illustrationModal.isOpen]);

  const handleSubmitTextData = () => {
    const pos = editorInstance?.view.state.selection.from;

    const editorKey = editorInstance?.extensionManager.extensions.find(
      (extension) => extension.name === "metadata"
    )?.options["key"];

    if (
      editorInstance === undefined ||
      pos === undefined ||
      editorKey === undefined ||
      editorInstance?.view === undefined
    ) {
      devAlert("Error: editorInstance, pos, or editorKey is undefined");
      return;
    }

    CommandGenerateIllustration(editorInstance);

    // startIllustrationGeneration(
    //   {
    //     prevContextText: "This is a test",
    //     prevParagraphText: "This is a test",
    //     postContextText: "This is a test",
    //     editorKey,
    //     existingCharacters:
    //       useTRCEditorStore.getState().storiesData[editorKey]?.characters ?? [],
    //     characterDefinitions:
    //       useTRCEditorStore.getState().storiesData[editorKey]
    //         ?.characterDefinitions ?? [],
    //     // this is messy
    //     chosenCharacter: undefined,
    //   },
    //   editorInstance?.view,
    //   pos
    // );

    // Just update zustand
    // illustrationModal.setRevisedPrompt(promptText);
    // Actually you need to somehow edit the alternative text in the image src...
    // How the fuck do I do that?
    // You don't. You just trigger a new image generation.
    // editorInstance?.state.selection.ranges[0].
    // const rangeTest = editorInstance?.state.selection.ranges[0];
    // editorInstance?.chain().focus().deleteRange(rangeTest as Range);
    // https://chat.openai.com/c/df2cbdbd-8f35-4dfc-b8ed-09b32261ca58
    // const selection = document.getSelection();
    // if (selection && selection.rangeCount > 0) {
    //   const range = selection.getRangeAt(0);
    //   const rect = range.getBoundingClientRect();
    //   // Now rect.top and rect.left give you the coordinates where you can position your UI element
    //   //   editorInstance?.chain().focus().deleteRange(range);
    // }
  };

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
              {/* {illustrationModal.revisedPrompt} */}
              {
                <EditableText
                  textState={promptText}
                  setTextState={setPromptText}
                  submitTextData={handleSubmitTextData}
                  //   editableElement={"textarea"}
                />
              }
            </div>
          </div>
        </DialogDescription>
      </DialogContent>
    </Dialog>
  );
};

export default IllustrationModal;
