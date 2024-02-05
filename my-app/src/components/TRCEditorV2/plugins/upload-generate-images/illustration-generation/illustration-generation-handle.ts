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
import { GenerateIllustrationPromptResponse } from "@/app/api/illustration/prompt/utils";
import { IllustrationPromptGenerationBody } from "..";

export interface IllustrationGenerationBody {
  prevContextText: string;
  prevParagraphText: string;
  postContextText: string;
  editorKey: string;
  existingCharacters: any;
  characterDefinitions: any;
  chosenCharacter: any;
}

export type IllustrationGenerationPromiseType = {
  storedImageUrl: string;
  revisedPrompt: string;
};

export function handleIllustrationGeneration(body: IllustrationGenerationBody) {
  return new Promise<IllustrationGenerationPromiseType>((resolve) => {
    toast.promise(
      axios
        .post("/api/illustration", {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: body, //{},
        })
        .then((res) => {
          // Successfully generate illustration
          if (res.status === 200) {
            devAlert(
              "Illustration generated successfully." + JSON.stringify(res.data)
            );
            const {
              imageData,
              newCharacters,
              characterDefinitions,
              storedImageUrl,
              revisedPrompt,
            } = res.data as GenerateIllustrationResponse;

            const { url } = imageData;

            // Save state to Zustand
            devAlert("NOT SAVING TO ZUSTAND");
            // not now for testing
            if (false && dev == false)
              // I am not updating this stuff here anymore
              // If done it's going to duplicate content in production
              // I may need to use dicts, not lists, or filter out duplicates at least
              useTRCEditorStore.getState().setStoriesData({
                [body.editorKey]: {
                  ...useTRCEditorStore.getState().storiesData[body.editorKey],
                  characters: [...body.existingCharacters, ...newCharacters],
                  characterDefinitions: [
                    body.characterDefinitions,
                    ...characterDefinitions,
                  ],
                },
              });

            // It doesn't seem like I need this stuff
            // let image = new Image();
            // image.src = storedImageUrl;

            // image.alt = "Illustration alternative text";

            // image.onload = () => {
            resolve({ storedImageUrl, revisedPrompt });
            // };
          }
          // Unkown error
          else {
            devAlert("Unkown illustration error (then).");
            throw new Error("Error uploading image.");
          }
        })
        .catch((error) => {
          if (error.response && error.response.status === 429) {
            devAlert("Illustration rate limited.");
            useProModal.getState().onOpen();
            throw new Error("Rate limited.");
          } else {
            // handle other errors
            devAlert("(catch) Error: " + error.message);
            throw new Error("Error uploading image.");
          }
        }),
      {
        loading: `Generating illustration... (${body.chosenCharacter.name})`,
        success: "Illustration generated successfully.",
        error: (e) => e.message,
        // error: "test",
      }
    );
  });
}

export function handleIllustrationPrompt(
  body: IllustrationPromptGenerationBody
) {
  return new Promise<IllustrationGenerationPromiseType[]>((resolve) => {
    toast.promise(
      axios
        .post("/api/illustration/prompt", {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: body, //{},
        })
        .then((res) => {
          // Successfully generate illustration
          if (res.status === 200) {
            devAlert("Illustration generated successfully based on prompt.");

            const {
              imageData,
              storedImageUrls,
              revisedPrompts,
            }: GenerateIllustrationPromptResponse = res.data;

            // const { url } = imageData;

            resolve(
              imageData.map((data, index) => ({
                storedImageUrl: storedImageUrls[index],
                revisedPrompt: data.revised_prompt ?? body.prompt,
              }))
            );
          }
          // Unkown error
          else {
            devAlert("Unkown illustration prompt error (then).");
            throw new Error("Error uploading image.");
          }
        })
        .catch((error) => {
          devAlert("(catch) Error: " + error.message);
          throw new Error("Error uploading image.");
        }),
      {
        loading: `Generating new illustration...`,
        success: "Illustration generated successfully based on prompt.",
        error: (e) => e.message,
        // error: "test",
      }
    );
  });
}
