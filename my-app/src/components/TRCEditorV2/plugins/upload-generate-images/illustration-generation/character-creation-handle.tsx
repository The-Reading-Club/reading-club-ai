import { EditorState, Plugin, PluginKey } from "@tiptap/pm/state";
import { Decoration, DecorationSet, EditorView } from "@tiptap/pm/view";
import { toast } from "sonner";
import axios from "axios";
import { dev } from "@/config";
import {
  CharacterTraitType,
  capitalizeFirstLetter,
  devAlert,
  devConsoleLog,
  fetchAndReadStream,
  getCharacterTraitKeyLabel,
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

export interface CharacterCreationBody {
  basicCharacterContext: any;
}

export async function handleCharacterCreation(body: CharacterCreationBody) {
  const trcDictionary = useTRCAppConfigStore.getState().dictionary;

  // Show a loading toast
  const loadingToast = toast.loading(
    `Creating character... "${body.basicCharacterContext["name"]}"`,
    {
      duration: Infinity,
    }
  );

  try {
    // https://chat.openai.com/c/95cf540e-0be1-4c45-b8e9-1aca836990d2

    const response = await fetch("/api/character/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ body }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const reader = response.body!.getReader();
    const decoder = new TextDecoder("utf-8"); // Creates a TextDecoder instance
    let content = "";

    console.log("About to start reading stream");
    let i = 0;
    while (true) {
      console.log("Reading stream " + i++);
      const { done, value } = await reader.read();
      if (done) {
        break;
      }

      // Decode the Uint8Array to a string and append it to content
      content += decoder.decode(value, { stream: true });

      const pChunks = parseJSONChunk(content).map((chunk, j) => {
        console.log("CHUNK: " + JSON.stringify(chunk));
        const keyProp = `key-pChunk-${chunk.key}-char-creation-${j}`;

        return (
          <p key={keyProp}>
            <span className="font-bold">
              {/* {capitalizeFirstLetter(chunk.key)} */}
              {trcDictionary
                ? getCharacterTraitKeyLabel(
                    chunk.key as CharacterTraitType,
                    trcDictionary
                  )
                : capitalizeFirstLetter(chunk.key)}
            </span>
            {`: ${chunk.value}`}
          </p>
        );
      });

      console.log("About to update modal body: " + pChunks);
      console.log("CONTENT: " + content);
      useTRCAppStore.getState().setDefaultModalBody(
        <div className="text-center">
          <h1 className="text-xl font-bold">
            {body.basicCharacterContext["name"]}
          </h1>
          <>{pChunks[pChunks.length - 1]}</>
        </div>
      );
    }

    // const data = await response.json();
    console.log(content);

    // Update the toast to show success message
    devAlert("Character created successfully!" + content);
    toast.success("Character created successfully!", {
      id: loadingToast,
      duration: 5000,
    });

    return content;
  } catch (error: any) {
    console.error("Fetch error:", error);
    // Update the toast to show error message
    toast.error(`Error: ${error.message}`, {
      id: loadingToast,
      duration: 5000,
    });
  }
}
