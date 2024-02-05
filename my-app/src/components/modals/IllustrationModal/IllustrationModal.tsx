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
import {
  IllustrationGenerationPromiseType,
  handleIllustrationPrompt,
  insertImageSrcIntoTiptapEditor,
  startIllustrationGeneration,
  startIllustrationPromptGeneration,
} from "@/components/TRCEditorV2/plugins/upload-generate-images";
import { devAlert, generateSHA256Hash } from "@/lib/utils";
import { CommandGenerateIllustration } from "@/components/TRCEditorV2/extensions/slash-command/CommandList";
import useLocalStorage from "@/lib/hooks/useLocalStorage";

import bcrypt from "bcryptjs";
import { set } from "zod";

const IllustrationModal = () => {
  const illustrationModal = useIllustrationModal();

  const [promptText, setPromptText] = useState(illustrationModal.revisedPrompt);

  const { editorInstance } = useTRCEditorStore();

  const [urlHash, setUrlHash] = useState<string | null>(null);

  useEffect(() => {
    // setUrlHash(bcrypt.hashSync(illustrationModal.imageSrc, 8));
    generateSHA256Hash(illustrationModal.imageSrc).then((hash) =>
      setUrlHash(hash)
    );
  }, [illustrationModal.imageSrc]);

  // Could make a hook out of this gallery stuff
  // const [galleryImages, setGalleryImages] = useState<string[]>([]);
  const [galleryImages, setGalleryImages_] = useState<
    IllustrationGenerationPromiseType[]
  >([]);
  // const [galleryImages, setGalleryImages] = useLocalStorage<
  //   IllustrationGenerationPromiseType[]
  // >(urlHash, []);

  const setGalleryImages = (value: IllustrationGenerationPromiseType[]) => {
    setGalleryImages_(value);
    if (urlHash != null)
      window.localStorage.setItem(urlHash, JSON.stringify(value));
  };

  useEffect(() => {
    if (urlHash === null) return;

    // Retrieve the gallery images from local storage
    const galleryImagesFromLocalStorage = window.localStorage.getItem(urlHash);
    if (galleryImagesFromLocalStorage) {
      devAlert("Retrieved gallery images from local storage");
      setGalleryImages_(JSON.parse(galleryImagesFromLocalStorage));
    } else {
      devAlert("No gallery images found in local storage " + urlHash);
      setGalleryImages_([]);
    }
    // else {
    //   setGalleryImages_([]);
    // }
  }, [urlHash]);

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

    // Cannot call more than 1 generation to dalle API right now
    // handleIllustrationPrompt({
    //   prompt: promptText,
    // }).then((imagesUrlsAndPrompts) => {
    //   // I'll handle the URLS HERE
    //   const imagesUrls = imagesUrlsAndPrompts.map(
    //     (imageAndPrompt) => imageAndPrompt.storedImageUrl
    //   );

    //   // Set the gallery images
    //   setGalleryImages(imagesUrls);
    // });

    // Assuming promptText is the text you want to use for all illustrations
    const nGenerations = 7; // Number of illustrations you want to generate

    // Create an array of promises by calling handleIllustrationPrompt multiple times in parallel
    const promises = Array.from({ length: nGenerations }, () =>
      handleIllustrationPrompt({
        prompt: promptText,
      })
    );

    // Use Promise.all to wait for all the promises to resolve
    Promise.all(promises).then((results) => {
      // results is an array of arrays, where each inner array contains imageUrlsAndPrompts for each call
      // Flatten the array of arrays to get a single array of imageUrlsAndPrompts
      const flattenedResults = results.flat();

      // Extract the URLs from the imageUrlsAndPrompts
      // const imagesUrls = flattenedResults.map(
      //   (imageAndPrompt) => imageAndPrompt.storedImageUrl
      // );

      // Set the gallery images
      // setGalleryImages(imagesUrls);
      devAlert("Setting gallery images " + JSON.stringify(flattenedResults));
      setGalleryImages(flattenedResults);
    });
  };

  // Render function for gallery images
  const renderGalleryImages = (): JSX.Element[] => {
    return galleryImages.map((imageData, index) => (
      <img
        key={index}
        src={imageData.storedImageUrl}
        // alt={`Gallery image ${index + 1}`}
        alt={imageData.revisedPrompt}
        className="w-1/5 h-auto mr-2 rounded"
        onClick={() => {
          devAlert("Image clicked! " + imageData.revisedPrompt);

          // Start process to insert image in tiptap

          if (editorInstance === undefined || editorInstance == null) return;

          insertImageSrcIntoTiptapEditor(
            imageData.storedImageUrl,
            imageData.revisedPrompt,
            editorInstance
          );

          illustrationModal.onClose();
        }}
      />
    ));
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
          {/* Gallery Section */}
          <div className="flex flex-row flex-wrap mt-4 justify-center">
            {renderGalleryImages()}
          </div>
        </DialogDescription>
      </DialogContent>
    </Dialog>
  );
};

export default IllustrationModal;

// TODO: COMPARE WHETHER PROMPTS ARE DIFFERENT FROM ORIGINAL BEFORE CALLING DALLE
// NO NEED TO CALL DALLE IF PROMPT IS THE SAME

// We won't do stuff directly to tipap editor
// startIllustrationPromptGeneration(editorInstance.view, pos, {
//   prompt: promptText,
// });

// CommandGenerateIllustration(editorInstance);

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
