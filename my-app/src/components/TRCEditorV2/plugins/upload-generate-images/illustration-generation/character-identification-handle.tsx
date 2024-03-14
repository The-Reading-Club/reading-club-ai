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
import {
  useTRCAppConfigStore,
  useTRCAppStore,
  useTRCEditorStore,
} from "@/stores/store";
import { use } from "react";
import { useProModal } from "@/lib/hooks/useModals";
import { unknown } from "zod";
import {
  IllustrationGenerationBody,
  handleIllustrationGeneration,
} from "./illustration-generation-handle";
import { parseJSONChunk } from "..";
export interface CharacterIdentificationBody {
  existingCharacters: any;
  storyText: string;
}

export function handleCharacterIdentification(
  body: CharacterIdentificationBody
) {
  return new Promise((resolve) => {
    toast.promise(
      fetch("/api/character/identify", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ body }),
        // https://apidog.com/articles/axios-stream/
        // responseType: "stream",
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          // https://chat.openai.com/c/cdd17c3d-d691-4294-a924-1689fe3b5883
          const reader = response.body!.getReader();
          const decoder = new TextDecoder("utf-8"); // Creates a TextDecoder instance
          let content = "";

          // https://chat.openai.com/c/66ad6d5b-2b5f-43fd-a646-41b6c1d7def3
          let lastUpdateTime = Date.now(); // Initialize the last update time

          const { setDefaultModalBody } = useTRCAppStore.getState();

          return reader
            .read()
            .then(function processText({ done, value }): Promise<string> {
              if (done) {
                return Promise.resolve(content);
              }

              // Decode the Uint8Array to a string and append it to content
              content += decoder.decode(value, { stream: true });

              const pChunks = parseJSONChunk(content).map((chunk, j) => {
                const keyProp = `key-pChunk-${chunk.key}-char-identification-${j}`;
                if (chunk.key === "name")
                  return (
                    <h1 key={keyProp} className="text-xl font-bold">
                      {chunk.value}
                    </h1>
                  );
                if (chunk.key === "description")
                  return <p key={keyProp}>{chunk.value}</p>;
                else return null;
              });

              // Check if more than 1 second has passed since last update
              if (Date.now() - lastUpdateTime > 100) {
                // useTRCAppStore
                //   .getState()
                //   .setDefaultModalBody(
                //     <div className="text-center">{pChunks}</div>
                //   );
                setDefaultModalBody(
                  <div className="text-center">{pChunks}</div>
                );
                lastUpdateTime = Date.now(); // Update the last update time
              }

              // Read the next chunk
              return reader.read().then(processText);
            });
        })
        .then(async (res) => {
          // Could update the modal state one last time here

          resolve(res);
          // // Let's do streaming instead
          // // https://www.youtube.com/watch?v=wDtjBb4ZJwA
          // const reader = res.body!.getReader();
          // let resultMsg = "";
          // while (true) {
          //   const chunk = await reader.read();
          //   const { done, value } = chunk;
          //   if (done) {
          //     break;
          //   }
          //   // do something with value
          //   // console.log(value);
          //   resultMsg += value;
          //   useTRCAppStore
          //     .getState()
          //     .setDefaultModalBody(<div>{resultMsg}</div>);
          // }
          // ***********
          // AXIOS STYLE
          // // Successfully identified characters
          // if (res.status === 200) {
          //   devAlert(
          //     "Characters identified successfully." + JSON.stringify(res.data)
          //   );
          //   // const { newCharacters, characterDefinitions } = res.data;
          //   // Save state to Zustand
          //   devAlert("NOT SAVING TO ZUSTAND");
          //   // not now for testing
          //   // if (dev == false)
          //   //   useTRCEditorStore.getState().setStoriesData({
          //   //     [body.editorKey]: {
          //   //       ...useTRCEditorStore.getState().storiesData[body.editorKey],
          //   //       characters: newCharacters,
          //   //       characterDefinitions: characterDefinitions,
          //   //     },
          //   //   });
          //   resolve(res.data);
          // } else if (res.status === 429) {
          //   throw new Error("Rate limited.");
          // }
          // // Unkown error
          // else {
          //   throw new Error("Error uploading image.");
          // }
        }),
      {
        // loading: "Identifying characters...",
        loading:
          useTRCAppConfigStore.getState().dictionary?.toasts
            .identifyingCharacters,
        // success: "Characters identified successfully.",
        success:
          useTRCAppConfigStore.getState().dictionary?.toasts
            .charactersIdentified,
        error: (e) => e.message,
        // error: "test",
      }
    );
  });
}
