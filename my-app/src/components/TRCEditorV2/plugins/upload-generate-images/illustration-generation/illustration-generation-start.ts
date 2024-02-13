import { EditorState, Plugin, PluginKey } from "@tiptap/pm/state";
import { Decoration, DecorationSet, EditorView } from "@tiptap/pm/view";
import { toast } from "sonner";
import axios from "axios";
import { dev } from "@/config";
import {
  capitalizeFirstLetter,
  devAlert,
  devConsoleLog,
  fetchAndReadStream,
  wrapWithToast,
} from "@/lib/utils";
import { useTRCAppStore, useTRCEditorStore } from "@/stores/store";
import { use } from "react";
import { useProModal } from "@/lib/hooks/useModals";
import { unknown } from "zod";
import {
  IllustrationGenerationBody,
  handleIllustrationGeneration,
  handleIllustrationPrompt as handleIllustrationPrompt,
} from "./illustration-generation-handle";

import { findPlaceholder, uploadKey } from "..";
import { handleCharacterCreation } from "./character-creation-handle";
import { handleCharacterChoice } from "./character-choice-handle";
import { handleCharacterIdentification } from "./character-identification-handle";
import { Editor } from "@tiptap/react";

export function startIllustrationGeneration(
  body: IllustrationGenerationBody,
  view: EditorView,
  pos: number
) {
  // A fresh object to act as the ID for this generation
  const id = {};

  // Replace the selection with a placeholder
  // We dont need this for illustration generation
  const tr = view.state.tr;
  if (!tr.selection.empty) tr.deleteSelection();

  tr.setMeta(uploadKey, {
    // no placeholder because we aren't updating anything
    // unless I could have a default placeholder manually...
    add: {
      id,
      pos,
      src: IMAGE_PLACEHOLDER_SRC,
      // null /*reader.result*/
    },
  });
  view.dispatch(tr);

  // We are going to do some JavaScript magic here
  useTRCAppStore.getState().setDefaultModalOpen(true);
  useTRCAppStore
    .getState()
    .setDefaultModalTitle("Learning about your characters");

  useTRCAppStore.getState().setDefaultModalActionLabel("");
  useTRCAppStore.getState().setDefaultModalSecondaryActionLabel("Skip");
  useTRCAppStore.getState().setDefaultModalSecondaryAction(() => {
    useTRCAppStore.getState().setDefaultModalOpen(false);
  });
  // useTRCAppStore.getState().setDefaultModalDisabled(true);

  handleCharacterIdentification({
    existingCharacters: body.existingCharacters,
    storyText: body.prevContextText + body.postContextText,
  }).then(async (res: any) => {
    console.log("handleCharacterIdentification RES", res);
    devAlert("handleCharacterIdentification RES " + JSON.stringify(res));

    const dataJSON = JSON.parse(res);

    // Save state to Zustand
    const newCharacters = dataJSON["newCharactersJSON"];
    devAlert(newCharacters);
    useTRCEditorStore.getState().setStoriesData({
      [body.editorKey]: {
        ...useTRCEditorStore.getState().storiesData[body.editorKey],
        characters: [...body.existingCharacters, ...newCharacters],
      },
    });

    //  CHARACTER CREATION
    useTRCAppStore.getState().setDefaultModalTitle("Creating your characters");

    // const characterDataResponses = [];

    for (const newCharacter of newCharacters) {
      const data = await handleCharacterCreation({
        basicCharacterContext: {
          name: newCharacter.name,
          description: newCharacter.description,
        },
      });

      // characterDataResponses.push(data);
      devAlert("handleCharacterCreation RES " + JSON.stringify(data));
      // Save state to Zustand

      if (data) {
        const characterDataJSON = JSON.parse(data);

        // Verify whether names are the same
        if (characterDataJSON["name"] !== newCharacter.name) {
          devAlert(
            "handleCharacterCreation ERROR, names are different " +
              characterDataJSON["name"] +
              " " +
              newCharacter.name
          );
          // continue;
          // Just force the name to be the same
          characterDataJSON["extendedName"] = characterDataJSON["name"];
          characterDataJSON["name"] = newCharacter.name;
        }

        useTRCEditorStore.getState().setStoriesData({
          [body.editorKey]: {
            ...useTRCEditorStore.getState().storiesData[body.editorKey],
            characterDefinitions: [
              // Line is wrong, we need to add the latest data
              // ...body.characterDefinitions,
              // https://chat.openai.com/c/3d8b64a4-60c2-48f4-a1cb-1407eaadd450
              ...(useTRCEditorStore.getState().storiesData[body.editorKey]
                .characterDefinitions ?? []),
              characterDataJSON,
            ],
          },
        });
      } else {
        devAlert("handleCharacterCreation ERROR, data is undefined");
      }
    }

    // CHARACTER CHOICE

    useTRCAppStore
      .getState()
      .setDefaultModalTitle(
        "Choosing your characters for the scene illustration"
      );

    const characterChoice = await handleCharacterChoice({
      existingCharacters:
        useTRCEditorStore.getState().storiesData[body.editorKey].characters,
      storyText: body.prevContextText + body.postContextText,
      sceneText: body.prevParagraphText,
    });

    /**name: Plato
  
  scene: Plato emerging from the cave, eyes adjusting to sunlight
  
  background: Cave mouth with a glimpse of the outside world
  
  {"chosenCharacter":[{"name":"Plato","scene":"Plato emerging from the cave, eyes adjusting to sunlight","background":"Cave mouth with a glimpse of the outside world"}]} */

    // ILLUSTRATION GENERATION

    useTRCAppStore.getState().setDefaultModalTitle("Generating illustration");

    handleIllustrationGeneration({
      prevContextText: body.prevContextText,
      prevParagraphText: body.prevParagraphText,
      postContextText: body.postContextText,
      editorKey: body.editorKey,
      existingCharacters:
        useTRCEditorStore.getState().storiesData[body.editorKey].characters,
      characterDefinitions:
        useTRCEditorStore.getState().storiesData[body.editorKey]
          .characterDefinitions,
      // will probably be updating the body of this call a lot of times while iterating
      chosenCharacter: characterChoice,
    }).then(({ storedImageUrl: src, revisedPrompt }) => {
      useTRCAppStore.getState().setDefaultModalOpen(false);

      const { schema } = view.state;

      let pos = findPlaceholder(view.state, id);

      // If the content around the placeholder has been deleted
      // drop the image
      if (pos == null) return;

      // Otherwise, insert it at the placeholder's position,
      // and remove the placeholder

      // When BLOB_READ_WRITE_TOKEN is not valid or unavailable, read
      // the image locally
      const imageSrc = src;

      const node = schema.nodes.image.create({
        src: imageSrc,
        alt: revisedPrompt,
      });
      const transaction = view.state.tr
        .replaceWith(pos, pos, node)
        .setMeta(uploadKey, { remove: { id } });
      view.dispatch(transaction);
    });

    // show content on modal
    // useTRCAppStore.getState().setDefaultModalBody(
    //   <div>
    //     <p>{JSON.stringify(res, null, 2)}</p>
    //   </div>
    // );
  });

  return;
}

