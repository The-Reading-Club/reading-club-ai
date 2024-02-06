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
} from "./illustration-generation-handle";
import { parseJSONChunk } from "..";

export interface CharacterChoiceBody {
  existingCharacters: any;
  storyText: any;
  sceneText: any;
}

export async function handleCharacterChoice(body: CharacterChoiceBody) {
  const loadingToast = toast.loading("Choosing character for illustration...", {
    duration: Infinity,
  });

  try {
    // Good code
    const characterChoiceResponse = await fetchAndReadStream(
      "/api/character/choose",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ body }),
      },
      (contentChunk) => {
        const pChunks = parseJSONChunk(contentChunk).map((chunk) => {
          if (chunk.key === "name")
            return <h1 className="text-xl font-bold">{chunk.value}</h1>;
          if (chunk.key === "scene") return <p>{chunk.value}</p>;
          if (chunk.key === "background") return <p>{chunk.value}</p>;
          if (chunk.key === "cameraShotType") return <p>{chunk.value}</p>;
          else return <></>;
        });

        useTRCAppStore.getState().setDefaultModalBody(
          <>
            <div className="text-center">{pChunks}</div>
            {/* <div className="text-center">{contentChunk}</div> */}
          </>
        );
      }
    );

    const characterChoice = JSON.parse(characterChoiceResponse!)[
      "chosenCharacter"
    ][0];

    devAlert("Character choice: " + JSON.stringify(characterChoice));
    toast.success(`Character chosen successfully! (${characterChoice})`, {
      id: loadingToast,
      duration: 5000,
    });

    return characterChoice;
  } catch (error: any) {
    console.error("Fetch error:", error);
    toast.error(`Error: ${error.message}`, {
      id: loadingToast,
      duration: 5000,
    });
  }
}