export interface IllustrationPromptGenerationBody {
  prompt: string;
}

const IMAGE_PLACEHOLDER_SRC =
  "https://0opmmv83e2pndbdg.public.blob.vercel-storage.com/reading-club-ai-logo.jpg";

export function startIllustrationPromptGeneration(
  view: EditorView,
  pos: number,
  body: IllustrationPromptGenerationBody
) {
  const id = {};

  const tr = view.state.tr;

  tr.setMeta(uploadKey, {
    add: {
      id,
      pos,
      src: IMAGE_PLACEHOLDER_SRC,
    },
  });

  view.dispatch(tr);

  // handle arrays from now on, I guess.
  // Actually, keep this like this, use another function. I like what we had achieve here,
  // but we'll do things differently for now
  handleIllustrationPrompt(body).then((imagesUrlsAndPromps) => {
    const { storedImageUrl, revisedPrompt } = imagesUrlsAndPromps[0];

    const { schema } = view.state;

    let pos = findPlaceholder(view.state, id);

    // If the content around the placeholder has been deleted
    // drop the image
    if (pos == null) return;

    // Otherwise, insert it at the placeholder's position,
    // and remove the placeholder

    // When BLOB_READ_WRITE_TOKEN is not valid or unavailable, read
    // the image locally

    const node = schema.nodes.image.create({
      src: storedImageUrl,
      alt: revisedPrompt,
    });

    const transaction = view.state.tr
      .replaceWith(pos, pos, node)
      .setMeta(uploadKey, { remove: { id } });

    view.dispatch(transaction);
  });
}

// https://chat.openai.com
export function insertImageSrcIntoTiptapEditor(
  src: string,
  alt: string,
  editorInstance: Editor
) {
  const { view } = editorInstance;
  const { schema } = view.state;
  const { selection } = view.state;
  const position = selection.$head
    ? selection.$head.pos
    : selection.$anchor.pos;

  const node = schema.nodes.image.create({
    src,
    alt,
  });

  // const transaction = view.state.tr.replaceSelectionWith(node);
  const transaction = view.state.tr.insert(position, node);

  view.dispatch(transaction);
}
